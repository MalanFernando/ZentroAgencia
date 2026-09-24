"use client";

import { useId, useRef } from "react";

/**
 * Botón subrayado que abre una ventana con contenido ampliado (<dialog> nativo:
 * Escape cierra y el foco vuelve al botón). Mientras está abierta se bloquea el
 * scroll de la página (SmoothScroll se detiene solo). Los hijos con la clase
 * "info-item" y --i entran escalonados.
 */
export function InfoDialog({
  label,
  title,
  className = "",
  children,
}: {
  label: string;
  title: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  function open() {
    ref.current?.showModal();
    document.body.style.overflow = "hidden";
  }

  function close() {
    ref.current?.close();
  }

  return (
    <>
      <button type="button" onClick={open} aria-haspopup="dialog" className={`info-trigger ${className}`}>
        {label}
      </button>

      <dialog
        ref={ref}
        aria-labelledby={titleId}
        className="info-dialog"
        onClose={() => {
          document.body.style.overflow = "";
        }}
        onClick={(e) => {
          if (e.target === ref.current) close();
        }}
      >
        <div className="info-dialog-panel dialog-scroll">
          <button type="button" onClick={close} aria-label="Cerrar" className="dialog-close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
          <h2 id={titleId} className="info-dialog-title">
            {title}
          </h2>
          {children}
        </div>
      </dialog>
    </>
  );
}
