import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

const base: IconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export function PlateIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9.5" />
      <circle cx="12" cy="12" r="5.5" strokeDasharray="3 2.5" />
      <circle cx="12" cy="12" r="2.2" />
    </svg>
  );
}

export function KettlebellIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8.5 9V6.5a3.5 3.5 0 0 1 7 0V9" />
      <path d="M6.5 10.5c-1.8 2.2-2 6 .5 8.5a7 7 0 0 0 10 0c2.5-2.5 2.3-6.3.5-8.5H6.5Z" />
      <path d="M9.5 14.5h5" />
    </svg>
  );
}

export function StopwatchIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M9.5 2.5h5M12 2.5V5M18 6.5l1.5-1.5" />
      <circle cx="12" cy="13.5" r="7.5" />
      <path d="M12 9.5v4l2.8 1.8" />
    </svg>
  );
}

export function LogbookIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="5" y="3" width="15" height="18" rx="1.5" />
      <path d="M3 7h4M3 12h4M3 17h4" />
      <path d="M10 8.5h6.5M10 12.5h6.5M10 16.5h4" />
    </svg>
  );
}

export function ChalkBowlIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 10.5h14c0 4.5-3.1 7.5-7 7.5s-7-3-7-7.5Z" />
      <path d="M8.5 18v3h7v-3" />
      <path d="M8 7.5c.8-1.8 2.5-2.5 4-2.5s3.2.7 4 2.5" />
      <circle cx="9.5" cy="4.2" r="0.7" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="3.8" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="1.5" />
      <path d="M7.5 3v4M16.5 3v4M3.5 9.5h17" />
      <path d="M8 13.5h2.5M13.5 13.5H16M8 17h2.5" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6.2 3.5h3.2l1.4 4-2 1.6a12.5 12.5 0 0 0 6.1 6.1l1.6-2 4 1.4v3.2a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.2 5.7a2 2 0 0 1 2-2.2Z" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s6.5-5.6 6.5-11a6.5 6.5 0 1 0-13 0c0 5.4 6.5 11 6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

export function RemoteIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2" />
      <path d="M10.5 18.5h3" />
      <path d="M8.8 10.5h6.4M9.6 8.5v4M14.4 8.5v4" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 12.5 9.5 17.5 19.5 6.5" />
    </svg>
  );
}

export function WaitlistIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6.5 3.5h11M6.5 20.5h11" />
      <path d="M8 3.5v3.2a4 4 0 0 0 1.6 3.2L12 12l2.4-2.1A4 4 0 0 0 16 6.7V3.5" />
      <path d="M8 20.5v-3.2a4 4 0 0 1 1.6-3.2L12 12l2.4 2.1a4 4 0 0 1 1.6 3.2v3.2" />
    </svg>
  );
}

export function FullLockIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="5" y="10.5" width="14" height="10" rx="1.5" />
      <path d="M8.5 10.5V7.5a3.5 3.5 0 0 1 7 0v3" />
    </svg>
  );
}
