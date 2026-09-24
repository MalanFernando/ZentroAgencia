import Link from "next/link";
import homeData from "@/data/home.json";
import siteData from "@/data/site.json";
import serviciosData from "@/data/servicios";
import { ServicesTicker } from "@/components/shared/ServicesTicker";
import { Shape } from "@/components/shared/Shape";
import { RollText } from "@/components/shared/motion/RollText";
import { ImageCycle } from "@/components/shared/motion/ImageCycle";

const { hero } = homeData;
const floats = serviciosData.hero.floatingImages;

// Las dos imágenes del Hero se turnan al azar entre las suyas y tres fotos del
// Hero de Servicios (float-2, float-3, float-4), sin mostrar la misma a la vez.
const heroCycle = [hero.imageA, hero.imageB, floats[1], floats[2], floats[3]];

export function Hero() {
  return (
    <section className="hero lg:mt-16">
      <div className="hero-grid">
        <div className="hero-row hero-row-a">
          <h1
            className="hero-title hero-title-main hero-enter"
            style={{ animationDelay: '0s' }}
          >
            {hero.titleLine1}
            <br />
            {hero.titleLine2}
            <Shape
              name="hero-home-curly-1"
              className="hero-squiggle hero-enter"
              style={{ animationDelay: '0.45s' }}
            />
          </h1>

          <div
            className="hero-image hero-image-a hero-enter"
            style={{ animationDelay: '0.05s' }}
          >
            <ImageCycle
              images={heroCycle}
              group="home-hero"
              sizes="(max-width: 1024px) 30vw, 25vw"
              priority
            />
          </div>
        </div>

        <div className="hero-row hero-row-b">
          <div
            className="hero-image hero-image-b hero-enter"
            style={{ animationDelay: '0.2s' }}
          >
            <ImageCycle
              images={heroCycle}
              start={1}
              group="home-hero"
              sizes="(max-width: 1024px) 90vw, 45vw"
              offset={2200}
            />
          </div>

          {/* Un solo h1 por página: esta segunda línea del titular va como párrafo. */}
          <p
            className="hero-title hero-title-secondary hero-enter"
            style={{ animationDelay: '0.1s' }}
          >
            {hero.titleLine3}
            <br />
            {hero.titleLine4}
            <Shape
              name="hero-home-line-down"
              className="hero-squiggle-2 hero-enter"
              style={{ animationDelay: '0.45s' }}
            />
          </p>
        </div>

        <p
          className="hero-paragraph hero-enter"
          style={{ animationDelay: '0.3s' }}
        >
          {hero.paragraph}
        </p>

        <Link
          href={hero.ctaHref}
          className="hero-cta hero-enter"
          style={{ animationDelay: '0.4s' }}
        >
          <RollText text={hero.ctaLabel} />
        </Link>
      </div>

      <div className="hero-ticker">
        <ServicesTicker items={siteData.servicesTicker} r={-3} />
      </div>
    </section>
  );
}

