import { config as loadEnv } from "dotenv";
import { createClient } from "@sanity/client";

// Ensure environment variables are loaded properly
loadEnv({ path: ".env.local", override: true });
loadEnv({ path: ".env" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_READ_TOKEN;

console.log("--- Sanity Debug Info ---");
console.log("projectId:", projectId);
console.log("dataset:", dataset);
console.log("API version: 2024-01-01");
console.log("token exists:", !!token);
console.log("token length:", token ? token.length : 0);

if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: true,
  perspective: "published",
});

async function run() {
  console.log("\n--- Testing GET request ---");
  try {
    const result = await client.fetch(`*[_type == "siteSettings"][0]{_id}`);
    console.log("GET successful, found ID:", result?._id);
  } catch (error: any) {
    console.error("GET failed with status:", error.statusCode);
    console.error("Error message:", error.message);
  }
}

run().catch(console.error);
