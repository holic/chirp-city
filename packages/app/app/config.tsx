import { useLoaderData } from "remix";
import invariant from "tiny-invariant";

// Remix doesn't natively support environment variables and expects you to
// figure them out yourself. This provides a bit of a "shim" so that you can
// import `config` and get the same values server-side and client-side.
//
// DO NOT use secret keys here as these values are injected into the DOM.

const requireEnv = (key: string) => {
  const value = process.env[key];
  invariant(value, `Missing expected environment variable: ${key}`);
  return value;
};

const getConfig = () => ({
  ETHEREUM_RPC_URL: requireEnv("ETHEREUM_RPC_URL"),
  POLYGON_RPC_URL: requireEnv("POLYGON_RPC_URL"),
});

declare global {
  interface Window {
    CONFIG: ReturnType<typeof getConfig>;
  }
}

export const config =
  typeof window !== "undefined" ? window.CONFIG : getConfig();

export const configLoader = () => ({ CONFIG: config });

export const Config = () => {
  const data = useLoaderData<ReturnType<typeof configLoader>>();
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `window.CONFIG = ${JSON.stringify(data.CONFIG)}`,
      }}
    />
  );
};
