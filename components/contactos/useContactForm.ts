"use client";

import { useState, type FormEvent } from "react";
import { buildWhatsAppLink } from "@/lib/config";
import { buildContactFallbackMessage } from "@/lib/messages";
import contactosData from "@/data/contactos.json";

const { form } = contactosData;

export type ContactStatus = "idle" | "submitting" | "success" | "error" | "unavailable";

export function useContactForm() {
  const [interests, setInterests] = useState<string[]>([]);
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [values, setValues] = useState({ name: "", email: "", phone: "", project: "", message: "" });

  function toggleInterest(id: string) {
    setInterests((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  }

  function updateField(field: keyof typeof values, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      project: String(formData.get("project") ?? ""),
      message: String(formData.get("message") ?? ""),
      interests: interests.map((id) => form.interestOptions.find((o) => o.id === id)?.label ?? id),
      company: String(formData.get("company") ?? ""),
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
      setStatus("error");
      setErrorMessage("No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos por WhatsApp.");
    } catch {
      setStatus("error");
      setErrorMessage("No pudimos enviar tu mensaje. Revisa tu conexión e intenta de nuevo.");
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

  return {
    interests,
    toggleInterest,
    status,
    errorMessage,
    updateField,
    handleSubmit,
    whatsappFallbackHref,
    interestOptions: form.interestOptions,
    interestLabel: form.interestLabel,
    submitLabel: form.submitLabel,
  };
}
