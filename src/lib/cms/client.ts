import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

function requireConfig(): string {
  if (!projectId) {
    throw new Error(
      "Sanity is not configured — set NEXT_PUBLIC_SANITY_PROJECT_ID (and tokens) in .env.local, then run `npm run seed:sanity`.",
    );
  }
  return projectId;
}

let _client: SanityClient | undefined;
let _previewClient: SanityClient | undefined;

/** Read client for published content (CDN-backed). */
export function getClient(): SanityClient {
  _client ??= createClient({
    projectId: requireConfig(),
    dataset,
    apiVersion,
    useCdn: true,
    perspective: "published",
  });
  return _client;
}

/** Token-authenticated client for draft mode / previews. */
export function getPreviewClient(): SanityClient {
  _previewClient ??= createClient({
    projectId: requireConfig(),
    dataset,
    apiVersion,
    useCdn: false,
    perspective: "drafts",
    token: process.env.SANITY_API_READ_TOKEN,
  });
  return _previewClient;
}
