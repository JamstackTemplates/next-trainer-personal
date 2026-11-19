import type { ReactNode } from 'react';
import type { TemperColour } from '../content/business';
import { TEMPER_VAR } from './art/temper-helpers';
import { HeatSeam } from './art/temper-scale';

/**
 * Inner-page heading block: chalk paper, the section name ghosted at poster scale running off
 * the left gutter, a huge Dela Gothic One title, temper-run underline and a stamped plate icon.
 */
export function PageHead({
  eyebrow,
  title,
  children,
  id,
  icon,
  plateColour = 'purple',
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  /** Small section-specific icon rendered inside a stamped plate badge. */
  icon?: ReactNode;
  plateColour?: TemperColour;
}) {
  return (
    <header className="chalk-surface relative overflow-hidden">
      <p
        aria-hidden="true"
        className="ghost-word absolute top-[clamp(1rem,3vw,2.5rem)] left-[-1.2vw] text-[clamp(6rem,24vw,24rem)] text-ink/[0.05]"
      >
        {eyebrow}
      </p>
      <div
        aria-hidden="true"
        className="forge-glow pointer-events-none absolute top-[-20%] right-[-10%] aspect-square w-[50vw] opacity-70"
      />
      <div className="wrap-wide relative pt-[clamp(3rem,9vw,8rem)] pb-[clamp(2.5rem,6vw,5rem)]">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="min-w-0 flex-1">
            <p className="eyebrow flex items-center gap-3">
              <span className="inline-block h-1.5 w-10" style={{ background: TEMPER_VAR[plateColour] }} aria-hidden="true" />
              {eyebrow}
            </p>
            <h1
              id={id}
              className="font-display-poster mt-5 -ml-[0.04em] max-w-[18ch] text-[clamp(2rem,6.6vw,6.8rem)] text-balance break-words text-ink"
            >
              {title}
            </h1>
            <div aria-hidden="true" className="mt-7 h-2.5 w-full max-w-md bg-[image:var(--temper-run)]" />
            {children ? (
              <div className="mt-7 max-w-(--measure) text-[clamp(1.08rem,1.8vw,1.35rem)] leading-relaxed text-ink/75">
                {children}
              </div>
            ) : null}
          </div>

          {icon ? (
            <div
              aria-hidden="true"
              className="hidden h-36 w-36 shrink-0 items-center justify-center rounded-full border-[10px] bg-band text-band-ink shadow-[8px_8px_0_0_var(--ink)] sm:flex lg:h-44 lg:w-44"
              style={{ borderColor: TEMPER_VAR[plateColour] }}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-band-line bg-band-surface [&>svg]:h-10 [&>svg]:w-10">
                {icon}
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <HeatSeam />
    </header>
  );
}
