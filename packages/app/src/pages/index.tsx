import type { NextPage } from "next";
import Head from "next/head";

import { Layout } from "../Layout";
import { Timeline } from "../Timeline";

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Chirp City</title>
      </Head>

      <Layout>
        <Timeline />
      </Layout>
    </>
  );
};

export default HomePage;
