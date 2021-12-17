import { useENS } from "./useENS";

type Props = {
  address: string;
};

export const AccountName = ({ address }: Props) => {
  const { name } = useENS(address);
  return (
    <span title={address}>
      {name ||
        address.replace(/^(0x[0-9A-F]{3})[0-9A-F]+([0-9A-F]{4})$/i, "$1…$2")}
    </span>
  );
};
