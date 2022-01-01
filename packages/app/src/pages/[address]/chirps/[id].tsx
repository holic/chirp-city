import { DateTime } from "luxon";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import { Chirp } from "../../../Chirp";
import { chirpCityContract } from "../../../contracts";
import { firstParam } from "../../../firstParam";

type Props = {
  id: string;
  date: number;
  from: string;
  message: string;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const address = firstParam(context.query.address);
  const id = firstParam(context.query.id);

  // TODO: 404 page instead?
  if (!address || !id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const [blockNumber, logIndex] = id.split(":");

  const chirpFilter = chirpCityContract.filters.ChirpCityMessage();
  const events = await chirpCityContract.queryFilter(
    chirpFilter,
    +blockNumber,
    +blockNumber
  );
  const chirp = events.find((event) => event.logIndex === +logIndex);
  if (!chirp) {
    return {
      notFound: true,
    };
  }
  const block = await chirp.getBlock();

  // TODO: redirect if address does not match

  return {
    props: {
      id,
      date: block.timestamp,
      from: chirp.args.from,
      message: chirp.args.message,
    },
  };
};

const ChirpPage: NextPage<Props> = ({ id, date, from, message }) => {
  return (
    <>
      <Head>
        <title>Chirp City</title>
      </Head>

      <div className="flex flex-col flex-wrap items-center">
        <div className="flex-shrink-0 w-full md:w-2/3 lg:w-1/2">
          <div className="flex flex-col flex-wrap divide-y border">
            <Chirp
              chirp={{
                id,
                date: DateTime.fromSeconds(date),
                from,
                message,
                url: `/TODO/chirps/${id}`,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChirpPage;
