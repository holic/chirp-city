import deploys from "@chirp-city/contracts/deploys.json";
import { ChirpCity__factory } from "@chirp-city/contracts/typechain-types";
import { ChirpedEvent } from "@chirp-city/contracts/typechain-types/ChirpCity";
import { TypedListener } from "@chirp-city/contracts/typechain-types/common";
import { DateTime } from "luxon";
import { useEffect } from "react";
import createStore from "zustand";

import { polygonProvider } from "./providers";

type Chirp = {
  id: string;
  date: DateTime;
  from: string;
  message: string;
};

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
    const addChirpEvent = (event: ChirpedEvent) => {
      addChirp({
        id: event.args.id.toString(),
        date: DateTime.fromSeconds(event.args.timestamp.toNumber()),
        from: event.args.from,
        message: event.args.message,
      });
    };

    const contract = ChirpCity__factory.connect(
      deploys.mumbai.ChirpCity.address,
      polygonProvider
    );
    // TODO: filter by following
    const chirpFilter = contract.filters.Chirped();
    const chirpListener: TypedListener<ChirpedEvent> = (
      from,
      id,
      timestamp,
      message,
      event
    ) => {
      console.log("got chirp from", from, ":", message, event);
      addChirpEvent(event);
    };
    contract.on(chirpFilter, chirpListener);

    // TODO: cache which blocks we've fetched from in zustand/localStorage
    const fetchEvents = async (fromBlock: number, numBlocks: number) => {
      // TODO: stop fetching on unmount
      if (fromBlock < deploys.mumbai.ChirpCity.blockNumber) return;

      const events = await contract.queryFilter(
        chirpFilter,
        fromBlock - numBlocks,
        fromBlock
      );

      console.log("got events", events);
      events.map(addChirpEvent);

      await fetchEvents(fromBlock - numBlocks, numBlocks);
    };

    (async () => {
      const currentBlock = await polygonProvider.getBlockNumber();
      fetchEvents(currentBlock - 1, 100000);
    })();

    return () => {
      contract.off(chirpFilter, chirpListener);
    };
  }, [addChirp]);

  return timeline;
};
