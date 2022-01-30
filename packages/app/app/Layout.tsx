import classNames from "classnames";
import { NavLink } from "remix";

import { BellIcon } from "./icons/BellIcon";
import { HomeIcon } from "./icons/HomeIcon";
import { ProfileIcon } from "./icons/ProfileIcon";

type NavButtonProps = {
  to: string;
  label: string;
  icon: React.ReactNode;
};

const NavButton = ({ to, label, icon }: NavButtonProps) => (
  <NavLink to={to} className="flex py-1 group">
    {({ isActive }) => (
      <span
        className={classNames(
          "flex items-center gap-4 px-3 sm:pl-5 sm:pr-7 py-3 rounded-full group-hover:bg-lime-100",
          isActive ? "font-semibold" : null
        )}
      >
        <span
          className={classNames(
            "text-3xl sm:text-2xl",
            !isActive ? "text-green-500 group-hover:text-green-700" : null
          )}
        >
          {icon}
        </span>
        <span className="hidden sm:inline">{label}</span>
      </span>
    )}
  </NavLink>
);

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col flex-col-reverse justify-between sm:grid sm:grid-cols-layout">
      <div className="sticky sm:static bottom-0 inset-x-0 sm:flex sm:justify-end bg-white border-t sm:border-0 z-10 p2 sm:p-4">
        <nav>
          <ul className="flex sm:flex-col justify-evenly sm:min-w-[14rem] text-xl">
            <li>
              <NavButton to="/" label="Home" icon={<HomeIcon />} />
            </li>
            <li>
              <NavButton
                to="/notifications"
                label="Notifications"
                icon={<BellIcon />}
              />
            </li>
            <li>
              {/* TODO: populate to with ENS of connected wallet */}
              {/* TODO: onClick to connect wallet */}
              <NavButton to="/profile" label="Profile" icon={<ProfileIcon />} />
            </li>
          </ul>
        </nav>
      </div>
      <div>{children}</div>
    </div>
  );
};
