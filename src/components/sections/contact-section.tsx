import Image from 'next/image';
import { ArrowUpRight, Phone } from 'lucide-react';
import { contact } from '@/content/site';
import { Words } from '@/components/split';
import { OfficeStatus } from '@/components/live-status';

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="py-[clamp(80px,10vw,144px)]">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 id="contact-title" data-reveal="words" className="h-section">
            <Words>Talk to our team.</Words>
          </h2>
          <p data-reveal="fade" className="lead mt-5 max-w-[40ch] text-ink-2">
            Breakdown, preventive maintenance, an annual maintenance program or a partnership: one call or email reaches
            the team.
          </p>

          {/* one panel, hairline rows: the hotline leads, the rest are its details */}
          <div data-reveal="fade" data-delay="0.25" className="panel mt-10 border border-line">
            <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between" data-hotline>
              <div>
                <p className="flex items-center gap-2.5 text-[0.875rem] text-ink-3">
                  <span className="pulse text-crimson" aria-hidden="true" /> Emergency line · {contact.emergencyHours}
                </p>
                <a
                  href={contact.phoneHref}
                  className="num mt-2 block text-[clamp(1.625rem,2.6vw,2rem)] font-[650] tracking-[-0.03em] no-underline hover:text-crimson"
                >
                  {contact.phoneDisplay}
                </a>
              </div>
              <a href={contact.phoneHref} className="btn btn-primary">
                <Phone className="h-4 w-4" aria-hidden="true" /> Call now
              </a>
            </div>
            <dl className="border-t border-line">
              <div className="grid gap-1 px-6 py-5 sm:grid-cols-[140px_minmax(0,1fr)] sm:items-baseline sm:gap-6">
                <dt className="text-[0.875rem] text-ink-3">Email</dt>
                <dd>
                  <a
                    href={contact.emailHref}
                    className="font-medium underline decoration-line-strong underline-offset-4 hover:decoration-ink"
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>
              <div className="grid gap-1 border-t border-line px-6 py-5 sm:grid-cols-[140px_minmax(0,1fr)] sm:items-baseline sm:gap-6">
                <dt className="text-[0.875rem] text-ink-3">Office hours</dt>
                <dd className="font-medium">
                  {contact.officeHours}
                  <OfficeStatus />
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div data-aperture className="frame min-h-[440px] lg:col-span-6 lg:min-h-0">
          <div data-parallax="6" className="absolute inset-x-0 -inset-y-[10%]">
            <div data-aperture-img className="absolute inset-0">
              <Image
                src="/images/HEM09771.webp"
                alt="Zeus Power International technician in hi-vis at an LV switchboard breaker"
                fill
                sizes="(min-width: 1024px) 46vw, 100vw"
                className="object-cover object-[22%_40%]"
              />
            </div>
          </div>
          <div data-reveal="dock" className="panel absolute inset-x-4 bottom-4 p-5 shadow-float sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-[340px] sm:p-6">
            <p className="text-[0.875rem] text-ink-3">Head office</p>
            <address className="mt-1.5 not-italic leading-snug">
              {contact.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <a
              href={contact.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-10 items-center gap-1.5 text-[0.9375rem] font-semibold text-ink no-underline hover:text-crimson"
            >
              Open in Google Maps <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
