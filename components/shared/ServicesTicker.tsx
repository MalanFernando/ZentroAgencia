"use client";

import { useContinuousLoop } from "@/hooks/useContinuousLoop";

const DURATION_MS = 32000;

function TickerTile({ items }: { items: string[] }) {
  return (
    <div className="flex flex-none items-center">
      {items.map((label, i) => (
        <span key={i} className="flex items-center whitespace-nowrap px-6 text-base text-[#101010]">
          {label}
          <span className="ml-6 h-2.5 w-2.5 flex-none rounded-[4px] bg-red" />
        </span>
      ))}
    </div>
  );
}

export function ServicesTicker({ items, r = 0 }: { items: string[]; r?: number }) {
  const { ref } = useContinuousLoop<HTMLDivElement>(DURATION_MS, (progress, el) => {
    el.style.transform = `translateX(-${progress * 50}%)`;
  });

  return (
    <div
      className="h-[2.875rem] w-[106%] overflow-hidden bg-white"
      style={{ transform: `translateX(-3%) rotate(${r}deg)` }}
      aria-hidden="true"
    >
      <div ref={ref} className="flex h-full w-max items-center">
        <TickerTile items={items} />
        <TickerTile items={items} />
      </div>
    </div>
  );
}
