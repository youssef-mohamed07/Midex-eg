import { NextRequest, NextResponse } from "next/server";

const RECIPIENT = "sales@midex-eg.com";

export async function POST(request: NextRequest) {
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
        { ok: false, error: "Please enter your name." },
        { status: 400 },
      );
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (!message) {
      return NextResponse.json(
        { ok: false, error: "Please enter your message." },
        { status: 400 },
      );
    }

    const subjectLabels: Record<string, string> = {
      quote: "Quote request",
      product: "Product inquiry",
      general: "General inquiry",
    };

    const subjectLabel = subjectLabels[body.subject] ?? subjectLabels.general;
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
          to: [RECIPIENT],
          reply_to: email,
          subject: mailSubject,
          text: mailBody,
        }),
      });
    } else {
      console.log("--- CONTACT FORM (dev mode) ---");
      console.log(`To: ${RECIPIENT}`);
      console.log(`Subject: ${mailSubject}`);
      console.log(mailBody);
      console.log("-------------------------------");
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to send message." },
      { status: 500 },
    );
  }
}
