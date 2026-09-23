import Link from "next/link";
import { OrbitCarousel } from "@/components/shared/OrbitCarousel";
import homeData from "@/data/home.json";

const { methodology } = homeData;

export function Methodology() {
  return (
    <section className="methodology mt-20">
      <div className="orbit-shell">
        <OrbitCarousel tiles={methodology.tiles} />
        <div className="orbit-text">
          <h2 className="methodology-title">
            {methodology.kicker}{" "}
            <span className="methodology-highlight">{methodology.highlight}</span>
          </h2>
          <p className="methodology-body">{methodology.body}</p>
          <Link href={methodology.ctaHref} className="methodology-cta">
            {methodology.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
