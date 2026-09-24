import Image from "next/image";
import type { CSSProperties } from "react";

const SHAPES = {
  "about-left-parentesis": ["/shapes/about-left-parentesis.svg", 30, 60],
  "about-right-parentesis": ["/shapes/about-right-parentesis.svg", 30, 60],
  "contact-3lines": ["/shapes/contact-3lines.svg", 63, 51],
  "contact-arrow": ["/shapes/contact-arrow.svg", 387, 155],
  "contact-line-h": ["/shapes/contact-line-h.svg", 109, 6],
  "digital-presence-3lines": ["/shapes/digital-presence-3lines.svg", 45, 37],
  "digital-presence-arrow": ["/shapes/digital-presence-arrow.svg", 291, 129],
  "digital-presence-sticker": ["/shapes/digital-presence-sticker.svg", 72, 72],
  "hero-home-curly-1": ["/shapes/hero-home-curly-1.svg", 159, 96],
  "hero-home-line-down": ["/shapes/hero-home-line-down.svg", 179, 31],
  "hero-service-3lines-down": ["/shapes/hero-service-3lines-down.svg", 49, 43],
  "hero-service-arrow": ["/shapes/hero-service-arrow.svg", 169, 161],
  "mission-arrow-curly": ["/shapes/mission-arrow-curly.svg", 169, 161],
  "testimonial-3lines-down": ["/shapes/testimonial-3lines-down.svg", 49, 43],
  "testimonial-3lines-up": ["/shapes/testimonial-3lines-up.svg", 47, 40],
  "testimonial-down-curved": ["/shapes/testimonial-down-curved.svg", 120, 88],
  "testimonial-left-arrow-curved": ["/shapes/testimonial-left-arrow-curved.svg", 246, 326],
  "testimonial-right-arrow-curved": ["/shapes/testimonial-right-arrow-curved.svg", 323, 363],
  "video-card-1": ["/shapes/video-card-1.svg", 44, 44],
  "video-card-2": ["/shapes/video-card-2.svg", 120, 88],
  "video-card-3": ["/shapes/video-card-3.svg", 100, 97],
  "video-card-4": ["/shapes/video-card-4.svg", 44, 44],
  "vision-arrow-down": ["/shapes/vision-arrow-down.svg", 100, 97],
  check: ["/icons/check.svg", 21, 21],
  whatsapp: ["/icons/whatsapp.svg", 36, 36],
} as const;

export type ShapeName = keyof typeof SHAPES;

export function Shape({
  name,
  className,
  style,
}: {
  name: ShapeName;
  className?: string;
  style?: CSSProperties;
}) {
  const [src, width, height] = SHAPES[name];
  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      width={width}
      height={height}
      draggable={false}
      className={["shape object-contain", className].filter(Boolean).join(" ")}
      style={style}
    />
  );
}
