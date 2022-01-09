import type { NextPage } from "next";
import Head from "next/head";

import { PendingIcon } from "../icons/PendingIcon";
import { Layout } from "../Layout";

const ProfilePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Chirp City</title>
      </Head>

      <Layout>
        <div className="flex flex-col flex-wrap divide-y border">
          <div className="p-10 flex items-center justify-center text-2xl text-blue-500">
            <PendingIcon />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ProfilePage;
