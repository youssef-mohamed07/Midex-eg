import { NextRequest, NextResponse } from "next/server";
import { getSiteContact } from "@/lib/cms";
import { deepMerge, getCmsMessages } from "@/lib/cms/messages";
import { saveFormSubmission } from "@/lib/forms/save-submission";
import { routing, type Locale } from "@/i18n/routing";

const FALLBACK_RECIPIENT = "sales@midex-eg.com";

function resolveLocale(request: NextRequest): Locale {
  const referer = request.headers.get("referer") ?? "";
  const match = referer.match(/\/(en|ar|de)(\/|$)/);
  if (match && routing.locales.includes(match[1] as Locale)) {
    return match[1] as Locale;
  }

  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && routing.locales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }

  return routing.defaultLocale;
}

type ContactStrings = {
  validationName: string;
  validationEmail: string;
  validationMessage: string;
  sendError: string;
  subjects: Record<string, string>;
};

const fallbackStrings: ContactStrings = {
  validationName: "Please enter your name.",
  validationEmail: "Please enter a valid email address.",
  validationMessage: "Please enter your message.",
  sendError: "Failed to send message.",
  subjects: {
    quote: "Quote request",
    product: "Product inquiry",
    general: "General inquiry",
  },
};

async function getContactStrings(locale: Locale): Promise<ContactStrings> {
  try {
    const bundled = (await import(`../../../../messages/${locale}.json`)).default as Record<
      string,
      unknown
    >;
    const cms = await getCmsMessages(locale);
    const messages = cms ? deepMerge(bundled, cms) : bundled;
    const contact = (messages.contact ?? {}) as Record<string, string>;

    return {
      validationName: contact.validationName ?? fallbackStrings.validationName,
      validationEmail: contact.validationEmail ?? fallbackStrings.validationEmail,
      validationMessage: contact.validationMessage ?? fallbackStrings.validationMessage,
      sendError: fallbackStrings.sendError,
      subjects: {
        quote: contact.subjectQuote ?? fallbackStrings.subjects.quote,
        product: contact.subjectProduct ?? fallbackStrings.subjects.product,
        general: contact.subjectGeneral ?? fallbackStrings.subjects.general,
      },
    };
  } catch {
    return fallbackStrings;
  }
}

export async function POST(request: NextRequest) {
  const locale = resolveLocale(request);
  const strings = await getContactStrings(locale);

  try {
    const body = (await request.json()) as Record<string, string>;

    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();

    if (!name) {
      return NextResponse.json(
        { ok: false, error: strings.validationName },
        { status: 400 },
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: strings.validationEmail },
        { status: 400 },
      );
    }

    if (!message) {
      return NextResponse.json(
        { ok: false, error: strings.validationMessage },
        { status: 400 },
      );
    }

    const subjectLabel = strings.subjects[body.subject] ?? strings.subjects.general;
    const source: "contact" | "quote" =
      body.source === "quote" || body.source === "contact" ? body.source : "contact";

    try {
      await saveFormSubmission({
        name,
        email,
        phone: body.phone?.trim(),
        company: body.company?.trim(),
        subject: body.subject ?? "general",
        subjectLabel,
        item: body.item?.trim(),
        message,
        source,
        locale,
      });
    } catch (error) {
      console.error("[form] Failed to save submission to Sanity:", error);
    }

    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      body.phone ? `Phone: ${body.phone}` : "",
      body.company ? `Company: ${body.company}` : "",
      `Subject: ${subjectLabel}`,
      body.item ? `Product / item: ${body.item}` : "",
      "",
      "Message:",
      message,
    ].filter(Boolean);

    const recipient = await getSiteContact()
      .then((contact) => contact.email || FALLBACK_RECIPIENT)
      .catch(() => FALLBACK_RECIPIENT);

    const mailSubject = `[Midex] ${subjectLabel}${body.item ? ` — ${body.item}` : ""}`;
    const mailBody = lines.join("\n");

    if (process.env.RESEND_API_KEY) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM ?? "Midex Website <onboarding@resend.dev>",
          to: [recipient],
          reply_to: email,
          subject: mailSubject,
          text: mailBody,
        }),
      });
    } else {
      console.log("--- CONTACT FORM (dev mode) ---");
      console.log(`To: ${recipient}`);
      console.log(`Subject: ${mailSubject}`);
      console.log(mailBody);
      console.log("-------------------------------");
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: strings.sendError },
      { status: 500 },
    );
  }
}
