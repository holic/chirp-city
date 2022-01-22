import {
  Links,
  LiveReload,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "remix";
import {
  createClient as createGraphClient,
  Provider as GraphProvider,
} from "urql";

import styles from "./tailwind.css";

declare global {
  interface Window {
    ENV: any;
  }
}

export const graphClient = createGraphClient({
  url: "https://api.thegraph.com/subgraphs/name/holic/chirp-city",
});

export const meta: MetaFunction = () => {
  return { title: "Chirp City" };
};

export const links = () => [{ rel: "stylesheet", href: styles }];

export const loader = () => ({
  ENV: {
    ETHEREUM_RPC_ENDPOINT: process.env.ETHEREUM_API_ENDPOINT,
    POLYGON_RPC_ENDPOINT: process.env.POLYGON_API_ENDPOINT,
  },
});

const App = () => {
  const data = useLoaderData();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <GraphProvider value={graphClient}>
          <Outlet />
        </GraphProvider>
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
};

export default App;
