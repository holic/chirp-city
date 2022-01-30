import type { MetaFunction } from "remix";

import { Layout } from "../Layout";
import { Timeline } from "../Timeline";

export const meta: MetaFunction = () => ({
  title: "Chirp City",
});

const HomePage = () => {
  return (
    <Layout>
      <Timeline />
    </Layout>
  );
};

export default HomePage;
