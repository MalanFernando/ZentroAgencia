import { Multiline } from '@/components/shared/Multiline';
import { LogosMarquee } from './LogosMarquee';
import homeData from '@/data/home.json';
import { Words } from '@/components/shared/motion/Words';

const { clients } = homeData;

export function Clients() {
  return (
    <section className="py-12 md:py-20 mt-10">
      <div className="mx-auto max-w-7xl px-4 lg:px-7">
        <h2 data-reveal="words" className="text-4xl font-bold text-white md:text-3xl">
          <Words text={clients.title} />
        </h2>
        <p data-reveal className="mt-3 max-w-md text-base leading-relaxed text-grey">
          <Multiline text={clients.subtitle} />
        </p>
      </div>

      <div data-reveal="fade" className="mx-auto mt-8 max-w-7xl px-4 lg:px-7">
        <LogosMarquee
          logos={clients.logos}
          sizeClass="logos-marquee-item--sm"
        />
      </div>
    </section>
  );
}

