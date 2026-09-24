import plansData from "@/data/plans";
import { Words } from "@/components/shared/motion/Words";

export function PlansHero() {
  return (
    <section className="plans-hero mx-auto w-full max-w-7xl px-4 pb-6 pt-24 lg:px-7 lg:pb-12 lg:pt-32">
      <h1 data-reveal="words" className="text-[clamp(1.5rem,1rem_+_2vw,2.25rem)] font-bold leading-tight text-white">
        <Words text={plansData.hero.title} />
      </h1>
      <p data-reveal className="mt-4 max-w-2xl text-base text-grey lg:mt-6">
        {plansData.hero.paragraph}
      </p>
    </section>
  );
}
