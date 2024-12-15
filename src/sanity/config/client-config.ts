import { ClientPerspective } from "next-sanity";

type Config = {
  projectId: string;
  dataset: string;
  apiVersion: string;
  useCdn: boolean;
  token: string;
  perspective: ClientPerspective;
};

const config: Config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: "production",
  apiVersion: "2023-03-09",
  useCdn: false,
  token: process.env.SANITY_PROJECT_API_TOKEN!,
  perspective: "published",
};

export default config;
