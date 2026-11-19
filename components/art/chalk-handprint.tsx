import { useId } from 'react';

/** Two overlapping chalk-dusted handprints for Proof Strip, Contact sheet and Results CTA. */
export function ChalkHandprint({
  className = '',
  tone = 'chalk',
}: {
  className?: string;
  /** 'chalk' for dark iron bands; 'dust' for light/dark chalk-paper surfaces. */
  tone?: 'chalk' | 'dust';
}) {
  const rawId = useId();
  const filterId = `chalk-hand-${rawId.replace(/:/g, '')}`;
  const fill = tone === 'chalk' ? 'rgba(255,255,255,0.16)' : 'var(--line)';
  const secondary = tone === 'chalk' ? 'rgba(255,255,255,0.1)' : 'var(--chalk)';

  return (
    <svg
      viewBox="0 0 280 220"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <filter id={filterId} x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.14" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      <g filter={`url(#${filterId})`}>
        {/* Left chalk handprint */}
        <g transform="translate(24 22) rotate(-14 75 95)" fill={fill}>
          <path d="M52 104c-11 2-19 14-16 30 3 19 16 35 37 36 22 1 38-13 42-34 3-17-3-34-13-40-15-9-34-6-50 8Z" />
          <rect x="44" y="42" width="14" height="58" rx="7" transform="rotate(-10 51 71)" />
          <rect x="64" y="24" width="15" height="72" rx="7.5" transform="rotate(-3 71 60)" />
          <rect x="85" y="28" width="14.5" height="68" rx="7.2" transform="rotate(4 92 62)" />
          <rect x="104" y="46" width="13" height="54" rx="6.5" transform="rotate(12 110 73)" />
          <rect x="19" y="88" width="15" height="44" rx="7.5" transform="rotate(-44 26 110)" />
        </g>

        {/* Right overlapping chalk handprint */}
        <g transform="translate(112 26) rotate(16 75 95)" fill={secondary}>
          <path d="M50 104c-11 2-19 14-16 30 3 19 16 35 37 36 22 1 38-13 42-34 3-17-3-34-13-40-15-9-34-6-50 8Z" />
          <rect x="40" y="46" width="13" height="54" rx="6.5" transform="rotate(-12 46 73)" />
          <rect x="59" y="28" width="14.5" height="68" rx="7.2" transform="rotate(-4 66 62)" />
          <rect x="80" y="24" width="15" height="72" rx="7.5" transform="rotate(3 87 60)" />
          <rect x="100" y="42" width="14" height="58" rx="7" transform="rotate(10 107 71)" />
          <rect x="122" y="86" width="15" height="44" rx="7.5" transform="rotate(44 129 108)" />
        </g>

        {/* Chalk dust specks */}
        <circle cx="28" cy="54" r="3" fill={fill} />
        <circle cx="150" cy="24" r="2.5" fill={fill} />
        <circle cx="250" cy="70" r="3.5" fill={fill} />
        <circle cx="232" cy="186" r="2.5" fill={fill} />
        <circle cx="62" cy="196" r="2.5" fill={fill} />
        <circle cx="136" cy="194" r="4" fill={secondary} />
      </g>
    </svg>
  );
}
