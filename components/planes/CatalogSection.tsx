"use client";

import { useRef } from "react";
import type { CatalogItem } from "@/types/content";
import type { PlansPageState } from "./usePlansPage";
import { Words } from "@/components/shared/motion/Words";

export function CatalogSection({ state }: { state: PlansPageState }) {
  const { catalog } = state;
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function onTabKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const count = state.catalogs.length;
    const nextIndex = e.key === "ArrowRight" ? (index + 1) % count : (index - 1 + count) % count;
    state.setCatalogTab(state.catalogs[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <section className="catalog-section mx-auto w-full max-w-7xl px-4 py-16 lg:px-7">
      <h2 data-reveal="words" className="text-center text-[clamp(1.25rem,0.9rem_+_1.6vw,1.875rem)] font-bold text-white">
        <Words text="¿Buscas algo más personalizado?" />
      </h2>
      <p data-reveal className="mx-auto mt-3 max-w-xl text-center text-base text-grey">
        Selecciona las opciones que se ajusten a tus necesidades
      </p>

      <div data-reveal className="mx-auto mt-10 flex w-full max-w-md justify-center">
        <div
          role="tablist"
          className="flex h-14 w-full max-w-sm items-center gap-1 rounded-full bg-card p-1.5"
        >
          {state.catalogs.map((c, i) => (
            <button
              key={c.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              aria-selected={state.catalogTab === c.id}
              tabIndex={state.catalogTab === c.id ? 0 : -1}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => state.setCatalogTab(c.id)}
              onKeyDown={(e) => onTabKeyDown(e, i)}
              className={`h-full flex-1 cursor-pointer rounded-full text-sm transition-colors ${
                state.catalogTab === c.id ? "bg-white text-bg" : "text-white"
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>
      </div>

      <p className="mx-auto mt-4 max-w-xl text-center text-base text-grey">
        {catalog.description}
      </p>

      <div data-reveal className="relative mt-12 flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:gap-12 lg:before:absolute lg:before:inset-y-0 lg:before:left-1/2 lg:before:w-px lg:before:bg-line lg:before:content-['']">
        {catalog.groups.map((group) => (
          <div key={group.id}>
            {group.heading ? (
              <div className="mb-4">
                <h3 className="text-base font-bold text-white">
                  {group.heading}
                </h3>
                {group.description ? (
                  <p className="mt-1 text-base text-grey">
                    {group.description}
                  </p>
                ) : null}
              </div>
            ) : null}
            <div className="flex flex-col divide-y divide-line/50">
              {group.items.map((item) => (
                <CatalogItemRow key={item.id} item={item} state={state} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CatalogItemRow({ item, state }: { item: CatalogItem; state: PlansPageState }) {
  if (item.kind === "single") {
    const checked = state.selectedServiceIds.has(item.id);
    return (
      <label
        className={`flex cursor-pointer items-start gap-4 px-3 py-5 transition-colors duration-200 ${
          checked ? "bg-card" : ""
        }`}
      >
        <input
          type="checkbox"
          className="cb mt-1.5 h-[18px] w-[18px] flex-none"
          checked={checked}
          onChange={() => state.toggleService(item.id)}
        />
        <span className="flex-1">
          <span className="block text-base font-bold text-white">
            {item.title}
          </span>
          {item.description ? (
            <span className="mt-1 block text-base text-grey">
              {item.description}
            </span>
          ) : null}
          {item.note ? (
            <span className="mt-1 block text-base text-grey">
              {item.note}
            </span>
          ) : null}
        </span>
        <span className="flex-none text-base font-bold text-white">
          ${item.price.toFixed(2)}
        </span>
      </label>
    );
  }

  return (
    <div className="py-5">
      {item.note ? (
        <p className="mb-3 text-base text-grey">{item.note}</p>
      ) : null}
      <div className="flex flex-col gap-1">
        {item.options.map((option) => {
          const checked = state.selectedServiceIds.has(option.id);
          return (
            <label
              key={option.id}
              className={`flex cursor-pointer items-center gap-3 px-3 py-3 transition-colors ${
                checked ? "bg-card" : ""
              }`}
            >
              <input
                type="checkbox"
                className="cb h-[18px] w-[18px] flex-none"
                checked={checked}
                onChange={() => state.toggleService(option.id)}
              />
              <span className="flex-1 text-base text-white">
                {option.label}
              </span>
              <span className="flex-none text-base font-semibold text-white">
                ${option.price.toFixed(2)}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
