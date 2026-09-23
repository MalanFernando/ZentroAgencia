import type { PlanFamily, PlanTier } from "@/types/content";

function currency(value: number) {
  return `$${value.toFixed(2).replace(/\.00$/, "")}`;
}

export function buildPlanInquiryMessage(family: PlanFamily, tier: PlanTier) {
  return [
    `Hola Zentro, quiero contratar el *${tier.label}* (${family.name}).`,
    `Inversión: ${currency(tier.price)}/mes.`,
    "",
    "¿Podrían darme los siguientes pasos para arrancar?",
  ].join("\n");
}

export function buildContactFallbackMessage(input: {
  name: string;
  phone: string;
  project?: string;
  message: string;
}) {
  return [
    `Hola Zentro, soy ${input.name} (${input.phone}).`,
    input.project ? `Proyecto: ${input.project}` : null,
    "",
    input.message,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export function buildCatalogQuoteMessage(
  catalogTitle: string,
  items: { title: string; price: number }[],
  total: number,
) {
  const lines = items.map((item) => `• ${item.title} — ${currency(item.price)}`);
  return [
    `Hola Zentro, quiero cotizar estos servicios de *${catalogTitle}*:`,
    "",
    ...lines,
    "",
    `Total estimado: ${currency(total)}`,
  ].join("\n");
}
