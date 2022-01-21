import { Avatar } from "./Avatar";
import { useENS } from "./useENS";

type Props = {
  address: string;
  size?: React.ComponentProps<typeof Avatar>["size"];
};

export const AccountAvatar = ({
  address: inputAddress,
  ...otherProps
}: Props) => {
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
      {...otherProps}
    />
  );
};
