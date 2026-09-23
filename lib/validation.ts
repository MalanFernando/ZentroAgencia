import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Ingresa tu nombre completo.").max(120),
  email: z.string().trim().email("Ingresa un correo válido.").max(200),
  phone: z
    .string()
    .trim()
    .min(7, "Ingresa un número de contacto válido.")
    .max(20)
    .regex(/^[\d\s+()-]+$/, "Ingresa un número de contacto válido."),
  project: z.string().trim().max(200).optional().default(""),
  interests: z.array(z.string()).max(10).optional().default([]),
  message: z.string().trim().min(10, "Cuéntanos un poco más (mínimo 10 caracteres).").max(4000),
  company: z.string().max(0, "").optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;
