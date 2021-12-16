import addresses from "@tweets-on-chain/contracts/addresses.json";
import { Tweeter__factory } from "@tweets-on-chain/contracts/typechain-types";
import { DateTime } from "luxon";
import { useState } from "react";

import { AccountName } from "./AccountName";
import { Avatar } from "./Avatar";
import { useTimeline } from "./useTimeline";
import { useWallet } from "./useWallet";

export const Timeline = () => {
  const { account, provider, connect } = useWallet();
  const tweets = useTimeline();
  const [message, setMessage] = useState("");

  // TODO: figure out flash
  if (!account || !provider) {
    return (
      <div className="flex items-center justify-center p-4">
        <button
          type="button"
          className="self-end rounded-full bg-blue-500 px-4 py-2 font-bold text-white"
          onClick={() => connect()}
        >
          Log in with wallet
        </button>
      </div>
    );
  }

  const contract = Tweeter__factory.connect(
    addresses.mumbai.Tweeter,
    provider.getSigner()
  );

  return (
    <div className="flex flex-col flex-wrap divide-y border">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
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
          <Avatar address={account} />
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
          <div className="flex-shrink-0 w-16 h-16 rounded-full bg-black bg-opacity-10"></div>
          <div className="flex flex-col flex-wrap">
            <div className="flex flex-wrap gap-2 text-gray-500">
              <div className="font-bold">
                <AccountName address={tweet.from} />
              </div>
              <div>·</div>
              <div title={tweet.date.toLocaleString(DateTime.DATETIME_FULL)}>
                {tweet.date.toRelative()}
              </div>
            </div>
            <div>{tweet.message}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
