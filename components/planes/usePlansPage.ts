"use client";

import { useEffect, useMemo, useState } from "react";
import plansData from "@/data/plans";
import type { PlanSlug } from "@/types/content";

export type CatalogTab = "individual" | "adicional";

// La selección de servicios vive solo mientras se está en /planes: no se
// guarda en el navegador. Esta clave era de una versión anterior que sí la
// guardaba; se borra para no dejar datos viejos.
const LEGACY_STORAGE_KEY = "zentro:plans:selected-services";

export function usePlansPage() {
  const [selectedFamily, setSelectedFamily] = useState<PlanSlug>("zentro");
  const [termsFamily, setTermsFamily] = useState<PlanSlug | null>(null);
  const [catalogTab, setCatalogTab] = useState<CatalogTab>("individual");
  const [activeTierIndex, setActiveTierIndex] = useState(0);
  const [selectedServiceIds, setSelectedServiceIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      window.localStorage.removeItem(LEGACY_STORAGE_KEY);
    } catch {
      // Almacenamiento bloqueado (modo privado): no hay nada que limpiar.
    }
  }, []);

  const family = useMemo(
    () => plansData.families.find((f) => f.slug === selectedFamily) ?? plansData.families[0],
    [selectedFamily],
  );

  const catalog = useMemo(
    () => plansData.catalogs.find((c) => c.id === catalogTab) ?? plansData.catalogs[0],
    [catalogTab],
  );

  const allCatalogItems = useMemo(() => {
    const flat: { id: string; title: string; price: number; catalogId: CatalogTab }[] = [];
    for (const c of plansData.catalogs) {
      for (const group of c.groups) {
        for (const item of group.items) {
          if (item.kind === "single") {
            flat.push({ id: item.id, title: item.title, price: item.price, catalogId: c.id });
          } else {
            for (const opt of item.options) {
              flat.push({
                id: opt.id,
                title: `${item.title} — ${opt.label}`,
                price: opt.price,
                catalogId: c.id,
              });
            }
          }
        }
      }
    }
    return flat;
  }, []);

  function toggleService(id: string) {
    setSelectedServiceIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const selectedServices = useMemo(
    () => allCatalogItems.filter((item) => selectedServiceIds.has(item.id)),
    [allCatalogItems, selectedServiceIds],
  );

  const selectedTotal = selectedServices.reduce((sum, item) => sum + item.price, 0);

  return {
    families: plansData.families,
    family,
    selectedFamily,
    setSelectedFamily,
    termsFamily,
    openTerms: setTermsFamily,
    closeTerms: () => setTermsFamily(null),
    terms: termsFamily ? plansData.terms[termsFamily] : null,
    catalogs: plansData.catalogs,
    catalog,
    catalogTab,
    setCatalogTab,
    activeTierIndex,
    setActiveTierIndex,
    selectedServiceIds,
    toggleService,
    selectedServices,
    selectedTotal,
    catalogTitle: catalog.title,
  };
}

export type PlansPageState = ReturnType<typeof usePlansPage>;
