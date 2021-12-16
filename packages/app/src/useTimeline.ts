import { useWallet } from "@gimmixorg/use-wallet";
import addresses from "@tweets-on-chain/contracts/addresses.json";
import { Tweeter__factory } from "@tweets-on-chain/contracts/typechain-types";
import { TypedListener } from "@tweets-on-chain/contracts/typechain-types/common";
import { TweetEvent } from "@tweets-on-chain/contracts/typechain-types/Tweeter";
import { useEffect, useState } from "react";

type Tweet = {
  id: string;
  date: Date;
  from: string;
  message: string;
};

export const useTimeline = () => {
  const { provider, account } = useWallet();
  const [tweets, setTweets] = useState<Record<string, Tweet>>({});

  useEffect(() => {
    if (!provider || !account) return;

    const addTweet = (event: TweetEvent) => {
      const id = event.args.id.toString();
      setTweets((tweets) => ({
        ...tweets,
        [id]: {
          id,
          date: new Date(event.args.timestamp.toNumber() * 1000),
          from: event.args.from,
          message: event.args.message,
        },
      }));
    };

    const contract = Tweeter__factory.connect(
      addresses.mumbai.Tweeter,
      provider
    );
    const tweetFilter = contract.filters.Tweet(account);
    const tweetListener: TypedListener<TweetEvent> = (
      from,
      id,
      timestamp,
      message,
      event
    ) => {
      console.log("got tweet from", from, ":", message, event);
      addTweet(event);
    };
    contract.on(tweetFilter, tweetListener);

    // TODO: paginate from newest to oldest
    (async () => {
      const fromBlock = 22727314;
      const currentBlock = await provider.getBlockNumber();
      const events = await contract.queryFilter(
        tweetFilter,
        fromBlock,
        Math.min(fromBlock + 500, currentBlock)
      );
      console.log("got events", events);
      events.map(addTweet);
    })();

    return () => {
      contract.off(tweetFilter, tweetListener);
    };
  }, [provider, account]);

  return Object.values(tweets).sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );
};
