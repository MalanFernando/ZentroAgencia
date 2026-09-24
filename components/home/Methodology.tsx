import Link from 'next/link';
import { OrbitCarousel } from '@/components/shared/OrbitCarousel';
import homeData from '@/data/home.json';
import { RollText } from '@/components/shared/motion/RollText';

const { methodology } = homeData;

export function Methodology() {
  return (
    <section className="methodology mt-16">
      <div data-reveal="fade" className="orbit-shell">
        <OrbitCarousel tiles={methodology.tiles} />
        <div className="orbit-text">
          <h2 data-reveal className="methodology-title">
            {methodology.kicker}{' '}
            <span className="methodology-highlight">
              {methodology.highlight}
            </span>
          </h2>
          <p data-reveal className="methodology-body">{methodology.body}</p>
          <Link href={methodology.ctaHref} className="methodology-cta">
            <RollText text={methodology.ctaLabel} />
          </Link>
        </div>
      </div>
    </section>
  );
}

