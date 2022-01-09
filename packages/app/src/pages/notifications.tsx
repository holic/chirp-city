import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { gql } from "urql";

import { Chirp, ChirpMessageFragment } from "../Chirp";
import { useNotificationsQuery } from "../codegen/subgraph";
import { PendingIcon } from "../icons/PendingIcon";
import { Layout } from "../Layout";

gql`
  query Notifications($address: [Bytes!]!) {
    messages(where: {mentions: $address}, first: 100, orderBy: timestamp, orderDirection: desc) {
      id
      ...ChirpMessage
    }
    ${ChirpMessageFragment}
  }
`;

const NotificationsPage: NextPage = () => {
  const [query, refetchQuery] = useNotificationsQuery({
    variables: {
      address: ["0xC9C022FCFebE730710aE93CA9247c5Ec9d9236d0".toLowerCase()],
    },
    // Prevent executing query server side for now
    // TODO: populate this server side?
    pause: typeof window === "undefined",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      refetchQuery({ requestPolicy: "cache-and-network" });
    }, 3000);
    return () => clearInterval(timer);
  }, [refetchQuery]);

  return (
    <>
      <Head>
        <title>Chirp City</title>
      </Head>

      <Layout>
        <div className="flex flex-col flex-wrap divide-y sm:border">
          {!query.data ? (
            <div className="p-10 flex items-center justify-center text-2xl text-green-500">
              <PendingIcon />
            </div>
          ) : (
            <>
              {query.data.messages.map((message) => (
                <Chirp key={message.id} message={message} fullLink />
              ))}
            </>
          )}
        </div>
      </Layout>
    </>
  );
};

export default NotificationsPage;
