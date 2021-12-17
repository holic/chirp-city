import { useEffect } from "react";
import createStore from "zustand";
import { persist } from "zustand/middleware";

import { ethereumProvider } from "./providers";

type State = {
  addressToName: Partial<Record<string, string | null>>;
  addressToAvatar: Partial<Record<string, string | null>>;
  setName: (address: string, name: string | null) => void;
  setAvatar: (address: string, avatar: string | null) => void;
};

// TODO: expire persisted store and/or values after a period of time
// TODO: move to our own backend so we don't have to do this for every user?
const useStore = createStore<State>(
  persist(
    (set) => ({
      addressToName: {},
      addressToAvatar: {},
      setName: (address, name) => {
        set((state) => ({
          addressToName: {
            ...state.addressToName,
            [address]: name,
          },
        }));
      },
      setAvatar: (address, avatar) => {
        set((state) => ({
          addressToAvatar: {
            ...state.addressToAvatar,
            [address]: avatar,
          },
        }));
      },
    }),
    { name: "ens" }
  )
);

const lookups: Partial<Record<string, true>> = {};

export const useENS = (address: string) => {
  const cachedName = useStore((state) => state.addressToName[address]);
  const cachedAvatar = useStore((state) => state.addressToAvatar[address]);
  const setName = useStore((state) => state.setName);
  const setAvatar = useStore((state) => state.setAvatar);

  useEffect(() => {
    if (cachedName !== undefined) return;
    if (lookups[address]) return;
    (async () => {
      lookups[address] = true;

      console.log("doing look up for", address);

      // TODO: timeout on pending lookup?
      const name = await ethereumProvider.lookupAddress(address);
      // TODO: does zustand handle state updates after unmount?
      setName(address, name);

      if (name) {
        const avatar = await ethereumProvider.getAvatar(name);
        setAvatar(address, avatar);
      }
    })();
  }, [address, cachedName, setName, setAvatar]);

  return {
    name: cachedName,
    avatar: cachedAvatar,
  };
};
