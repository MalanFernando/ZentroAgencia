import Image from "next/image";
import { Multiline } from "@/components/shared/Multiline";
import serviciosData from "@/data/servicios";
import type { Testimonial } from "@/types/content";
import { Shape } from "@/components/shared/Shape";

const { testimonialsSection } = serviciosData;

function QuoteCard({
  quote,
  className,
  children,
}: {
  quote: Testimonial;
  className: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`testimonials-item testimonials-quote ${className}`}>
      <div data-reveal className="testimonials-card quote-card">
        <span className="quote-card-logo">
          <Image
            src={quote.logo.src}
            alt={quote.logo.alt}
            fill
            sizes="32px"
            className="object-contain"
          />
        </span>
        <p>&ldquo;{quote.quote}&rdquo;</p>
      </div>
      {children}
    </div>
  );
}

export function Testimonials() {
  const [ig1, ig2] = testimonialsSection.igCards;
  const [quoteA, quoteB, quoteC] = testimonialsSection.quotes;

  return (
    <section className="testimonials">
      <h2 data-reveal className="testimonials-title">
        <Multiline text={testimonialsSection.title} />
      </h2>

      <div data-reveal="fade" className="testimonials-logos">
        {testimonialsSection.logos.map((logo) => (
          <div key={logo.id} className="testimonials-logo">
            <Image
              src={logo.src}
              alt={logo.alt}
              fill
              sizes="(max-width: 1024px) 30vw, 128px"
              className="object-contain"
            />
          </div>
        ))}
      </div>

      <div className="testimonials-collage">
        <div className="testimonials-row">
          {ig1 && (
            <div className="testimonials-item testimonials-ig testimonials-ig-1">
              <div
                data-reveal="image"
                className="testimonials-card testimonials-ig-media"
                style={{ aspectRatio: `${ig1.width} / ${ig1.height}` }}
              >
                <Image
                  src={ig1.src}
                  alt={ig1.alt}
                  fill
                  sizes="(max-width: 1024px) 80vw, 35vw"
                  className="object-contain"
                />
              </div>
              <Shape name="testimonial-3lines-down" className="testimonials-dood testimonials-dood-a" />
              {/* Nace bajo este globo y su curva pasa detrás de la tarjeta siguiente. */}
              <Shape name="testimonial-left-arrow-curved" className="testimonials-dood testimonials-dood-b" />
            </div>
          )}

          {quoteA && (
            <QuoteCard quote={quoteA} className="testimonials-quote-a" />
          )}
        </div>

        <div className="testimonials-row">
          {quoteB && (
            <QuoteCard quote={quoteB} className="testimonials-quote-b">
              <Shape name="testimonial-3lines-up" className="testimonials-dood testimonials-dood-c" />
            </QuoteCard>
          )}

          {ig2 && (
            <div className="testimonials-item testimonials-ig testimonials-ig-2">
              <div
                data-reveal="image"
                className="testimonials-card testimonials-ig-media"
                style={{ aspectRatio: `${ig2.width} / ${ig2.height}` }}
              >
                <Image
                  src={ig2.src}
                  alt={ig2.alt}
                  fill
                  sizes="(max-width: 1024px) 85vw, 35vw"
                  className="object-contain"
                />
              </div>
              <Shape name="testimonial-right-arrow-curved" className="testimonials-dood testimonials-dood-d" />
            </div>
          )}
        </div>

        <div className="testimonials-row">
          {quoteC && (
            <QuoteCard quote={quoteC} className="testimonials-quote-c">
              <Shape name="testimonial-down-curved" className="testimonials-dood testimonials-dood-e" />
            </QuoteCard>
          )}
        </div>
      </div>
    </section>
  );
}
