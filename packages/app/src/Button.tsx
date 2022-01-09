import { PendingIcon } from "./icons/PendingIcon";

type Props = {
  type?: "button" | "submit";
  disabled?: boolean;
  pending?: boolean;
  children: React.ReactNode;
};

export const Button = ({ type, disabled, pending, children }: Props) => (
  <button
    type={type || "button"}
    className="flex items-center justify-center gap-2 rounded-full bg-green-500 px-4 py-3 font-bold text-white leading-none transition disabled:opacity-60 disabled:hover:bg-green-500 hover:bg-green-600 active:bg-green-700"
    disabled={disabled || pending}
  >
    {pending ? <PendingIcon /> : null}
    <span>{children}</span>
  </button>
);
