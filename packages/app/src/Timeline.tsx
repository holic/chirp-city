import deploys from "@chirp-city/contracts/deploys.json";
import { ChirpCity__factory } from "@chirp-city/contracts/typechain-types";
import { useState } from "react";

import { AccountAvatar } from "./AccountAvatar";
import { AccountName } from "./AccountName";
import { Avatar } from "./Avatar";
import { RelativeTime } from "./RelativeTime";
import { useTimeline } from "./useTimeline";
import { useTransaction, WalletState } from "./useTransaction";
import { useWallet } from "./useWallet";

export const Timeline = () => {
  const { account, provider, connect } = useWallet();
  const chirps = useTimeline();
  const [message, setMessage] = useState("");

  const { sendTransaction, walletState, walletError } = useTransaction(
    async (provider) => {
      const contract = ChirpCity__factory.connect(
        deploys.mumbai.ChirpCity.address,
        provider.getSigner()
      );
      return contract.chirp(message);
    }
  );

  return (
    <div className="flex flex-col flex-wrap divide-y border">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await sendTransaction();
          setMessage("");
        }}
      >
        <div className="flex flex-col gap-4 py-4">
          <div className="px-4 flex gap-4">
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
            </div>
          </div>
          <div className="px-4 flex gap-4 justify-between items-center flex-row-reverse">
            <button
              type="submit"
              className="self-end rounded-full bg-blue-500 px-4 py-2 font-bold text-white transition disabled:opacity-60 disabled:hover:bg-blue-500 hover:bg-blue-600 active:bg-blue-700"
              disabled={!message || walletState !== WalletState.idle}
            >
              Chirp
            </button>
            {walletError ? (
              <div className="px-2 py-1 text-sm text-red-500 border border-2 border-red-200 border-dashed bor">
                <strong>Error:</strong> {walletError.message}
              </div>
            ) : null}
          </div>
        </div>
      </form>
      {chirps.map((chirp) => (
        <div
          key={chirp.id}
          className="p-4 flex gap-4 hover:cursor-pointer hover:bg-gray-100"
        >
          <AccountAvatar address={chirp.from} />
          <div className="flex flex-col flex-wrap">
            <div className="flex flex-wrap gap-2 text-gray-500">
              <div className="font-bold">
                <AccountName address={chirp.from} />
              </div>
              <div>·</div>
              <RelativeTime date={chirp.date} />
            </div>
            <div>{chirp.message}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
