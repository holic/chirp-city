import { LoaderFunction, useLoaderData } from "remix";
import invariant from "tiny-invariant";
import { gql } from "urql";

import { Chirp, ChirpMessageFragment } from "../../Chirp";
import {
  MessageDocument,
  MessageQuery,
  MessageQueryVariables,
} from "../../codegen/subgraph";
import { firstParam } from "../../firstParam";
import { PendingIcon } from "../../icons/PendingIcon";
import { Layout } from "../../Layout";
import { graphClient } from "../../root";

gql`
  query Message($id: ID!) {
    message(id: $id) {
      ...ChirpMessage
    }
    ${ChirpMessageFragment}
  }
`;

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.messageId, "missing message ID");
  const { data } = await graphClient
    .query<MessageQuery, MessageQueryVariables>(MessageDocument, {
      id: params.messageId,
    })
    .toPromise();
  return data;
};

const MessagePage = () => {
  const data = useLoaderData<MessageQuery>();

  // TODO: redirect to correct address if needed

  return (
    <Layout>
      <div className="flex flex-col flex-wrap divide-y border">
        {!data ? (
          <div className="p-10 flex items-center justify-center text-2xl text-green-500">
            <PendingIcon />
          </div>
        ) : data.message ? (
          <Chirp message={data.message} />
        ) : null}
        {/* TODO: not found page/message? */}
      </div>
    </Layout>
  );
};

export default MessagePage;
