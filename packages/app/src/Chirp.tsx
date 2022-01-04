import classNames from "classnames";
import Link from "next/link";

import { AccountAvatar } from "./AccountAvatar";
import { AccountName } from "./AccountName";
import { RelativeTime } from "./RelativeTime";
import { Chirp as ChirpType } from "./types";

type Props = {
  chirp: ChirpType;
  fullLink?: boolean;
};

export const Chirp = ({ chirp, fullLink }: Props) => (
  <div
    className={classNames(
      "p-4 flex gap-4 relative",
      fullLink ? "hover:bg-gray-100" : null
    )}
  >
    <AccountAvatar address={chirp.from} />
    <div className="flex flex-col flex-wrap">
      <div className="flex flex-wrap gap-2 text-gray-500">
        <div className="font-bold">
          <AccountName address={chirp.from} />
        </div>
        <div>·</div>
        <Link href={chirp.url}>
          <a
            className={classNames(
              fullLink ? "before:absolute before:inset-0" : null
            )}
          >
            <span className="relative hover:underline">
              <RelativeTime date={chirp.date} />
            </span>
          </a>
        </Link>
      </div>
      <div className="whitespace-pre-wrap">{chirp.message}</div>
    </div>
  </div>
);
