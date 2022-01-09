import { Avatar } from "./Avatar";
import { useENS } from "./useENS";

type Props = {
  address: string;
};

export const AccountAvatar = ({ address: inputAddress }: Props) => {
  const { name, address, avatar } = useENS(inputAddress);

  return (
    <Avatar
      src={
        avatar ||
        `https://avatars.dicebear.com/api/croodles-neutral/${encodeURIComponent(
          address
        )}.svg`
      }
      alt={`avatar for ${name || address}`}
    />
  );
};
