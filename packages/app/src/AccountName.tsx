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
  const { ethereumProvider } = useWallet();
  useEffect(() => {
    (async () => {
      const ensName = await ethereumProvider.lookupAddress(address);
      if (ensName) {
        setName(ensName);
      }
    })();
  }, [ethereumProvider, address]);
  return <>{name}</>;
};
