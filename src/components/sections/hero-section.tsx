import Image from 'next/image';
import { ArrowUpRight, Phone } from 'lucide-react';
import { contact, services } from '@/content/site';
import { Words } from '@/components/split';
import { LineStatus } from '@/components/live-status';

export function HeroSection() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative lg:overflow-hidden">
      <div
        id="hero-photo"
        className="on-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy text-ink lg:min-h-[max(100svh,720px)]"
      >
        {/* phones: the photograph holds the upper part of the screen and fades into navy under the copy */}
        <div data-hero-media className="absolute inset-x-0 top-0 -z-20 h-[64%] overflow-hidden md:inset-0 md:h-auto">
          <Image
            src="/images/service1.webp"
            alt="Zeus Power International technician running a thermal-imaging scan of a live LV switchboard"
            fill
            preload
            sizes="100vw"
            className="settle object-cover object-[60%_50%] md:object-[30%_40%]"
          />
        </div>
        {/* navy scrim: from the base on phones, from the left where the headline sits on wide screens */}
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(10_15_30/0.6)_0%,rgb(10_15_30/0.05)_20%,rgb(10_15_30/0.3)_40%,rgb(10_15_30/0.9)_58%,rgb(10_15_30)_64%)] md:bg-[linear-gradient(90deg,rgb(10_15_30/0.86)_0%,rgb(10_15_30/0.55)_45%,rgb(10_15_30/0.05)_75%)]"
          aria-hidden="true"
        />

        <div className="cq flex flex-1 flex-col">
          <div className="wrap flex flex-1 items-end pb-[88px] pt-[calc(var(--nav-h-solid)+40px)] lg:pb-[183px] lg:pt-[calc(var(--nav-h)+24px)]">
            <div data-hero-copy className="max-w-[640px]">
              <h1 id="hero-title" className="h-hero hero-words max-w-[620px] [text-wrap:wrap]">
                <Words>{"Sri Lanka's 24/7 technical breakdown specialists"}</Words>
              </h1>
              <p className="rise mt-5 max-w-[520px] text-[1.0625rem] leading-[1.55] text-white/85 [animation-delay:380ms] md:mt-[22px] md:text-[1.1875rem]">
                Electrical systems, fire protection, air-conditioning and solar, maintained and restored by a dedicated
                crew of 50+ technicians.
              </p>
              <div className="rise mt-8 flex flex-col gap-3 [animation-delay:480ms] sm:flex-row md:mt-[34px]" data-hotline>
                <a href={contact.phoneHref} className="btn btn-primary btn-lg">
                  <Phone className="h-4 w-4 sm:hidden" aria-hidden="true" />
                  <span>
                    Call <span className="num">{contact.phoneDisplay}</span>
                  </span>
                </a>
                {/* on phones the service panel directly below does this job */}
                <a href="#services" className="btn btn-glass btn-lg max-sm:hidden">
                  Explore services
                </a>
              </div>
              <LineStatus className="rise mt-5 [animation-delay:620ms] md:mt-6" />
            </div>
          </div>
        </div>
      </div>

      {/* The four service lines, docked to the photograph */}
      <div className="cq relative z-10 -mt-14 lg:absolute lg:inset-x-0 lg:bottom-10 lg:mt-0">
        <nav aria-label="Service lines" className="wrap">
          <ul className="dock grid grid-cols-2 gap-px overflow-hidden rounded-[10px] shadow-float [background:linear-gradient(var(--line),var(--line)),var(--surface)] lg:grid-cols-4">
            {services.map((s, i) => (
              <li key={s.id} className="bg-surface">
                <a
                  href={`#${s.id}`}
                  className="group flex h-full items-start justify-between gap-3 px-5 py-5 text-ink no-underline transition-colors hover:bg-bg-2 md:px-[26px] md:py-[22px]"
                >
                  <span className="dock-cell" style={{ '--i': i } as React.CSSProperties}>
                    <span className="block text-[0.9375rem] font-semibold leading-snug md:text-base">{s.title}</span>
                    <span className="mt-1.5 block text-[0.8125rem] leading-snug text-ink-3 md:text-[0.84375rem]">{s.short}</span>
                  </span>
                  <ArrowUpRight
                    className="mt-0.5 h-4 w-4 shrink-0 text-ink-3 opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-crimson group-hover:opacity-100 group-focus-visible:opacity-100 max-lg:opacity-100"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
