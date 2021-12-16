import addresses from "@tweets-on-chain/contracts/addresses.json";
import type { NextPage } from "next";
import Head from "next/head";

import { Timeline } from "../Timeline";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tweets on chain</title>
      </Head>

      <div className="flex flex-col flex-wrap items-center">
        <div className="flex-shrink-0 w-1/2">
          <Timeline />
        </div>
      </div>
    </>
  );
};

export default Home;
