/** Shared helpers for Sanity localeString / localeText / localeStringList. */

export type LocaleString = {
  _type: "localeString";
  en?: string;
  ar?: string;
  de?: string;
};

export type LocaleText = {
  _type: "localeText";
  en?: string;
  ar?: string;
  de?: string;
};

export type LocaleStringList = {
  _type: "localeStringList";
  en?: string[];
  ar?: string[];
  de?: string[];
};

/** Seed all three locales. Missing ar/de fall back to the English source. */
export function localeString(
  en: string,
  ar: string = en,
  de: string = en,
): LocaleString {
  return { _type: "localeString", en, ar, de };
}

export function localeText(
  en: string,
  ar: string = en,
  de: string = en,
): LocaleText {
  return { _type: "localeText", en, ar, de };
}

export function localeStringList(
  en: string[],
  ar: string[] = en,
  de: string[] = en,
): LocaleStringList {
  return { _type: "localeStringList", en, ar, de };
}

const LOCALE_SCALAR = new Set(["localeString", "localeText"]);
const LOCALE_LIST = "localeStringList";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Deep-walk a Sanity document and fill missing `ar` / `de` from `en`
 * on every locale* object. Returns whether anything changed.
 */
export function fillMissingLocales(value: unknown): boolean {
  let changed = false;

  if (Array.isArray(value)) {
    for (const item of value) {
      if (fillMissingLocales(item)) changed = true;
    }
    return changed;
  }

  if (!isPlainObject(value)) return false;

  const type = value._type;
  if (typeof type === "string" && LOCALE_SCALAR.has(type)) {
    const en = typeof value.en === "string" ? value.en : undefined;
    if (en !== undefined) {
      if (typeof value.ar !== "string" || value.ar.length === 0) {
        value.ar = en;
        changed = true;
      }
      if (typeof value.de !== "string" || value.de.length === 0) {
        value.de = en;
        changed = true;
      }
    }
    return changed;
  }

  if (type === LOCALE_LIST) {
    const en = Array.isArray(value.en) ? (value.en as string[]) : undefined;
    if (en) {
      if (!Array.isArray(value.ar) || value.ar.length === 0) {
        value.ar = [...en];
        changed = true;
      }
      if (!Array.isArray(value.de) || value.de.length === 0) {
        value.de = [...en];
        changed = true;
      }
    }
    return changed;
  }

  for (const key of Object.keys(value)) {
    if (key.startsWith("_")) continue;
    if (fillMissingLocales(value[key])) changed = true;
  }

  return changed;
}
