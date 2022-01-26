import "tailwindcss/tailwind.css";

import type { AppProps } from "next/app";
import {
  createClient as createGraphClient,
  Provider as GraphProvider,
} from "urql";

export const graphClient = createGraphClient({
  url:
    process.env.NODE_ENV === "production"
      ? "https://api.thegraph.com/subgraphs/name/holic/chirp-city"
      : "https://api.thegraph.com/subgraphs/name/holic/chirp-city-testnet",
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <GraphProvider value={graphClient}>
      <Component {...pageProps} />
    </GraphProvider>
  );
};

export default MyApp;
