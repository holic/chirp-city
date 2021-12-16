import { useWallet } from "@gimmixorg/use-wallet";

export const Timeline = () => {
  const { provider } = useWallet();
  if (!provider) return null;

  return <>timeline</>;
};
