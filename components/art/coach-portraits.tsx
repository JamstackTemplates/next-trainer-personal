import { useId } from 'react';
import type { Coach } from '../../content/coaches';
import { TEMPER_VAR } from './temper-helpers';

/**
 * Illustrated faceless silhouette coach portraits on temper-colour discs:
 * - Mara Okafor: dynamic shot-put / overhead press stance on temper-straw disc.
 * - Theo Lindqvist: lifting belt on, clapping hands / chalking up on temper-purple disc.
 */
export function CoachPortrait({
  coachId,
  temperColour,
  name,
  className = '',
}: {
  coachId: Coach['id'];
  temperColour: Coach['temperColour'];
  name: string;
  className?: string;
}) {
  const rawId = useId();
  const dotsId = `coach-dots-${rawId.replace(/:/g, '')}`;
  const chalkId = `coach-chalk-${rawId.replace(/:/g, '')}`;
  const discFill = TEMPER_VAR[temperColour];

  return (
    <svg
      viewBox="0 0 260 260"
      role="img"
      aria-label={`Illustrated silhouette portrait of ${name}`}
      className={`h-auto w-full select-none ${className}`}
    >
      <defs>
        <pattern id={dotsId} width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="2.5" cy="2.5" r="1.2" fill="var(--band)" opacity="0.22" />
        </pattern>
        <filter id={chalkId} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      {/* Temper-colour iron disc */}
      <circle cx="130" cy="130" r="112" fill={discFill} stroke="var(--ink)" strokeWidth="3" />
      <circle cx="130" cy="130" r="102" fill="none" stroke="var(--ink)" strokeWidth="1.5" strokeDasharray="10 6" opacity="0.55" />
      {/* Halftone shadow crescent */}
      <path d="M52 208 A112 112 0 0 0 208 52 A106 106 0 0 1 52 208 Z" fill={`url(#${dotsId})`} />

      {coachId === 'mara-okafor' ? (
        /* Mara: athletic shot-put rotational launch stance */
        <g stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Chalk motion arc behind shot */}
          <path
            d="M174 52 C198 62 214 82 220 108"
            fill="none"
            stroke="#f7f5f0"
            strokeWidth="3"
            strokeDasharray="6 6"
            opacity="0.8"
          />
          {/* Head */}
          <circle cx="122" cy="76" r="22" fill="#16171a" />
          {/* Athletic ponytail silhouette */}
          <path d="M102 68 C88 64 82 78 88 92 C96 86 102 80 104 74 Z" fill="#16171a" />
          {/* Torso rotated in dynamic drive */}
          <path d="M96 106 C114 96 144 98 164 114 L152 198 L94 198 L88 148 Z" fill="#16171a" />
          {/* Extended lead arm pointing forward-left */}
          <path d="M98 112 L50 132 L56 148 L104 134 Z" fill="#16171a" />
          {/* Cocked throwing arm holding iron shot near shoulder */}
          <path d="M156 112 L192 98 L184 78 L148 96 Z" fill="#16171a" />
          {/* Iron shot put */}
          <circle cx="164" cy="80" r="15" fill="var(--band)" stroke="#f7f5f0" strokeWidth="2.5" />
          {/* Lower athletic stance clipped cleanly at disc edge */}
          <path d="M94 196 L78 232 L114 238 L126 202 L144 238 L178 228 L152 196 Z" fill="#16171a" />
        </g>
      ) : (
        /* Theo: lifting belt on, clapping chalk cloud before a pull */
        <g stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Chalk burst cloud around clapping hands */}
          <g filter={`url(#${chalkId})`} stroke="none">
            <ellipse cx="130" cy="142" rx="44" ry="26" fill="rgba(255,255,255,0.72)" />
            <circle cx="94" cy="126" r="10" fill="rgba(255,255,255,0.58)" />
            <circle cx="168" cy="128" r="11" fill="rgba(255,255,255,0.58)" />
          </g>
          {/* Head */}
          <circle cx="130" cy="70" r="22" fill="#16171a" />
          {/* Broad shoulders & torso */}
          <path d="M74 112 C94 96 166 96 186 112 L172 232 L88 232 Z" fill="#16171a" />
          {/* Heavy leather powerlifting belt & steel prong buckle */}
          <rect x="86" y="182" width="88" height="24" rx="3" fill="var(--temper-bronze)" stroke="#f7f5f0" strokeWidth="2" />
          <rect x="120" y="179" width="20" height="30" rx="2" fill="var(--temper-straw)" stroke="#16171a" strokeWidth="2" />
          {/* Bent arms bringing hands together at chest to chalk up */}
          <path d="M74 112 L62 152 L114 156 L118 136 L86 134 L94 118 Z" fill="#16171a" />
          <path d="M186 112 L198 152 L146 156 L142 136 L174 134 L166 118 Z" fill="#16171a" />
          {/* Chalk-dusted clapping hands */}
          <rect x="112" y="130" width="16" height="26" rx="5" fill="#f7f5f0" stroke="#16171a" strokeWidth="2.5" />
          <rect x="132" y="130" width="16" height="26" rx="5" fill="#f7f5f0" stroke="#16171a" strokeWidth="2.5" />
        </g>
      )}
    </svg>
  );
}
