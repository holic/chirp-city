import { useENS } from "./useENS";

type Props = {
  address: string;
};

export const Avatar = ({ address }: Props) => {
  const { name, avatar } = useENS(address);

  return (
    <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden bg-gray-200">
      {/* TODO: figure out ENS avatar returns ipfs, if so we probably can't use Next.js' `Image` component */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={
          avatar ||
          `https://avatars.dicebear.com/api/croodles-neutral/${encodeURIComponent(
            address
          )}.svg`
        }
        alt={`avatar for ${name || address}`}
        className="w-full h-full object-cover object-center"
      />
    </div>
  );
};
