import deploys from "@chirp-city/contracts/deploys.json";
import { ChirpCity__factory } from "@chirp-city/contracts/typechain-types";

import { polygonProvider } from "./providers";

export const chirpCityContract = ChirpCity__factory.connect(
  deploys.mumbai.ChirpCity.address,
  polygonProvider
);
