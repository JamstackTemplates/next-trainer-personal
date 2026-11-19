'use client';

import { useEffect, useState } from 'react';
import { studioOpeningStatus, type OpeningHours, type StudioOpeningStatus } from '../lib/hours';
import { site } from '../lib/site';

/**
 * Live studio open/closed badge computed in the browser in America/New_York and refreshed every minute.
 * Static/no-JS output stays neutral ("Sessions by appointment · Mon–Sat").
 */
export function OpenBadge({
  hours,
  className = '',
}: {
  hours: readonly OpeningHours[];
  className?: string;
}) {
  const [status, setStatus] = useState<StudioOpeningStatus>({
    state: 'unknown',
    label: 'Sessions by appointment · Mon–Sat',
  });

  useEffect(() => {
    const update = () => setStatus(studioOpeningStatus(hours, site.timeZone));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours]);

  const dotClass =
    status.state === 'open'
      ? 'bg-temper-straw shadow-[0_0_0_3px_rgba(201,154,46,0.28)]'
      : status.state === 'closed'
        ? 'bg-muted'
        : 'bg-temper-purple';

  return (
    <span className={`inline-flex items-center gap-2 font-mono text-xs font-bold tracking-[0.06em] uppercase ${className}`}>
      <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${dotClass}`} aria-hidden="true" />
      <span>{status.label}</span>
    </span>
  );
}
