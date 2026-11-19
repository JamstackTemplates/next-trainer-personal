import type { FaqEntry } from '../content/business';

/**
 * Static <details>/<summary> FAQ styled as ruled logbook lines.
 * Zero JavaScript required; follows modern-web-guidance accordion practices
 * (no headings inside <summary>, custom rotating marker before label, ::details-content transition).
 */
export function FaqAccordion({
  entries,
  headingId,
}: {
  entries: readonly FaqEntry[];
  headingId: string;
}) {
  return (
    <div
      className="logbook-sheet divide-y-2 divide-ink/25 pl-12 pr-6 py-4 sm:pl-16 sm:pr-10 sm:py-6"
      aria-labelledby={headingId}
    >
      {/* Spiral wire holes on left edge */}
      <div
        className="pointer-events-none absolute inset-y-4 left-2 flex w-6 flex-col justify-between py-2"
        aria-hidden="true"
      >
        {Array.from({ length: 7 }).map((_, idx) => (
          <div key={idx} className="relative flex items-center">
            <span className="h-1.5 w-4 -ml-3 rounded-full bg-ink" />
            <span className="h-3.5 w-3.5 rounded-full border-2 border-ink bg-bg" />
          </div>
        ))}
      </div>

      {entries.map((entry, idx) => (
        <details key={entry.id} className="faq-item py-4 first:pt-2 last:pb-2" open={idx === 0}>
          <summary className="py-1 text-lg font-bold text-ink hover:text-primary-ink sm:text-xl">
            <span className="font-mono text-xs font-bold tracking-[0.12em] text-muted uppercase">
              0{idx + 1}
            </span>
            <span>{entry.question}</span>
          </summary>
          <p className="mt-3 pl-7 text-base leading-relaxed text-muted">{entry.answer}</p>
        </details>
      ))}
    </div>
  );
}
