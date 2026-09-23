import { LoopFromVideo } from '@/components/shared/LoopFromVideo';
import { flattenMultiline } from '@/components/shared/Multiline';
import homeData from '@/data/home.json';
import { Shape } from '@/components/shared/Shape';

const { digitalPresence } = homeData;

export function DigitalPresence() {
  return (
    <section className="digital-presence">
      <div className="dp-col dp-col-left">
        <div className="dp-title-row">
          <h2 className="dp-title">{digitalPresence.title}</h2>
          <Shape name="digital-presence-3lines" className="dp-doodle-small" />
        </div>
        <p className="dp-lead">
          {flattenMultiline(digitalPresence.paragraphRight)}
        </p>
        <Shape name="digital-presence-arrow" className="dp-doodle-big" />
      </div>
      <div className="dp-col dp-col-right sm:mt-16 md:mt-16">
        <p className="dp-side">
          {flattenMultiline(digitalPresence.paragraphLeft)}
        </p>
        <div className="dp-media">
          <LoopFromVideo
            src={digitalPresence.photo.src}
            startAt={3}
            className="dp-video"
          />
          <Shape name="digital-presence-sticker" className="dp-badge" />
        </div>
      </div>
    </section>
  );
}
