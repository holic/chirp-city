import { useWallet } from "@gimmixorg/use-wallet";
import addresses from "@tweets-on-chain/contracts/addresses.json";
import { Tweeter__factory } from "@tweets-on-chain/contracts/typechain-types";
import { TypedListener } from "@tweets-on-chain/contracts/typechain-types/common";
import { TweetEvent } from "@tweets-on-chain/contracts/typechain-types/Tweeter";
import { DateTime } from "luxon";
import { useEffect } from "react";
import createStore from "zustand";

type Tweet = {
  id: string;
  date: DateTime;
  from: string;
  message: string;
};

type State = {
  tweets: Record<Tweet["id"], Tweet>;
  addTweet: (tweet: Tweet) => void;
};

const useStore = createStore<State>((set) => ({
  tweets: {},
  addTweet: (tweet) =>
    set((state) => ({
      tweets: {
        ...state.tweets,
        [tweet.id]: tweet,
      },
    })),
}));

export const useTimeline = () => {
  const { provider, account } = useWallet();
  const tweets = useStore((state) => state.tweets);
  const addTweet = useStore((state) => state.addTweet);

  const timeline = Object.values(tweets).sort(
    (a, b) => b.date.toSeconds() - a.date.toSeconds()
  );

  useEffect(() => {
    if (!provider || !account) return;

    const addTweetEvent = (event: TweetEvent) => {
      addTweet({
        id: event.args.id.toString(),
        date: DateTime.fromSeconds(event.args.timestamp.toNumber()),
        from: event.args.from,
        message: event.args.message,
      });
    };

    const contract = Tweeter__factory.connect(
      addresses.mumbai.Tweeter,
      provider
    );
    // TODO: filter by following
    const tweetFilter = contract.filters.Tweet();
    const tweetListener: TypedListener<TweetEvent> = (
      from,
      id,
      timestamp,
      message,
      event
    ) => {
      console.log("got tweet from", from, ":", message, event);
      addTweetEvent(event);
    };
    contract.on(tweetFilter, tweetListener);

    // TODO: record this as part of the deploy or fetch from deploy tx
    const firstBlock = 22727314;

    // TODO: cache which blocks we've fetched from in zustand/localStorage
    const fetchEvents = async (fromBlock: number, numBlocks: number) => {
      // TODO: stop fetching on unmount
      if (fromBlock < firstBlock) return;

      const events = await contract.queryFilter(
        tweetFilter,
        fromBlock - numBlocks,
        fromBlock
      );

      console.log("got events", events);
      events.map(addTweetEvent);

      await fetchEvents(fromBlock - numBlocks, numBlocks);
    };

    (async () => {
      const currentBlock = await provider.getBlockNumber();
      fetchEvents(currentBlock - 1, 1000);
    })();

    return () => {
      contract.off(tweetFilter, tweetListener);
    };
  }, [provider, account, addTweet]);

  return timeline;
};
