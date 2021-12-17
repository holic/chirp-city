import { ethers } from "ethers";

export const ethereumProvider = new ethers.providers.JsonRpcProvider(
  process.env.NEXT_PUBLIC_ETHEREUM_RPC_ENDPOINT
);
