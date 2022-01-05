import { DateTime } from "luxon";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { Chirp } from "../../Chirp";
import { useMessageQuery } from "../../codegen/subgraph";
import { firstParam } from "../../firstParam";
import { PendingIcon } from "../../icons/PendingIcon";

const ChirpPage: NextPage = () => {
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
      <div className="flex flex-col flex-wrap items-center">
        <div className="flex-shrink-0 w-full md:w-2/3 lg:w-1/2">
          <div className="flex flex-col flex-wrap divide-y border">
            <div className="p-10 flex items-center justify-center text-2xl text-blue-500">
              <PendingIcon />
            </div>
          </div>
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

      <div className="flex flex-col flex-wrap items-center">
        <div className="flex-shrink-0 w-full md:w-2/3 lg:w-1/2">
          <div className="flex flex-col flex-wrap divide-y border">
            <Chirp
              chirp={{
                id: message.id,
                date: DateTime.fromSeconds(message.timestamp),
                from: message.from,
                message: message.message,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChirpPage;
