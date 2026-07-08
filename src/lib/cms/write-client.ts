import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

let _writeClient: SanityClient | undefined;

/** Token-authenticated client for server-side mutations (form submissions, etc.). */
export function getWriteClient(): SanityClient | null {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token || !projectId) {
    return null;
  }

  _writeClient ??= createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
  });

  return _writeClient;
}
