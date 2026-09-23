import plansData from "@/data/plans";

export function PlansHero() {
  return (
    <section className="plans-hero mx-auto w-full max-w-7xl px-4 pb-6 pt-24 lg:px-7 lg:pb-12 lg:pt-32">
      <h1 className="text-[clamp(1.5rem,1rem_+_2vw,2.25rem)] font-bold leading-tight text-white">
        {plansData.hero.title.split("\n").map((line, i) => (
          <span key={i}>
            {i > 0 ? <br /> : null}
            {line}
          </span>
        ))}
      </h1>
      <p className="mt-4 max-w-2xl text-base text-grey lg:mt-6">
        {plansData.hero.paragraph}
      </p>
    </section>
  );
}
