import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/** Disables draft mode and returns to the site. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") ?? "/";

  const draft = await draftMode();
  draft.disable();

  redirect(slug.startsWith("/") ? slug : "/");
}
