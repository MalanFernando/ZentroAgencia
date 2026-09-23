import Image from "next/image";
import Link from "next/link";
import { ServicesTicker } from "@/components/shared/ServicesTicker";
import serviciosData from "@/data/servicios";
import siteData from "@/data/site.json";
import { Shape } from "@/components/shared/Shape";

const { hero } = serviciosData;

export function ServiciosHero() {
  return (
    <section className="services-hero mb-20">
      <div className="services-hero-body">
        {hero.floatingImages.map((img, i) => (
          <div
            key={img.src}
            className={`services-hero-float services-hero-float-${i + 1}`}
            style={{ aspectRatio: `${img.width} / ${img.height}` }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 1024px) 25vw, 15vw"
              className="object-cover"
            />
          </div>
        ))}

        <div className="services-hero-content">
          <div className="services-hero-title-wrap">
            <h1 className="services-hero-title">{hero.title}</h1>
            <Shape name="hero-service-3lines-down" className="services-hero-dood-small" />
          </div>
          <p className="services-hero-paragraph">{hero.paragraph}</p>
          <div className="services-hero-cta-wrap">
            <Link href={hero.ctaHref} className="services-hero-cta">
              {hero.ctaLabel}
            </Link>
            <Shape name="hero-service-arrow" className="services-hero-dood-large" />
          </div>
        </div>
      </div>

      <div className="services-hero-ticker pt-16">
        <ServicesTicker items={siteData.servicesTicker} r={1.9} />
      </div>
    </section>
  );
}
