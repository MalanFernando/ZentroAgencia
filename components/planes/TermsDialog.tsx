"use client";

import { useEffect, useRef } from "react";
import type { PlanTerms } from "@/types/content";

export function TermsDialog({ terms, onClose }: { terms: PlanTerms | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (terms && !dialog.open) dialog.showModal();
    if (!terms && dialog.open) dialog.close();
  }, [terms]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="fixed top-1/2 left-1/2 m-0 w-[min(720px,92vw)] max-h-[85vh] -translate-x-1/2 -translate-y-1/2 rounded-[4px] border border-line bg-bg p-0 text-white backdrop:bg-black/70"
    >
      {terms ? (
        <div className="relative max-h-[85vh] overflow-y-auto p-8">
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute top-3 right-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-[4px] border border-line text-base"
          >
            ×
          </button>
          <h2 className="pr-12 text-xl font-bold">Términos y condiciones — {terms.familyName}</h2>
          <div className="mt-6 flex flex-col gap-4">
            {terms.paragraphs.map((paragraph, i) => (
              <p key={i} className="text-xs leading-relaxed text-grey">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
