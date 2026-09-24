import Image from 'next/image';
import homeData from '@/data/home.json';
import { flattenMultiline, Multiline } from '@/components/shared/Multiline';
import { RingText } from '@/components/shared/RingText';
import { Shape } from '@/components/shared/Shape';
import { Words } from '@/components/shared/motion/Words';
import { ImageCycle } from '@/components/shared/motion/ImageCycle';
import serviciosData from '@/data/servicios';

const { about } = homeData;
const floats = serviciosData.hero.floatingImages;

// La portada se turna con dos fotos del Hero de Servicios.
const posterCycle = [about.posterImage, floats[2], floats[0]];

export function About() {
  return (
    <section className="overflow-x-clip py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-12">
        <div>
          <div className="flex items-center justify-around gap-4 md:gap-6 lg:gap-10">
            <div data-reveal="image" className="relative aspect-[3/4] w-[32%] max-w-36 -rotate-3 overflow-hidden rounded-[4px] -ml-6 md:ml-0">
              <Image
                src={about.eyebrowImageA.src}
                alt={about.eyebrowImageA.alt}
                fill
                sizes="(max-width: 1024px) 30vw, 15vw"
                className="object-cover [mask-image:linear-gradient(to_bottom,#000_30%,transparent_95%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_30%,transparent_95%)]"
              />
            </div>

            <h2 data-reveal="words" className="text-center text-3xl font-bold leading-tight text-white md:text-4xl 2md:text-5xl">
              <Words text={about.title} />
            </h2>

            <div data-reveal="image" className="relative aspect-[3/4] w-[32%] max-w-36 rotate-2 overflow-hidden rounded-[4px] -mr-6 md:mr-0">
              <Image
                src={about.eyebrowImageB.src}
                alt={about.eyebrowImageB.alt}
                fill
                sizes="(max-width: 1024px) 30vw, 15vw"
                className="object-cover [mask-image:linear-gradient(to_bottom,#000_30%,transparent_95%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_30%,transparent_95%)]"
              />
            </div>
          </div>

          <p data-reveal className="mx-auto mt-6 px-4 max-w-3xl text-center text-base leading-relaxed text-grey">
            {flattenMultiline(about.body)}
          </p>
        </div>

        <div className="relative mx-auto mt-40 grid max-w-[60.5rem] grid-cols-1 gap-4 2md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)_minmax(0,1.2fr)] 2md:gap-x-16 2md:gap-y-8">
          <div className="order-1 mb-24 flex items-center justify-center gap-3 2md:absolute 2md:right-0 2md:top-0 2md:justify-start 2md:mb-0">
            <Shape
              name="about-left-parentesis"
              draw="center"
              className="h-14 w-auto shrink-0"
            />
            <p data-reveal className="max-w-xs text-center text-base italic text-white 2md:text-left">
              &ldquo;
              <Multiline text={about.quote} />
              &rdquo;
            </p>
            <Shape name="about-right-parentesis" draw="center" className="h-14 w-auto shrink-0" />
          </div>

          <div className="relative order-2 mx-auto aspect-[485/610] w-[min(70vw,100%)] max-w-[19rem] 2md:col-start-1 2md:row-start-1 2md:row-span-3 2md:mx-0">
            <div data-reveal="image" className="absolute inset-0 -rotate-2 overflow-hidden rounded-[4px]">
              <ImageCycle images={posterCycle} sizes="(max-width: 920px) 75vw, 400px" interval={3000} />
            </div>
            <div className="absolute bottom-0 left-0 h-32 w-32 -translate-x-1/2 translate-y-1/2 text-white 2md:h-36 2md:w-36">
              <RingText
                words={about.ringWords}
                className="h-full w-full animate-spin"
                style={{ animationDuration: '20s' }}
              />
            </div>
            <p className="absolute top-[95%] left-[50%] w-max max-w-[min(90%,12rem)] -translate-y-1/2 text-sm leading-snug text-grey md:max-w-[16rem] 2md:left-[50%] 2md:max-w-[18rem]">
              <Multiline text={about.sideParagraph} />
            </p>
            <Shape name="mission-arrow-curly" className="absolute w-[45%] -bottom-55 -right-10 2md:bottom-auto 2md:right-auto 2md:left-[118%] 2md:top-[68%] 2md:w-1/2 2md:rotate-0" />
          </div>

          <div data-reveal className="order-3 mx-12 mt-50 max-w-none 2md:col-start-2 2md:row-start-1 2md:mt-8 2md:mx-0">
            <h3 className="text-xl font-bold text-white md:text-2xl">
              {about.mission.title}
            </h3>
            <p className="mt-2 text-base leading-relaxed text-grey">
              <Multiline text={about.mission.body} />
            </p>
          </div>

          <div className="relative order-4 mt-12 justify-self-center 2md:col-start-2 2md:col-span-2 2md:row-start-1">
            <Shape name="vision-arrow-down" className="absolute w-[clamp(7rem,7vw,5rem)] -bottom-15 -left-15 rotate-25" />
          </div>

          <div data-reveal className="order-5 mx-12 mt-16 max-w-none justify-self-end 2md:col-start-3 2md:row-start-2 2md:max-w-lg 2md:mx-0">
            <h3 className="text-2xl font-bold text-white md:text-3xl">
              {about.vision.title}
            </h3>
            <p className="mt-2 text-base leading-relaxed text-grey">
              <Multiline text={about.vision.body} />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

