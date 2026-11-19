'use client';

import { useEffect, useState, type CSSProperties } from 'react';
import {
  formatProgramFormat,
  PROGRAM_FORMATS,
  programAvailabilityStamp,
  programCtaLabel,
  type Program,
  type ProgramFormat,
} from '../content/programs';
import { Plate } from './art/barbell';
import { CheckIcon, FullLockIcon, RemoteIcon, WaitlistIcon } from './art/icons';
import { ON_TEMPER_VAR, TEMPER_VAR } from './art/temper-helpers';
import { SiteLink } from './site-link';

export function ProgramsCatalog({ programs }: { programs: readonly Program[] }) {
  const [hydrated, setHydrated] = useState(false);
  const [selected, setSelected] = useState<'all' | ProgramFormat>('all');

  useEffect(() => {
    setHydrated(true);
  }, []);

  const visible =
    selected === 'all' ? programs : programs.filter(program => program.format === selected);

  const activeFormatLabel =
    PROGRAM_FORMATS.find(item => item.id === selected)?.label ?? 'All';

  return (
    <div>
      {/* Progressive-enhancement filter row: only shown once JS is active so no-JS has no dead buttons */}
      {hydrated ? (
        <div className="wrap py-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-y-2 border-ink py-4">
            <div className="flex flex-wrap items-center gap-2.5" role="group" aria-label="Filter programs by format">
              <span className="mr-2 font-mono text-xs font-bold tracking-[0.14em] text-muted uppercase">
                Format:
              </span>
              {PROGRAM_FORMATS.map(format => {
                const active = selected === format.id;
                return (
                  <button
                    key={format.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelected(format.id)}
                    className={`inline-flex min-h-10 items-center gap-2 rounded-full border-2 px-4 py-1.5 font-mono text-xs font-bold tracking-[0.1em] uppercase transition-colors ${
                      active
                        ? 'border-primary bg-primary text-on-primary shadow-[2px_2px_0_0_var(--ink)]'
                        : 'border-ink bg-surface text-ink hover:border-primary hover:text-primary-ink'
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full border ${
                        active ? 'border-on-primary bg-temper-straw' : 'border-ink bg-bg'
                      }`}
                      aria-hidden="true"
                    />
                    {format.label}
                  </button>
                );
              })}
            </div>

            <p className="font-mono text-xs font-bold tracking-[0.1em] text-muted uppercase" role="status" aria-live="polite">
              Showing {visible.length} {visible.length === 1 ? 'program' : 'programs'}
              {selected !== 'all' ? ` · ${activeFormatLabel}` : ''}
            </p>
          </div>
        </div>
      ) : null}

      {/* Program spec sheets — alternating left/right rows in collection order */}
      <div className="border-t-2 border-ink">
        {visible.map((program, index) => {
          const plateOnRight = index % 2 === 1;
          const stamp = programAvailabilityStamp(program);
          const cta = programCtaLabel(program);
          const accent = TEMPER_VAR[program.plateColour];

          return (
            <section
              key={program.id}
              id={program.id}
              aria-labelledby={`program-heading-${program.id}`}
              className={`grid scroll-mt-24 lg:grid-cols-12 ${index % 2 === 0 ? 'chalk-surface' : 'bg-surface'}`}
            >
                {/* Plate side: the program's temper colour as a full-bleed field */}
                <div
                  className={`temper-slab relative flex min-h-[19rem] flex-col items-center justify-center overflow-hidden px-6 py-12 lg:col-span-5 lg:min-h-full ${
                    plateOnRight ? 'lg:order-2' : 'lg:order-1'
                  }`}
                  style={{ '--slab': accent, color: ON_TEMPER_VAR[program.plateColour] } as CSSProperties}
                >
                  <p
                    aria-hidden="true"
                    className="ghost-word absolute -bottom-[0.12em] left-1/2 -translate-x-1/2 text-[clamp(10rem,26vw,24rem)] opacity-[0.16]"
                  >
                    {program.plateLabel}
                  </p>
                  <span
                    aria-hidden="true"
                    className="absolute top-5 left-6 font-mono text-xs font-bold tracking-[0.2em] uppercase"
                  >
                    {String(index + 1).padStart(2, '0')} / {String(visible.length).padStart(2, '0')}
                  </span>
                  <div className="relative flex flex-col items-center">
                    <div className="drop-shadow-[10px_12px_0_rgb(0_0_0/0.28)]">
                      <Plate
                        label={program.plateLabel}
                        weightLb={program.plateWeightLb}
                        colour={program.plateColour}
                        size={150 + program.plateWeightLb * 3.4}
                      />
                    </div>
                    <span
                      className="mt-6 inline-flex items-center gap-1.5 border-2 border-band bg-band px-3 py-1 font-mono text-xs font-bold tracking-[0.14em] text-band-ink uppercase"
                    >
                      {program.format === 'remote' ? <RemoteIcon className="h-3.5 w-3.5 text-temper-blue" /> : null}
                      {formatProgramFormat(program.format)}
                    </span>
                  </div>
                </div>

                {/* Spec sheet side */}
                <div
                  className={`px-4 py-12 sm:px-10 sm:py-16 lg:col-span-7 lg:px-16 lg:py-20 xl:px-24 ${
                    plateOnRight ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-xs font-bold tracking-[0.14em] text-muted uppercase">
                        SPEC SHEET · PLATE {program.plateLabel} · {program.plateWeightLb} LB
                      </p>
                      <h2
                        id={`program-heading-${program.id}`}
                        className="font-display-poster mt-3 text-[clamp(2.3rem,4.4vw,4.4rem)] text-ink"
                      >
                        {program.name}
                      </h2>
                    </div>

                    <span
                      className={`stamp ${
                        program.availability === 'open'
                          ? 'border-ink bg-temper-straw text-on-temper-straw'
                          : program.availability === 'waitlist'
                            ? 'border-ink bg-bg text-ink'
                            : 'border-ink bg-band text-band-ink'
                      }`}
                    >
                      {program.availability === 'waitlist' ? (
                        <WaitlistIcon className="h-3.5 w-3.5" />
                      ) : program.availability === 'full' ? (
                        <FullLockIcon className="h-3.5 w-3.5" />
                      ) : null}
                      {stamp}
                    </span>
                  </div>

                  <p className="mt-4 text-lg leading-relaxed text-ink">{program.summary}</p>

                  {/* Mono specification table */}
                  <dl className="mt-6 grid grid-cols-3 gap-px border-2 border-ink bg-ink font-mono">
                    <div className="bg-bg p-3 sm:p-4">
                      <dt className="text-[0.68rem] font-bold tracking-[0.12em] text-muted uppercase">
                        Sessions / wk
                      </dt>
                      <dd className="mt-1 text-base font-bold text-ink sm:text-lg">
                        {program.sessionsPerWeek === 0 ? 'Remote' : `${program.sessionsPerWeek}× / wk`}
                      </dd>
                    </div>
                    <div className="bg-bg p-3 sm:p-4">
                      <dt className="text-[0.68rem] font-bold tracking-[0.12em] text-muted uppercase">
                        Block length
                      </dt>
                      <dd className="mt-1 text-base font-bold text-ink sm:text-lg">
                        {program.blockWeeks} weeks
                      </dd>
                    </div>
                    <div className="bg-bg p-3 sm:p-4">
                      <dt className="text-[0.68rem] font-bold tracking-[0.12em] text-muted uppercase">
                        Price
                      </dt>
                      <dd className="mt-1 text-base font-bold text-ink sm:text-lg">
                        ${program.priceUsd} / {program.priceUnit}
                      </dd>
                    </div>
                  </dl>

                  {/* Good for & Includes columns */}
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    <div>
                      <h3 className="font-mono text-xs font-bold tracking-[0.14em] text-muted uppercase">
                        Good for
                      </h3>
                      <ul className="mt-2.5 space-y-2 text-sm text-ink">
                        {program.goodFor.map(item => (
                          <li key={item} className="flex items-start gap-2.5">
                            <span
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                              style={{ backgroundColor: accent }}
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-mono text-xs font-bold tracking-[0.14em] text-muted uppercase">
                        Includes
                      </h3>
                      <ul className="mt-2.5 space-y-2 text-sm text-ink">
                        {program.includes.map(item => (
                          <li key={item} className="flex items-start gap-2">
                            <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary-ink" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {program.clearanceNote ? (
                    <p className="mt-5 border-l-4 border-temper-straw bg-bg px-3.5 py-2.5 font-mono text-xs text-ink">
                      {program.clearanceNote}
                    </p>
                  ) : null}

                  <div className="mt-7 flex flex-wrap items-center gap-4 border-t border-line pt-5">
                    <SiteLink href="/contact/" className="button">
                      {cta}
                    </SiteLink>
                    <span className="font-mono text-xs text-muted">
                      Enquiry only — arranged after a free 30-min call
                    </span>
                  </div>
                </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
