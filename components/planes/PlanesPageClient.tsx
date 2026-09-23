"use client";

import { PlansHero } from "@/components/planes/PlansHero";
import { PlanCards } from "@/components/planes/PlanCards";
import { PricingTable } from "@/components/planes/PricingTable";
import { CatalogSection } from "@/components/planes/CatalogSection";
import { TermsDialog } from "@/components/planes/TermsDialog";
import { QuoteMascot } from "@/components/planes/QuoteMascot";
import { usePlansPage } from "@/components/planes/usePlansPage";

export function PlanesPageClient() {
  const state = usePlansPage();

  return (
    <>
      <main className="plans-page">
        <PlansHero />
        <PlanCards state={state} />
        <PricingTable state={state} />
        <CatalogSection state={state} />
      </main>

      <TermsDialog terms={state.terms} onClose={state.closeTerms} />
      <QuoteMascot state={state} />
    </>
  );
}
