import type { ReactNode } from 'react';
import { business, type FirstSessionStep, type MethodPhase } from '../content/business';
import type { Coach } from '../content/coaches';
import type { Testimonial } from '../content/testimonials';
import { Plate } from './art/barbell';
import { ChalkHandprint } from './art/chalk-handprint';
import { CoachPortrait } from './art/coach-portraits';
import { CheckIcon, MapPinIcon } from './art/icons';
import { KnurlStrip } from './art/knurl-strip';
import { StudioPlan } from './art/studio-plan';
import { TEMPER_BG_CLASS, TEMPER_VAR } from './art/temper-helpers';
import { GoogleMap } from './google-map';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';
import { TimeZoneNote } from './time-zone-note';

/* ============================================================================
   Programs Page — "Not sure which?" full-bleed temper-purple band
   ============================================================================ */
export function NotSureBand({
  eyebrow,
  heading,
  body,
  ctaLabel,
}: {
  eyebrow: ReactNode;
  heading: ReactNode;
  body: ReactNode;
  ctaLabel: ReactNode;
}) {
  return (
    <section
      aria-labelledby="programs-consult-heading"
      className="relative overflow-hidden bg-primary text-on-primary"
    >
      <KnurlStrip />
      <p
        aria-hidden="true"
        className="ghost-word absolute top-1/2 right-[-2vw] -translate-y-1/2 text-[clamp(16rem,40vw,36rem)] text-white/[0.09]"
      >
        ?
      </p>
      <div className="wrap-wide relative py-20 sm:py-28">
        <p className="font-mono text-xs font-bold tracking-[0.2em] uppercase opacity-90">{eyebrow}</p>
        <h2
          id="programs-consult-heading"
          className="font-display-poster mt-4 text-[clamp(3rem,10vw,10rem)] text-on-primary"
        >
          {heading}
        </h2>
        <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-6">
          <p className="max-w-xl text-xl leading-relaxed text-on-primary sm:text-2xl">{body}</p>
          <SiteLink href="/contact/" className="button button-on-primary min-h-14 shadow-[5px_5px_0_0_rgb(0_0_0/0.35)]">
            {ctaLabel}
          </SiteLink>
        </div>
      </div>
      <KnurlStrip />
    </section>
  );
}

/* ============================================================================
   Results Page — Iron-band Chalkboard Testimonials Wall (all 8 in varied sizes)
   ============================================================================ */
export function TestimonialsWall({
  eyebrow,
  heading,
  items,
  programNames,
}: {
  eyebrow: ReactNode;
  heading: ReactNode;
  items: readonly Testimonial[];
  programNames: Record<string, string>;
}) {
  return (
    <section aria-labelledby="results-testimonials-heading" className="iron-band chalkboard relative overflow-hidden">
      <KnurlStrip />
      <div className="wrap-wide py-16 sm:py-28">
        <p className="font-mono text-xs font-bold tracking-[0.16em] text-temper-straw uppercase">
          {eyebrow}
        </p>
        <h2
          id="results-testimonials-heading"
          className="font-display-poster chalk-text mt-3 text-[clamp(2.6rem,7vw,7rem)] text-band-ink"
        >
          {heading}
        </h2>

        <div className="mt-14 grid gap-x-10 gap-y-14 md:grid-cols-12">
          {items.map((item, idx) => {
            // Varied editorial board spans and typography scales (no uniform card grid)
            const spanClass =
              idx === 0 || idx === 3 || idx === 6
                ? 'md:col-span-7'
                : idx === 1 || idx === 2 || idx === 7
                  ? 'md:col-span-5'
                  : 'md:col-span-6';
            const textClass =
              idx === 0 || idx === 5
                ? 'text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.15]'
                : 'text-xl sm:text-2xl leading-snug';

            return (
              <figure
                key={item.id}
                className={`flex flex-col justify-between border-t border-band-line pt-6 ${spanClass} ${
                  idx % 2 === 1 ? 'md:rotate-[0.6deg]' : 'md:-rotate-[0.4deg]'
                }`}
              >
                <blockquote className={`chalk-text font-semibold text-band-ink ${textClass}`}>“{item.quote}”</blockquote>
                <figcaption className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-xs uppercase">
                  <span className="font-bold tracking-[0.14em] text-temper-straw">{item.name}</span>
                  <span className="text-band-muted">
                    {programNames[item.programId] ?? item.programId} · since {item.since}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
      <KnurlStrip />
    </section>
  );
}

/* ============================================================================
   Results Page — Consultation CTA with Chalk Handprint motif
   ============================================================================ */
export function ResultsConsultCta({
  eyebrow,
  heading,
  body,
  ctaLabel,
}: {
  eyebrow: ReactNode;
  heading: ReactNode;
  body: ReactNode;
  ctaLabel: ReactNode;
}) {
  return (
    <section className="chalk-surface relative overflow-hidden py-16 sm:py-20">
      <div className="wrap relative">
        <div className="relative overflow-hidden border-2 border-ink bg-surface p-8 shadow-[8px_8px_0_0_var(--ink)] sm:p-12">
          <ChalkHandprint
            tone="dust"
            className="absolute -right-6 -bottom-6 w-56 opacity-60 sm:w-72"
          />
          <div className="relative z-10 max-w-2xl">
            <p className="eyebrow">{eyebrow}</p>
            <h2 className="font-display-poster mt-3 text-[clamp(2.4rem,5.4vw,5.4rem)] text-ink">
              {heading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{body}</p>
            <div className="mt-7">
              <SiteLink href="/contact/" className="button">
                {ctaLabel}
              </SiteLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   Coaching Page — Vertical Temper Scale Method in Depth
   ============================================================================ */
export function MethodInDepth({
  eyebrow,
  heading,
  intro,
  phases,
}: {
  eyebrow: ReactNode;
  heading: ReactNode;
  intro: ReactNode;
  phases: readonly MethodPhase[];
}) {
  return (
    <section aria-labelledby="coaching-method-heading" className="chalk-surface py-16 sm:py-28">
      <div className="wrap-wide">
        <div className="max-w-5xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2
            id="coaching-method-heading"
            className="font-display-poster mt-3 text-[clamp(2.5rem,6.2vw,6.2rem)] text-ink"
          >
            {heading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>
        </div>

        <ol className="relative mt-16 lg:mt-20">
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-3 bg-[image:var(--temper-run-v)] sm:w-4 lg:w-5"
          />
          {phases.map(phase => (
            <li
              key={phase.id}
              className="relative grid gap-4 border-b border-line py-10 pl-8 last:border-0 sm:pl-12 md:grid-cols-12 md:gap-8 lg:py-14 lg:pl-16"
            >
              <span
                aria-hidden="true"
                className="absolute top-16 left-0 h-1 w-6 sm:w-10 lg:top-24 lg:w-14"
                style={{ background: TEMPER_VAR[phase.temperColour] }}
              />
              <div className="md:col-span-4">
                <p
                  aria-hidden="true"
                  className="font-display-poster text-[clamp(6rem,13vw,12rem)]"
                  style={{ color: TEMPER_VAR[phase.temperColour] }}
                >
                  {phase.number}
                </p>
                <p className="mt-3 font-mono text-xs font-bold tracking-[0.18em] text-muted uppercase">
                  Phase {phase.number} · {phase.tempMark}
                </p>
              </div>
              <div className="md:col-span-8 md:pt-4 lg:col-span-7">
                <h3 className="font-display-poster text-[clamp(2.2rem,4.4vw,4.2rem)] text-ink">{phase.title}</h3>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/85">{phase.description}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {phase.deliverables.map(item => (
                    <li
                      key={item}
                      className="inline-flex items-center gap-1.5 border-2 border-ink bg-surface px-3 py-1.5 font-mono text-xs font-bold text-ink"
                    >
                      <CheckIcon className="h-3.5 w-3.5 text-primary-ink" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ============================================================================
   Coaching Page — Coach Profiles (wide alternating rows overlapping temper blocks)
   ============================================================================ */
export function CoachProfiles({
  eyebrow,
  heading,
  coaches,
}: {
  eyebrow: ReactNode;
  heading: ReactNode;
  coaches: readonly Coach[];
}) {
  return (
    <section aria-labelledby="coaching-coaches-heading" className="border-t-2 border-ink bg-surface py-16 sm:py-24">
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2
          id="coaching-coaches-heading"
          className="font-display-poster mt-3 text-[clamp(2.5rem,6.2vw,6.2rem)] text-ink"
        >
          {heading}
        </h2>

        <div className="mt-12 space-y-12">
          {coaches.map((coach, idx) => {
            const reverse = idx % 2 === 1;
            return (
              <article
                key={coach.id}
                className="grid items-center gap-8 border-2 border-ink bg-bg p-6 shadow-[6px_6px_0_0_var(--ink)] sm:p-10 lg:grid-cols-12"
              >
                <div
                  className={`relative flex items-center justify-center lg:col-span-4 ${
                    reverse ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div
                    className={`absolute inset-x-0 bottom-0 h-1/2 border-2 border-ink ${TEMPER_BG_CLASS[coach.temperColour]}`}
                    aria-hidden="true"
                  />
                  <div className="relative z-10 w-60 drop-shadow-[8px_8px_0_var(--ink)] sm:w-72">
                    <CoachPortrait
                      coachId={coach.id}
                      temperColour={coach.temperColour}
                      name={coach.name}
                    />
                  </div>
                </div>

                <div className={`lg:col-span-8 ${reverse ? 'lg:order-1' : 'lg:order-2'}`}>
                  <p className="font-mono text-xs font-bold tracking-[0.14em] text-muted uppercase">
                    {coach.role}
                  </p>
                  <h3 className="font-display-poster mt-2 text-[clamp(2.4rem,4.6vw,4.6rem)] text-ink">
                    {coach.name}
                  </h3>
                  <p className="mt-3 font-mono text-sm font-bold text-primary-ink">
                    “{coach.credo}”
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-ink/90">{coach.bio}</p>

                  <div className="mt-6 grid gap-5 border-t border-line pt-5 sm:grid-cols-2">
                    <div>
                      <h4 className="font-mono text-xs font-bold tracking-[0.14em] text-muted uppercase">
                        Coaches
                      </h4>
                      <ul className="mt-2 space-y-1 font-mono text-xs font-bold text-ink">
                        {coach.specialties.map(s => (
                          <li key={s}>· {s}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-mono text-xs font-bold tracking-[0.14em] text-muted uppercase">
                        Background
                      </h4>
                      <ul className="mt-2 space-y-1 text-xs text-muted">
                        {coach.credentials.map(c => (
                          <li key={c}>· {c}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   Coaching Page — First Session warm-up sequence (ascending plate sizes)
   ============================================================================ */
export function FirstSessionSequence({
  eyebrow,
  heading,
  steps,
}: {
  eyebrow: ReactNode;
  heading: ReactNode;
  steps: readonly FirstSessionStep[];
}) {
  const colours = ['straw', 'bronze', 'purple', 'blue'] as const;

  return (
    <section aria-labelledby="coaching-first-session-heading" className="chalk-surface border-t-2 border-ink py-16 sm:py-24">
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2
          id="coaching-first-session-heading"
          className="font-display-poster mt-3 text-[clamp(2.5rem,6.2vw,6.2rem)] text-ink"
        >
          {heading}
        </h2>

        <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <li
              key={step.step}
              className="flex flex-col border-2 border-ink bg-surface p-6 shadow-[4px_4px_0_0_var(--ink)]"
            >
              <div className="flex h-36 items-center justify-center">
                <Plate
                  label={step.step}
                  weightLb={step.plateWeightLb}
                  colour={colours[idx % colours.length]}
                  size={84 + idx * 16}
                  sublabel={step.duration}
                />
              </div>
              <p className="mt-4 font-mono text-xs font-bold tracking-[0.14em] text-primary-ink uppercase">
                Warm-up set {step.step} · {step.duration}
              </p>
              <h3 className="font-display-tight mt-1 text-xl text-ink">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ============================================================================
   Coaching Page — Studio Iron Band (plan SVG, mono equipment, address, hours, map)
   ============================================================================ */
export function StudioDetailsBand({
  eyebrow,
  heading,
  intro,
}: {
  eyebrow: ReactNode;
  heading: ReactNode;
  intro: ReactNode;
}) {
  return (
    <section aria-labelledby="coaching-studio-heading" className="iron-band">
      <KnurlStrip />
      <div className="wrap py-16 sm:py-24">
        <div className="max-w-3xl">
          <p className="font-mono text-xs font-bold tracking-[0.16em] text-temper-straw uppercase">
            {eyebrow}
          </p>
          <h2
            id="coaching-studio-heading"
            className="font-display-poster mt-3 text-[clamp(2.5rem,6.2vw,6.2rem)] text-band-ink"
          >
            {heading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-band-muted">{intro}</p>
        </div>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <StudioPlan />
          </div>

          <div className="border-2 border-band-line bg-band-surface p-6 lg:col-span-5">
            <h3 className="font-mono text-xs font-bold tracking-[0.16em] text-temper-straw uppercase">
              Studio Equipment
            </h3>
            <ul className="mt-4 space-y-2.5 font-mono text-xs leading-relaxed text-band-ink">
              {business.equipment.map(item => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-temper-straw" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 grid items-start gap-10 border-t border-band-line pt-12 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            <h3 className="font-mono text-xs font-bold tracking-[0.16em] text-temper-straw uppercase">
              Address &amp; Hours
            </h3>
            <p className="flex items-start gap-2 font-mono text-sm font-bold text-band-ink">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-temper-straw" />
              <span>{business.address.formatted}</span>
            </p>
            <p className="text-sm leading-relaxed text-band-muted">{business.address.directions}</p>
            <p className="text-sm text-band-muted">{business.address.parking}</p>

            <div className="border border-band-line bg-band-surface p-4">
              <OpenBadge hours={business.hours} className="text-band-ink" />
              <dl className="mt-3 space-y-1 font-mono text-xs">
                {business.hoursSummary.map(row => (
                  <div key={row.label} className="flex justify-between gap-4">
                    <dt className="text-band-muted">{row.label}</dt>
                    <dd className="font-bold text-band-ink">{row.time}</dd>
                  </div>
                ))}
              </dl>
              <TimeZoneNote className="text-band-muted" />
            </div>

            <div className="pt-2">
              <SiteLink href="/contact/" className="button">
                Book a free consultation call
              </SiteLink>
            </div>
          </div>

          <div className="border-2 border-band-line bg-band-surface p-2.5 lg:col-span-7">
            <GoogleMap
              address={business.address.formatted}
              title={`Map showing ${business.name} in Pittsburgh's Strip District`}
            />
          </div>
        </div>
      </div>
      <KnurlStrip />
    </section>
  );
}
