"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

type FormState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("contact");
  const searchParams = useSearchParams();
  const defaultItem = searchParams.get("item") ?? "";

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
        setErrorMessage(result.error ?? t("error"));
        return;
      }

      setState("success");
      form.reset();
    } catch {
      setState("error");
      setErrorMessage(t("error"));
    }
  }

  return (
    <div className="midex-contact-form-card">
      <h2 className="font-display text-2xl font-bold text-midex-navy">
        {t("sendMessage")}
      </h2>
      <p className="mt-2 text-sm text-midex-gray/80">{t("formIntro")}</p>

      {state === "success" && (
        <div className="midex-form-notice midex-form-notice--success" role="status">
          {t("success")}
        </div>
      )}

      {state === "error" && (
        <div className="midex-form-notice midex-form-notice--error" role="alert">
          {errorMessage}
        </div>
      )}

      {defaultItem && (
        <div className="midex-form-context">
          <strong>{t("quoteFor")}</strong> {defaultItem}
        </div>
      )}

      <form className="midex-contact-form" onSubmit={onSubmit}>
        <div className="midex-form-grid">
          <div className="midex-form-field">
            <label htmlFor="name">
              {t("fullName")} <span aria-hidden="true">*</span>
            </label>
            <input id="name" name="name" required autoComplete="name" />
          </div>

          <div className="midex-form-field">
            <label htmlFor="email">
              {t("emailLabel")} <span aria-hidden="true">*</span>
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
            <label htmlFor="phone">{t("phoneLabel")}</label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" />
          </div>

          <div className="midex-form-field">
            <label htmlFor="company">{t("company")}</label>
            <input id="company" name="company" autoComplete="organization" />
          </div>

          <div className="midex-form-field midex-form-field--full">
            <label htmlFor="subject">{t("subject")}</label>
            <select id="subject" name="subject" defaultValue="quote">
              <option value="quote">{t("subjectQuote")}</option>
              <option value="product">{t("subjectProduct")}</option>
              <option value="general">{t("subjectGeneral")}</option>
            </select>
          </div>

          <div className="midex-form-field midex-form-field--full">
            <label htmlFor="item">{t("productProject")}</label>
            <input
              id="item"
              name="item"
              defaultValue={defaultItem}
              placeholder={t("productPlaceholder")}
            />
          </div>

          <div className="midex-form-field midex-form-field--full">
            <label htmlFor="message">
              {t("message")} <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              placeholder={t("messagePlaceholder")}
            />
          </div>
        </div>

        <div className="midex-form-honeypot" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <button
          type="submit"
          className="mx-btn mx-btn-primary mt-6 w-full sm:w-auto"
          disabled={state === "loading"}
        >
          {state === "loading" ? "…" : `${t("submit")} →`}
        </button>
      </form>
    </div>
  );
}
