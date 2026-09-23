"use client";

import { useState } from "react";

type Family = {
  name: string;
  sections: { heading: string; body: string }[];
};

export function TerminosTabs({ families }: { families: Family[] }) {
  const [active, setActive] = useState(0);
  const family = families[active];

  return (
    <div>
      <div role="tablist" aria-label="Familia de plan" className="flex gap-8 border-b border-line/60">
        {families.map((f, i) => {
          const isActive = i === active;
          return (
            <button
              key={f.name}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(i)}
              className={`relative pb-3 text-sm transition-colors ${
                isActive ? "font-semibold text-white" : "text-grey hover:text-white"
              }`}
            >
              {f.name}
              {isActive ? <span className="absolute inset-x-0 -bottom-px h-px bg-white" /> : null}
            </button>
          );
        })}
      </div>

      <div className="mt-10 flex flex-col gap-10">
        {family.sections.map((section) => (
          <div key={section.heading}>
            <h3 className="text-base font-semibold text-white">{section.heading}</h3>
            <p className="mt-3 text-base leading-relaxed text-grey">{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
