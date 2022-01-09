import { DateTime } from "luxon";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { gql } from "urql";

import { Chirp, ChirpMessageFragment } from "../../Chirp";
import { useMessageQuery } from "../../codegen/subgraph";
import { firstParam } from "../../firstParam";
import { PendingIcon } from "../../icons/PendingIcon";
import { Layout } from "../../Layout";

gql`
  query Message($id: ID!) {
    message(id: $id) {
      ...ChirpMessage
    }
    ${ChirpMessageFragment}
  }
`;

const MessagePage: NextPage = () => {
  const router = useRouter();
  const address = firstParam(router.query.address);
  const messageId = firstParam(router.query.messageId);

  const [query, refetchQuery] = useMessageQuery(
    typeof window === "undefined" || !messageId
      ? { pause: true }
      : {
          variables: { id: messageId },
        }
  );

  // TODO: redirect to correct address if needed

  return (
    <>
      <Head>
        {/* TODO: title */}
        <title>Chirp City</title>
      </Head>

      <Layout>
        <div className="flex flex-col flex-wrap divide-y border">
          {!query.data ? (
            <div className="p-10 flex items-center justify-center text-2xl text-green-500">
              <PendingIcon />
            </div>
          ) : query.data.message ? (
            <Chirp message={query.data.message} />
          ) : null}
          {/* TODO: not found page/message? */}
        </div>
      </Layout>
    </>
  );
};

export default MessagePage;
