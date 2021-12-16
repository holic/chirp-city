import addresses from "@tweets-on-chain/contracts/addresses.json";
import type { NextPage } from "next";
import Head from "next/head";

import { Timeline } from "../Timeline";
import { useWallet } from "../useWallet";

const Home: NextPage = () => {
  const { account, connect, provider } = useWallet();

  return (
    <>
      <Head>
        <title>Tweets on chain</title>
      </Head>

      <div>hello world</div>
      <div>contract at {addresses.mumbai.Tweeter}</div>

      {account ? (
        <>hello {account}</>
      ) : (
        <button type="button" onClick={() => connect()}>
          connect wallet
        </button>
      )}

      <Timeline />
    </>
  );
};

export default Home;
