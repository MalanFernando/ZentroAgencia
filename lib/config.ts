const FALLBACK_WHATSAPP = "+593980649531";
const FALLBACK_EMAIL = "zentroagenciamkt@gmail.com";
const FALLBACK_SITE_URL = "http://localhost:3000";

// URL pública: la definida a mano o, si falta, la que da el proveedor al compilar
// (Vercel o Netlify), para que canonical, sitemap y OG nunca apunten a localhost.
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.URL) return process.env.URL;
  return FALLBACK_SITE_URL;
}

function normalizeE164(raw: string): string {
  return raw.replace(/[^\d+]/g, "");
}

export const siteConfig = {
  name: "Zentro",
  tagline: "Dale centro a tu marca",
  url: resolveSiteUrl().replace(/\/$/, ""),
  locale: "es_EC",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? FALLBACK_EMAIL,
  whatsapp: {
    e164: normalizeE164(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? FALLBACK_WHATSAPP),
    get digits() {
      return this.e164.replace(/^\+/, "");
    },
  },
  social: {
    instagram: "https://www.instagram.com/zentro.ec_/",
    facebook: "https://www.facebook.com/profile.php?id=61584867872902#",
    tiktok: "https://www.tiktok.com/@zentro.ec_?_r=1",
  },
} as const;

export function buildWhatsAppLink(message: string, phone: string = siteConfig.whatsapp.digits) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}
