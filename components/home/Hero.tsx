import Image from "next/image";
import Link from "next/link";
import homeData from "@/data/home.json";
import siteData from "@/data/site.json";
import { ServicesTicker } from "@/components/shared/ServicesTicker";
import { Shape } from "@/components/shared/Shape";

const { hero } = homeData;

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
            <Image
              src={hero.imageA.src}
              alt={hero.imageA.alt}
              fill
              sizes="(max-width: 1024px) 30vw, 25vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="hero-row hero-row-b">
          <div
            className="hero-image hero-image-b hero-enter"
            style={{ animationDelay: '0.2s' }}
          >
            <Image
              src={hero.imageB.src}
              alt={hero.imageB.alt}
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
          </div>

          <h1
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
          </h1>
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
          {hero.ctaLabel}
        </Link>
      </div>

      <div className="hero-ticker">
        <ServicesTicker items={siteData.servicesTicker} r={-3} />
      </div>
    </section>
  );
}

