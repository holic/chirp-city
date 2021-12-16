import { useWallet as useWalletHook } from "@gimmixorg/use-wallet";
import { useCallback, useEffect, useMemo } from "react";

export const useWallet = () => {
  const wallet = useWalletHook();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const connectWallet = useMemo(() => wallet.connect, []);

  const connect = useCallback(() => {
    connectWallet({
      cacheProvider: true,
    });
  }, [connectWallet]);

  // try an initial connect, we might be cached
  useEffect(() => {
    if (!wallet.account && wallet.web3Modal?.cachedProvider) {
      connect();
    }
  }, [connect, wallet.web3Modal?.cachedProvider, wallet.account]);

  return { ...wallet, connect };
};
