'use client';

import { useId } from 'react';
import { useContactForm, type ContactField } from './useContactForm';
import { MESSAGE_MAX, MESSAGE_MIN } from '@/lib/validation';
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

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-12a1 1 0 0 1 1 1v3.5a1 1 0 1 1-2 0V7a1 1 0 0 1 1-1Zm0 8.75a1.1 1.1 0 1 0 0-2.2 1.1 1.1 0 0 0 0 2.2Z"
      />
    </svg>
  );
}

const labelClass =
  'text-[clamp(1.3rem,0.5rem_+_0.8vw,1.8rem)] text-white';

const helpClass = 'text-sm leading-snug';

const fieldCore =
  'w-full border-0 bg-transparent px-0 py-2 text-[clamp(1rem,0.8rem_+_0.7vw,2rem)] text-white outline-none transition-shadow placeholder:text-grey/60';

// La línea inferior pasa a rojo cuando el campo tiene un error.
const fieldBase = `${fieldCore} shadow-[inset_0_-1px_0_#828282,inset_0_-2px_0_var(--white)]`;
const textareaBase = `${fieldCore} resize-none shadow-[inset_0_-1px_0_var(--white),inset_0_-2px_0_#828282]`;
const fieldInvalid = `${fieldCore} shadow-[inset_0_-2px_0_var(--red)]`;

function Field({
  id,
  label,
  required = false,
  hint,
  error,
  aside,
  children
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div data-reveal className="flex flex-col gap-4">
      <label htmlFor={id} className={labelClass}>
        {label}
        {required ? (
          <span className="ml-1 text-red" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 text-base text-grey">(opcional)</span>
        )}
      </label>
      {children}
      {error || hint || aside ? (
        <div className="-mt-2 flex items-start justify-between gap-4">
          {error ? (
            <p id={`${id}-error`} className={`${helpClass} flex items-start gap-1.5 text-red`}>
              <AlertIcon className="mt-px h-4 w-4 flex-none" />
              {error}
            </p>
          ) : hint ? (
            <p id={`${id}-hint`} className={`${helpClass} text-grey`}>
              {hint}
            </p>
          ) : (
            <span />
          )}
          {aside}
        </div>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const idPrefix = useId();
  const f = useContactForm();

  if (f.status === 'success') {
    return (
      <div
        role="status"
        className="flex min-h-[40vh] flex-col items-center justify-center gap-3 px-4 text-center text-white"
      >
        <p className="text-[clamp(1.5rem,1rem_+_1.6vw,2.5rem)]">¡Mensaje enviado!</p>
        <p className="text-base text-grey">Gracias por escribirnos. Te responderemos pronto a tu correo.</p>
      </div>
    );
  }

  /** Props comunes de cada campo: valor, validación al salir y accesibilidad del error. */
  function fieldProps(field: ContactField, hasHint = false) {
    const id = `${idPrefix}-${field}`;
    const error = f.touched[field] ? f.errors[field] : undefined;
    return {
      id,
      error,
      input: {
        id,
        name: field,
        value: f.values[field],
        'aria-invalid': error ? true : undefined,
        'aria-describedby': error ? `${id}-error` : hasHint ? `${id}-hint` : undefined,
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
          f.updateField(field, e.target.value),
        onBlur: () => f.blurField(field)
      }
    };
  }

  const name = fieldProps('name');
  const email = fieldProps('email');
  const phone = fieldProps('phone', true);
  const project = fieldProps('project', true);
  const message = fieldProps('message', true);
  const messageLength = f.values.message.trim().length;
  const messageMissing = Math.max(0, MESSAGE_MIN - messageLength);

  return (
    <form
      noValidate
      className="relative mx-auto flex w-full max-w-4xl flex-col gap-6 px-5 pb-16 pt-14 lg:px-10 lg:pb-24"
      onSubmit={f.handleSubmit}
    >
      <Honeypot />

      <p data-reveal className="text-sm text-grey">
        Los campos marcados con <span className="text-red">*</span> son obligatorios.
      </p>

      <Field id={name.id} label="Nombre" required error={name.error}>
        <input
          {...name.input}
          type="text"
          autoComplete="name"
          required
          maxLength={120}
          placeholder="Tu nombre y apellido"
          className={name.error ? fieldInvalid : fieldBase}
        />
      </Field>

      <Field id={email.id} label="Correo" required error={email.error}>
        <input
          {...email.input}
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          maxLength={200}
          placeholder="nombre@correo.com"
          className={email.error ? fieldInvalid : fieldBase}
        />
      </Field>

      <Field
        id={phone.id}
        label="Teléfono"
        required
        error={phone.error}
        hint="Te contactaremos por llamada o WhatsApp. Incluye el código de país si no estás en Ecuador."
      >
        <input
          {...phone.input}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          maxLength={20}
          placeholder="099 123 4567"
          className={phone.error ? fieldInvalid : fieldBase}
        />
      </Field>

      <Field
        id={project.id}
        label="Proyecto"
        error={project.error}
        hint="Nombre de tu marca o negocio."
      >
        <input
          {...project.input}
          type="text"
          autoComplete="off"
          maxLength={200}
          className={project.error ? fieldInvalid : fieldBase}
        />
      </Field>

      <fieldset data-reveal className="flex flex-col gap-[clamp(0.75rem,1.5vw,1.5rem)]">
        <legend className={`${labelClass} mb-[clamp(0.75rem,1.5vw,1.5rem)]`}>
          {f.interestLabel}
          <span className="ml-2 text-base text-grey">(opcional, puedes elegir varios)</span>
        </legend>
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
      </fieldset>

      <Field
        id={message.id}
        label="Mensaje"
        required
        error={message.error}
        hint={`Cuéntanos qué necesitas (mínimo ${MESSAGE_MIN} caracteres).`}
        aside={
          <span
            className={`${helpClass} flex-none tabular-nums ${messageMissing > 0 && messageLength > 0 ? 'text-grey' : 'text-grey/70'}`}
            aria-live="polite"
          >
            {messageMissing > 0 && messageLength > 0
              ? `Faltan ${messageMissing}`
              : `${messageLength}/${MESSAGE_MAX}`}
          </span>
        }
      >
        <textarea
          {...message.input}
          rows={4}
          required
          maxLength={MESSAGE_MAX}
          placeholder="Ej.: Quiero mejorar las redes sociales de mi negocio."
          className={message.error ? `${fieldInvalid} resize-none` : textareaBase}
        />
      </Field>

      <div data-reveal className="flex flex-col items-end gap-2">
        <button
          type="submit"
          disabled={f.status === 'submitting'}
          aria-describedby={f.hasFieldErrors ? `${idPrefix}-summary` : undefined}
          className="inline-flex items-center gap-[0.4em] rounded-[4px] bg-transparent py-0 text-[clamp(1.5rem,1rem_+_1.6vw,3rem)] text-white transition-colors hover:text-red disabled:cursor-not-allowed disabled:opacity-50"
        >
          {f.status === 'submitting' ? <span>Enviando…</span> : <RollText text={f.submitLabel} />}
          <SendArrowIcon className="h-[0.6em] w-auto" />
        </button>
        <Shape name="contact-line-h" className="h-auto w-[clamp(7rem,5rem_+_5vw,11rem)]" />
        {f.hasFieldErrors ? (
          <p
            id={`${idPrefix}-summary`}
            role="alert"
            className={`${helpClass} mt-2 flex items-start gap-1.5 text-red`}
          >
            <AlertIcon className="mt-px h-4 w-4 flex-none" />
            Revisa los campos marcados en rojo antes de enviar.
          </p>
        ) : null}
      </div>

      {f.status === 'error' || f.status === 'unavailable' ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-[4px] border border-red/50 bg-red/10 p-4 text-base text-white"
        >
          <AlertIcon className="mt-0.5 h-5 w-5 flex-none text-red" />
          <div className="flex flex-col gap-2">
            <p>
              {f.status === 'unavailable'
                ? 'El envío por correo no está disponible en este momento. Tu mensaje no se perdió: puedes enviarlo por WhatsApp.'
                : f.errorMessage}
            </p>
            <a
              href={f.whatsappFallbackHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-red underline underline-offset-4 hover:no-underline"
            >
              Escríbenos por WhatsApp →
            </a>
          </div>
        </div>
      ) : null}
    </form>
  );
}
