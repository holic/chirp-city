import deploys from "@chirp-city/contracts/deploys.json";
import { ChirpCity__factory } from "@chirp-city/contracts/typechain-types";
import { useState } from "react";

import { AccountAvatar } from "./AccountAvatar";
import { AccountName } from "./AccountName";
import { Avatar } from "./Avatar";
import { Button } from "./Button";
import { PendingIcon } from "./icons/PendingIcon";
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

  const pending = walletState !== WalletState.idle;

  return (
    <div className="flex flex-col flex-wrap divide-y border">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          if (await sendTransaction()) {
            setMessage("");
          }
        }}
      >
        <div className="flex flex-col gap-4 py-4">
          <div className="px-4 flex gap-4">
            {account ? <AccountAvatar address={account} /> : <Avatar />}
            <div className="flex flex-col flex-wrap w-full">
              <div className="flex text-xl py-2">
                <textarea
                  className="w-full h-16 outline-none resize-none disabled:opacity-60"
                  placeholder="What's happening?"
                  value={message}
                  onChange={(event) => {
                    setMessage(event.currentTarget.value);
                  }}
                  required
                  disabled={pending}
                />
              </div>
            </div>
          </div>
          <div className="px-4 flex gap-4 justify-between items-center flex-row-reverse">
            <Button type="submit" disabled={!message} pending={pending}>
              Chirp
            </Button>
            {walletError ? (
              <div className="px-2 py-1 text-sm text-red-500 border border-2 border-red-200 border-dashed bor">
                <strong>Error:</strong> {walletError.message}
              </div>
            ) : null}
          </div>
        </div>
      </form>
      {!chirps.length ? (
        <div className="p-10 flex items-center justify-center text-2xl text-blue-500">
          <PendingIcon />
        </div>
      ) : null}
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
