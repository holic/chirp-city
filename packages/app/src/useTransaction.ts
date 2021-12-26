import type { ContractTransaction } from "@ethersproject/contracts";
import { Web3Provider } from "@ethersproject/providers";
import createDebug from "debug";
import { useCallback } from "react";
import createStore from "zustand";

import { useWallet } from "./useWallet";

const debug = createDebug("app:useTransaction");

const chainId = 80001;
const chain = {
  chainId: `0x${chainId.toString(16)}`,
  chainName: "Polygon Testnet",
  nativeCurrency: {
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18,
  },
  rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
  blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
};

export enum WalletState {
  idle = "idle",
  connectingWallet = "connectingWallet",
  switchingNetwork = "switchingNetwork",
  addingNetwork = "addingNetwork",
  sendingTransaction = "sendingTransaction",
  confirmingTransaction = "confirmingTransaction",
}

type State = {
  walletState: WalletState;
  walletError: any | null;
};

const useStore = createStore<State>(() => ({
  walletState: WalletState.idle,
  walletError: null,
}));

export const useTransaction = (
  createTransaction: (provider: Web3Provider) => Promise<ContractTransaction>
) => {
  const { provider, connect } = useWallet();
  const { walletState, walletError } = useStore();

  // TODO: don't send transaction if wallet is in a non-idle state?
  // TODO: catch errors and build better messages

  const sendTransaction = useCallback(async (): Promise<boolean> => {
    let currentProvider = provider;

    if (!currentProvider) {
      debug("no provider, connecting to wallet");
      useStore.setState({ walletState: WalletState.connectingWallet });
      try {
        const connectState = await connect();
        debug("got connect state", connectState);
        currentProvider = connectState.provider;
      } catch (walletError: any) {
        // ugh, web3modal doesn't emit an error properly when you cancel
        // a connect wallet request
        // https://github.com/Web3Modal/web3modal/pull/300
        if (typeof walletError === "undefined") {
          debug("probably cancelled in metamask, returning generic error");
          walletError = new Error("Could not connect to wallet");
        }
        useStore.setState({ walletState: WalletState.idle, walletError });
        return false;
      }
    }

    // Traditionally, you'd want to do something like:
    //   - check wallet's network
    //   - call `wallet_switchEthereumChain`
    //   - catch the `4902` error code
    //   - call `wallet_addEthereumChain`
    //
    // But it seems that, at least MetaMask, will do all that for you
    // by just calling `wallet_addEthereumChain`. If you're already
    // connected to that network, the call is ignored. If you already
    // have the network, then it just prompts to switch. If you don't
    // have the network, it prompts you to add + switch. Great!
    //
    // TODO: check if this works for other wallets
    debug("asking wallet to add/switch network");
    useStore.setState({ walletState: WalletState.switchingNetwork });
    try {
      await currentProvider.send("wallet_addEthereumChain", [chain]);
      // Immediately check if the network is correct, because web3modal
      // doesn't throw if the network switch is cancelled from above call
      // https://github.com/Web3Modal/web3modal/issues/363
      const currentNetwork = await currentProvider.getNetwork();
      if (currentNetwork.chainId !== chainId) {
        throw new Error(`You must switch your wallet to ${chain.chainName}`);
      }
    } catch (walletError: any) {
      useStore.setState({ walletState: WalletState.idle, walletError });
      return false;
    }

    debug("asking wallet to send transaction");
    useStore.setState({ walletState: WalletState.sendingTransaction });
    let tx: ContractTransaction;
    try {
      tx = await createTransaction(currentProvider);
    } catch (walletError: any) {
      console.log("got error", walletError);
      useStore.setState({ walletState: WalletState.idle, walletError });
      return false;
    }

    debug("waiting for transaction confirmations");
    useStore.setState({ walletState: WalletState.confirmingTransaction });
    try {
      await tx.wait();
    } catch (walletError: any) {
      useStore.setState({ walletState: WalletState.idle, walletError });
      return false;
    }

    debug("transaction complete!");
    useStore.setState({ walletState: WalletState.idle, walletError: null });
    return true;
  }, [connect, createTransaction, provider]);

  return { sendTransaction, walletState, walletError };
};

// if (currentProvider.network.chainId !== chainId) {
//   debug("wrong network, asking wallet to switch");
//   try {
//     useStore.setState({ walletState: WalletState.switchingNetwork });
//     await currentProvider.send("wallet_switchEthereumChain", [
//       { chainId: chain.chainId },
//     ]);
//   } catch (error: any) {
//     if (error.code === 4902) {
//       useStore.setState({ walletState: WalletState.addingNetwork });
//       await currentProvider.send("wallet_addEthereumChain", [chain]);
//     } else {
//       useStore.setState({ walletState: WalletState.idle, walletError });
//       return;
//     }
//   }
// }
