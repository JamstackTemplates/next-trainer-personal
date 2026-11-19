import { MissedLift } from '../components/art/missed-lift';
import { TemperScale } from '../components/art/temper-scale';
import { SiteLink } from '../components/site-link';

export default function NotFound() {
  return (
    <section className="iron-band relative overflow-hidden py-16 sm:py-24">
      <p aria-hidden="true" className="ghost-word temper-text-static absolute top-6 right-[-3vw] text-[34vw] opacity-[0.12]">404</p>
      <div className="wrap-wide relative flex flex-col items-start gap-8">
        <MissedLift className="w-full max-w-4xl" />

        <div>
          <p className="font-mono text-xs font-bold tracking-[0.18em] text-temper-straw uppercase">
            Error 404 · Bar dumped
          </p>
          <h1 className="font-display-poster mt-4 text-[clamp(3rem,10vw,10rem)] text-band-ink">
            Missed the lift.
          </h1>
          <TemperScale variant="underline" className="mt-4 max-w-xs" />
          <p className="mt-5 max-w-xl text-lg text-band-muted">
            That page isn’t on the platform. Rack it and try again.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <SiteLink href="/" className="button">
            Go home
          </SiteLink>
          <SiteLink href="/programs/" className="button button-on-band">
            See programs
          </SiteLink>
          <SiteLink href="/contact/" className="button button-on-band">
            Contact a coach
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
