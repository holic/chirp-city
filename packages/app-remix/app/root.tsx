import type { MetaFunction } from "remix";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import {
  createClient as createGraphClient,
  Provider as GraphProvider,
} from "urql";

import styles from "./tailwind.css";

export const graphClient = createGraphClient({
  url: "https://api.thegraph.com/subgraphs/name/holic/chirp-city",
});

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

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
      <Scripts />
      {process.env.NODE_ENV === "development" && <LiveReload />}
    </body>
  </html>
);

export default App;
