import addresses from "@tweets-on-chain/contracts/addresses.json";
import { Tweeter__factory } from "@tweets-on-chain/contracts/typechain-types";
import { useState } from "react";

import { AccountAvatar } from "./AccountAvatar";
import { AccountName } from "./AccountName";
import { Avatar } from "./Avatar";
import { RelativeTime } from "./RelativeTime";
import { useTimeline } from "./useTimeline";
import { useWallet } from "./useWallet";

export const Timeline = () => {
  const { account, provider, connect } = useWallet();
  const tweets = useTimeline();
  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-col flex-wrap divide-y border">
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          if (!provider) {
            connect();
            return;
          }

          const contract = Tweeter__factory.connect(
            addresses.mumbai.Tweeter,
            provider.getSigner()
          );

          // TODO: pending indicators and/or optimistic UI updates
          console.log("asking wallet to send tweet", message);
          const tx = await contract.tweet(message);
          console.log("tweet pending");
          setMessage("");
          await tx.wait();
          console.log("tweet sent");
        }}
      >
        <div className="p-4 flex gap-4">
          {account ? <AccountAvatar address={account} /> : <Avatar />}
          <div className="flex flex-col flex-wrap w-full">
            <div className="flex text-xl py-2">
              <textarea
                className="w-full h-16 outline-none resize-none"
                placeholder="What's happening?"
                value={message}
                onChange={(event) => {
                  setMessage(event.currentTarget.value);
                }}
                required
              />
            </div>
            <button
              type="submit"
              className="self-end rounded-full bg-blue-500 px-4 py-2 font-bold text-white transition disabled:opacity-60 disabled:hover:bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
              disabled={!message}
            >
              Tweet
            </button>
          </div>
        </div>
      </form>
      {tweets.map((tweet) => (
        <div
          key={tweet.id}
          className="p-4 flex gap-4 hover:cursor-pointer hover:bg-gray-100"
        >
          <AccountAvatar address={tweet.from} />
          <div className="flex flex-col flex-wrap">
            <div className="flex flex-wrap gap-2 text-gray-500">
              <div className="font-bold">
                <AccountName address={tweet.from} />
              </div>
              <div>·</div>
              <RelativeTime date={tweet.date} />
            </div>
            <div>{tweet.message}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
