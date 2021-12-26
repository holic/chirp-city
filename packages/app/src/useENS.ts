import { useEffect } from "react";
import createStore from "zustand";
import { persist } from "zustand/middleware";

type State = {
  addressToName: Partial<Record<string, string | null>>;
  addressToAvatar: Partial<Record<string, string | null>>;
  setName: (address: string, name: string | null) => void;
  setAvatar: (address: string, avatar: string | null) => void;
};

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
    if (lookups[address]) return;
    (async () => {
      lookups[address] = true;

      console.log("doing look up for", address);

      try {
        const data = await fetch(
          `https://api.ensideas.com/ens/resolve/${address}`
        ).then((res) => res.json());

        setName(address, data.name);
        setAvatar(address, data.avatar);
      } catch (error) {
        console.log("could not resolve ens", error);
      }
    })();
  }, [address, cachedName, setName, setAvatar]);

  return {
    name: cachedName,
    avatar: cachedAvatar,
  };
};
