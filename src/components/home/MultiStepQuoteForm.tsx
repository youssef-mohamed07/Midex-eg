"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

type FormState = "idle" | "loading" | "success" | "error";

type FormData = {
  projectType: string;
  industry: string;
  location: string;
  timeline: string;
  message: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string;
};

const initialFormData: FormData = {
  projectType: "",
  industry: "",
  location: "",
  timeline: "",
  message: "",
  name: "",
  company: "",
  email: "",
  phone: "",
  website: "",
};

const PROJECT_TYPE_KEYS = [
  "quoteFormProjectTypeModification",
  "quoteFormProjectTypeWelding",
  "quoteFormProjectTypeSystem",
  "quoteFormProjectTypePiping",
  "quoteFormProjectTypeSourcing",
  "quoteFormProjectTypeOther",
] as const;

const INDUSTRY_KEYS = [
  "quoteFormIndustryPharma",
  "quoteFormIndustryFood",
  "quoteFormIndustryBiotech",
  "quoteFormIndustryCosmetics",
  "quoteFormIndustryOther",
] as const;

const STEP_HINT_KEYS = [
  "quoteFormStep1Hint",
  "quoteFormStep2Hint",
  "quoteFormStep3Hint",
  "quoteFormStep4Hint",
] as const;

function CheckIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function OptionGrid({
  name,
  value,
  options,
  onChange,
}: {
  name: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="midex-form-option-grid" role="radiogroup">
      {options.map((option) => {
        const selected = value === option.value;

        return (
          <label
            key={option.value}
            className={`midex-form-option ${selected ? "is-selected" : ""}`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={selected}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            <span className="midex-form-option__radio" aria-hidden />
            <span className="midex-form-option__label">{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}

export function MultiStepQuoteForm({ size = "default" }: { size?: "default" | "large" }) {
  const t = useTranslations("contact");
  const th = useTranslations("home");
  const isLarge = size === "large";
  const [step, setStep] = useState(0);
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const steps = [
    th("quoteFormStep1"),
    th("quoteFormStep2"),
    th("quoteFormStep3"),
    th("quoteFormStep4"),
  ];

  const stepQuestions = [
    th("quoteFormStep1Question"),
    th("quoteFormStep2Question"),
    th("quoteFormStep3Question"),
    th("quoteFormStep4Question"),
  ];

  const stepHints = STEP_HINT_KEYS.map((key) => th(key));

  const projectTypeOptions = useMemo(
    () =>
      PROJECT_TYPE_KEYS.map((key) => ({
        value: key,
        label: th(key),
      })),
    [th],
  );

  const industryOptions = useMemo(
    () =>
      INDUSTRY_KEYS.map((key) => ({
        value: key,
        label: th(key),
      })),
    [th],
  );

  function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function getLabel(options: { value: string; label: string }[], value: string) {
    return options.find((option) => option.value === value)?.label ?? value;
  }

  function validateStep(currentStep: number) {
    if (currentStep === 0 && !formData.projectType) {
      setErrorMessage(th("quoteFormValidationProjectType"));
      return false;
    }

    if (currentStep === 1 && !formData.industry) {
      setErrorMessage(th("quoteFormValidationIndustry"));
      return false;
    }

    if (currentStep === 2 && !formData.message.trim()) {
      setErrorMessage(th("quoteFormValidationDescription"));
      return false;
    }

    if (currentStep === 3) {
      if (!formData.name.trim()) {
        setErrorMessage(t("validationName"));
        return false;
      }
      if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setErrorMessage(t("validationEmail"));
        return false;
      }
    }

    setErrorMessage("");
    return true;
  }

  function selectAndAdvance(key: "projectType" | "industry", value: string) {
    updateField(key, value);
    setErrorMessage("");
    window.setTimeout(() => {
      setStep((current) => Math.min(current + 1, steps.length - 1));
    }, 250);
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
    if (!validateStep(3)) return;

    setState("loading");
    setErrorMessage("");

    const projectTypeLabel = getLabel(projectTypeOptions, formData.projectType);
    const industryLabel = getLabel(industryOptions, formData.industry);
    const composedMessage = [
      `Project type: ${projectTypeLabel}`,
      `Industry: ${industryLabel}`,
      formData.location ? `Location: ${formData.location}` : "",
      formData.timeline ? `Timeline: ${formData.timeline}` : "",
      "",
      "Project description:",
      formData.message.trim(),
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          subject: "quote",
          source: "quote",
          item: projectTypeLabel,
          message: composedMessage,
          website: formData.website,
        }),
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
        <div className="midex-form-success" role="status">
          <span className="midex-form-success__icon">
            <CheckIcon className="h-7 w-7" />
          </span>
          <p className="midex-form-success__message">{th("quoteFormSuccess")}</p>
          <button
            type="button"
            className="mx-btn mx-btn-primary mt-8"
            onClick={() => setState("idle")}
          >
            {th("quoteFormAgain")}
          </button>
        </div>
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
                  {done ? <CheckIcon className="h-4 w-4" /> : index + 1}
                </span>
                <span
                  className={`hidden max-w-[6.5rem] text-center text-[11px] font-semibold leading-tight sm:block ${
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

      <div key={step} className="midex-multistep-panel midex-form-panel-enter">
        <div className="midex-form-step-header">
          <h3 className="midex-form-step-header__title">{stepQuestions[step]}</h3>
          <p className="midex-form-step-header__hint">{stepHints[step]}</p>
        </div>

        {errorMessage && (
          <div className="midex-form-notice midex-form-notice--error !mt-0 mb-5" role="alert">
            {errorMessage}
          </div>
        )}

        {step === 0 && (
          <OptionGrid
            name="projectType"
            value={formData.projectType}
            options={projectTypeOptions}
            onChange={(value) => selectAndAdvance("projectType", value)}
          />
        )}

        {step === 1 && (
          <OptionGrid
            name="industry"
            value={formData.industry}
            options={industryOptions}
            onChange={(value) => selectAndAdvance("industry", value)}
          />
        )}

        {step === 2 && (
          <div className="midex-form-grid !mt-0">
            <div className="midex-form-field">
              <label htmlFor="ms-location">{th("quoteFormLocation")}</label>
              <input
                id="ms-location"
                name="location"
                value={formData.location}
                onChange={(event) => updateField("location", event.target.value)}
                placeholder={th("quoteFormLocationPlaceholder")}
              />
            </div>
            <div className="midex-form-field">
              <label htmlFor="ms-timeline">{th("quoteFormTimeline")}</label>
              <input
                id="ms-timeline"
                name="timeline"
                value={formData.timeline}
                onChange={(event) => updateField("timeline", event.target.value)}
                placeholder={th("quoteFormTimelinePlaceholder")}
              />
            </div>
            <div className="midex-form-field midex-form-field--full">
              <label htmlFor="ms-message">
                {th("quoteFormDescription")} <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="ms-message"
                name="message"
                rows={isLarge ? 6 : 5}
                value={formData.message}
                onChange={(event) => updateField("message", event.target.value)}
                placeholder={th("quoteFormDescriptionPlaceholder")}
                required
              />
            </div>
          </div>
        )}

        {step === 3 && (
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
              <label htmlFor="ms-company">{t("company")}</label>
              <input
                id="ms-company"
                name="company"
                value={formData.company}
                onChange={(event) => updateField("company", event.target.value)}
                autoComplete="organization"
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

      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button
            type="button"
            className="mx-btn mx-btn-ghost justify-center sm:min-w-[7.5rem]"
            onClick={goBack}
            disabled={state === "loading"}
          >
            {th("quoteFormBack")}
          </button>
        ) : (
          <span />
        )}

        {step < steps.length - 1 ? (
          <button
            type="button"
            className="group mx-btn mx-btn-primary justify-center sm:min-w-[9rem]"
            onClick={goNext}
          >
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
