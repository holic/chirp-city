import { useENS } from "./useENS";

type Props = {
  address: string;
};

export const Avatar = ({ address }: Props) => {
  const { name, avatar } = useENS(address);

  return (
    <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden bg-gray-200">
      {avatar ? (
        <img
          src={avatar}
          alt={`avatar for ${name || address}`}
          className="w-full h-full object-cover object-center"
        />
      ) : null}
    </div>
  );
};
