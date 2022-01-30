import classNames from "classnames";

type Props = {
  src?: string;
  alt?: string;
  size?: 16 | 40;
};

export const Avatar = ({ src, alt, size = 16 }: Props) => (
  <div
    className={classNames(
      "flex-shrink-0 rounded-full overflow-hidden bg-gray-200",
      size === 16 ? "w-16 h-16" : null,
      size === 40 ? "w-40 h-40 border-4 border-white" : null
    )}
  >
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
