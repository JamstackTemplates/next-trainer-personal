import type { Metadata } from 'next';
import { ChalkBowlIcon } from '../../components/art/icons';
import { FaqAccordion } from '../../components/faq-accordion';
import {
  CoachProfiles,
  FirstSessionSequence,
  MethodInDepth,
  StudioDetailsBand,
} from '../../components/inner-sections';
import { PageHead } from '../../components/page-head';
import { business } from '../../content/business';
import { coaches } from '../../content/coaches';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Coaching',
  description:
    'Meet coaches Mara Okafor and Theo Lindqvist, explore our four-phase temper method, tour the Strip District studio and read the FAQ.',
  alternates: { canonical: absoluteUrl('/coaching/') },
};

export default function CoachingPage() {
  return (
    <>
      <PageHead
        eyebrow="Coaching"
        title="Heat, hammer, temper, repeat."
        icon={<ChalkBowlIcon className="h-6 w-6 text-temper-straw" />}
        plateColour="straw"
      >
        <p>
          Good strength coaching is calm, patient and written down. Here is how our four-phase
          method works, who will be standing beside your rack and what happens in hour one.
        </p>
      </PageHead>

      <MethodInDepth
        eyebrow="The temper method"
        heading="Four phases from day one to test day"
        intro="Like tempering steel, durable strength comes from applying the right amount of stress at the right temperature—never rushing past the stage you are in."
        phases={business.methodPhases}
      />

      <CoachProfiles
        eyebrow="Your coaches"
        heading="Two coaches on the floor"
        coaches={coaches}
      />

      <FirstSessionSequence
        eyebrow="What to expect"
        heading="Your first session, step by step"
        steps={business.firstSessionSteps}
      />

      <StudioDetailsBand
        eyebrow="2214 Penn Avenue"
        heading="Inside the Strip District studio"
        intro="A quiet, brick-walled barbell room built for focused work: two racks, one deadlift platform, a 40-foot sled lane and never more than four lifters at once."
      />

      <section aria-labelledby="coaching-faq-heading" className="chalk-surface py-16 sm:py-24">
        <div className="wrap max-w-4xl">
          <p className="eyebrow">Common questions</p>
          <h2
            id="coaching-faq-heading"
            className="font-display-tight mt-2 mb-8 text-[clamp(2rem,4.5vw,3.4rem)] text-ink"
          >
            Straight answers before we talk
          </h2>
          <FaqAccordion entries={business.faq} headingId="coaching-faq-heading" />
        </div>
      </section>
    </>
  );
}
