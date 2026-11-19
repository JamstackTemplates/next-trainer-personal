'use client';

import { useEffect, useState } from 'react';
import type { Program } from '../content/programs';
import type { Transformation } from '../content/transformations';
import { TEMPER_VAR } from './art/temper-helpers';
import { LogbookPage } from './logbook-page';

export function ResultsLogbooks({
  entries,
  programs,
}: {
  entries: readonly Transformation[];
  programs: readonly Program[];
}) {
  const [hydrated, setHydrated] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string>('all');

  useEffect(() => {
    setHydrated(true);
  }, []);

  const representedPrograms = programs.filter(program =>
    entries.some(entry => entry.programId === program.id),
  );

  const visible =
    selectedProgram === 'all'
      ? entries
      : entries.filter(entry => entry.programId === selectedProgram);

  const activeName =
    selectedProgram === 'all'
      ? 'all programs'
      : representedPrograms.find(p => p.id === selectedProgram)?.name ?? selectedProgram;

  return (
    <div className="wrap py-12 sm:py-16">
      {hydrated ? (
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-y-2 border-ink py-4">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter logbooks by program">
            <span className="mr-2 font-mono text-xs font-bold tracking-[0.14em] text-muted uppercase">
              Program:
            </span>
            <button
              type="button"
              aria-pressed={selectedProgram === 'all'}
              onClick={() => setSelectedProgram('all')}
              className={`inline-flex min-h-10 items-center gap-2 rounded-full border-2 px-4 py-1.5 font-mono text-xs font-bold tracking-[0.08em] uppercase transition-colors ${
                selectedProgram === 'all'
                  ? 'border-primary bg-primary text-on-primary shadow-[2px_2px_0_0_var(--ink)]'
                  : 'border-ink bg-surface text-ink hover:border-primary hover:text-primary-ink'
              }`}
            >
              All ({entries.length})
            </button>
            {representedPrograms.map(program => {
              const active = selectedProgram === program.id;
              return (
                <button
                  key={program.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedProgram(program.id)}
                  className={`inline-flex min-h-10 items-center gap-2 rounded-full border-2 px-3.5 py-1.5 font-mono text-xs font-bold tracking-[0.08em] uppercase transition-colors ${
                    active
                      ? 'border-primary bg-primary text-on-primary shadow-[2px_2px_0_0_var(--ink)]'
                      : 'border-ink bg-surface text-ink hover:border-primary hover:text-primary-ink'
                  }`}
                >
                  <span
                    className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-ink bg-band font-display text-[0.58rem] text-band-ink"
                    style={{ borderColor: TEMPER_VAR[program.plateColour] }}
                    aria-hidden="true"
                  >
                    {program.plateLabel}
                  </span>
                  {program.name}
                </button>
              );
            })}
          </div>

          <p className="font-mono text-xs font-bold tracking-[0.1em] text-muted uppercase" role="status" aria-live="polite">
            Showing {visible.length} {visible.length === 1 ? 'logbook' : 'logbooks'} ({activeName})
          </p>
        </div>
      ) : null}

      {/* Staggered two-column logbook pages on desktop, single column on mobile */}
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
        {visible.map((entry, idx) => (
          <div key={entry.id} className={idx % 2 === 1 ? 'lg:mt-14' : ''}>
            <LogbookPage entry={entry} tilt={idx % 2 === 0 ? 'left' : 'right'} />
          </div>
        ))}
      </div>
    </div>
  );
}
