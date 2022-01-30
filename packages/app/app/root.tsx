import {
  Links,
  LiveReload,
  Meta,
  MetaFunction,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import {
  createClient as createGraphClient,
  Provider as GraphProvider,
} from "urql";

import { Config, config, configLoader } from "./config";
import styles from "./tailwind.css";

export const graphClient = createGraphClient({
  url: config.SUBGRAPH_URL,
});

export const meta: MetaFunction = () => {
  return { title: "Chirp City" };
};

export const links = () => [{ rel: "stylesheet", href: styles }];

export const loader = () => ({
  ...configLoader(),
});

const App = () => (
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
      <Config />
      <Scripts />
      {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
    </body>
  </html>
);

export default App;
