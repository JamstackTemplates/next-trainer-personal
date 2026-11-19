import { useId } from 'react';
import {
  programAvailabilityStamp,
  type PlateWeightLb,
  type Program,
} from '../../content/programs';
import type { TemperColour } from '../../content/business';
import { SiteLink } from '../site-link';
import { TEMPER_VAR } from './temper-helpers';

const PLATE_DIAMETER_PX: Record<PlateWeightLb, number> = {
  10: 98,
  25: 122,
  35: 142,
  45: 164,
};

/**
 * Reusable stamped iron barbell plate.
 * Diameter scales from plateWeightLb (10/25/35/45), rim takes the temper oxide colour,
 * and plateLabel is stamped in Dela Gothic One.
 */
export function Plate({
  label,
  weightLb,
  colour,
  size,
  className = '',
  sublabel,
}: {
  label: string;
  weightLb: PlateWeightLb;
  colour: TemperColour;
  /** Optional explicit pixel size override (defaults to proportional plateWeightLb diameter). */
  size?: number;
  className?: string;
  /** Optional bottom stamp override (defaults to "{weightLb} LB"). */
  sublabel?: string;
}) {
  const rawId = useId();
  const dotsId = `plate-dots-${rawId.replace(/:/g, '')}`;
  const diameter = size ?? PLATE_DIAMETER_PX[weightLb];
  const rim = TEMPER_VAR[colour];
  const bottomText = sublabel ?? `${weightLb} LB`;

  return (
    <svg
      width={diameter}
      height={diameter}
      viewBox="0 0 180 180"
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    >
      <defs>
        <pattern id={dotsId} width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.05" fill="var(--line)" opacity="0.28" />
        </pattern>
      </defs>

      {/* Outer iron edge */}
      <circle cx="90" cy="90" r="85" fill="var(--plate-face)" stroke="var(--plate-stroke)" strokeWidth="3.5" />

      {/* Temper-steel oxide rim */}
      <circle cx="90" cy="90" r="76" fill="none" stroke={rim} strokeWidth="11" />

      {/* Machined recessed cast-iron face */}
      <circle cx="90" cy="90" r="65" fill="var(--plate-face)" stroke="var(--plate-stroke)" strokeWidth="2.5" />

      {/* Subtle halftone shading on lower-right half */}
      <path d="M 44 136 A 65 65 0 0 0 136 44 A 65 65 0 0 1 44 136 Z" fill={`url(#${dotsId})`} />

      {/* Cast-iron raised lip rings */}
      <circle cx="90" cy="90" r="57" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeDasharray="18 8" />

      {/* Centre barbell sleeve hub */}
      <circle cx="90" cy="90" r="22" fill="var(--plate-hub)" stroke="rgba(255,255,255,0.22)" strokeWidth="2.5" />
      <circle cx="90" cy="90" r="13" fill="var(--bg)" stroke="var(--plate-stroke)" strokeWidth="2.5" />

      {/* Top stamped weight numeral */}
      <text
        x="90"
        y="46"
        textAnchor="middle"
        fill="#f2eee5"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.16em',
        }}
      >
        FORGE
      </text>

      {/* Stamped program code across upper/centre hub flange */}
      <text
        x="90"
        y="102"
        textAnchor="middle"
        fill="#f2eee5"
        stroke="var(--plate-hub)"
        strokeWidth="5"
        paintOrder="stroke"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '34px',
          letterSpacing: '-0.02em',
        }}
      >
        {label}
      </text>

      {/* Bottom weight stamp */}
      <text
        x="90"
        y="144"
        textAnchor="middle"
        fill={rim}
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '0.14em',
        }}
      >
        {bottomText}
      </text>
    </svg>
  );
}

/**
 * Signature element: The loaded barbell.
 * Horizontal knurled bar spanning the container with all six programs mounted as clickable plates.
 * Hover/focus lifts the plate (CSS-only) and highlights its chalk tag below.
 * Scrolls horizontally with snap points on narrow viewports; works 100% without JavaScript.
 */
export function Barbell({
  programs,
  linkMode,
  scale = 'default',
}: {
  programs: readonly Program[];
  /** 'page' links to /programs/#id (Home); 'anchor' links to #id on the same page (Programs). */
  linkMode: 'page' | 'anchor';
  scale?: 'default' | 'large' | 'hero';
}) {
  const rawId = useId();
  const knurlId = `bar-knurl-${rawId.replace(/:/g, '')}`;
  const multiplier = scale === 'hero' ? 1.24 : scale === 'large' ? 1.14 : 0.94;
  const maxPlate = Math.round(164 * multiplier);

  return (
    <div className="relative">
      {/* Visible mobile swipe hint */}
      <p className="mb-3 flex items-center justify-between font-mono text-xs font-bold tracking-[0.14em] text-muted uppercase lg:hidden">
        <span>← Swipe the bar to inspect plates →</span>
        <span>{programs.length} programs</span>
      </p>

      <div className="barbell-scroller -mx-4 px-4 pb-4 lg:mx-0 lg:overflow-visible lg:px-0">
        <div className="relative mx-auto min-w-[56rem] lg:min-w-0">
          {/* Horizontal knurled steel bar running behind the plate hubs */}
          <div
            className="pointer-events-none absolute inset-x-0 flex items-center lg:right-auto lg:left-1/2 lg:w-screen lg:-translate-x-1/2"
            style={{ top: `${Math.round(maxPlate / 2) + 8}px`, transform: 'translateY(-50%)' }}
            aria-hidden="true"
          >
            <svg viewBox="0 0 1200 44" className="h-9 w-full lg:h-11" preserveAspectRatio="none">
              <defs>
                <pattern id={knurlId} width="8" height="8" patternUnits="userSpaceOnUse">
                  <path d="M0 4L4 0L8 4L4 8Z" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                </pattern>
              </defs>
              {/* Left & right machined sleeves */}
              <rect x="0" y="10" width="90" height="24" rx="2" fill="#3a3d44" stroke="var(--ink)" strokeWidth="2.5" />
              <rect x="1110" y="10" width="90" height="24" rx="2" fill="#3a3d44" stroke="var(--ink)" strokeWidth="2.5" />
              {/* Sleeve collars */}
              <rect x="86" y="4" width="22" height="36" rx="2" fill="var(--band)" stroke="var(--ink)" strokeWidth="2.5" />
              <rect x="1092" y="4" width="22" height="36" rx="2" fill="var(--band)" stroke="var(--ink)" strokeWidth="2.5" />
              {/* Collar lock pins */}
              <rect x="93" y="1" width="8" height="8" rx="1" fill="var(--temper-straw)" stroke="var(--ink)" strokeWidth="1.5" />
              <rect x="1099" y="1" width="8" height="8" rx="1" fill="var(--temper-straw)" stroke="var(--ink)" strokeWidth="1.5" />
              {/* Main steel shaft */}
              <rect x="108" y="14" width="984" height="16" fill="#2b2e35" stroke="var(--ink)" strokeWidth="2.5" />
              {/* Knurling sections */}
              <rect x="145" y="15" width="260" height="14" fill={`url(#${knurlId})`} />
              <rect x="520" y="15" width="160" height="14" fill={`url(#${knurlId})`} />
              <rect x="795" y="15" width="260" height="14" fill={`url(#${knurlId})`} />
              {/* Powerlifting ring marks */}
              <rect x="295" y="14" width="5" height="16" fill="var(--temper-straw)" />
              <rect x="900" y="14" width="5" height="16" fill="var(--temper-straw)" />
            </svg>
          </div>

          {/* Mounted program plates */}
          <ul
            className="relative z-10 grid grid-cols-6 items-end gap-3 px-10 lg:gap-5 lg:px-6"
            aria-label="Loaded barbell program selector"
          >
            {programs.map(program => {
              const diameter = Math.round(PLATE_DIAMETER_PX[program.plateWeightLb] * multiplier);
              const href = linkMode === 'page' ? `/programs/#${program.id}` : `#${program.id}`;
              const stamp = programAvailabilityStamp(program);

              const content = (
                <>
                  <div
                    className="barbell-plate-disc flex items-center justify-center"
                    style={{ height: `${maxPlate + 16}px` }}
                  >
                    <Plate
                      label={program.plateLabel}
                      weightLb={program.plateWeightLb}
                      colour={program.plateColour}
                      size={diameter}
                    />
                  </div>
                  <div className="barbell-plate-tag mt-2 w-full border-2 border-ink bg-surface px-2.5 py-2 text-left shadow-[3px_3px_0_0_var(--ink)] group-hover:border-primary group-focus-visible:border-primary">
                    <div className="flex items-baseline justify-between gap-1 font-mono text-[0.7rem] font-bold tracking-[0.08em] uppercase">
                      <span className="text-muted">{program.plateWeightLb} LB</span>
                      <span className="text-ink">${program.priceUsd}/mo</span>
                    </div>
                    <p className="mt-0.5 text-sm font-bold leading-snug text-ink">{program.name}</p>
                    <p className="mt-1 font-mono text-[0.68rem] font-bold tracking-[0.08em] text-primary-ink uppercase">
                      {stamp}
                    </p>
                  </div>
                </>
              );

              return (
                <li key={program.id} className="flex flex-col items-center">
                  {linkMode === 'page' ? (
                    <SiteLink
                      href={href}
                      className="barbell-plate-link group flex w-full flex-col items-center"
                    >
                      {content}
                    </SiteLink>
                  ) : (
                    <a
                      href={href}
                      className="barbell-plate-link group flex w-full flex-col items-center"
                    >
                      {content}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
