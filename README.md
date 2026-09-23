# Zentro — sitio web

Sitio institucional de **Zentro**, agencia de marketing, branding y producción audiovisual.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · pnpm.

## Requisitos

- Node.js 20 o superior
- pnpm 11 (`corepack enable` activa la versión fijada en `package.json`)

## Puesta en marcha

```bash
pnpm install
cp .env.example .env.local   # completar los valores
pnpm dev                     # http://localhost:3000
```

## Variables de entorno

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL pública; se usa en metadata, sitemap y JSON-LD. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número en formato E.164 para los enlaces de WhatsApp. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Correo visible en el footer. |
| `RESEND_API_KEY` | Clave de [Resend](https://resend.com) para el formulario de contacto. Sin ella, el formulario ofrece escribir por WhatsApp. |
| `CONTACT_EMAIL_FROM` | Remitente verificado en Resend. |
| `CONTACT_EMAIL_TO` | Bandeja que recibe los mensajes del formulario. |

## Scripts

| Comando | Descripción |
| --- | --- |
| `pnpm dev` | Servidor de desarrollo. |
| `pnpm build` | Build de producción. |
| `pnpm start` | Sirve el build de producción. |
| `pnpm lint` | ESLint. |
| `npx tsc --noEmit` | Verificación de tipos. |

## Estructura

```
app/          rutas, API de contacto, íconos del sitio, robots/sitemap y estilos globales
components/   componentes por página (home, servicios, planes, contactos, terminos), layout y shared
hooks/        hooks reutilizables
lib/          configuración, mensajes de WhatsApp, validación y rate limit
data/         contenido editable (JSON)
types/        tipos del contenido
public/       brand, icons, shapes, images, videos y og-image
```

## Contenido

Los textos, precios, clientes y testimonios se editan en `data/*.json`; no hace falta tocar componentes.

## Despliegue

Pensado para Vercel o cualquier hosting de Node compatible con Next.js: configurar las variables de entorno y ejecutar `pnpm build`. El límite de envíos del formulario es en memoria (por instancia); para varias instancias conviene reemplazarlo por un almacenamiento compartido (p. ej. Redis).
