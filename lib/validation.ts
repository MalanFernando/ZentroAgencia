import { z } from "zod";

// Reglas compartidas por el formulario (validación en vivo) y /api/contact.
// Se muestra el primer mensaje de cada campo, así que "obligatorio" va primero.

export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 4000;

/**
 * Teléfono: celular o fijo de Ecuador (con o sin +593) o número internacional.
 * Devuelve el motivo concreto para que el usuario sepa qué corregir.
 */
function phoneIssue(raw: string): string | null {
  if (/[^\d\s+()-]/.test(raw)) return "Usa solo números, espacios y los signos + - ( ).";
  if (raw.lastIndexOf("+") > 0) return "El signo + solo puede ir al inicio del número.";

  const digits = raw.replace(/\D/g, "");
  const international = raw.trim().startsWith("+") || digits.startsWith("593");

  if (digits.startsWith("593")) {
    const local = digits.slice(3);
    if (local.startsWith("0")) {
      return "Con +593 se quita el 0 inicial: por ejemplo +593 99 123 4567.";
    }
    if (local.startsWith("9") && local.length !== 9) {
      return "Un celular de Ecuador con +593 lleva 9 dígitos después del código, por ejemplo +593 99 123 4567.";
    }
    if (!local.startsWith("9") && local.length !== 8) {
      return "Revisa el número: después de +593 van 9 dígitos (celular) u 8 dígitos (fijo).";
    }
    return null;
  }

  if (!international && digits.startsWith("09")) {
    return digits.length === 10
      ? null
      : "Un celular de Ecuador tiene 10 dígitos, por ejemplo 099 123 4567.";
  }

  if (!international && /^0[2-7]/.test(digits)) {
    return digits.length === 9
      ? null
      : "Un teléfono fijo de Ecuador tiene 9 dígitos con el código de provincia, por ejemplo 02 123 4567.";
  }

  if (digits.length < 7) return "El número es muy corto: debe tener al menos 7 dígitos.";
  if (digits.length > 15) return "El número es muy largo: revisa que no tenga dígitos de más.";
  return null;
}

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Escribe tu nombre.")
    .min(2, "El nombre debe tener al menos 2 letras.")
    .max(120, "El nombre no puede superar los 120 caracteres.")
    .regex(/^[\p{L}\s'.-]+$/u, "Usa solo letras en el nombre (se permiten tildes, ñ, espacios y guiones)."),
  email: z
    .string()
    .trim()
    .min(1, "Escribe tu correo.")
    .max(200, "El correo no puede superar los 200 caracteres.")
    .email("Revisa tu correo, debe tener el formato nombre@correo.com."),
  phone: z
    .string()
    .trim()
    .min(1, "Escribe un número de contacto.")
    .max(20, "El número no puede superar los 20 caracteres.")
    .superRefine((value, ctx) => {
      const issue = phoneIssue(value);
      if (issue) ctx.addIssue({ code: "custom", message: issue });
    }),
  project: z.string().trim().max(200, "El proyecto no puede superar los 200 caracteres.").optional().default(""),
  interests: z.array(z.string()).max(10).optional().default([]),
  message: z
    .string()
    .trim()
    .min(1, "Escribe tu mensaje.")
    .min(MESSAGE_MIN, `Cuéntanos un poco más: el mensaje necesita al menos ${MESSAGE_MIN} caracteres.`)
    .max(MESSAGE_MAX, `El mensaje no puede superar los ${MESSAGE_MAX} caracteres.`),
  company: z.string().max(0).optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;
