import "server-only";

import type { Locale } from "@/i18n/routing";
import { sanityFetch } from "@/lib/cms/fetch";

type MessageDoc = {
  namespace: string;
  entries: { key: string; value: string | null }[];
};

type Messages = Record<string, unknown>;

/** Sets a flattened dot-path key ("a.b.c") into a nested object. */
function setDeep(target: Record<string, unknown>, path: string, value: string) {
  const segments = path.split(".");
  let node = target;
  for (let i = 0; i < segments.length - 1; i += 1) {
    const segment = segments[i];
    if (typeof node[segment] !== "object" || node[segment] === null) {
      node[segment] = {};
    }
    node = node[segment] as Record<string, unknown>;
  }
  node[segments[segments.length - 1]] = value;
}

function deepMerge(base: Messages, overlay: Messages): Messages {
  const result: Messages = { ...base };
  for (const [key, value] of Object.entries(overlay)) {
    const existing = result[key];
    if (
      value &&
      typeof value === "object" &&
      existing &&
      typeof existing === "object"
    ) {
      result[key] = deepMerge(existing as Messages, value as Messages);
    } else if (value !== undefined && value !== null) {
      result[key] = value;
    }
  }
  return result;
}

/**
 * Loads all UI message documents from Sanity for a locale and assembles the
 * nested next-intl messages object. Returns null when the CMS holds no
 * messages (so callers can fall back to the bundled JSON).
 */
export async function getCmsMessages(locale: Locale): Promise<Messages | null> {
  const docs = await sanityFetch<MessageDoc[]>({
    query: `*[_type == "uiMessages"]{
      namespace,
      "entries": coalesce(entries[]{
        key,
        "value": coalesce(value[$locale], value.en)
      }, [])
    }`,
    params: { locale },
    tags: ["uiMessages"],
  });

  if (!docs.length) return null;

  const messages: Messages = {};
  for (const doc of docs) {
    const namespace: Record<string, unknown> = {};
    for (const entry of doc.entries) {
      if (typeof entry.value === "string") {
        setDeep(namespace, entry.key, entry.value);
      }
    }
    messages[doc.namespace] = namespace;
  }
  return messages;
}

export { deepMerge };
