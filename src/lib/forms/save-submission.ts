import { getWriteClient } from "@/lib/cms/write-client";

export type FormSubmissionInput = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  subjectLabel: string;
  item?: string;
  message: string;
  source: "contact" | "quote";
  locale: string;
};

export async function saveFormSubmission(input: FormSubmissionInput): Promise<string | null> {
  const client = getWriteClient();
  if (!client) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[form] SANITY_API_WRITE_TOKEN not set — submission saved to console only (see /studio after configuring token).",
      );
    }
    return null;
  }

  const doc = await client.create({
    _type: "formSubmission",
    name: input.name,
    email: input.email,
    phone: input.phone ?? "",
    company: input.company ?? "",
    subject: input.subject,
    subjectLabel: input.subjectLabel,
    item: input.item ?? "",
    message: input.message,
    source: input.source,
    locale: input.locale,
    status: "new",
    submittedAt: new Date().toISOString(),
  });

  return doc._id;
}
