import deploys from "@chirp-city/contracts/deploys.json";
import { ChirpCity__factory } from "@chirp-city/contracts/typechain-types";

import { polygonProvider } from "./providers";

const network = process.env.NODE_ENV === "production" ? "matic" : "mumbai";

export const chirpCityContract = ChirpCity__factory.connect(
  deploys[network].ChirpCity.address,
  polygonProvider
);
