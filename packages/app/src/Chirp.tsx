import classNames from "classnames";
import Link from "next/link";
import { gql } from "urql";

import { AccountAvatar } from "./AccountAvatar";
import { AccountName } from "./AccountName";
import { ChirpMessageFragment as ChirpMessage } from "./codegen/subgraph";
import { RelativeTime } from "./RelativeTime";
import { useENS } from "./useENS";

export const ChirpMessageFragment = gql`
  fragment ChirpMessage on Message {
    id
    timestamp
    from
    message
  }
`;

type Props = {
  message: ChirpMessage;
  fullLink?: boolean;
};

export const Chirp = ({ message, fullLink }: Props) => {
  const { address } = useENS(message.from);
  return (
    <div
      className={classNames(
        "p-4 flex gap-4 relative",
        fullLink ? "hover:bg-gray-100" : null
      )}
    >
      <AccountAvatar address={message.from} />
      <div className="flex flex-col flex-wrap">
        <div className="flex flex-wrap gap-2 text-gray-500">
          <div className="font-bold">
            <AccountName address={message.from} />
          </div>
          <div>·</div>
          <Link href={`/${address}/${message.id}`}>
            <a
              className={classNames(
                fullLink ? "before:absolute before:inset-0" : null
              )}
            >
              <span className="relative hover:underline">
                <RelativeTime timestamp={message.timestamp} />
              </span>
            </a>
          </Link>
        </div>
        <div
          className="whitespace-pre-wrap"
          style={{ wordBreak: "break-word" }}
        >
          {message.message}
        </div>
      </div>
    </div>
  );
};
