import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

import { BellIcon } from "./icons/BellIcon";
import { HomeIcon } from "./icons/HomeIcon";
import { ProfileIcon } from "./icons/ProfileIcon";
import { useENS } from "./useENS";
import { useWallet } from "./useWallet";

type NavLinkProps = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const NavLink = ({ href, label, icon }: NavLinkProps) => {
  const router = useRouter();
  const isActive = router.asPath === href;
  return (
    <Link href={href}>
      <a className="flex py-1 group">
        <span
          className={classNames(
            "flex items-center gap-4 px-3 sm:pl-5 sm:pr-7 py-3 rounded-full group-hover:bg-gray-100",
            isActive ? "font-bold" : null
          )}
        >
          <span
            className={classNames(
              "text-3xl sm:text-2xl",
              !isActive ? "text-blue-400 group-hover:text-blue-600" : null
            )}
          >
            {icon}
          </span>
          <span className="hidden sm:inline">{label}</span>
        </span>
      </a>
    </Link>
  );
};

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
              <NavLink href="/" label="Home" icon={<HomeIcon />} />
            </li>
            <li>
              <NavLink
                href="/notifications"
                label="Notifications"
                icon={<BellIcon />}
              />
            </li>
            <li>
              {/* TODO: populate href with ENS of connected wallet */}
              {/* TODO: onClick to connect wallet */}
              <NavLink href="/profile" label="Profile" icon={<ProfileIcon />} />
            </li>
          </ul>
        </nav>
      </div>
      <div>{children}</div>
    </div>
  );
};
