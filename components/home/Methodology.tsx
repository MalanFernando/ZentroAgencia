import Link from 'next/link';
import { OrbitCarousel } from '@/components/shared/OrbitCarousel';
import homeData from '@/data/home.json';
import { RollText } from '@/components/shared/motion/RollText';
import { InfoDialog } from '@/components/shared/InfoDialog';

const { methodology, aidaDetail } = homeData;

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
          <div data-reveal>
            <InfoDialog
              label={aidaDetail.ctaLabel}
              title={
                <>
                  {aidaDetail.title}{' '}
                  <span className="methodology-highlight">{aidaDetail.highlight}</span>
                </>
              }
            >
              <p className="info-item info-dialog-intro">{aidaDetail.intro}</p>
              <ol className="aida-grid">
                {aidaDetail.items.map((item, i) => (
                  <li
                    key={item.word}
                    className="info-item aida-card"
                    style={{ '--i': i + 1 } as React.CSSProperties}
                  >
                    <span className="aida-letter" aria-hidden="true">
                      {item.letter}
                    </span>
                    <h3 className="aida-word">{item.word}</h3>
                    <p>{item.body}</p>
                  </li>
                ))}
              </ol>
            </InfoDialog>
          </div>
          <Link href={methodology.ctaHref} className="methodology-cta">
            <RollText text={methodology.ctaLabel} />
          </Link>
        </div>
      </div>
    </section>
  );
}

