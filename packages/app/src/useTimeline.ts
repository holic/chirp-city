import deploys from "@chirp-city/contracts/deploys.json";
import { ChirpCityMessageEvent } from "@chirp-city/contracts/typechain-types/ChirpCity";
import { TypedListener } from "@chirp-city/contracts/typechain-types/common";
import { DateTime } from "luxon";
import { useEffect } from "react";
import createStore from "zustand";

import { chirpCityContract } from "./contracts";
import { Chirp } from "./types";
import { useStore as useENSStore } from "./useENS";

type State = {
  chirps: Record<Chirp["id"], Chirp>;
  addChirp: (chirp: Chirp) => void;
};

const useStore = createStore<State>((set) => ({
  chirps: {},
  addChirp: (chirp) =>
    set((state) => ({
      chirps: {
        ...state.chirps,
        [chirp.id]: chirp,
      },
    })),
}));

export const useTimeline = () => {
  const chirps = useStore((state) => state.chirps);
  const addChirp = useStore((state) => state.addChirp);

  const timeline = Object.values(chirps).sort(
    (a, b) => b.date.toSeconds() - a.date.toSeconds()
  );

  useEffect(() => {
    const addChirpEvent = async (event: ChirpCityMessageEvent) => {
      const block = await event.getBlock();
      const network = await chirpCityContract.provider.getNetwork();
      const id = `chirp:${network.chainId}:${block.number}:${event.logIndex}`;
      const from = event.args.from;
      addChirp({
        id,
        date: DateTime.fromSeconds(block.timestamp),
        from,
        message: event.args.message,
      });
    };

    // TODO: filter by following
    const chirpFilter = chirpCityContract.filters.ChirpCityMessage();
    const chirpListener: TypedListener<ChirpCityMessageEvent> = (
      from,
      message,
      event
    ) => {
      console.log("got chirp from", from, ":", message, event);
      addChirpEvent(event);
    };
    chirpCityContract.on(chirpFilter, chirpListener);

    // TODO: cache which blocks we've fetched from in zustand/localStorage
    const fetchEvents = async (fromBlock: number, numBlocks: number) => {
      // TODO: stop fetching on unmount
      if (fromBlock < deploys.mumbai.ChirpCity.blockNumber) return;

      const events = await chirpCityContract.queryFilter(
        chirpFilter,
        fromBlock - numBlocks,
        fromBlock
      );

      console.log("got events for", fromBlock, events);
      events.map(addChirpEvent);

      await fetchEvents(fromBlock - numBlocks, numBlocks);
    };

    (async () => {
      const currentBlock = await chirpCityContract.provider.getBlockNumber();
      fetchEvents(currentBlock - 1, 100000);
    })();

    return () => {
      chirpCityContract.off(chirpFilter, chirpListener);
    };
  }, [addChirp]);

  return timeline;
};
