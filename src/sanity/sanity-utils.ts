import { createClient, QueryParams } from "next-sanity";
import clientConfig from "./config/client-config";

export const client =
  createClient(clientConfig);

export async function sanityFetch<QueryResponse>({
  query,
  qParams,
  tags,
}: {
  query: string;
  qParams: QueryParams;
  tags: string[];
}): Promise<QueryResponse> {
  return client.fetch<QueryResponse>(query, qParams, {
    // disable cache when hook secret is undefined for development only.
    cache: process.env.SANITY_HOOOK_SECRET ? "force-cache" : "no-cache",
    next: { tags },
  });
}
