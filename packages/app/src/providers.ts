import { JsonRpcProvider } from "@ethersproject/providers";

export const ethereumProvider = new JsonRpcProvider(
  process.env.NEXT_PUBLIC_ETHEREUM_RPC_ENDPOINT
);

export const polygonProvider = new JsonRpcProvider(
  process.env.NEXT_PUBLIC_POLYGON_RPC_ENDPOINT
);
