import type { NextPage } from "next";
import Head from "next/head";

import { Timeline } from "../Timeline";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Chirp City</title>
      </Head>

      <div className="flex flex-col flex-wrap items-center">
        <div className="flex-shrink-0 w-full md:w-2/3 lg:w-1/2">
          <Timeline />
        </div>
      </div>
    </>
  );
};

export default Home;
