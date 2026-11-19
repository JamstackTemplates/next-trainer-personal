import type { Metadata } from 'next';
import {
  ChalkboardTestimonials,
  CoachesTeaser,
  FeaturedLogbook,
  HomeHero,
  MethodBand,
  ProgramsPreview,
  ProofStrip,
  VisitBand,
} from '../components/home-sections';
import { business } from '../content/business';
import { coaches } from '../content/coaches';
import { programs } from '../content/programs';
import { testimonials } from '../content/testimonials';
import { transformations } from '../content/transformations';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/') },
};

const programNames = Object.fromEntries(programs.map(p => [p.id, p.name]));
const featuredTestimonials = testimonials.filter(t => t.featured);
const featuredLogbook = transformations.find(t => t.id === 'dana-r') ?? transformations[0];

export default function HomePage() {
  return (
    <>
      <HomeHero>
        <HomeHero.Lead>
          <HomeHero.StatusLine />
          <HomeHero.Heading lineOne="Get strong." lineTwo="Stay strong." />
          <HomeHero.Underline />
        </HomeHero.Lead>

        <HomeHero.Art />

        <HomeHero.Body>
          <HomeHero.Introduction>
            Barbell coaching for real adults: two coaches, one Strip District studio, a plan built
            around your week.
          </HomeHero.Introduction>
          <HomeHero.Actions
            primaryLabel="Book a free consultation call"
            secondaryLabel="See the programs"
          />
        </HomeHero.Body>
      </HomeHero>

      <ProofStrip>
        <ProofStrip.Stat
          value="2,140 lb"
          caption="Lifted for the first time by clients in 2026 (sample figure)"
        />
        <ProofStrip.Stat
          value="94%"
          caption="Still training with us after a full year (sample figure)"
          featured
          bordered
        />
        <ProofStrip.Stat
          value="2 : 4"
          caption="2 coaches, never more than 4 lifters on the floor per session"
          bordered
        />
      </ProofStrip>

      <ProgramsPreview
        eyebrow="Loaded barbell"
        heading="Six ways to load the bar"
        legend="Select any plate to inspect sessions, block length, monthly rate and open spots."
        ctaLabel="Compare all programs"
        programs={programs}
      />

      <MethodBand
        eyebrow="The temper scale"
        heading="Four phases, zero guesswork"
        ctaLabel="How coaching works"
        phases={business.methodPhases}
      />

      <FeaturedLogbook
        eyebrow="From the logbook"
        heading="Real weight, written down"
        note="Every client lifts from a paper and app logbook—no mirrors, no mystery routines, just measurable progress week after week."
        ctaLabel="Read the logbooks"
        entry={featuredLogbook}
      />

      <ChalkboardTestimonials
        eyebrow="Chalkboard notes"
        heading="From the morning racks"
        items={featuredTestimonials}
        programNames={programNames}
      />

      <CoachesTeaser
        eyebrow="Two coaches"
        heading="Mara Okafor & Theo Lindqvist"
        ctaLabel="Meet the coaches"
        coaches={coaches}
      />

      <VisitBand
        eyebrow="Strip District, Pittsburgh"
        heading="Two racks on Penn Avenue"
        ctaLabel="Book a free consultation call"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }}
      />
    </>
  );
}
