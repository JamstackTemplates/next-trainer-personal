import { business } from '../content/business';
import { TemperScale } from './art/temper-scale';
import { SiteLink } from './site-link';

export function SiteFooter() {
  return (
    <footer className="iron-band relative overflow-hidden text-band-ink">
      <TemperScale variant="divider" />

      {/* Oversized faint FORGE wordmark running off the right edge */}
      <p
        aria-hidden="true"
        className="ghost-word temper-text-static absolute right-[-6vw] bottom-[-3.5vw] text-[34vw] opacity-[0.13]"
      >
        {business.wordmark}
      </p>

      <div className="wrap relative z-10 pt-16 pb-14 sm:pt-24 sm:pb-[clamp(4rem,16vw,14rem)]">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display-poster text-6xl text-band-ink sm:text-7xl">{business.wordmark}</p>
            <p className="mt-2 font-mono text-xs font-bold tracking-[0.3em] text-temper-straw uppercase">
              {business.wordmarkSub}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-band-muted">
              {business.introduction}
            </p>
            <p className="mt-5 font-mono text-xs tracking-[0.06em] text-band-muted">
              Sample business for the Jamstacks gallery. All client names and figures are fictitious.
            </p>
          </div>

          <div className="md:col-span-4">
            <h2 className="font-mono text-xs font-bold tracking-[0.18em] text-temper-straw uppercase">
              Studio &amp; Hours
            </h2>
            <address className="mt-3 space-y-2 font-mono text-sm not-italic text-band-ink">
              <p>{business.address.formatted}</p>
              <p>
                <a className="underline hover:text-temper-straw" href={`mailto:${business.email}`}>
                  {business.email}
                </a>
              </p>
              <p>
                <a
                  className="underline hover:text-temper-straw"
                  href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}
                >
                  {business.phone}
                </a>
              </p>
            </address>
            <dl className="mt-4 space-y-1 font-mono text-xs text-band-muted">
              {business.hoursSummary.map(row => (
                <div key={row.label} className="flex max-w-xs justify-between gap-4">
                  <dt>{row.label}</dt>
                  <dd className="text-band-ink">{row.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="md:col-span-3">
            <h2 className="font-mono text-xs font-bold tracking-[0.18em] text-temper-straw uppercase">
              Navigate
            </h2>
            <ul className="mt-3 space-y-2.5 font-mono text-sm font-bold tracking-[0.08em] uppercase">
              <li>
                <SiteLink href="/" className="text-band-ink no-underline hover:text-temper-straw hover:underline">
                  Home
                </SiteLink>
              </li>
              <li>
                <SiteLink href="/programs/" className="text-band-ink no-underline hover:text-temper-straw hover:underline">
                  Programs
                </SiteLink>
              </li>
              <li>
                <SiteLink href="/results/" className="text-band-ink no-underline hover:text-temper-straw hover:underline">
                  Results
                </SiteLink>
              </li>
              <li>
                <SiteLink href="/coaching/" className="text-band-ink no-underline hover:text-temper-straw hover:underline">
                  Coaching
                </SiteLink>
              </li>
              <li>
                <SiteLink href="/contact/" className="text-band-ink no-underline hover:text-temper-straw hover:underline">
                  Contact
                </SiteLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-band-line pt-6 font-mono text-xs text-band-muted">
          <p>{business.name} · Strip District, Pittsburgh</p>
          <span title="Made with love by jamstacks.net">
            with <span role="img" aria-label="love">❤️</span>{' '}
            <a className="text-band-ink no-underline hover:text-temper-straw hover:underline" href="https://jamstacks.net">
              jamstacks.net
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
