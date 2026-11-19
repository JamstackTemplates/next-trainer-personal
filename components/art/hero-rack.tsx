import { useId } from 'react';

/**
 * Hero artwork: "6am at the rack".
 * Lifter silhouette at top of a deadlift lockout in front of a Strip District power rack,
 * chalk cloud drifting off the hands, temper-coloured bumper plates, 6:00 wall clock,
 * arched brick factory window with Penn Avenue skyline behind.
 */
export function HeroRack({ className = '' }: { className?: string }) {
  const rawId = useId();
  const idPrefix = `hero-${rawId.replace(/:/g, '')}`;
  const dotsId = `${idPrefix}-dots`;
  const chalkId = `${idPrefix}-chalk`;
  const brickId = `${idPrefix}-brick`;
  const knurlId = `${idPrefix}-knurl`;

  return (
    <svg
      viewBox="0 0 640 580"
      role="img"
      aria-label="Illustration of a lifter locked out at the top of a deadlift in front of a squat rack at 6am, with temper-coloured plates, chalk dust and a Strip District brick window"
      className={`h-auto w-full select-none ${className}`}
    >
      <defs>
        <pattern id={dotsId} width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="2.5" cy="2.5" r="1.25" fill="var(--line)" opacity="0.65" />
        </pattern>
        <pattern id={brickId} width="32" height="16" patternUnits="userSpaceOnUse">
          <path d="M0 0h32v16H0Z" fill="none" />
          <path d="M0 8h32M16 0v8M0 8v8M32 8v8" stroke="var(--line)" strokeWidth="1.2" opacity="0.45" />
        </pattern>
        <pattern id={knurlId} width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M0 3L3 0L6 3L3 6Z" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="0.9" />
        </pattern>
        <filter id={chalkId} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.065" numOctaves="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="11" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>

      {/* Studio back wall frame with subtle brick texture */}
      <rect x="82" y="16" width="538" height="492" rx="4" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2.5" />
      <rect x="82" y="16" width="538" height="492" fill={`url(#${brickId})`} />

      {/* Arched Strip District industrial warehouse window */}
      <g>
        <path
          d="M170 302 V128 C170 72 222 44 294 44 C366 44 418 72 418 128 V302 Z"
          fill="var(--band)"
          stroke="var(--ink)"
          strokeWidth="2.5"
        />
        {/* 6am pre-dawn temper-blue & straw sky bands through the window */}
        <clipPath id={`${idPrefix}-winclip`}>
          <path d="M174 298 V130 C174 78 224 48 294 48 C364 48 414 78 414 130 V298 Z" />
        </clipPath>
        <g clipPath={`url(#${idPrefix}-winclip)`}>
          <rect x="170" y="44" width="248" height="115" fill="var(--temper-blue)" opacity="0.42" />
          <rect x="170" y="159" width="248" height="58" fill="var(--temper-purple)" opacity="0.34" />
          <rect x="170" y="217" width="248" height="82" fill="var(--temper-straw)" opacity="0.35" />

          {/* Penn Avenue warehouses & Pittsburgh bridge silhouette */}
          <path
            d="M170 298 V246 H204 V228 H234 V246 H248 V214 L268 198 L288 214 V252 H318 V232 H356 V250 H376 V220 H418 V298 Z"
            fill="var(--band)"
            opacity="0.92"
          />
          {/* Steel arch bridge hint in distance */}
          <path
            d="M236 254 Q294 206 352 254"
            fill="none"
            stroke="var(--temper-straw)"
            strokeWidth="2"
            opacity="0.7"
          />
          {/* Lit warehouse windows */}
          <rect x="258" y="226" width="6" height="8" fill="var(--temper-straw)" opacity="0.85" />
          <rect x="272" y="226" width="6" height="8" fill="var(--temper-straw)" opacity="0.85" />
          <rect x="330" y="242" width="7" height="7" fill="var(--temper-straw)" opacity="0.7" />
          <rect x="388" y="232" width="6" height="8" fill="var(--temper-straw)" opacity="0.75" />
        </g>

        {/* Industrial steel mullions */}
        <path
          d="M170 142 H418 M170 218 H418 M232 58 V302 M294 44 V302 M356 58 V302"
          stroke="var(--ink)"
          strokeWidth="2.5"
        />
        <rect x="160" y="298" width="268" height="12" fill="var(--line)" stroke="var(--ink)" strokeWidth="2.5" />
      </g>

      {/* Back wall gym clock reading 6:00 — clear of the right rack upright */}
      <g transform="translate(560 96)">
        <circle cx="0" cy="0" r="36" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2.5" />
        <circle cx="0" cy="0" r="30" fill="none" stroke="var(--line)" strokeWidth="1.5" />
        {/* Clock ticks */}
        <path
          d="M0 -26 V-21 M0 21 V26 M-26 0 H-21 M21 0 H26 M13 -22 L11 -18 M22 -13 L18 -11 M22 13 L18 11 M13 22 L11 18 M-13 22 L-11 18 M-22 13 L-18 11 M-22 -13 L-18 -11 M-13 -22 L-11 -18"
          stroke="var(--ink)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* 6:00 hands: minute straight up to 12, hour straight down to 6 */}
        <line x1="0" y1="0" x2="0" y2="-20" stroke="var(--ink)" strokeWidth="2.6" strokeLinecap="round" />
        <line x1="0" y1="0" x2="0" y2="15" stroke="var(--temper-purple)" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="0" cy="0" r="3.5" fill="var(--ink)" />
        <text
          x="0"
          y="54"
          textAnchor="middle"
          fill="var(--muted)"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em' }}
        >
          06:00
        </text>
      </g>

      {/* Power rack uprights & pull-up crossmember */}
      <g>
        {/* Crossbar top */}
        <rect x="136" y="76" width="372" height="18" fill="var(--band)" stroke="var(--ink)" strokeWidth="2.5" />
        <rect x="150" y="94" width="344" height="8" fill="var(--temper-bronze)" stroke="var(--ink)" strokeWidth="2" />
        {/* Left upright */}
        <rect x="148" y="76" width="22" height="432" fill="var(--band)" stroke="var(--ink)" strokeWidth="2.5" />
        {/* Right upright */}
        <rect x="476" y="76" width="22" height="432" fill="var(--band)" stroke="var(--ink)" strokeWidth="2.5" />
        {/* Westside pin holes on both uprights */}
        {[122, 146, 170, 194, 218, 242, 266, 290, 314, 338, 362, 386, 410, 434, 458].map(y => (
          <g key={y}>
            <circle cx="159" cy={y} r="2.8" fill="var(--bg)" />
            <circle cx="487" cy={y} r="2.8" fill="var(--bg)" />
          </g>
        ))}
        {/* J-cups */}
        <path d="M170 250 H188 V270 H170 Z" fill="var(--temper-straw)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M458 250 H476 V270 H458 Z" fill="var(--temper-straw)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
      </g>

      {/* Rubber platform & halftone floor shadow */}
      <g>
        <path d="M48 508 H624 L604 558 H68 Z" fill="var(--band)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M124 508 H544 L530 558 H138 Z" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2.5" />
        <path d="M124 508 H544 L530 558 H138 Z" fill={`url(#${dotsId})`} />
        <line x1="82" y1="508" x2="620" y2="508" stroke="var(--ink)" strokeWidth="2.5" />
      </g>

      {/* Drifting chalk dust cloud behind & around hands */}
      <g filter={`url(#${chalkId})`}>
        <ellipse cx="258" cy="340" rx="64" ry="34" fill="var(--chalk)" />
        <ellipse cx="404" cy="336" rx="68" ry="36" fill="var(--chalk)" />
        <ellipse cx="332" cy="356" rx="95" ry="26" fill="var(--chalk)" opacity="0.8" />
        <circle cx="212" cy="304" r="14" fill="var(--chalk)" />
        <circle cx="446" cy="296" r="16" fill="var(--chalk)" />
      </g>

      {/* Bold faceless lifter silhouette at deadlift lockout (dark iron silhouette in both themes) */}
      <g stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Head (strong athletic silhouette) */}
        <circle cx="330" cy="144" r="25" fill="#141518" />
        {/* Neck & traps */}
        <path d="M316 164 L344 164 L356 184 L304 184 Z" fill="#141518" />
        {/* Broad shoulders, torso & hips solid down to thigh split */}
        <path
          d="M266 190 C282 178 304 176 330 176 C356 176 378 178 394 190 L378 342 L336 352 L324 352 L282 342 Z"
          fill="#141518"
        />
        {/* Lifting belt accent in temper bronze */}
        <rect x="285" y="266" width="90" height="22" rx="3" fill="var(--temper-bronze)" stroke="var(--ink)" strokeWidth="2.5" />
        <rect x="320" y="264" width="20" height="26" rx="2" fill="var(--temper-straw)" stroke="#141518" strokeWidth="2" />

        {/* Left & right arms locked straight down to the bar */}
        <path d="M266 190 L248 272 L254 344 L274 344 L280 272 L292 214 Z" fill="#141518" />
        <path d="M394 190 L412 272 L406 344 L386 344 L380 272 L368 214 Z" fill="#141518" />

        {/* Strong legs planted wide on the platform */}
        <path d="M282 332 L268 424 L262 508 L298 508 L314 424 L326 350 Z" fill="#141518" />
        <path d="M378 332 L392 424 L398 508 L362 508 L346 424 L334 350 Z" fill="#141518" />

        {/* Flat lifting shoes */}
        <path d="M244 508 H302 V522 H240 C240 514 242 508 244 508 Z" fill="var(--temper-purple)" />
        <path d="M358 508 H416 C418 508 420 514 420 522 H358 Z" fill="var(--temper-purple)" />
      </g>

      {/* Loaded deadlift barbell extending LEFT so plates overlap the headline column at 1440px */}
      <g>
        {/* Steel bar shaft */}
        <rect x="12" y="341" width="610" height="12" rx="2" fill="#32353c" stroke="var(--ink)" strokeWidth="2.5" />
        {/* Knurling marks */}
        <rect x="195" y="342" width="110" height="10" fill={`url(#${knurlId})`} />
        <rect x="355" y="342" width="110" height="10" fill={`url(#${knurlId})`} />

        {/* Left side loaded bumper plates (temper purple 45, bronze 35, straw 25, blue 10) */}
        <g stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round">
          {/* Inner 45lb purple */}
          <rect x="108" y="256" width="24" height="182" rx="5" fill="var(--temper-purple)" />
          <line x1="120" y1="264" x2="120" y2="430" stroke="rgba(255,255,255,0.28)" strokeWidth="2" />
          {/* 35lb bronze */}
          <rect x="82" y="268" width="22" height="158" rx="5" fill="var(--temper-bronze)" />
          {/* 25lb straw */}
          <rect x="58" y="284" width="20" height="126" rx="4" fill="var(--temper-straw)" />
          {/* 10lb blue */}
          <rect x="40" y="302" width="14" height="90" rx="3" fill="var(--temper-blue)" />
          {/* Collar */}
          <rect x="26" y="331" width="12" height="32" rx="2" fill="var(--band)" />
        </g>

        {/* Right side loaded bumper plates (mirror) */}
        <g stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round">
          <rect x="528" y="256" width="24" height="182" rx="5" fill="var(--temper-purple)" />
          <line x1="540" y1="264" x2="540" y2="430" stroke="rgba(255,255,255,0.28)" strokeWidth="2" />
          <rect x="556" y="268" width="22" height="158" rx="5" fill="var(--temper-bronze)" />
          <rect x="582" y="284" width="20" height="126" rx="4" fill="var(--temper-straw)" />
          <rect x="606" y="302" width="14" height="90" rx="3" fill="var(--temper-blue)" />
        </g>

        {/* Chalked hands gripping the bar */}
        <rect x="250" y="336" width="28" height="22" rx="6" fill="#f7f5f0" stroke="var(--ink)" strokeWidth="2.5" />
        <rect x="382" y="336" width="28" height="22" rx="6" fill="#f7f5f0" stroke="var(--ink)" strokeWidth="2.5" />
      </g>

      {/* Crisp chalk particles in foreground */}
      <g fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.2" opacity="0.85">
        <circle cx="234" cy="368" r="3" />
        <circle cx="246" cy="382" r="2" />
        <circle cx="426" cy="364" r="3" />
        <circle cx="412" cy="386" r="2.2" />
        <circle cx="330" cy="378" r="2.5" />
      </g>
    </svg>
  );
}
