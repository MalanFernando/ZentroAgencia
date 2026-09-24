import Link from "next/link";
import { ServicesTicker } from "@/components/shared/ServicesTicker";
import serviciosData from "@/data/servicios";
import siteData from "@/data/site.json";
import { Shape } from "@/components/shared/Shape";
import { Words } from "@/components/shared/motion/Words";
import { RollText } from "@/components/shared/motion/RollText";
import { ImageCycle } from "@/components/shared/motion/ImageCycle";

const { hero } = serviciosData;
// Las fotos se turnan al azar entre las mismas del Hero, una tras otra.
const CYCLE_STAGGER_MS = 900;

export function ServiciosHero() {
  return (
    <section className="services-hero mb-20">
      <div className="services-hero-body">
        {hero.floatingImages.map((img, i) => (
          <div
            key={img.src}
            data-reveal="image"
            className={`services-hero-float services-hero-float-${i + 1}`}
            style={{ aspectRatio: `${img.width} / ${img.height}` }}
          >
            <ImageCycle
              images={hero.floatingImages}
              start={i}
              group="services-hero"
              sizes="(max-width: 1024px) 25vw, 15vw"
              offset={i * CYCLE_STAGGER_MS}
            />
          </div>
        ))}

        <div className="services-hero-content">
          <div className="services-hero-title-wrap">
            <h1 data-reveal="words" className="services-hero-title">
              <Words text={hero.title} />
            </h1>
            <Shape name="hero-service-3lines-down" className="services-hero-dood-small" />
          </div>
          <p data-reveal className="services-hero-paragraph">{hero.paragraph}</p>
          <div data-reveal className="services-hero-cta-wrap">
            <Link href={hero.ctaHref} className="services-hero-cta">
              <RollText text={hero.ctaLabel} />
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
