import { useId } from 'react';

/**
 * 404 Art: "Missed lift".
 * Barbell dumped behind the lifter onto bumper plates, chalk cloud rising, "404" stamped on the plates.
 */
export function MissedLift({ className = '' }: { className?: string }) {
  const rawId = useId();
  const chalkId = `missed-chalk-${rawId.replace(/:/g, '')}`;

  return (
    <svg
      viewBox="0 0 640 320"
      role="img"
      aria-label="Illustration of a barbell dumped onto bumper plates stamped 404 in a puff of chalk behind a lifter"
      className={`h-auto w-full select-none ${className}`}
    >
      <defs>
        <filter id={chalkId} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="9" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      {/* Platform line */}
      <rect x="24" y="264" width="592" height="14" rx="2" fill="var(--band-surface)" stroke="var(--band-line)" strokeWidth="2.5" />

      {/* Chalk impact puff around the dumped bar */}
      <g filter={`url(#${chalkId})`}>
        <ellipse cx="220" cy="238" rx="95" ry="34" fill="rgba(255,255,255,0.2)" />
        <ellipse cx="145" cy="184" rx="44" ry="26" fill="rgba(255,255,255,0.14)" />
        <ellipse cx="298" cy="196" rx="48" ry="24" fill="rgba(255,255,255,0.14)" />
      </g>

      {/* Bounce lines */}
      <g stroke="var(--temper-straw)" strokeWidth="2.5" strokeLinecap="round">
        <path d="M120 120 L106 96" />
        <path d="M150 112 L150 86" />
        <path d="M180 120 L194 98" />
        <path d="M294 128 L310 106" />
      </g>

      {/* Dumped barbell resting slightly angled on bumper plates */}
      <g>
        {/* Bar sleeve & shaft */}
        <line x1="78" y1="204" x2="366" y2="212" stroke="#b8b5ad" strokeWidth="10" strokeLinecap="round" />

        {/* Left bumper plate stamped 404 */}
        <g transform="translate(152 204)">
          <circle cx="0" cy="0" r="60" fill="#23252a" stroke="#f2eee5" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="51" fill="none" stroke="var(--temper-purple)" strokeWidth="8" />
          <circle cx="0" cy="0" r="14" fill="#08090a" stroke="#f2eee5" strokeWidth="2" />
          <text
            x="0"
            y="8"
            textAnchor="middle"
            fill="#f2eee5"
            stroke="#08090a"
            strokeWidth="4"
            paintOrder="stroke"
            style={{ fontFamily: 'var(--font-display)', fontSize: '26px' }}
          >
            404
          </text>
        </g>

        {/* Right bumper plate stamped 404 */}
        <g transform="translate(302 210)">
          <circle cx="0" cy="0" r="54" fill="#23252a" stroke="#f2eee5" strokeWidth="2.5" />
          <circle cx="0" cy="0" r="45" fill="none" stroke="var(--temper-bronze)" strokeWidth="7" />
          <circle cx="0" cy="0" r="12" fill="#08090a" stroke="#f2eee5" strokeWidth="2" />
          <text
            x="0"
            y="7"
            textAnchor="middle"
            fill="#f2eee5"
            stroke="#08090a"
            strokeWidth="3.5"
            paintOrder="stroke"
            style={{ fontFamily: 'var(--font-display)', fontSize: '22px' }}
          >
            404
          </text>
        </g>
      </g>

      {/* Lifter stepping safely forward away from the dumped bar */}
      <g transform="translate(430 48)" stroke="#08090a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Head looking back slightly */}
        <circle cx="56" cy="34" r="20" fill="#f2eee5" />
        {/* Torso leaning forward */}
        <path d="M36 62 C52 54 74 56 84 72 L78 144 L36 144 Z" fill="#f2eee5" />
        {/* Arms held out for balance */}
        <path d="M40 68 L6 92 L14 104 L46 86 Z" fill="#f2eee5" />
        <path d="M80 72 L114 98 L104 110 L74 90 Z" fill="#f2eee5" />
        {/* Belt */}
        <rect x="36" y="114" width="44" height="14" rx="2" fill="var(--temper-straw)" />
        {/* Stepped forward legs */}
        <path d="M38 144 L22 214 L44 214 L56 164 Z" fill="#f2eee5" />
        <path d="M74 144 L98 214 L120 214 L84 152 Z" fill="#f2eee5" />
      </g>
    </svg>
  );
}
