import { useEffect, useState } from "react";

import { useWallet } from "./useWallet";

// TODO: move to zustand to reduce duplicate look ups
// TODO: use ethereum provider

type Props = {
  address: string;
};

export const AccountName = ({ address }: Props) => {
  const [name, setName] = useState(
    address.replace(/^((?:0x)?\w{3})\w+(\w{4})$/, "$1…$2")
  );
  // const { provider } = useWallet();
  // useEffect(() => {
  //   if (!provider) return;
  //   (async () => {
  //     const ensName = await provider.lookupAddress(address);
  //     if (ensName) {
  //       setName(ensName);
  //     }
  //   })();
  // }, [provider, address]);
  return <>{name}</>;
};
