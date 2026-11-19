import { programById } from '../content/programs';
import type { Transformation } from '../content/transformations';
import { Plate } from './art/barbell';
import { LogbookChart } from './logbook-chart';

/**
 * Training logbook page component for client transformations.
 * Ruled paper, spiral wire binding along the left edge, program plate glyph,
 * before/after bar chart, coaching story and quote.
 */
export function LogbookPage({
  entry,
  tilt = 'none',
  className = '',
}: {
  entry: Transformation;
  tilt?: 'none' | 'right' | 'left';
  className?: string;
}) {
  const program = programById(entry.programId);
  const colour = program?.plateColour ?? 'purple';
  const tiltClass =
    tilt === 'right'
      ? 'lg:rotate-[1.1deg]'
      : tilt === 'left'
        ? 'lg:-rotate-[0.9deg]'
        : '';

  return (
    <article
      className={`logbook-sheet relative pl-12 pr-6 py-6 sm:pl-14 sm:pr-8 sm:py-8 ${tiltClass} ${className}`}
    >
      {/* Spiral binding punched holes & iron rings along the left edge */}
      <div
        className="pointer-events-none absolute inset-y-4 left-2 flex w-6 flex-col justify-between py-2"
        aria-hidden="true"
      >
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="relative flex items-center">
            <span className="h-1.5 w-4 -ml-3 rounded-full bg-ink" />
            <span className="h-3.5 w-3.5 rounded-full border-2 border-ink bg-bg" />
          </div>
        ))}
      </div>

      {/* Header row: client stamp + program plate glyph */}
      <header className="flex flex-wrap items-start justify-between gap-4 border-b-2 border-ink pb-4">
        <div>
          <p className="font-mono text-xs font-bold tracking-[0.14em] text-muted uppercase">
            LOGBOOK · {entry.weeks} WEEKS · AGE {entry.ageBand}
          </p>
          <h3 className="font-display-tight mt-1 text-2xl text-ink sm:text-3xl">
            {entry.client}
          </h3>
          <p className="mt-1 font-mono text-xs font-bold text-primary-ink uppercase">
            Goal: {entry.goal}
          </p>
        </div>

        {program ? (
          <div className="flex items-center gap-2.5">
            <Plate
              label={program.plateLabel}
              weightLb={program.plateWeightLb}
              colour={program.plateColour}
              size={58}
            />
            <span className="hidden font-mono text-[0.7rem] font-bold tracking-[0.08em] text-muted uppercase sm:inline">
              {program.name}
            </span>
          </div>
        ) : null}
      </header>

      {/* Before / After metric bar charts */}
      <div className="mt-6">
        <p className="mb-3 font-mono text-[0.72rem] font-bold tracking-[0.14em] text-muted uppercase">
          Tracked numbers (ghost = day 1 · solid = week {entry.weeks})
        </p>
        <LogbookChart metrics={entry.metrics} colour={colour} />
      </div>

      {/* Story & client quote */}
      <p className="mt-6 text-[0.98rem] leading-relaxed text-ink/90">{entry.story}</p>

      <blockquote className="mt-5 border-l-4 border-primary pl-4 text-base font-semibold italic text-ink">
        “{entry.quote}”
      </blockquote>
    </article>
  );
}
