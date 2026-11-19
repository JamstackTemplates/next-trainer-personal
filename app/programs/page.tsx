import type { Metadata } from 'next';
import { Barbell } from '../../components/art/barbell';
import { PlateIcon } from '../../components/art/icons';
import { NotSureBand } from '../../components/inner-sections';
import { PageHead } from '../../components/page-head';
import { ProgramsCatalog } from '../../components/programs-catalog';
import { business } from '../../content/business';
import { programs } from '../../content/programs';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Programs',
  description:
    '1:1 barbell coaching, Small Crew Strength, Return to Lifting, Meet Prep and Forge Remote programming in Pittsburgh.',
  alternates: { canonical: absoluteUrl('/programs/') },
};

export default function ProgramsPage() {
  return (
    <>
      <PageHead
        eyebrow="Programs"
        title="Pick the block that fits your week."
        icon={<PlateIcon className="h-6 w-6 text-temper-straw" />}
        plateColour="purple"
      >
        <p>
          Six structured strength programs—from learning an empty bar to stepping onto a meet
          platform—each written for your numbers and schedule.
        </p>
      </PageHead>

      <section aria-label="Program barbell jump bar" className="chalk-surface border-b-2 border-ink py-12 sm:py-16">
        <div className="wrap">
          <p className="mb-6 font-mono text-xs font-bold tracking-[0.14em] text-muted uppercase">
            Select a plate to jump straight to its spec sheet
          </p>
          <Barbell programs={programs} linkMode="anchor" scale="large" />
        </div>
      </section>

      <ProgramsCatalog programs={programs} />

      <NotSureBand
        eyebrow="Free 30-minute consultation call"
        heading="Not sure which?"
        body="Tell us your week and your goal. We'll recommend one on the call."
        ctaLabel="Book a free consultation call"
      />

      <section aria-label="Pricing and medical clearance notes" className="chalk-surface py-10">
        <div className="wrap">
          <p className="max-w-3xl font-mono text-xs leading-relaxed text-muted">
            {business.disclaimers.pricingAndClearance}
          </p>
        </div>
      </section>
    </>
  );
}
