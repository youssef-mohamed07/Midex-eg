"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

type FormState = "idle" | "loading" | "success" | "error";

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  item: string;
  message: string;
  website: string;
};

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  subject: "quote",
  item: "",
  message: "",
  website: "",
};

export function MultiStepQuoteForm({ size = "default" }: { size?: "default" | "large" }) {
  const t = useTranslations("contact");
  const th = useTranslations("home");
  const isLarge = size === "large";
  const [step, setStep] = useState(0);
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const steps = [th("quoteFormStep1"), th("quoteFormStep2"), th("quoteFormStep3")];

  function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function validateStep(currentStep: number) {
    if (currentStep === 0) {
      if (!formData.name.trim()) {
        setErrorMessage(t("validationName"));
        return false;
      }
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setErrorMessage(t("validationEmail"));
        return false;
      }
    }

    if (currentStep === 2 && !formData.message.trim()) {
      setErrorMessage(t("validationMessage"));
      return false;
    }

    setErrorMessage("");
    return true;
  }

  function goNext() {
    if (!validateStep(step)) return;
    setStep((value) => Math.min(value + 1, steps.length - 1));
  }

  function goBack() {
    setErrorMessage("");
    setStep((value) => Math.max(value - 1, 0));
  }

  async function onSubmit() {
    if (!validateStep(2)) return;

    setState("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        setState("error");
        setErrorMessage(result.error ?? t("error"));
        return;
      }

      setState("success");
      setFormData(initialFormData);
      setStep(0);
    } catch {
      setState("error");
      setErrorMessage(t("error"));
    }
  }

  if (state === "success") {
    return (
      <div className={`midex-multistep-form ${isLarge ? "midex-multistep-form--large" : ""}`}>
        <div className="midex-form-notice midex-form-notice--success" role="status">
          {t("success")}
        </div>
        <button
          type="button"
          className="mx-btn mx-btn-primary mt-6"
          onClick={() => setState("idle")}
        >
          {th("quoteFormAgain")}
        </button>
      </div>
    );
  }

  return (
    <div className={`midex-multistep-form ${isLarge ? "midex-multistep-form--large" : ""}`}>
      <div className="midex-multistep-progress" aria-label={th("quoteFormProgress")}>
        {steps.map((label, index) => {
          const done = index < step;
          const active = index === step;

          return (
            <div key={label} className="midex-multistep-progress__item">
              <div className="flex flex-col items-center gap-2">
                <span
                  className={`midex-multistep-progress__dot ${
                    done ? "is-done" : active ? "is-active" : ""
                  }`}
                >
                  {done ? "✓" : index + 1}
                </span>
                <span
                  className={`hidden text-center text-[11px] font-semibold sm:block ${
                    active || done ? "text-midex-navy" : "text-midex-gray/45"
                  }`}
                >
                  {label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <span
                  className={`midex-multistep-progress__line ${index < step ? "is-done" : ""}`}
                  aria-hidden
                />
              )}
            </div>
          );
        })}
      </div>

      {errorMessage && (
        <div className="midex-form-notice midex-form-notice--error mb-5" role="alert">
          {errorMessage}
        </div>
      )}

      <div className="midex-multistep-panel">
        {step === 0 && (
          <div className="midex-form-grid !mt-0">
            <div className="midex-form-field">
              <label htmlFor="ms-name">
                {t("fullName")} <span aria-hidden="true">*</span>
              </label>
              <input
                id="ms-name"
                name="name"
                value={formData.name}
                onChange={(event) => updateField("name", event.target.value)}
                required
                autoComplete="name"
              />
            </div>
            <div className="midex-form-field">
              <label htmlFor="ms-email">
                {t("emailLabel")} <span aria-hidden="true">*</span>
              </label>
              <input
                id="ms-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(event) => updateField("email", event.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="midex-form-field">
              <label htmlFor="ms-phone">{t("phoneLabel")}</label>
              <input
                id="ms-phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                autoComplete="tel"
              />
            </div>
            <div className="midex-form-field">
              <label htmlFor="ms-company">{t("company")}</label>
              <input
                id="ms-company"
                name="company"
                value={formData.company}
                onChange={(event) => updateField("company", event.target.value)}
                autoComplete="organization"
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="midex-form-grid !mt-0">
            <div className="midex-form-field midex-form-field--full">
              <label htmlFor="ms-subject">{t("subject")}</label>
              <select
                id="ms-subject"
                name="subject"
                value={formData.subject}
                onChange={(event) => updateField("subject", event.target.value)}
              >
                <option value="quote">{t("subjectQuote")}</option>
                <option value="product">{t("subjectProduct")}</option>
                <option value="general">{t("subjectGeneral")}</option>
              </select>
            </div>
            <div className="midex-form-field midex-form-field--full">
              <label htmlFor="ms-item">{t("productProject")}</label>
              <input
                id="ms-item"
                name="item"
                value={formData.item}
                onChange={(event) => updateField("item", event.target.value)}
                placeholder={t("productPlaceholder")}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="midex-form-grid !mt-0">
            <div className="midex-form-field midex-form-field--full">
              <label htmlFor="ms-message">
                {t("message")} <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="ms-message"
                name="message"
                rows={isLarge ? 7 : 6}
                value={formData.message}
                onChange={(event) => updateField("message", event.target.value)}
                required
                placeholder={t("messagePlaceholder")}
              />
            </div>
          </div>
        )}
      </div>

      <div className="midex-form-honeypot" aria-hidden="true">
        <label htmlFor="ms-website">Website</label>
        <input
          id="ms-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={(event) => updateField("website", event.target.value)}
        />
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          className="mx-btn mx-btn-ghost justify-center sm:min-w-[7.5rem]"
          onClick={goBack}
          disabled={step === 0 || state === "loading"}
        >
          {th("quoteFormBack")}
        </button>

        {step < steps.length - 1 ? (
          <button type="button" className="group mx-btn mx-btn-primary justify-center sm:min-w-[9rem]" onClick={goNext}>
            {th("quoteFormNext")}
            <span className="mx-arrow">→</span>
          </button>
        ) : (
          <button
            type="button"
            className="group mx-btn mx-btn-mint justify-center sm:min-w-[9rem]"
            onClick={onSubmit}
            disabled={state === "loading"}
          >
            {state === "loading" ? "…" : th("quoteFormSubmit")}
            {state !== "loading" && <span className="mx-arrow">→</span>}
          </button>
        )}
      </div>
    </div>
  );
}
