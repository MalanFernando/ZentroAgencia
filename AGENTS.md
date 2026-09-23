<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — `web_zentro`

Spanish-language marketing site for the "Zentro" agency. Next.js 16.3.5 App Router, React 19, TypeScript, Tailwind v4 (CSS-first), pnpm 11. Single-package repo (`pnpm-workspace.yaml` exists only to control native builds — see gotchas).

## Commands

- `pnpm dev` — dev server on `http://localhost:3000`
- `pnpm build` — production build
- `pnpm start` — serve a production build
- `pnpm lint` — ESLint flat config (`eslint-config-next` core-web-vitals + typescript)
- `npx tsc --noEmit` — typecheck (no script alias; `tsconfig.json` has `noEmit: true`)
- No test framework is configured. Don't try to add jest/vitest without being asked.

No `format`/`format:check` script. There is no Prettier config — follow existing style in the file you're editing.

## Setup

- Copy `.env.example` to `.env.local` and fill in `RESEND_API_KEY` (and optionally the `CONTACT_*`/`NEXT_PUBLIC_*` vars). `RESEND_API_KEY` is required for `/api/contact` to send mail; without it the endpoint returns 503 and the UI shows a "write us on WhatsApp" fallback.
- Package manager is pnpm only. `packageManager: pnpm@11.22.0` is pinned — don't run `npm install`.

## Routes

`app/` (App Router):

- `app/page.tsx` → `/` (Nosotros — home, marketing copy)
- `app/contactos/page.tsx` → `/contactos` (contact form)
- `app/planes/page.tsx` → `/planes` (plans + service catalog)
- `app/servicios/page.tsx` → `/servicios` (services + video showcase + testimonials)
- `app/terminos/page.tsx` → `/terminos` (terms & conditions, plain flow layout)
- `app/api/contact/route.ts` → `POST /api/contact` (zod-validated, rate-limited, Resend-backed)
- `app/robots.ts`, `app/sitemap.ts` → static `MetadataRoute` files; both read from `lib/config.ts`

## Architecture: layout system

The original site used a coordinate-based layout (`.stage`, `--u`, `.a/.b/.t/.rot`, `lib/fluid.ts`). It has been fully removed: every page (`/`, `/servicios`, `/planes`, `/contactos`, `/terminos`) is a single responsive tree in normal document flow — no fixed stage heights, no duplicate desktop/mobile trees. Don't reintroduce coordinate positioning.

- Content is laid out with flex/grid; only decoration (doodles, floating photos, tilted cards' rotation) may be `absolute`, anchored to its own section container. The method is in `.claude/skills/SKILL.md`.
- Styling mixes Tailwind utilities in JSX (e.g. `About`, `Footer`, Planes, Contacto) with semantic classes in `app/globals.css` for more complex sections (`.hero-*`, `.dp-*`, `.navbar-*`, `.services-hero-*`, `.video-*`, `.clients-*`, `.testimonials-*`).
- Main breakpoint is `lg` (1024px). On desktop the navbar is `position: fixed`, so each page's first section adds its own top offset (e.g. `lg:pt-32`).
- `components/layout/Navbar.tsx` is a single responsive component; `components/layout/nav-data.ts` exposes the nav items from `data/site.json`.
- Decorative doodles that must track content are anchored to the element they decorate (title, CTA, card) and sized in `em`/`%` of it. Where a position depends on viewport width (Servicios hero photos), it interpolates between a 375px value and a 1920px value with `clamp()` — no per-breakpoint coordinates.
- `app/globals.css` has `.debug-outline * { outline: 1px solid red }`; `app/layout.tsx` adds that class to `<html>` only when `NODE_ENV === "development"`. It never ships to production — keep it that way.

## Folder structure

```
app/            routes, metadata files (favicon.ico, icon.png, apple-icon.png, robots, sitemap), globals.css
components/     one folder per page (home, servicios, planes, contactos, terminos) + layout/ + shared/
hooks/          reusable client hooks (useAutoAdvance, useContinuousLoop, useDragSlide)
lib/            config, WhatsApp messages, validation, rate limit
data/           editable content (JSON) + typed wrappers
types/          content types
public/         brand/, icons/, shapes/, images/, videos/, og-image.jpg
```

Page-specific hooks (`usePlansPage`, `useContactForm`) live next to their components.

## Data flow

Content lives in `data/*.json`, typed by `types/content.ts`, and re-exported through thin `data/*.ts` wrappers that cast the JSON to the right type:

```
data/home.json        →  data/  (no wrapper; imported directly as `@/data/home.json`)
data/plans.json       →  data/plans.ts   (default export, PlansContent)
data/servicios.json   →  data/servicios.ts
data/site.json        →  imported directly
data/contactos.json   →  imported directly
data/terminos.json    →  imported directly
```

When you change pricing/copy/clients, edit the JSON, not the TS. The TS wrappers exist only because `as unknown as PlansContent` is needed to satisfy `resolveJsonModule` with the strict cast.

## Assets

- `public/shapes/*.svg` — decorative doodles; `public/icons/*.svg` — UI icons (check, WhatsApp, bot). Both are rendered through `components/shared/Shape.tsx`, which maps a name to `[src, width, height]` (intrinsic size, only used for the aspect ratio). To add one, drop the SVG in the right folder and register it there. Names are kebab-case.
- `public/brand/` — logos. `zentro-logo-square.png` is the source for `app/favicon.ico`, `app/icon.png`, `app/apple-icon.png` and `public/og-image.jpg` (Next picks up the `app/` icon files by convention; no `icons` entry in metadata).
- `public/images/` — photos by section; `public/videos/` — mp4 files. Keep file extensions lowercase (production hosts are case-sensitive).

`mock-mobile/`, `Docs/`, `WebMock/` and `.claude/` are local design references, git-ignored. Treat the mock as a visual reference for composition, proportions and copy — its coordinates are not values to copy.

## Contact form: `/api/contact`

`app/api/contact/route.ts` (POST):

- Runtime: `nodejs` (explicit, required for `resend` SDK and in-memory rate limit).
- Validation: `contactSchema` in `lib/validation.ts` (zod). Honeypot field `company` must be empty — the `<Honeypot />` component in `components/contactos/ContactForm.tsx` renders it as a 1px, `aria-hidden`, `tabIndex={-1}` input. Don't remove it.
- Rate limit: `checkRateLimit` in `lib/rate-limit.ts` — in-memory `Map`, key = `x-forwarded-for` IP, **5 req / 10 min**. Resets on server restart and does **not** share state across instances; if you go multi-region, swap it for Upstash Redis.
- Email: `Resend` SDK; the HTML body is built inline and all user fields are escaped. Reply-To is set to the submitter's email.
- Error contract: `{ ok: false, error: "rate_limited" | "invalid_body" | "validation_error" | "email_not_configured" | "send_failed", fieldErrors? }`. The client (`components/contactos/useContactForm.ts`) treats 503 + `email_not_configured` as `status === "unavailable"` and shows the WhatsApp fallback link.

## Styling quirks

- **Tailwind v4, no `tailwind.config.js`.** Theme tokens (`--color-bg`, `--color-white`, `--color-red`, …) are declared in `app/globals.css` via `@theme inline` and back-reference CSS custom properties on `:root`. Add new design tokens there, not in a config file.
- The only font is `Inter` (see `app/layout.tsx`), loaded via `next/font/google` into `--font-inter`. The default `create-next-app` template uses Geist — this repo replaced it.
- The footer wordmark "Zentro" is text sized in `cqw` of the footer's `max-w-7xl` container, so it never grows wider than the footer.

## Common gotchas

- **Don't add a `tailwind.config.js`.** v4 is CSS-first; adding the file breaks the `@theme inline` cascade.
- **Don't remove the auto-generated `nextjs-agent-rules` block at the top of this file.** `next dev` re-injects it on every start; the diff churn is harmless if you commit it.
- **pnpm workspace blocks `unrs-resolver` builds.** See `pnpm-workspace.yaml`. This affects `next/image`'s sharp optimization fallback path. If you hit resolution errors, revisit the file rather than adding a `node-linker` setting.
- **No CI configured.** There are no `.github/workflows/` files. Don't assume `pnpm test` or any pre-commit hook exists.
- **Spanish copy throughout.** Keep new UI strings in Spanish; descriptions/metadata in `app/layout.tsx` and per-page `metadata` exports are the reference register.
- **No custom footer or contact styles.** Footer and contact form/hero styling live as Tailwind utility classes in their components; the old `.footer*`, `.contacts-*` and `.contact-*` rules in `app/globals.css` were removed.
