import Image from 'next/image';
import { companies } from '@/content/site';
import { Words } from '@/components/split';

export function StrengthSection() {
  return (
    <section id="group" aria-labelledby="group-title" className="bg-bg-2 py-[clamp(80px,10vw,144px)]">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="group-title" data-reveal="words" className="h-section lg:col-span-7">
            <Words>Part of the Illukkumbura group.</Words>
          </h2>
          <p data-reveal="fade" className="max-w-[46ch] text-ink-2 lg:col-span-5 lg:col-start-8">
            Zeus Power International is one of the companies of the Illukkumbura group, alongside its parent company
            and two group companies.
          </p>
        </div>

        <ul data-reveal="stagger" data-each="0.12" data-distance="48" className="mt-[clamp(40px,5vw,64px)] grid gap-4 md:grid-cols-3 lg:gap-6">
          {companies.map((c) => (
            <li key={c.name} className="panel flex flex-col overflow-hidden border border-line">
              {/* logos keep a white ground in both themes */}
              <div className="flex h-28 items-center justify-center border-b border-line bg-white px-8 md:h-36 md:px-10">
                <Image
                  src={c.logo}
                  alt={`${c.name} logo`}
                  width={c.logoWidth}
                  height={c.logoHeight}
                  sizes="240px"
                  className="max-h-[56px] w-auto max-w-full object-contain md:max-h-[68px]"
                />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-7">
                <h3 className="text-[1.125rem] font-semibold leading-snug">{c.name}</h3>
                <p className="mt-2 text-[0.9375rem] text-ink-2">
                  <span className="font-medium text-ink">{c.relationship}.</span> {c.description}
                </p>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-5 md:pt-6">
                  {c.services.map((s) => (
                    <li key={s} className="rounded-[6px] bg-bg-2 px-2.5 py-1 text-[0.8125rem] text-ink-2">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
