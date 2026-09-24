"use client";

import { useState, type FormEvent } from "react";
import { buildWhatsAppLink } from "@/lib/config";
import { buildContactFallbackMessage } from "@/lib/messages";
import { contactSchema } from "@/lib/validation";
import contactosData from "@/data/contactos.json";

const { form } = contactosData;

export type ContactStatus = "idle" | "submitting" | "success" | "error" | "unavailable";

const FIELDS = ["name", "email", "phone", "project", "message"] as const;
export type ContactField = (typeof FIELDS)[number];
type Values = Record<ContactField, string>;
type Errors = Partial<Record<ContactField, string>>;

/** Primer mensaje de error de un campo según las mismas reglas que la API. */
function fieldError(field: ContactField, value: string): string | undefined {
  const result = contactSchema.shape[field].safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

export function useContactForm() {
  const [interests, setInterests] = useState<string[]>([]);
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [values, setValues] = useState<Values>({ name: "", email: "", phone: "", project: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  // Un campo muestra su error recién cuando el usuario salió de él o intentó enviar.
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});

  function toggleInterest(id: string) {
    setInterests((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  }

  function updateField(field: ContactField, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (touched[field]) setErrors((e) => ({ ...e, [field]: fieldError(field, value) }));
  }

  function blurField(field: ContactField) {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((e) => ({ ...e, [field]: fieldError(field, values[field]) }));
  }

  function focusField(formEl: HTMLFormElement, field: ContactField) {
    formEl.querySelector<HTMLElement>(`[name="${field}"]`)?.focus();
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    setErrorMessage(null);

    const nextErrors: Errors = {};
    for (const field of FIELDS) {
      const error = fieldError(field, values[field]);
      if (error) nextErrors[field] = error;
    }
    setErrors(nextErrors);
    setTouched(Object.fromEntries(FIELDS.map((f) => [f, true])));

    const firstInvalid = FIELDS.find((f) => nextErrors[f]);
    if (firstInvalid) {
      setStatus("idle");
      focusField(formEl, firstInvalid);
      return;
    }

    setStatus("submitting");
    const payload = {
      ...values,
      interests: interests.map((id) => form.interestOptions.find((o) => o.id === id)?.label ?? id),
      company: String(new FormData(formEl).get("company") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus("success");
        return;
      }

      const data = await res.json().catch(() => null);
      if (res.status === 503 && data?.error === "email_not_configured") {
        setStatus("unavailable");
        return;
      }
      // Si la API igual rechaza algún dato, se marca en su campo.
      if (res.status === 422 && data?.fieldErrors) {
        const serverErrors = data.fieldErrors as Partial<Record<string, string[]>>;
        const mapped: Errors = {};
        for (const field of FIELDS) {
          const message = serverErrors[field]?.[0];
          if (message) mapped[field] = message;
        }
        const first = FIELDS.find((f) => mapped[f]);
        if (first) {
          setErrors(mapped);
          setStatus("idle");
          focusField(formEl, first);
          return;
        }
      }
      setStatus("error");
      setErrorMessage(
        res.status === 429
          ? "Enviaste varios mensajes seguidos. Espera unos minutos e inténtalo de nuevo, o escríbenos por WhatsApp."
          : "No pudimos enviar tu mensaje. Intenta de nuevo en unos minutos o escríbenos por WhatsApp.",
      );
    } catch {
      setStatus("error");
      setErrorMessage("No pudimos enviar tu mensaje. Revisa tu conexión a internet e intenta de nuevo.");
    }
  }

  const whatsappFallbackHref = buildWhatsAppLink(
    buildContactFallbackMessage({
      name: values.name || "—",
      phone: values.phone || "—",
      project: values.project,
      message: values.message || "Quiero más información.",
    }),
  );

  const hasFieldErrors = FIELDS.some((f) => touched[f] && errors[f]);

  return {
    values,
    errors,
    touched,
    hasFieldErrors,
    interests,
    toggleInterest,
    status,
    errorMessage,
    updateField,
    blurField,
    handleSubmit,
    whatsappFallbackHref,
    interestOptions: form.interestOptions,
    interestLabel: form.interestLabel,
    submitLabel: form.submitLabel,
  };
}
