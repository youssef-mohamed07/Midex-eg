"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import type { ContactFormCopy } from "@/lib/cms/types";

type FormState = "idle" | "loading" | "success" | "error";

function pickLabel(cms: string | undefined, fallback: string): string {
  const value = cms?.trim();
  return value || fallback;
}

export function ContactForm({
  title,
  intro,
  copy = {},
}: {
  title?: string;
  intro?: string;
  copy?: ContactFormCopy;
} = {}) {
  const t = useTranslations("contact");
  const searchParams = useSearchParams();
  const defaultItem = searchParams.get("item") ?? "";
  const labels = {
    title: pickLabel(copy.title, title ?? t("sendMessage")),
    intro: pickLabel(copy.intro, intro ?? t("formIntro")),
    quoteFor: pickLabel(copy.quoteFor, t("quoteFor")),
    fullName: pickLabel(copy.fullName, t("fullName")),
    emailLabel: pickLabel(copy.emailLabel, t("emailLabel")),
    phoneLabel: pickLabel(copy.phoneLabel, t("phoneLabel")),
    company: pickLabel(copy.company, t("company")),
    subject: pickLabel(copy.subject, t("subject")),
    productProject: pickLabel(copy.productProject, t("productProject")),
    productPlaceholder: pickLabel(copy.productPlaceholder, t("productPlaceholder")),
    message: pickLabel(copy.message, t("message")),
    messagePlaceholder: pickLabel(copy.messagePlaceholder, t("messagePlaceholder")),
    submit: pickLabel(copy.submit, t("submit")),
    subjectQuote: pickLabel(copy.subjectQuote, t("subjectQuote")),
    subjectProduct: pickLabel(copy.subjectProduct, t("subjectProduct")),
    subjectGeneral: pickLabel(copy.subjectGeneral, t("subjectGeneral")),
    success: pickLabel(copy.success, t("success")),
    error: pickLabel(copy.error, t("error")),
  };

  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });

      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        setState("error");
        setErrorMessage(result.error ?? labels.error);
        return;
      }

      setState("success");
      form.reset();
    } catch {
      setState("error");
      setErrorMessage(labels.error);
    }
  }

  return (
    <div className="midex-contact-form-card">
      <h2 className="mt-3 font-display text-2xl font-bold text-midex-navy sm:text-3xl">
        {labels.title}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-midex-gray/75">{labels.intro}</p>

      {state === "success" && (
        <div className="midex-form-notice midex-form-notice--success" role="status">
          {labels.success}
        </div>
      )}

      {state === "error" && (
        <div className="midex-form-notice midex-form-notice--error" role="alert">
          {errorMessage}
        </div>
      )}

      {defaultItem && (
        <div className="midex-form-context">
          <strong>{labels.quoteFor}</strong> {defaultItem}
        </div>
      )}

      <form className="midex-contact-form" onSubmit={onSubmit}>
        <div className="midex-form-grid">
          <div className="midex-form-field">
            <label htmlFor="name">
              {labels.fullName} <span aria-hidden="true">*</span>
            </label>
            <input id="name" name="name" required autoComplete="name" />
          </div>

          <div className="midex-form-field">
            <label htmlFor="email">
              {labels.emailLabel} <span aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
            />
          </div>

          <div className="midex-form-field">
            <label htmlFor="phone">{labels.phoneLabel}</label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" />
          </div>

          <div className="midex-form-field">
            <label htmlFor="company">{labels.company}</label>
            <input id="company" name="company" autoComplete="organization" />
          </div>

          <div className="midex-form-field midex-form-field--full">
            <label htmlFor="subject">{labels.subject}</label>
            <select id="subject" name="subject" defaultValue="quote">
              <option value="quote">{labels.subjectQuote}</option>
              <option value="product">{labels.subjectProduct}</option>
              <option value="general">{labels.subjectGeneral}</option>
            </select>
          </div>

          <div className="midex-form-field midex-form-field--full">
            <label htmlFor="item">{labels.productProject}</label>
            <input
              id="item"
              name="item"
              defaultValue={defaultItem}
              placeholder={labels.productPlaceholder}
            />
          </div>

          <div className="midex-form-field midex-form-field--full">
            <label htmlFor="message">
              {labels.message} <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              placeholder={labels.messagePlaceholder}
            />
          </div>
        </div>

        <input type="hidden" name="source" value="contact" />

        <div className="midex-form-honeypot" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <button
          type="submit"
          className="group mx-btn mx-btn-primary mt-8 w-full sm:w-auto"
          disabled={state === "loading"}
        >
          {state === "loading" ? "…" : labels.submit}
          {state !== "loading" && <span className="mx-arrow">→</span>}
        </button>
      </form>
    </div>
  );
}
