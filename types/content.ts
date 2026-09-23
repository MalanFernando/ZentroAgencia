export type Testimonial = {
  id: string;
  quote: string;
  logo: { src: string; alt: string };
};

export type SocialType = "facebook" | "instagram" | "web";

export type FeaturedClient = {
  id: string;
  name: string;
  description: string;
  cover: { src: string; alt: string; width: number; height: number };
  logo: { src: string; alt: string; width: number; height: number };
  socials: { type: SocialType; href: string }[];
};

export type ServiciosContent = {
  hero: {
    title: string;
    paragraph: string;
    ctaLabel: string;
    ctaHref: string;
    floatingImages: { src: string; alt: string; width: number; height: number }[];
  };
  videoShowcase: { id: string; src: string; alt: string }[];
  clientsSection: {
    title: string;
    featured: FeaturedClient[];
  };
  testimonialsSection: {
    title: string;
    logos: { id: string; src: string; alt: string }[];
    igCards: { id: string; src: string; alt: string; width: number; height: number }[];
    quotes: Testimonial[];
  };
};

export type PlanSlug = "impulso" | "esencia" | "zentro";

export type PlanTier = {
  id: string;
  label: string;
  price: number;
};

export type PlanRow = {
  label: string;
  values: [string, string, string];
};

export type PlanFamily = {
  slug: PlanSlug;
  name: string;
  cardDescription: string;
  familyTagline: string;
  tiers: [PlanTier, PlanTier, PlanTier];
  rows: PlanRow[];
};

export type PlanTerms = {
  familyName: string;
  paragraphs: string[];
};

export type CatalogOption = {
  id: string;
  label: string;
  price: number;
};

export type CatalogItem = {
  id: string;
  title: string;
  description?: string;
  note?: string;
} & ({ kind: "single"; price: number } | { kind: "options"; options: CatalogOption[] });

export type CatalogGroup = {
  id: string;
  heading?: string;
  description?: string;
  items: CatalogItem[];
};

export type ServiceCatalog = {
  id: "individual" | "adicional";
  title: string;
  description: string;
  groups: CatalogGroup[];
};

export type PlansContent = {
  hero: { title: string; paragraph: string };
  families: PlanFamily[];
  terms: Record<PlanSlug, PlanTerms>;
  catalogs: ServiceCatalog[];
};
