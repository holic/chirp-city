import { useEffect } from "react";
import { gql } from "urql";

import { AccountAvatar } from "../AccountAvatar";
import { AccountName } from "../AccountName";
import { Button } from "../Button";
import { Chirp, ChirpMessageFragment } from "../Chirp";
import { useProfileQuery } from "../codegen/subgraph";
import { PendingIcon } from "../icons/PendingIcon";
import { Layout } from "../Layout";
import { useWallet } from "../useWallet";

gql`
  query Profile($address: Bytes!) {
    messages(where: {from: $address}, first: 100, orderBy: timestamp, orderDirection: desc) {
      id
      ...ChirpMessage
    }
    ${ChirpMessageFragment}
  }
`;

const ProfilePage = () => {
  const { account, connect } = useWallet();

  const [query, refetchQuery] = useProfileQuery({
    variables: {
      address: account?.toLowerCase(),
    },
    // Prevent executing query server side for now
    // TODO: populate this server side?
    pause: !account || typeof window === "undefined",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      refetchQuery({ requestPolicy: "cache-and-network" });
    }, 3000);
    return () => clearInterval(timer);
  }, [refetchQuery]);

  return (
    <Layout>
      <div className="flex flex-col flex-wrap divide-y sm:border">
        {!account ? (
          <div className="p-10 flex items-center justify-center">
            <Button
              onClick={async () => {
                await connect();
              }}
            >
              Sign in with wallet
            </Button>
          </div>
        ) : (
          <>
            {!query.data ? (
              <div className="p-10 flex items-center justify-center text-2xl text-green-500">
                <PendingIcon />
              </div>
            ) : (
              <>
                <div>
                  <div className="h-40 bg-gray-600"></div>
                  <div className="p-4 flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <div className="-mt-24">
                        <AccountAvatar address={account} size={40} />
                      </div>
                      <Button disabled>Edit profile</Button>
                    </div>
                    <div className="text-2xl font-extrabold">
                      <AccountName address={account} />
                    </div>
                    <div>jus a lil birb chirpin&apos; in the hyperverse</div>
                    <div className="flex flex-wrap gap-4">
                      <span>
                        <strong>420</strong> followers
                      </span>
                      <span>
                        <strong>69</strong> following
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap">
                    <a className="px-8 hover:bg-gray-100 font-semibold">
                      <div className="px-1 py-3 border-y-4 border-t-transparent border-b-green-500">
                        Chirps
                      </div>
                    </a>
                  </div>
                </div>
                {query.data.messages.map((message) => (
                  <Chirp key={message.id} message={message} fullLink />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default ProfilePage;
