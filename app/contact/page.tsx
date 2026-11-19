import type { Metadata } from 'next';
import { ChalkHandprint } from '../../components/art/chalk-handprint';
import { CalendarIcon, MapPinIcon, PhoneIcon } from '../../components/art/icons';
import { CopyEmail } from '../../components/copy-email';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { OpenBadge } from '../../components/open-badge';
import { PageHead } from '../../components/page-head';
import { TimeZoneNote } from '../../components/time-zone-note';
import { business } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);

  return (
    <>
      <PageHead
        eyebrow="Contact"
        title={business.enquiries.title}
        icon={<CalendarIcon className="h-6 w-6 text-temper-straw" />}
        plateColour="blue"
      >
        <p>{business.enquiries.introduction}</p>
      </PageHead>

      <div className="chalk-surface py-12 sm:py-16">
        <div className="wrap grid items-start gap-10 lg:grid-cols-12">
          {/* Left column (first on mobile so public email is always visible before the form) */}
          <aside aria-label="Contact details and enquiry checklist" className="space-y-8 lg:col-span-5">
            {/* Coach's clipboard contact card */}
            <div className="relative border-2 border-ink bg-surface p-6 pt-8 shadow-[6px_6px_0_0_var(--ink)] sm:p-8">
              {/* Clipboard metal clip */}
              <div
                aria-hidden="true"
                className="absolute -top-3.5 left-1/2 h-7 w-28 -translate-x-1/2 border-2 border-ink bg-band"
              >
                <span className="mx-auto mt-1.5 block h-2 w-10 rounded-full bg-temper-straw" />
              </div>

              <p className="font-mono text-xs font-bold tracking-[0.14em] text-muted uppercase">
                Direct contact
              </p>
              <h2 className="font-display-tight mt-1 text-2xl text-ink">Reach a coach</h2>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="font-mono text-[0.7rem] font-bold tracking-[0.14em] text-muted uppercase">
                    Email
                  </p>
                  <a
                    className="text-link mt-1 block font-mono text-base wrap-anywhere"
                    href={`mailto:${business.email}`}
                  >
                    {business.email}
                  </a>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <CopyEmail email={business.email} />
                  </div>
                </div>

                <div className="border-t border-line pt-4">
                  <p className="font-mono text-[0.7rem] font-bold tracking-[0.14em] text-muted uppercase">
                    Phone
                  </p>
                  <a
                    className="text-link mt-1 inline-flex items-center gap-2 font-mono text-base"
                    href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}
                  >
                    <PhoneIcon className="h-4 w-4 text-primary-ink" />
                    {business.phone}
                  </a>
                </div>

                <div className="border-t border-line pt-4">
                  <p className="font-mono text-[0.7rem] font-bold tracking-[0.14em] text-muted uppercase">
                    Studio
                  </p>
                  <p className="mt-1 flex items-start gap-2 font-mono text-sm text-ink">
                    <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary-ink" />
                    <span>{business.address.formatted}</span>
                  </p>
                  <p className="mt-1.5 text-xs text-muted">{business.address.parking}</p>
                </div>

                <div className="border-t border-line pt-4">
                  <OpenBadge hours={business.hours} className="text-ink" />
                  <dl className="mt-3 space-y-1 font-mono text-xs">
                    {business.hoursSummary.map(row => (
                      <div key={row.label} className="flex justify-between gap-4">
                        <dt className="text-muted">{row.label}</dt>
                        <dd className="font-bold text-ink">{row.time}</dd>
                      </div>
                    ))}
                  </dl>
                  <TimeZoneNote />
                </div>
              </div>
            </div>

            {/* Useful to include checklist */}
            <div className="border-2 border-ink bg-bg p-6">
              <h2 className="font-display-tight text-xl text-ink">Useful to include</h2>
              <p className="mt-2 font-mono text-xs text-muted">
                The enquiry form asks only for your name, email and a message. Drop any of these
                notes into your message:
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-ink">
                {business.enquiries.usefulToInclude.map(tip => (
                  <li key={tip} className="flex items-start gap-2.5">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 bg-primary"
                      aria-hidden="true"
                    />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Right column: Hosted Jamstacks support form or visible email fallback on surface sheet */}
          <section
            aria-label="Consultation enquiry form"
            className="relative overflow-hidden border-2 border-ink bg-surface p-6 shadow-[8px_8px_0_0_var(--ink)] sm:p-10 lg:col-span-7"
          >
            <ChalkHandprint
              tone="dust"
              className="absolute -right-8 -bottom-8 w-52 opacity-45"
            />
            <div className="relative z-10">
              <p className="font-mono text-xs font-bold tracking-[0.14em] text-primary-ink uppercase">
                Free 30-minute consultation enquiry
              </p>
              <h2 className="font-display-tight mt-1 text-2xl text-ink sm:text-3xl">
                Send your enquiry
              </h2>
              <p className="mt-2 text-sm text-muted">
                No payment is taken online. A coach replies within two working days to arrange a
                time to talk.
              </p>

              <div className="mt-6">
                {hosted ? (
                  <JamstacksSupportForm
                    siteId={site.jamstacksSite}
                    embedUrl={site.jamstacksEmbedUrl}
                    email={business.email}
                  />
                ) : (
                  <div className="border-2 border-dashed border-ink bg-bg p-6">
                    <h3 className="font-display-tight text-xl text-ink">
                      Write to a coach directly
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-muted">
                      The online enquiry form is not connected on this preview. Send your note
                      straight to{' '}
                      <a className="text-link font-mono" href={`mailto:${business.email}`}>
                        {business.email}
                      </a>{' '}
                      or call{' '}
                      <a
                        className="text-link font-mono"
                        href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}
                      >
                        {business.phone}
                      </a>{' '}
                      and we will reply within two working days to arrange your free call.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
