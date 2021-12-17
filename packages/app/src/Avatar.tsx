import { useENS } from "./useENS";

type Props = {
  src?: string;
  alt?: string;
};

export const Avatar = ({ src, alt }: Props) => (
  <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden bg-gray-200">
    {/* TODO: figure out ENS avatar returns ipfs, if so we probably can't use Next.js' `Image` component */}
    {src ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover object-center"
      />
    ) : null}
  </div>
);
