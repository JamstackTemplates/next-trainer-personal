'use client';

import { useEffect, useRef } from 'react';
import type { TemperColour } from '../content/business';
import type { LogbookMetric } from '../content/transformations';
import { TEMPER_VAR } from './art/temper-helpers';

/**
 * Before/after logbook bar chart.
 * Uses CSS Scroll-Driven Animations where supported (`@supports (animation-timeline: view()) and (animation-range: entry)`),
 * with an IntersectionObserver fallback only when unsupported and `prefers-reduced-motion: no-preference`.
 * Static and fully drawn under reduced motion, without JS, and in print.
 */
export function LogbookChart({
  metrics,
  colour,
}: {
  metrics: readonly LogbookMetric[];
  colour: TemperColour;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const prefersMotion = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
    if (!prefersMotion) return;

    const nativeSda =
      typeof CSS !== 'undefined' &&
      CSS.supports('(animation-timeline: view()) and (animation-range: entry)');
    if (nativeSda) return;

    const bars = Array.from(el.querySelectorAll<HTMLElement>('.logbook-bar-after'));
    if (!bars.length) return;

    for (const bar of bars) bar.dataset.ioReveal = 'pending';

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            for (const bar of bars) bar.dataset.ioReveal = 'visible';
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const accent = TEMPER_VAR[colour];

  return (
    <div ref={containerRef} className="space-y-4">
      {metrics.map(metric => {
        const maxVal = Math.max(metric.after, 1);
        const beforePct = Math.round((metric.before / maxVal) * 100);
        const beforeRatio = Math.max(0.08, metric.before / maxVal).toFixed(3);
        const delta = metric.after - metric.before;

        return (
          <div key={metric.label} className="space-y-1.5">
            <div className="flex flex-wrap items-baseline justify-between gap-2 font-mono text-xs">
              <span className="font-bold tracking-[0.06em] text-ink uppercase">{metric.label}</span>
              <span className="text-muted">
                <span>{metric.before}</span>
                <span aria-hidden="true"> → </span>
                <strong className="text-ink">
                  {metric.after} {metric.unit}
                </strong>
                <span className="ml-2 font-bold text-primary-ink">
                  (+{delta} {metric.unit})
                </span>
              </span>
            </div>

            <div className="relative h-6 w-full border border-ink/40 bg-bg/70">
              {/* After bar (temper colour, grows from before ratio on scroll) */}
              <div
                className="logbook-bar-after h-full w-full"
                style={
                  {
                    backgroundColor: accent,
                    '--before-ratio': beforeRatio,
                  } as React.CSSProperties
                }
              />
              {/* Ghost marker for Starting (Before) figure */}
              {beforePct > 0 ? (
                <div
                  className="pointer-events-none absolute inset-y-0 left-0 border-r-2 border-dashed border-ink bg-surface/65"
                  style={{ width: `${beforePct}%` }}
                  title={`Starting: ${metric.before} ${metric.unit}`}
                />
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
