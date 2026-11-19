import { DarkModeToggle } from 'jamstacks';
import { business } from '../content/business';
import { KnurlStrip } from './art/knurl-strip';
import { PlateIcon } from './art/icons';
import { SiteLink } from './site-link';

const NAV_ITEMS = [
  { href: '/programs/', label: 'Programs' },
  { href: '/results/', label: 'Results' },
  { href: '/coaching/', label: 'Coaching' },
  { href: '/contact/', label: 'Contact' },
] as const;

export function SiteHeader() {
  return (
    <header className="iron-band sticky top-0 z-40">
      <div className="wrap flex flex-wrap items-center justify-between gap-x-2 gap-y-2 py-2.5 sm:gap-x-4 sm:py-3.5">
        <SiteLink
          href="/"
          className="group flex items-center gap-2 text-band-ink no-underline hover:no-underline sm:gap-2.5"
        >
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-temper-purple bg-band-surface text-temper-straw sm:h-10 sm:w-10"
            aria-hidden="true"
          >
            <PlateIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display-tight text-lg tracking-[-0.03em] text-band-ink sm:text-2xl">
              {business.wordmark}
            </span>
            <span className="mt-0.5 font-mono text-[0.55rem] font-bold tracking-[0.16em] text-band-muted uppercase sm:text-[0.66rem] sm:tracking-[0.2em]">
              {business.wordmarkSub}
            </span>
          </span>
        </SiteLink>

        <div className="flex items-center gap-2 md:order-3 sm:gap-2.5">
          <SiteLink
            href="/contact/"
            className="button min-h-9 px-2.5 py-1.5 text-[0.68rem] tracking-[0.04em] sm:min-h-10 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.06em]"
          >
            Free consult
          </SiteLink>
          <div className="plate-toggle" title="Toggle colour theme">
            <DarkModeToggle />
          </div>
        </div>

        <nav
          aria-label="Main"
          className="flex w-full items-center justify-between gap-2 border-t border-band-line pt-2 font-mono text-xs font-bold tracking-[0.12em] uppercase md:order-2 md:w-auto md:justify-center md:gap-6 md:border-0 md:pt-0"
        >
          {NAV_ITEMS.map(item => (
            <SiteLink
              key={item.href}
              href={item.href}
              markCurrent="page"
              className="py-1 text-band-ink no-underline transition-colors hover:text-temper-straw hover:underline"
            >
              {item.label}
            </SiteLink>
          ))}
        </nav>
      </div>
      <KnurlStrip />
    </header>
  );
}
