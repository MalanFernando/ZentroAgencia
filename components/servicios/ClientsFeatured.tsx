"use client";

import Image from "next/image";
import { useAutoAdvance } from "@/hooks/useAutoAdvance";
import { useDragSlide } from "@/hooks/useDragSlide";
import { Multiline } from "@/components/shared/Multiline";
import serviciosData from "@/data/servicios";

const { clientsSection } = serviciosData;
const slides = clientsSection.featured;

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="18" cy="6" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WebIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <ellipse cx="12" cy="12" rx="4" ry="10" />
      <path d="M2 12h20M4 7h16M4 17h16" />
    </svg>
  );
}

const socialIcon = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  web: WebIcon,
};

function socialLabel(type: "facebook" | "instagram" | "web") {
  return type === "facebook" ? "Facebook" : type === "instagram" ? "Instagram" : "Sitio web";
}

export function ClientsFeatured() {
  const { index, setIndex, onMouseEnter, onMouseLeave } = useAutoAdvance(slides.length);
  const { dragOffset, dragging, dragHandlers } = useDragSlide(slides.length, setIndex);

  return (
    <section className="clients-featured">
      <h2 className="clients-featured-title">
        <Multiline text={clientsSection.title} />
      </h2>

      <div
        className={`clients-slider select-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...dragHandlers}
      >
        <div
          className={`clients-slider-track flex h-full ${dragging ? "" : "transition-transform duration-500 ease-out lg:duration-700"}`}
          style={{
            width: `${slides.length * 100}%`,
            transform: `translateX(calc(-${index} * (100% / ${slides.length}) + ${dragOffset}px))`,
          }}
        >
          {slides.map((s) => (
            <div
              key={s.id}
              className="clients-slider-slide relative h-full shrink-0"
              role="img"
              aria-label={s.cover.alt}
              style={{
                width: `calc(100% / ${slides.length})`,
                backgroundImage: `url(${s.cover.src})`,
              }}
            >
              <span className="client-shade" />
            </div>
          ))}
        </div>

        <div key={`logo-${index}`} className="clients-slider-logo">
          <Image
            src={slides[index].logo.src}
            alt={slides[index].logo.alt}
            fill
            sizes="(max-width: 1024px) 64px, 128px"
            className="object-contain"
          />
        </div>

        <div
          key={`content-${index}`}
          className="clients-slider-content"
        >
          <div className="clients-slider-info">
            <h3 className="clients-slider-name">
              {slides[index].name.split(" ").map((word, i) => (
                <span key={i}>
                  {i > 0 ? <br /> : null}
                  {word}
                </span>
              ))}
            </h3>
            <p className="clients-slider-description">
              {slides[index].description}
            </p>
          </div>
          <div className="clients-slider-socials">
            {slides[index].socials.map((social) => {
              const Icon = socialIcon[social.type];
              return (
                <a
                  key={social.type}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clients-slider-social"
                  aria-label={socialLabel(social.type)}
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
