import Image from 'next/image';
import { Mail, Phone } from 'lucide-react';
import { contact } from '@/content/site';
import { Chars, Words } from '@/components/split';

// The hero's language returns once, mid-page: navy over the crew, and the number at full size.
export function EmergencyBand() {
  return (
    <section aria-labelledby="emergency-title" className="on-dark relative isolate overflow-hidden bg-navy text-ink">
      <div data-parallax="9" className="absolute inset-x-0 -inset-y-[12%] -z-20">
        <Image src="/images/service10.webp" alt="" fill sizes="100vw" className="object-cover object-[70%_45%]" />
      </div>
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,rgb(10_15_30/0.96)_0%,rgb(10_15_30/0.88)_60%,rgb(10_15_30/0.6)_100%)] md:bg-[linear-gradient(90deg,rgb(10_15_30/0.96)_0%,rgb(10_15_30/0.88)_42%,rgb(10_15_30/0.35)_80%,rgb(10_15_30/0.25)_100%)]"
        aria-hidden="true"
      />

      <div className="cq">
        <div className="wrap py-[clamp(88px,11vw,152px)]">
          <div className="max-w-[720px]">
            <h2 id="emergency-title" data-reveal="words" className="h-section">
              <Words>Breakdown right now?</Words>
            </h2>
            <p data-reveal="fade" className="mt-5 max-w-[46ch] text-[1.0625rem] leading-relaxed text-white/80 md:text-[1.1875rem]">
              Direct line to our technical experts, 24 hours a day, 7 days a week. Average response time:{' '}
              {contact.avgResponse}.
            </p>

            <div data-hotline data-dial className="mt-8 md:mt-10">
              <a
                href={contact.phoneHref}
                className="num group inline-block text-[clamp(2.5rem,6.4vw,5.25rem)] font-[650] leading-none tracking-[-0.035em] no-underline"
                aria-label={`Call the 24/7 emergency line, ${contact.phoneDisplay}`}
              >
                <Chars>{contact.phoneDisplay}</Chars>
                <span
                  data-dial-line
                  className="mt-3 block h-[3px] origin-left scale-x-[0.18] rounded-full bg-crimson transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-x-100"
                  aria-hidden="true"
                />
              </a>
            </div>

            <div data-reveal="fade" data-delay="0.5" className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href={contact.phoneHref} className="btn btn-primary btn-lg">
                <Phone className="h-4 w-4" aria-hidden="true" /> Call now
              </a>
              <a href={contact.emailHref} className="btn btn-glass btn-lg">
                <Mail className="h-4 w-4" aria-hidden="true" /> {contact.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
