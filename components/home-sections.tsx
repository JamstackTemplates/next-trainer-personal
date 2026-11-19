import type { CSSProperties, ReactNode } from 'react';
import { business, type MethodPhase, type TemperColour } from '../content/business';
import type { Coach } from '../content/coaches';
import type { Program } from '../content/programs';
import type { Testimonial } from '../content/testimonials';
import type { Transformation } from '../content/transformations';
import { Barbell } from './art/barbell';
import { ChalkHandprint } from './art/chalk-handprint';
import { CoachPortrait } from './art/coach-portraits';
import { MapPinIcon, PhoneIcon } from './art/icons';
import { KnurlStrip } from './art/knurl-strip';
import { ON_TEMPER_VAR, TEMPER_VAR } from './art/temper-helpers';
import { HeatSeam } from './art/temper-scale';
import { GoogleMap } from './google-map';
import { LogbookPage } from './logbook-page';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';
import { TimeZoneNote } from './time-zone-note';
import { asset } from '../lib/paths';

const TEMPER_ORDER: readonly TemperColour[] = ['straw', 'bronze', 'purple', 'blue'];

/** Splits "Get strong." into ["Get", "strong."] so desktop can stack one word per line. */
function splitFirstWord(text: ReactNode): [ReactNode, ReactNode] | null {
  if (typeof text !== 'string') return null;
  const idx = text.indexOf(' ');
  return idx > 0 ? [text.slice(0, idx), text.slice(idx + 1)] : null;
}

/* ============================================================================
   1. Home Hero — poster-scale stacked headline that heats from iron to the temper run,
   a machined plate face and forge glow behind the 6am rack, bar crossing into the type.
   ============================================================================ */
function HeroRoot({ children }: { children: ReactNode }) {
  return (
    <section className="chalk-surface relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="plate-rings absolute top-1/2 right-[-38vw] hidden aspect-square w-[92vw] -translate-y-1/2 lg:block xl:right-[-30vw] xl:w-[80vw]" />
        <div className="forge-glow absolute top-[8%] right-[-6%] aspect-square w-[60vw] lg:w-[46vw]" />
      </div>
      <div className="wrap-wide relative grid items-center gap-y-3 pt-4 pb-8 sm:pt-10 sm:pb-14 lg:grid-cols-12 lg:gap-x-4 lg:gap-y-0 lg:pt-14 lg:pb-20">
        {children}
      </div>
      <HeatSeam />
    </section>
  );
}

function HeroLead({ children }: { children: ReactNode }) {
  return <div className="relative z-20 lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:self-end">{children}</div>;
}

function HeroBody({ children }: { children: ReactNode }) {
  return <div className="relative z-20 lg:col-span-6 lg:col-start-1 lg:row-start-2 lg:self-start">{children}</div>;
}

function HeroStatusLine() {
  return (
    <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted sm:mb-6">
      <OpenBadge hours={business.hours} className="text-ink" />
      <span aria-hidden="true" className="hidden h-px w-8 bg-line sm:inline-block" />
      <span className="inline-flex items-center gap-1.5 text-muted">
        <MapPinIcon className="h-3.5 w-3.5 text-primary-ink" />
        <span>
          {business.address.street} · {business.address.neighborhood}
        </span>
      </span>
    </div>
  );
}

function HeroHeading({ lineOne, lineTwo }: { lineOne: ReactNode; lineTwo: ReactNode }) {
  const one = splitFirstWord(lineOne);
  const two = splitFirstWord(lineTwo);
  return (
    <h1 className="font-display-poster text-[clamp(2.1rem,9.2vw,3.4rem)] text-ink sm:text-[4.6rem] lg:text-[clamp(4.5rem,8.1vw,8.4rem)]">
      <span className="block">
        {one ? (
          <>
            {one[0]} <br className="hidden lg:inline" />
            {one[1]}
          </>
        ) : (
          lineOne
        )}
      </span>
      <span className="temper-text is-heating inline-block lg:mt-[0.06em]">
        {two ? (
          <>
            {two[0]} <br className="hidden lg:inline" />
            {two[1]}
          </>
        ) : (
          lineTwo
        )}
      </span>
    </h1>
  );
}

function HeroUnderline() {
  return (
    <div aria-hidden="true" className="mt-3 flex items-center gap-3 sm:mt-6">
      <span className="h-2.5 w-40 bg-[image:var(--temper-run)] sm:w-64" />
      <span className="font-mono text-[0.68rem] font-bold tracking-[0.2em] text-muted uppercase">
        420°F → 590°F
      </span>
    </div>
  );
}

function HeroIntroduction({ children }: { children: ReactNode }) {
  return (
    <p className="mt-1 max-w-xl text-base leading-relaxed text-ink/80 sm:mt-6 sm:text-xl lg:text-[1.35rem]">
      {children}
    </p>
  );
}

function HeroActions({
  primaryLabel,
  secondaryLabel,
}: {
  primaryLabel: ReactNode;
  secondaryLabel: ReactNode;
}) {
  return (
    <div className="mt-4 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
      <SiteLink href="/contact/" className="button min-h-14 w-full px-7 text-[0.92rem] shadow-[5px_5px_0_0_var(--ink)] sm:w-auto">
        {primaryLabel}
      </SiteLink>
      <SiteLink
        href="/programs/"
        className="inline-flex min-h-12 items-center justify-center gap-2 font-mono text-sm font-bold tracking-[0.08em] text-ink uppercase underline decoration-temper-bronze decoration-[3px] underline-offset-[0.4em] hover:text-primary-ink"
      >
        {secondaryLabel} <span aria-hidden="true">→</span>
      </SiteLink>
    </div>
  );
}

const HERO_ART_ALT =
  'Illustration of a lifter at the top of a deadlift in front of a power rack at 6am, with a belt, chalked hands, temper-coloured plates, a brick-arched Strip District window and a steel bridge beyond';

/**
 * Hero artwork column: "6am at the rack" in a light (chalk) and dark (lit gym) version.
 * Both images are in the markup; CSS shows the one matching the active theme (site toggle or system).
 * At 390px it is cropped onto the lifter and loaded bar; at 1440px the full square scene sits on the
 * right, feathered into the page and tucked under the headline column.
 */
function HeroArt() {
  return (
    <div className="relative z-10 -mx-4 lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:-mr-[4%] lg:-ml-[8%]">
      <div className="hero-art-frame relative mx-auto h-[236px] overflow-hidden sm:h-[400px] lg:aspect-square lg:h-auto">
        <img
          src={asset('/hero-light.webp')}
          alt={HERO_ART_ALT}
          width={2048}
          height={2048}
          fetchPriority="high"
          decoding="async"
          className="theme-light-only h-full w-full object-cover object-[50%_60%]"
        />
        <img
          src={asset('/hero-dark.webp')}
          alt={HERO_ART_ALT}
          width={2048}
          height={2048}
          decoding="async"
          className="theme-dark-only h-full w-full object-cover object-[50%_60%]"
        />
      </div>
    </div>
  );
}

export const HomeHero = Object.assign(HeroRoot, {
  Lead: HeroLead,
  Body: HeroBody,
  StatusLine: HeroStatusLine,
  Heading: HeroHeading,
  Underline: HeroUnderline,
  Introduction: HeroIntroduction,
  Actions: HeroActions,
  Art: HeroArt,
});

/* ============================================================================
   2. Proof Strip — iron scoreboard: three numerals at poster scale, alternating sides,
   separated by knurl rules, chalk handprint behind the middle figure.
   ============================================================================ */
function ProofStripRoot({ children }: { children: ReactNode }) {
  return (
    <section aria-label="Studio numbers" className="iron-band relative overflow-hidden">
      <div className="wrap-wide relative z-10 py-6 sm:py-10">
        <ol>{children}</ol>
      </div>
      <KnurlStrip />
    </section>
  );
}

function splitUnit(value: ReactNode): [string, string] | null {
  if (typeof value !== 'string') return null;
  const match = /^([\d,.%:\s]+?)\s*([a-z]+)$/i.exec(value);
  return match ? [match[1], match[2]] : null;
}

function ProofStat({
  value,
  caption,
  featured = false,
  bordered = false,
}: {
  value: ReactNode;
  caption: ReactNode;
  featured?: boolean;
  bordered?: boolean;
}) {
  const parts = splitUnit(value);
  return (
    <li
      className={`relative flex flex-col gap-3 py-8 md:flex-row md:items-end md:justify-between md:gap-10 md:py-10 md:even:flex-row-reverse md:even:text-right ${
        bordered ? 'border-t border-band-line' : ''
      }`}
    >
      {featured ? (
        <ChalkHandprint
          tone="chalk"
          className="absolute top-1/2 right-[8%] w-64 -translate-y-1/2 opacity-90 md:right-auto md:left-[40%] md:w-80"
        />
      ) : null}
      <p className="font-display-poster relative z-10 text-[clamp(4.2rem,17vw,15rem)] text-band-ink">
        {parts ? (
          <>
            {parts[0]}
            <span className="ml-[0.08em] align-top text-[0.32em] text-temper-straw">{parts[1]}</span>
          </>
        ) : (
          value
        )}
      </p>
      <div className="relative z-10 max-w-xs md:pb-4">
        <span aria-hidden="true" className="inline-block h-1.5 w-20 bg-[image:var(--temper-run)]" />
        <p className="mt-2 font-mono text-xs leading-relaxed tracking-[0.08em] text-band-muted uppercase sm:text-sm">
          {caption}
        </p>
      </div>
    </li>
  );
}

export const ProofStrip = Object.assign(ProofStripRoot, { Stat: ProofStat });

/* ============================================================================
   3. Programs Preview — chalk paper; heading at poster scale; the bar spans the viewport
   ============================================================================ */
function ProgramsPreviewRoot({
  eyebrow,
  heading,
  legend,
  ctaLabel,
  programs,
}: {
  eyebrow: ReactNode;
  heading: ReactNode;
  legend: ReactNode;
  ctaLabel: ReactNode;
  programs: readonly Program[];
}) {
  return (
    <section aria-labelledby="home-programs-heading" className="chalk-surface relative overflow-hidden py-16 sm:py-28">
      <p
        aria-hidden="true"
        className="ghost-word absolute top-6 right-[-4vw] text-[22vw] text-ink/[0.04]"
      >
        6 × plates
      </p>
      <div className="wrap-wide relative">
        <div className="mb-12 grid items-end gap-6 lg:mb-16 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <p className="eyebrow">{eyebrow}</p>
            <h2
              id="home-programs-heading"
              className="font-display-poster mt-3 -ml-[0.04em] text-[clamp(2.7rem,8.2vw,8.25rem)] text-ink"
            >
              {heading}
            </h2>
          </div>
          <div className="lg:col-span-3 lg:justify-self-end">
            <SiteLink href="/programs/" className="button button-quiet">
              {ctaLabel}
            </SiteLink>
          </div>
        </div>

        <Barbell programs={programs} linkMode="page" scale="hero" />

        <p className="mt-8 font-mono text-xs tracking-[0.08em] text-muted uppercase">{legend}</p>
      </div>
    </section>
  );
}

export const ProgramsPreview = ProgramsPreviewRoot;

/* ============================================================================
   4. Method — the temper run itself: four full-bleed colour slabs, each phase heating
   from the last, giant phase numerals stamped into the steel.
   ============================================================================ */
function MethodBandRoot({
  eyebrow,
  heading,
  ctaLabel,
  phases,
}: {
  eyebrow: ReactNode;
  heading: ReactNode;
  ctaLabel: ReactNode;
  phases: readonly MethodPhase[];
}) {
  return (
    <section aria-labelledby="home-method-heading" className="iron-band">
      <KnurlStrip />
      <div className="wrap-wide flex flex-wrap items-end justify-between gap-6 pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div>
          <p className="font-mono text-xs font-bold tracking-[0.2em] text-temper-straw uppercase">
            {eyebrow}
          </p>
          <h2
            id="home-method-heading"
            className="font-display-poster mt-3 text-[clamp(2.6rem,7vw,7rem)] text-band-ink"
          >
            {heading}
          </h2>
        </div>
        <SiteLink href="/coaching/" className="button button-on-band">
          {ctaLabel}
        </SiteLink>
      </div>

      <ol className="grid md:grid-cols-4">
        {phases.map(phase => {
          const next = TEMPER_ORDER[TEMPER_ORDER.indexOf(phase.temperColour) + 1];
          const style = {
            '--slab': TEMPER_VAR[phase.temperColour],
            '--slab-next': next ? TEMPER_VAR[next] : TEMPER_VAR[phase.temperColour],
            color: ON_TEMPER_VAR[phase.temperColour],
          } as CSSProperties;
          return (
            <li
              key={phase.id}
              className="temper-slab flex min-h-[22rem] flex-col justify-between overflow-hidden px-6 pt-6 pb-8 sm:px-8 md:min-h-[34rem] lg:px-10"
              style={style}
            >
              <div className="flex items-baseline justify-between gap-3 font-mono text-[0.7rem] font-bold tracking-[0.18em] uppercase">
                <span>Phase {phase.number}</span>
                <span className="opacity-80">{phase.tempMark}</span>
              </div>
              <div>
                <p
                  aria-hidden="true"
                  className="font-display-poster -ml-[0.06em] text-[clamp(6.5rem,10.6vw,11rem)] opacity-95"
                >
                  {phase.number}
                </p>
                <h3 className="font-display-tight mt-4 text-[clamp(1.9rem,2.6vw,2.6rem)]">{phase.title}</h3>
                <p className="mt-3 max-w-xs text-[0.95rem] leading-relaxed font-medium">
                  {phase.shortSummary}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export const MethodBand = MethodBandRoot;

/* ============================================================================
   5. Featured Transformation — the quote set at headline scale on chalk, the tilted
   logbook page taped to the right, the week count ghosted behind.
   ============================================================================ */
function FeaturedLogbookRoot({
  eyebrow,
  heading,
  note,
  ctaLabel,
  entry,
}: {
  eyebrow: ReactNode;
  heading: ReactNode;
  note: ReactNode;
  ctaLabel: ReactNode;
  entry: Transformation;
}) {
  return (
    <section aria-labelledby="home-results-heading" className="chalk-surface relative overflow-hidden py-16 sm:py-28">
      <p
        aria-hidden="true"
        className="ghost-word absolute bottom-[-2vw] left-[-2vw] text-[30vw] text-ink/[0.045]"
      >
        {entry.weeks}wk
      </p>
      <div className="wrap-wide relative grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <p className="eyebrow">{eyebrow}</p>
          <h2
            id="home-results-heading"
            className="font-display-poster mt-3 text-[clamp(2.6rem,6vw,6rem)] text-ink"
          >
            {heading}
          </h2>
          <blockquote className="relative mt-16 text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.15] font-bold tracking-[-0.01em] text-ink">
            <span
              aria-hidden="true"
              className="font-display temper-text-static absolute -top-[0.62em] -left-[0.04em] text-[2.6em] leading-none"
            >
              “
            </span>
            <span className="relative">{entry.quote}</span>
          </blockquote>
          <p className="mt-5 font-mono text-xs font-bold tracking-[0.14em] text-muted uppercase">
            — {entry.client} · {entry.weeks} weeks · {entry.ageBand}
          </p>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">{note}</p>
          <div className="mt-8">
            <SiteLink href="/results/" className="button">
              {ctaLabel}
            </SiteLink>
          </div>
        </div>

        <div className="relative lg:col-span-7 lg:pl-6">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-4 left-1/3 z-10 h-7 w-28 -rotate-6 border border-ink/30 bg-temper-straw/80"
          />
          <LogbookPage entry={entry} tilt="right" />
        </div>
      </div>
    </section>
  );
}

export const FeaturedLogbook = FeaturedLogbookRoot;

/* ============================================================================
   6. Testimonials — blackboard: chalk lettering at display size, staggered and slightly
   askew, a chalk stroke under each, temper chalk for the names.
   ============================================================================ */
function ChalkboardTestimonialsRoot({
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
  const layout = [
    'md:col-span-7 md:-rotate-[1deg]',
    'md:col-span-5 md:col-start-8 md:mt-40 md:rotate-[1.2deg]',
    'md:col-span-6 md:col-start-2 md:mt-4 md:-rotate-[0.5deg]',
  ];
  return (
    <section
      aria-labelledby="home-testimonials-heading"
      className="iron-band chalkboard relative overflow-hidden pt-16 pb-48 sm:pt-24 sm:pb-56"
    >
      <KnurlStrip className="absolute inset-x-0 top-0" />
      <div className="wrap-wide relative z-10">
        <p className="font-mono text-xs font-bold tracking-[0.2em] text-temper-straw uppercase">
          {eyebrow}
        </p>
        <h2
          id="home-testimonials-heading"
          className="font-display-poster chalk-text mt-3 text-[clamp(2.6rem,7vw,7rem)] text-band-ink"
        >
          {heading}
        </h2>

        <div className="mt-14 grid gap-14 md:grid-cols-12 md:gap-x-10 md:gap-y-0">
          {items.map((item, idx) => {
            const colour = TEMPER_ORDER[idx % TEMPER_ORDER.length];
            return (
              <figure key={item.id} className={`${layout[idx % layout.length]}`}>
                <blockquote className="chalk-text text-[clamp(1.4rem,2.5vw,2.2rem)] leading-[1.2] font-semibold tracking-[-0.01em] text-band-ink">
                  “{item.quote}”
                </blockquote>
                <div aria-hidden="true" className="chalk-stroke mt-5 w-40" style={{ color: TEMPER_VAR[colour] }} />
                <figcaption className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-xs uppercase">
                  <span className="font-bold tracking-[0.14em] text-temper-straw">
                    {item.name}
                  </span>
                  <span className="text-band-muted">
                    {programNames[item.programId] ?? item.programId} · since {item.since}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export const ChalkboardTestimonials = ChalkboardTestimonialsRoot;

/* ============================================================================
   7. Meet the Coaches — portraits on big temper discs breaking up through the
   blackboard's bottom edge; names at display size.
   ============================================================================ */
function CoachesTeaserRoot({
  eyebrow,
  heading,
  ctaLabel,
  coaches,
}: {
  eyebrow: ReactNode;
  heading: ReactNode;
  ctaLabel: ReactNode;
  coaches: readonly Coach[];
}) {
  return (
    <section aria-labelledby="home-coaches-heading" className="chalk-surface relative pb-16 sm:pb-24">
      <HeatSeam />
      <div className="wrap-wide grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="order-2 pt-4 lg:order-1 lg:col-span-4 lg:pt-16">
          <p className="eyebrow">{eyebrow}</p>
          <h2
            id="home-coaches-heading"
            className="font-display-poster mt-3 text-[clamp(2rem,3.2vw,3.1rem)] text-ink"
          >
            {heading}
          </h2>
          <div className="mt-8">
            <SiteLink href="/coaching/" className="button button-quiet">
              {ctaLabel}
            </SiteLink>
          </div>
        </div>

        <div className="order-1 grid gap-12 sm:grid-cols-2 lg:order-2 lg:col-span-8">
          {coaches.map((coach, idx) => (
            <article key={coach.id} className={`relative ${idx === 1 ? 'sm:mt-20' : ''}`}>
              <div
                className={`w-56 drop-shadow-[8px_8px_0_var(--ink)] sm:-mt-40 sm:w-64 lg:w-72 ${idx === 0 ? '-mt-36' : ''}`}
              >
                <CoachPortrait coachId={coach.id} temperColour={coach.temperColour} name={coach.name} />
              </div>
              <p className="mt-6 font-mono text-xs font-bold tracking-[0.16em] text-muted uppercase">
                {coach.role}
              </p>
              <h3 className="font-display-poster mt-2 text-[clamp(2rem,3.4vw,3.25rem)] text-ink">
                {coach.name}
              </h3>
              <p className="mt-3 max-w-sm text-base leading-relaxed text-muted">{coach.teaser}</p>
              <p
                className="mt-4 border-l-4 pl-3 font-mono text-sm font-bold text-ink"
                style={{ borderColor: TEMPER_VAR[coach.temperColour] }}
              >
                “{coach.credo}”
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export const CoachesTeaser = CoachesTeaserRoot;

/* ============================================================================
   8. Visit Band — the studio door: address at poster scale, the hours as a big mono
   timetable, the map taped up like a notice on the brick.
   ============================================================================ */
function VisitBandRoot({
  eyebrow,
  heading,
  ctaLabel,
}: {
  eyebrow: ReactNode;
  heading: ReactNode;
  ctaLabel: ReactNode;
}) {
  return (
    <section aria-labelledby="home-visit-heading" className="relative overflow-hidden border-t-2 border-ink bg-surface py-16 sm:py-28">
      <div className="wrap-wide grid items-start gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow">{eyebrow}</p>
          <h2
            id="home-visit-heading"
            className="font-display-poster mt-3 text-[clamp(2.6rem,5.6vw,5.5rem)] text-ink"
          >
            {heading}
          </h2>

          <div className="mt-8 space-y-2 text-base text-ink">
            <p className="font-mono text-base font-bold">{business.address.formatted}</p>
            <p className="text-muted">{business.address.directions}</p>
            <p className="text-sm text-muted">{business.address.parking}</p>
          </div>

          <div className="mt-8 border-y-2 border-ink py-5">
            <OpenBadge hours={business.hours} className="text-ink" />
            <dl className="mt-4 font-mono">
              {business.hoursSummary.map(row => (
                <div key={row.label} className="flex items-baseline justify-between gap-4 border-b border-dashed border-line py-2 last:border-0">
                  <dt className="text-sm font-bold tracking-[0.1em] text-muted uppercase">{row.label}</dt>
                  <dd className="text-lg font-bold text-ink sm:text-xl">{row.time}</dd>
                </div>
              ))}
            </dl>
            <TimeZoneNote />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <SiteLink href="/contact/" className="button min-h-14 shadow-[5px_5px_0_0_var(--ink)]">
              {ctaLabel}
            </SiteLink>
            <a
              href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}
              className="inline-flex items-center gap-2 font-mono text-sm font-bold text-ink underline hover:text-primary-ink"
            >
              <PhoneIcon className="h-4 w-4 text-primary-ink" />
              {business.phone}
            </a>
          </div>
        </div>

        {/* Map framed as a chalk-taped notice */}
        <div className="relative lg:col-span-7 lg:mt-10 lg:rotate-[0.8deg]">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-3 left-8 z-10 h-7 w-24 -rotate-6 border border-ink/30 bg-temper-straw/85"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-3 right-8 z-10 h-7 w-24 rotate-3 border border-ink/30 bg-temper-blue/70"
          />
          <div className="border-2 border-ink bg-bg p-3 shadow-[10px_10px_0_0_var(--ink)]">
            <GoogleMap
              address={business.address.formatted}
              title={`Map showing ${business.name} at ${business.address.formatted}`}
            />
            <p className="mt-2.5 flex flex-wrap items-center justify-between gap-2 px-1 font-mono text-xs text-muted uppercase">
              <span>{business.address.formatted}</span>
              <span>{business.address.remoteCoverage}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export const VisitBand = VisitBandRoot;
