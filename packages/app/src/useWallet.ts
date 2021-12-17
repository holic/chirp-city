import { useWallet as useWalletHook } from "@gimmixorg/use-wallet";
import { ethers } from "ethers";
import { useCallback, useEffect, useMemo } from "react";

export const useWallet = () => {
  const wallet = useWalletHook();

  // https://github.com/gimmixorg/use-wallet/pull/1
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const connectWallet = useMemo(() => wallet.connect, []);

  const connect = useCallback(() => {
    connectWallet({
      cacheProvider: true,
      network: "mumbai",
    });
  }, [connectWallet]);

  // try an initial connect, we might be cached
  useEffect(() => {
    if (!wallet.account && wallet.web3Modal?.cachedProvider) {
      connect();
    }
  }, [connect, wallet.web3Modal?.cachedProvider, wallet.account]);

  return {
    ...wallet,
    connect,
    account: wallet.account && ethers.utils.getAddress(wallet.account),
  };
};
