/** Shared GROQ projection fragments. */

/** Resolves an imageWithAlt field to a CDN URL (Next.js Image handles sizing/format). */
export const imageUrl = (field = "image") =>
  `coalesce(${field}.asset->url, ${field}.sourcePath, "")`;

/** Localized string/text with English fallback. */
export const loc = (field: string, fallback = '""') =>
  `coalesce(${field}[$locale], ${field}.en, ${fallback})`;

/** Localized string that may legitimately be absent. */
export const locOptional = (field: string) =>
  `coalesce(${field}[$locale], ${field}.en)`;

/** Localized string list with English fallback. */
export const locList = (field: string) =>
  `coalesce(${field}[$locale], ${field}.en, [])`;

/** Principles section projection. */
export const principlesProjection = (field = "principles") => `${field}{
  "title": ${loc("title")},
  "intro": ${loc("intro")},
  "items": items[]{
    "id": key,
    "title": ${loc("title")},
    "text": ${loc("text")},
    "image": ${imageUrl("image")}
  }
}`;

/** Workflow section projection. */
export const workflowProjection = (field = "workflow") => `${field}{
  "title": ${loc("title")},
  "intro": ${loc("intro")},
  "steps": steps[]{
    "id": key,
    "title": ${loc("title")},
    "text": ${loc("text")},
    "image": ${imageUrl("image")}
  }
}`;

/** FAQ section projection. */
export const faqProjection = (field = "faq") => `${field}{
  "title": ${loc("title")},
  "intro": ${loc("intro")},
  "items": items[]{
    "id": key,
    "question": ${loc("question")},
    "answer": ${loc("answer")}
  }
}`;
