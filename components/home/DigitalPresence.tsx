import { LoopFromVideo } from '@/components/shared/LoopFromVideo';
import { flattenMultiline } from '@/components/shared/Multiline';
import homeData from '@/data/home.json';
import { Shape } from '@/components/shared/Shape';
import { Words } from '@/components/shared/motion/Words';
import { VideoGlow } from '@/components/shared/motion/VideoGlow';

const { digitalPresence } = homeData;

export function DigitalPresence() {
  return (
    <section className="digital-presence">
      <div className="dp-col dp-col-left">
        <div className="dp-title-row">
          <h2 data-reveal="words" className="dp-title">
            <Words text={digitalPresence.title} />
          </h2>
          <Shape name="digital-presence-3lines" className="dp-doodle-small" />
        </div>
        <p data-reveal className="dp-lead">
          {flattenMultiline(digitalPresence.paragraphRight)}
        </p>
        <Shape name="digital-presence-arrow" className="dp-doodle-big" />
      </div>
      <div className="dp-col dp-col-right sm:mt-16 md:mt-16">
        <p data-reveal className="dp-side">
          {flattenMultiline(digitalPresence.paragraphLeft)}
        </p>
        <div data-reveal="image" className="dp-media">
          <LoopFromVideo
            src={digitalPresence.photo.src}
            startAt={3}
            className="dp-video"
          />
          <VideoGlow className="dp-glow" />
          <Shape name="digital-presence-sticker" draw="pop" className="dp-badge" />
        </div>
      </div>
    </section>
  );
}
