import type { Locale } from "@/i18n/routing";

/** Shared CMS field primitives — reusable when connecting Payload, Sanity, etc. */
export type CmsFieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "select"
  | "image"
  | "group"
  | "array";

export type CmsField = {
  name: string;
  type: CmsFieldType;
  label: string;
  required?: boolean;
  localized?: boolean;
  maxLength?: number;
  description?: string;
  options?: { label: string; value: string }[];
  fields?: CmsField[];
};

export type CmsCollection = {
  slug: string;
  labels: { singular: string; plural: string };
  description?: string;
  fields: CmsField[];
};

export type LocalizedValue<T> = Record<Locale, T>;
