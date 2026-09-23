import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatingButton } from "@/components/shared/WhatsAppFloatingButton";
import { siteConfig } from "@/lib/config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Marketing, branding y producción audiovisual`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Zentro es una agencia de marketing enfocada en estrategia, branding y producción audiovisual para impulsar el crecimiento de marcas y negocios.",
  keywords: [
    "agencia de marketing",
    "branding",
    "producción audiovisual",
    "marketing digital Ecuador",
    "gestión de redes sociales",
    "Zentro",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Dale centro a tu marca`,
    description:
      "Estrategias de marketing avanzado, branding y producción audiovisual para impulsar el crecimiento de tu negocio.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Dale centro a tu marca`,
    description:
      "Estrategias de marketing avanzado, branding y producción audiovisual para impulsar el crecimiento de tu negocio.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "MarketingAgency",
  name: siteConfig.name,
  url: siteConfig.url,
  slogan: siteConfig.tagline,
  email: siteConfig.contactEmail,
  areaServed: "EC",
  sameAs: [siteConfig.social.instagram, siteConfig.social.facebook, siteConfig.social.tiktok],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${inter.variable} h-full antialiased${
        process.env.NODE_ENV === "development" ? " debug-outline" : ""
      }`}
    >
      <body className="min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Navbar />
        <div className="page">
          {children}
          <Footer />
        </div>
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
