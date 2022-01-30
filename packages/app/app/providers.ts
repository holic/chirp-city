import { StaticJsonRpcProvider } from "@ethersproject/providers";

import { config } from "./config";

export const ethereumProvider = new StaticJsonRpcProvider(
  config.ETHEREUM_RPC_URL
);

export const polygonProvider = new StaticJsonRpcProvider(
  config.POLYGON_RPC_URL
);
