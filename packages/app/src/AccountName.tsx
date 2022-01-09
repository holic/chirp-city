import { useENS } from "./useENS";

type Props = {
  address: string;
};

export const AccountName = ({ address: inputAddress }: Props) => {
  const { address, displayName } = useENS(inputAddress);

  return <span title={address}>{displayName}</span>;
};
