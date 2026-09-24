'use client';

import { useId } from 'react';
import { useContactForm } from './useContactForm';
import { Shape } from '@/components/shared/Shape';
import { RollText } from '@/components/shared/motion/RollText';

const Honeypot = () => (
  <input
    type="text"
    name="company"
    tabIndex={-1}
    autoComplete="off"
    aria-hidden="true"
    className="pointer-events-none absolute h-px w-px opacity-0"
  />
);

function SendArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 49 29"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M1.5 14.5H46.5M34 2L47 14.5L34 27"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const labelClass =
  'text-[clamp(1.3rem,0.5rem_+_0.8vw,1.8rem)] text-white';

const fieldCore =
  'w-full border-0 bg-transparent px-0 py-2 text-[clamp(1rem,0.8rem_+_0.7vw,2rem)] text-white outline-none transition-shadow placeholder:text-grey';

const fieldBase = `${fieldCore} shadow-[inset_0_-1px_0_#828282,inset_0_-2px_0_var(--white)]`;
const textareaBase = `${fieldCore} resize-none shadow-[inset_0_-1px_0_var(--white),inset_0_-2px_0_#828282]`;

function Field({
  id,
  label,
  children
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div data-reveal className="flex flex-col gap-4">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
    </div>
  );
}

export function ContactForm() {
  const idPrefix = useId();
  const f = useContactForm();

  if (f.status === 'success') {
    return (
      <div className="flex min-h-[40vh] items-center justify-center px-4 text-center text-white">
        <p>¡Mensaje enviado! Te responderemos pronto.</p>
      </div>
    );
  }

  return (
    <form
      className="relative mx-auto flex w-full max-w-4xl flex-col gap-6 px-5 pb-16 pt-14 lg:px-10 lg:pb-24"
      onSubmit={f.handleSubmit}
    >
      <Honeypot />

      <Field id={`${idPrefix}-name`} label="Nombre">
        <input
          id={`${idPrefix}-name`}
          name="name"
          type="text"
          autoComplete="name"
          required
          className={fieldBase}
          onChange={(e) => f.updateField('name', e.target.value)}
        />
      </Field>

      <Field id={`${idPrefix}-email`} label="Correo">
        <input
          id={`${idPrefix}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          className={fieldBase}
          onChange={(e) => f.updateField('email', e.target.value)}
        />
      </Field>

      <Field id={`${idPrefix}-phone`} label="Teléfono">
        <input
          id={`${idPrefix}-phone`}
          name="phone"
          type="tel"
          autoComplete="tel"
          required
          className={fieldBase}
          onChange={(e) => f.updateField('phone', e.target.value)}
        />
      </Field>

      <Field id={`${idPrefix}-project`} label="Proyecto">
        <input
          id={`${idPrefix}-project`}
          name="project"
          type="text"
          autoComplete="off"
          className={fieldBase}
          onChange={(e) => f.updateField('project', e.target.value)}
        />
      </Field>

      <div data-reveal className="flex flex-col gap-[clamp(0.75rem,1.5vw,1.5rem)]">
        <p className={labelClass}>{f.interestLabel}</p>
        <div className="flex flex-wrap gap-[clamp(0.75rem,1.5vw,1.5rem)]">
          {f.interestOptions.map((option) => {
            const active = f.interests.includes(option.id);
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={active}
                onClick={() => f.toggleInterest(option.id)}
                className={`min-w-[min(22%,9rem)] rounded-[4px] px-6 py-3 text-[clamp(0.875rem,0.75rem_+_0.4vw,1rem)] leading-none shadow-[inset_0_0_0_1.5px_var(--white)] transition-colors ${
                  active ? 'bg-white text-bg' : 'text-white hover:bg-surface'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <Field id={`${idPrefix}-message`} label="Mensaje">
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          rows={4}
          required
          className={textareaBase}
          onChange={(e) => f.updateField('message', e.target.value)}
        />
      </Field>

      <div data-reveal className="flex flex-col items-end gap-2">
        <button
          type="submit"
          disabled={f.status === 'submitting'}
          className="inline-flex items-center gap-[0.4em] rounded-[4px] bg-transparent py-0 text-[clamp(1.5rem,1rem_+_1.6vw,3rem)] text-white transition-colors hover:text-red disabled:cursor-not-allowed disabled:opacity-50"
        >
          {f.status === 'submitting' ? <span>Enviando…</span> : <RollText text={f.submitLabel} />}
          <SendArrowIcon className="h-[0.6em] w-auto" />
        </button>
        <Shape name="contact-line-h" className="h-auto w-[clamp(7rem,5rem_+_5vw,11rem)]" />
      </div>

      {f.status === 'error' || f.status === 'unavailable' ? (
        <div className="text-base text-grey">
          <p>
            {f.status === 'unavailable'
              ? 'El envío por correo no está disponible en este momento.'
              : f.errorMessage}
          </p>
          <a
            href={f.whatsappFallbackHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red underline"
          >
            Escríbenos por WhatsApp en su lugar →
          </a>
        </div>
      ) : null}
    </form>
  );
}

