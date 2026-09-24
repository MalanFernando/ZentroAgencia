import Link from 'next/link';
import homeData from '@/data/home.json';
import { Shape } from '@/components/shared/Shape';
import { Words } from '@/components/shared/motion/Words';
import { RollText } from '@/components/shared/motion/RollText';

const { hiring } = homeData;

/**
 * Cómo contratar: en escritorio el título queda fijo a la izquierda mientras
 * los pasos avanzan en una línea de tiempo vertical; en una columna todo va
 * centrado.
 */
export function Hiring() {
  return (
    <section aria-labelledby="hiring-title" className="mt-16 py-12 md:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20 lg:px-7">
        <div className="text-center lg:sticky lg:top-32 lg:self-start lg:text-left">
          <h2
            id="hiring-title"
            data-reveal="words"
            className="relative inline-block text-3xl font-bold leading-tight text-white md:text-4xl 2md:text-5xl"
          >
            <Words text={hiring.title} />
            <Shape
              name="digital-presence-3lines"
              className="absolute left-full top-[-0.45em] ml-2 h-[0.8em] w-auto"
            />
          </h2>
          <p data-reveal className="mx-auto mt-4 max-w-md text-base leading-relaxed text-grey lg:mx-0">
            {hiring.subtitle}
          </p>
          <div data-reveal className="mt-8">
            <Link href={hiring.ctaHref} className="methodology-cta">
              <RollText text={hiring.ctaLabel} />
            </Link>
          </div>
        </div>

        <div className="hiring-timeline mx-auto w-full max-w-2xl lg:max-w-none">
          <span className="hiring-rail" aria-hidden="true">
            <span className="hiring-rail-fill" />
          </span>
          <ol className="hiring-steps">
            {hiring.steps.map((step, i) => (
              <li key={step.title} data-reveal className="hiring-step">
                <span className="hiring-node" aria-hidden="true" />
                <span className="hiring-number" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 text-xl font-bold text-white md:text-2xl">{step.title}</h3>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-grey">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
