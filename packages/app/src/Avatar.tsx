import { useEffect, useState } from "react";

import { useWallet } from "./useWallet";

// TODO: move to zustand to reduce duplicate look ups
// TODO: use ethereum provider

type Props = {
  address: string;
};

export const Avatar = ({ address }: Props) => {
  const [avatar, setAvatar] = useState<string>();
  const { ethereumProvider } = useWallet();
  useEffect(() => {
    (async () => {
      const avatarUrl = await ethereumProvider.getAvatar(address);
      console.log("got avatar for", address, avatarUrl);
      if (avatarUrl) {
        setAvatar(avatarUrl);
      }
    })();
  }, [ethereumProvider, address]);

  return (
    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-black bg-opacity-10">
      {avatar ? <img src={avatar} /> : null}
    </div>
  );
};
