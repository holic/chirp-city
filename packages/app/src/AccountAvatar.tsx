import { Avatar } from "./Avatar";
import { useENS } from "./useENS";

type Props = {
  address: string;
};

export const AccountAvatar = ({ address }: Props) => {
  const { name, avatar } = useENS(address);

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
