import Link from "next/link";
import homeData from "@/data/home.json";
import siteData from "@/data/site.json";
import { ServicesTicker } from "@/components/shared/ServicesTicker";
import { LoopFromVideo } from "@/components/shared/LoopFromVideo";
import { Shape } from "@/components/shared/Shape";
import { RollText } from "@/components/shared/motion/RollText";
import { ImageCycle } from "@/components/shared/motion/ImageCycle";

const { hero } = homeData;
// hero-b se turna con dos piezas de Servicios.
const imageBCycle = [hero.imageB, ...hero.imageBExtras];

/**
 * Titular centrado con dos piezas inclinadas a los lados (video a la izquierda,
 * imagen a la derecha) que asoman desde los bordes, detrás del texto. La misma
 * composición se escala en móvil.
 */
export function Hero() {
  return (
    <section className="hero lg:mt-16">
      <div className="hero-stage">
        <div className="hero-headline">
          {/* hero-float: posición y deriva vertical con el scroll; hero-media: inclinación y entrada. */}
          <div className="hero-float hero-float-a">
            <div className="hero-media hero-media-a hero-enter" style={{ animationDelay: "0.05s" }}>
              <LoopFromVideo src={hero.videoA.src} className="hero-media-fill" />
            </div>
          </div>

          <div className="hero-float hero-float-b">
            <div className="hero-media hero-media-b hero-enter" style={{ animationDelay: "0.15s" }}>
              <ImageCycle images={imageBCycle} sizes="(max-width: 1024px) 34vw, 22rem" priority />
            </div>
          </div>

          <div className="hero-copy">
            <h1 className="hero-title hero-enter" style={{ animationDelay: "0s" }}>
              {hero.titleLine1}
              <br />
              <span className="hero-anchor">
                {hero.titleLine2}
                <Shape
                  name="hero-home-curly-1"
                  className="hero-squiggle hero-enter"
                  style={{ animationDelay: "0.45s" }}
                />
              </span>
            </h1>

            {/* Un solo h1 por página: esta segunda línea del titular va como párrafo. */}
            <p className="hero-title hero-enter" style={{ animationDelay: "0.1s" }}>
              {hero.titleLine3}
              <br />
              <span className="hero-anchor">
                {hero.titleLine4}
                <Shape
                  name="hero-home-line-down"
                  className="hero-squiggle-2 hero-enter"
                  style={{ animationDelay: "0.45s" }}
                />
              </span>
            </p>
          </div>
        </div>

        <div className="hero-copy">
          <p className="hero-paragraph hero-enter" style={{ animationDelay: "0.3s" }}>
            {hero.paragraph}
          </p>

          <Link href={hero.ctaHref} className="hero-cta hero-enter" style={{ animationDelay: "0.4s" }}>
            <RollText text={hero.ctaLabel} />
          </Link>
        </div>
      </div>

      <div className="hero-ticker">
        <ServicesTicker items={siteData.servicesTicker} r={-3} />
      </div>
    </section>
  );
}
