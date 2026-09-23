"use client";

import { buildWhatsAppLink } from "@/lib/config";
import { buildPlanInquiryMessage } from "@/lib/messages";
import type { PlansPageState } from "./usePlansPage";

export function PricingTable({ state }: { state: PlansPageState }) {
  const { family, activeTierIndex, setActiveTierIndex } = state;

  return (
    <section
      id="pricing-table"
      className="pricing-table mx-auto w-full max-w-7xl scroll-mt-6 px-4 py-10 lg:px-7 lg:py-16"
    >
      <h2 className="text-[clamp(1.25rem,0.9rem_+_1.6vw,1.875rem)] font-bold text-white">
        Plan <span className="text-red">{family.name}</span>
      </h2>
      <p className="mt-2 text-base text-grey">
        Detalle del plan seleccionado
      </p>

      <div
        role="tablist"
        aria-label="Duración del plan"
        className="mt-8 flex gap-3 overflow-x-auto no-scrollbar lg:hidden"
      >
        {family.tiers.map((tier, i) => {
          const active = i === activeTierIndex;
          return (
            <button
              key={tier.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActiveTierIndex(i)}
              className={`flex-1 rounded-[4px] border px-3 py-3 text-left text-sm transition-colors ${
                active
                  ? "border-white bg-card text-white"
                  : "border-line/60 text-grey"
              }`}
            >
              <span className={active ? "text-white" : ""}>
                <b className="price">${tier.price}</b>
                <span className="unit"> / tiempo estimado</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 lg:mt-10">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-line/60">
              <th className="pb-4 text-left text-base font-bold text-white">
                Características
              </th>
              {family.tiers.map((tier, i) => (
                <th
                  key={tier.id}
                  className={`pb-4 text-center ${
                    i !== activeTierIndex ? "hidden lg:table-cell" : ""
                  }`}
                >
                  <p className="text-base font-bold text-white">
                    <b className="price">${tier.price}</b>
                  </p>
                  <p className="text-base text-grey">/ tiempo estimado</p>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {family.rows.map((row) => (
              <tr key={row.label} className="border-b border-line/30">
                <td className="py-4 text-base font-bold text-white">
                  {row.label}
                </td>
                {row.values.map((value, i) => (
                  <td
                    key={i}
                    className={`py-4 px-2 text-base text-white ${
                      i !== activeTierIndex ? "hidden lg:table-cell" : ""
                    }`}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

          <tfoot className="hidden lg:table-footer-group">
            <tr>
              <td className="pt-6" />
              {family.tiers.map((tier) => (
                <td key={tier.id} className="pt-6 lg:px-2">
                  <a
                    className="btn-light w-full py-3 text-center"
                    href={buildWhatsAppLink(
                      buildPlanInquiryMessage(family, tier),
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contratar plan
                  </a>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>

        {/* lg:hidden en un wrapper: el display de .btn-light (sin layer) le ganaría en el <a>. */}
        <div className="mt-6 lg:hidden">
          <a
            className="btn-light w-full py-3 text-center"
            href={buildWhatsAppLink(
              buildPlanInquiryMessage(family, family.tiers[activeTierIndex]),
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            Contratar plan
          </a>
        </div>
      </div>
    </section>
  );
}
