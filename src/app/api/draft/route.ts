import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Enables Next.js draft mode so pages render draft content from Sanity.
 * Usage: /api/draft?secret=<SANITY_REVALIDATE_SECRET>&slug=/en
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug") ?? "/en";

  if (!process.env.SANITY_REVALIDATE_SECRET || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  // Only allow same-origin relative redirects.
  redirect(slug.startsWith("/") ? slug : "/");
}
