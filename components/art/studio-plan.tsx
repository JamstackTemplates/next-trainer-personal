import { useId } from 'react';

/**
 * Top-down architectural studio plan of 2214 Penn Avenue:
 * Two power racks, deadlift platform, 40-ft sled lane, kettlebell shelf, chalk stand & Penn Ave entry.
 */
export function StudioPlan({ className = '' }: { className?: string }) {
  const rawId = useId();
  const gridId = `plan-grid-${rawId.replace(/:/g, '')}`;
  const sledId = `plan-sled-${rawId.replace(/:/g, '')}`;

  return (
    <svg
      viewBox="0 0 640 380"
      role="img"
      aria-label="Top-down floor plan of the Forge Strength Coaching studio showing two power racks, deadlift platform, sled lane, kettlebell shelf and Penn Avenue entrance"
      className={`h-auto w-full select-none ${className}`}
    >
      <defs>
        <pattern id={gridId} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0v24" fill="none" stroke="rgba(242,238,229,0.08)" strokeWidth="1" />
        </pattern>
        <pattern id={sledId} width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M0 14L14 0" stroke="var(--temper-straw)" strokeWidth="1" opacity="0.28" />
        </pattern>
      </defs>

      {/* Architectural sheet */}
      <rect x="12" y="12" width="616" height="356" rx="4" fill="var(--band-surface)" stroke="var(--band-line)" strokeWidth="2.5" />
      <rect x="12" y="12" width="616" height="356" fill={`url(#${gridId})`} />

      {/* Outer studio walls */}
      <path
        d="M44 48 H596 V316 H364 M280 316 H44 V48"
        fill="none"
        stroke="#f2eee5"
        strokeWidth="4"
        strokeLinecap="square"
      />
      {/* Penn Avenue entry door swing */}
      <path d="M280 316 V274 A42 42 0 0 1 322 316" fill="none" stroke="var(--temper-straw)" strokeWidth="2" strokeDasharray="5 4" />
      <line x1="280" y1="316" x2="280" y2="274" stroke="var(--temper-straw)" strokeWidth="3" />

      {/* 40-ft Turf Sled Lane (top strip) */}
      <g>
        <rect x="64" y="68" width="512" height="66" fill={`url(#${sledId})`} stroke="var(--temper-straw)" strokeWidth="2.5" />
        {/* Yard hash marks */}
        {[144, 224, 304, 384, 464].map(x => (
          <line key={x} x1={x} y1="68" x2={x} y2="134" stroke="var(--temper-straw)" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.6" />
        ))}
        {/* Push sled */}
        <g transform="translate(88 84)">
          <rect x="0" y="0" width="42" height="34" fill="var(--band)" stroke="#f2eee5" strokeWidth="2" />
          <circle cx="10" cy="10" r="3" fill="var(--temper-straw)" />
          <circle cx="10" cy="24" r="3" fill="var(--temper-straw)" />
          <circle cx="28" cy="17" r="6" fill="none" stroke="var(--temper-straw)" strokeWidth="2" />
        </g>
        <text x="320" y="106" textAnchor="middle" fill="#f2eee5" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.16em' }}>
          40 FT TURF SLED LANE
        </text>
      </g>

      {/* Power Rack 01 */}
      <g transform="translate(72 166)">
        <rect x="0" y="0" width="128" height="118" fill="rgba(74,43,184,0.22)" stroke="var(--temper-purple)" strokeWidth="2.5" />
        {/* Four rack posts */}
        <rect x="14" y="14" width="10" height="10" fill="#f2eee5" />
        <rect x="104" y="14" width="10" height="10" fill="#f2eee5" />
        <rect x="14" y="94" width="10" height="10" fill="#f2eee5" />
        <rect x="104" y="94" width="10" height="10" fill="#f2eee5" />
        {/* Barbell across rack */}
        <line x1="-10" y1="59" x2="138" y2="59" stroke="#f2eee5" strokeWidth="3.5" />
        <rect x="-6" y="47" width="8" height="24" fill="var(--temper-purple)" />
        <rect x="126" y="47" width="8" height="24" fill="var(--temper-purple)" />
        <text x="64" y="38" textAnchor="middle" fill="#f2eee5" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em' }}>
          RACK 01
        </text>
      </g>

      {/* Deadlift Platform (centre) */}
      <g transform="translate(230 166)">
        <rect x="0" y="0" width="146" height="102" fill="rgba(163,90,36,0.24)" stroke="var(--temper-bronze)" strokeWidth="2.5" />
        <rect x="34" y="6" width="78" height="90" fill="none" stroke="var(--temper-bronze)" strokeWidth="1.5" strokeDasharray="6 4" />
        {/* Loaded deadlift bar */}
        <line x1="12" y1="52" x2="134" y2="52" stroke="#f2eee5" strokeWidth="3.5" />
        <rect x="20" y="34" width="10" height="36" fill="var(--temper-bronze)" />
        <rect x="116" y="34" width="10" height="36" fill="var(--temper-bronze)" />
        <text x="73" y="25" textAnchor="middle" fill="#f2eee5" style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.1em' }}>
          DEADLIFT PLATFORM
        </text>
      </g>

      {/* Power Rack 02 */}
      <g transform="translate(406 166)">
        <rect x="0" y="0" width="112" height="118" fill="rgba(31,79,168,0.24)" stroke="var(--temper-blue)" strokeWidth="2.5" />
        <rect x="12" y="14" width="10" height="10" fill="#f2eee5" />
        <rect x="90" y="14" width="10" height="10" fill="#f2eee5" />
        <rect x="12" y="94" width="10" height="10" fill="#f2eee5" />
        <rect x="90" y="94" width="10" height="10" fill="#f2eee5" />
        <line x1="-10" y1="59" x2="122" y2="59" stroke="#f2eee5" strokeWidth="3.5" />
        <rect x="-6" y="47" width="8" height="24" fill="var(--temper-blue)" />
        <rect x="110" y="47" width="8" height="24" fill="var(--temper-blue)" />
        <text x="56" y="38" textAnchor="middle" fill="#f2eee5" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em' }}>
          RACK 02
        </text>
      </g>

      {/* Kettlebell & Dumbbell Shelf along right wall */}
      <g transform="translate(540 166)">
        <rect x="0" y="0" width="38" height="128" fill="var(--band)" stroke="#f2eee5" strokeWidth="2" />
        {[18, 38, 58, 78, 98, 114].map(y => (
          <circle key={y} cx="19" cy={y} r="6.5" fill="none" stroke="var(--temper-straw)" strokeWidth="2" />
        ))}
        <text
          x="19"
          y="144"
          textAnchor="middle"
          fill="var(--band-muted)"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.1em' }}
        >
          KB SHELF
        </text>
      </g>

      {/* Chalk Bowl stand */}
      <g transform="translate(212 246)">
        <circle cx="0" cy="0" r="11" fill="#f2eee5" stroke="var(--band)" strokeWidth="2" />
        <circle cx="0" cy="0" r="5" fill="var(--band-surface)" />
      </g>

      {/* Street label & Bike Rack outside */}
      <text x="322" y="346" textAnchor="middle" fill="var(--temper-straw)" style={{ fontFamily: 'var(--font-mono)', fontSize: '11.5px', fontWeight: 700, letterSpacing: '0.16em' }}>
        PENN AVENUE ENTRY · BIKE RACK OUTSIDE
      </text>
      <text x="56" y="36" fill="var(--band-muted)" style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.14em' }}>
        2214 PENN AVE · STUDIO FLOOR PLAN (MAX 4 LIFTERS)
      </text>
    </svg>
  );
}
