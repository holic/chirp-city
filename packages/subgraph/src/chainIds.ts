import { dataSource } from "@graphprotocol/graph-ts";

// https://thegraph.com/docs/en/developer/create-subgraph-hosted/#supported-networks

const network = dataSource.network();

export const getChainId = (): string => {
  if (network === "matic") {
    return "137";
  }
  if (network === "mumbai") {
    return "80001";
  }
  throw new Error(`Unknown chain ID for network ${network}`);
};
