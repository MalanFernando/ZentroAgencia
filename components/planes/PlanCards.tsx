"use client";

import type { PlanFamily } from "@/types/content";
import type { PlansPageState } from "./usePlansPage";
import { Shape } from "@/components/shared/Shape";

function scrollToPricingTable(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function PlanCards({ state }: { state: PlansPageState }) {
  return (
    <section className="plan-cards mx-auto w-full max-w-7xl px-4 py-10 lg:px-7 lg:py-16">
      <div className="grid gap-6 lg:grid-cols-3">
        {state.families.map((family) => (
          <PlanCard key={family.slug} family={family} state={state} />
        ))}
      </div>
    </section>
  );
}

function PlanCard({ family, state }: { family: PlanFamily; state: PlansPageState }) {
  const isSelected = state.selectedFamily === family.slug;
  return (
    <article
      className={`relative rounded-[4px] p-6 transition-colors ${
        isSelected ? "bg-card" : "bg-transparent"
      }`}
    >
      <div className="absolute inset-0 rounded-[4px] ring-1 ring-card" />
      <div className="relative">
        <h2 className="text-xl font-bold text-white">
          Plan <span className="text-red">{family.name}</span>
        </h2>
        <p className="mt-3 text-base text-grey">
          {family.cardDescription}
        </p>
        <button
          type="button"
          onClick={() => {
            state.setSelectedFamily(family.slug);
            scrollToPricingTable("pricing-table");
          }}
          className="btn-light mt-5 w-full py-3"
        >
          Ver los precios
        </button>

        <h3 className="mt-6 text-base font-bold text-white">Detalle base</h3>
        <ul className="mt-3 flex flex-col gap-2">
          {family.rows.map((row) => (
            <li
              key={row.label}
              className="flex items-start gap-2 text-base text-white"
            >
              <Shape name="check" className="mt-0.5 h-[1.1em] w-[1.1em] flex-none" />
              {row.values[0]}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => state.openTerms(family.slug)}
          className="terms mt-4 text-base text-white"
        >
          Ver términos y condiciones
        </button>
      </div>
    </article>
  );
}
