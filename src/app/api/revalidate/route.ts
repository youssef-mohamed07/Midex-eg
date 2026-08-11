import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { routing } from "@/i18n/routing";

type WebhookPayload = {
  _id?: string;
  _type?: string;
};

function getPathsForDocument(type: string): string[] {
  switch (type) {
    case "homePage":
      return routing.locales.map((locale) => `/${locale}`);
    default:
      return [];
  }
}

/**
 * Sanity webhook target: revalidates the cache tag matching the changed
 * document type. Configure the webhook with the same secret as
 * SANITY_REVALIDATE_SECRET and include `_type` in the projection.
 */
export async function POST(request: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      request,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    if (!body?._type) {
      return NextResponse.json({ message: "Missing _type" }, { status: 400 });
    }

    revalidateTag(body._type, { expire: 0 });

    const paths = getPathsForDocument(body._type);
    for (const path of paths) {
      revalidatePath(path);
    }

    return NextResponse.json({ revalidated: true, tag: body._type, paths });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
