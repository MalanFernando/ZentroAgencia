import contactosData from '@/data/contactos.json';
import { Shape } from '@/components/shared/Shape';

export function ContactosHero() {
  const { hero } = contactosData;
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-16 lg:px-7 lg:pt-32">
      <div className="flex items-start gap-[clamp(0.5rem,1.5vw,1.5rem)]">
        <h1 className="text-[clamp(2.5rem,8vw_+_1rem,10rem)] font-light leading-[1.05]">
          {hero.title}
        </h1>
        <Shape
          name="contact-3lines"
          className="h-auto w-[clamp(2.5rem,1.5rem_+_3vw,3.5rem)] flex-none"
        />
      </div>

      <div className="max-w-[200px] sm:max-w-[350px] mt-[clamp(1rem,2vw,2rem)] flex items-start justify-between gap-6">
        <p className="text-[clamp(1.5rem,1rem_+_1vw,3rem)] font-normal leading-tight text-white">
          {hero.subtitle}
        </p>
        <Shape
          name="contact-arrow"
          className="h-auto w-[38%] max-w-[25rem] flex-none absolute left-[40%] top-[30%]"
        />
      </div>
    </section>
  );
}

