import { StaticJsonRpcProvider } from "@ethersproject/providers";

export const ethereumProvider = new StaticJsonRpcProvider(
  "https://eth-mainnet.alchemyapi.io/v2/5v4BuuWBFvvYHZoZZP5xFo2q1ldvABwj"
);

export const polygonProvider = new StaticJsonRpcProvider(
  "https://polygon-mumbai.g.alchemy.com/v2/DIxSbUNBlKWzrk_5mp1GDMgwoLLeTSpv"
);
