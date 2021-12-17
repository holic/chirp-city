import { useENS } from "./useENS";

type Props = {
  address: string;
};

export const AccountName = ({ address }: Props) => {
  const { name } = useENS(address);
  return (
    <span title={address}>
      {name || address.replace(/^(0x\w{3})\w+(\w{4})$/, "$1…$2")}
    </span>
  );
};
