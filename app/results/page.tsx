import type { Metadata } from 'next';
import { LogbookIcon } from '../../components/art/icons';
import { ResultsConsultCta, TestimonialsWall } from '../../components/inner-sections';
import { PageHead } from '../../components/page-head';
import { ResultsLogbooks } from '../../components/results-logbooks';
import { business } from '../../content/business';
import { programs } from '../../content/programs';
import { testimonials } from '../../content/testimonials';
import { transformations } from '../../content/transformations';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Results',
  description:
    'Client strength logbooks, before-and-after lift numbers and testimonials from Forge Strength Coaching in Pittsburgh.',
  alternates: { canonical: absoluteUrl('/results/') },
};

const programNames = Object.fromEntries(programs.map(p => [p.id, p.name]));

export default function ResultsPage() {
  return (
    <>
      <PageHead
        eyebrow="Results"
        title="Logbooks, not before-and-after selfies."
        icon={<LogbookIcon className="h-6 w-6 text-temper-straw" />}
        plateColour="bronze"
      >
        <p>
          We measure progress by what moves on the bar, how your body feels outside the gym and
          whether you are still lifting a year from now.
        </p>
      </PageHead>

      <section aria-label="Client transformation logbooks" className="chalk-surface">
        <ResultsLogbooks entries={transformations} programs={programs} />
      </section>

      <TestimonialsWall
        eyebrow="Eight clients on the board"
        heading="Words from the racks"
        items={testimonials}
        programNames={programNames}
      />

      <section aria-label="Results disclaimer" className="chalk-surface border-b-2 border-ink py-8">
        <div className="wrap">
          <p className="max-w-3xl font-mono text-xs leading-relaxed text-muted">
            {business.disclaimers.results}
          </p>
        </div>
      </section>

      <ResultsConsultCta
        eyebrow="Start your own logbook"
        heading="Ready for week one?"
        body="Send a short enquiry about your goals and schedule. A coach will reply within two working days to set up a free 30-minute consultation call."
        ctaLabel="Book a free consultation call"
      />
    </>
  );
}
