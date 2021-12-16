import addresses from "@tweets-on-chain/contracts/addresses.json";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tweets on chain</title>
      </Head>

      <div>hello world</div>
      <div>contract at {addresses.mumbai.Tweeter}</div>
    </>
  );
};

export default Home;
