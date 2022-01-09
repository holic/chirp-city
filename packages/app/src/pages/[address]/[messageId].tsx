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

  if (!query.data) {
    return (
      <div className="flex flex-col flex-wrap divide-y sm:border">
        <div className="p-10 flex items-center justify-center text-2xl text-blue-500">
          <PendingIcon />
        </div>
      </div>
    );
  }

  const { message } = query.data;
  if (!message) {
    // TODO: redirect inside useEffect
    return null;
  }

  // TODO: redirect to correct address if needed

  return (
    <>
      <Head>
        {/* TODO: title */}
        <title>Chirp City</title>
      </Head>

      <Layout>
        <div className="flex flex-col flex-wrap divide-y border">
          <Chirp message={message} />
        </div>
      </Layout>
    </>
  );
};

export default MessagePage;
