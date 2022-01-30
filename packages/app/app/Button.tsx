import { PendingIcon } from "./icons/PendingIcon";

type HTMLButtonProps = React.HTMLProps<HTMLButtonElement>;

type Props = {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  pending?: boolean;
  onClick?: HTMLButtonProps["onClick"];
  children: React.ReactNode;
};

export const Button = ({
  type,
  disabled,
  pending,
  children,
  ...otherProps
}: Props) => (
  <button
    type={type || "button"}
    className="flex items-center justify-center gap-2 rounded-full bg-green-500 px-4 py-3 font-bold text-white leading-none transition disabled:opacity-60 disabled:hover:bg-green-500 hover:bg-green-600 active:bg-green-700"
    disabled={disabled || pending}
    {...otherProps}
  >
    {pending ? <PendingIcon /> : null}
    <span>{children}</span>
  </button>
);
