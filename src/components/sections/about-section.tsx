import Image from 'next/image';
import { facts, industries } from '@/content/site';
import { Words } from '@/components/split';

// "500+" counts up to 500 with "+" kept; "ISO 9001" and "EM 4" are names, not quantities.
function Figure({ value }: { value: string }) {
  const m = /^(\d+)(\D.*)?$/.exec(value);
  if (!m) return value;
  return (
    <>
      <span aria-hidden="true" data-count={m[1]} data-suffix={m[2] ?? ''}>
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </>
  );
}

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-[clamp(80px,10vw,144px)]">
      <div className="wrap grid gap-6 lg:grid-cols-12 lg:items-end">
        <h2 id="about-title" data-reveal="words" className="h-section max-w-[16ch] lg:col-span-7">
          <Words>Backed by an engineering group founded in 1992.</Words>
        </h2>
        <div data-reveal="fade" className="max-w-[46ch] lg:col-span-5 lg:col-start-8">
          <p className="text-[1.125rem] leading-[1.55] text-ink">
            Zeus Power International (Pvt) Ltd is the dedicated emergency breakdown and preventive maintenance company
            of Illukkumbura Industrial Automation (Pvt) Ltd.
          </p>
          <p className="mt-4 text-ink-2">
            The team began as IIAL&apos;s S.W.A.T. (Special Works And Technology) unit in 2015 and became a separate
            company in 2019. Its parent holds ISO 9001 certification and a CIDA EM 4 grading.
          </p>
        </div>
      </div>

      <div className="wrap mt-[clamp(48px,6vw,80px)] grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div data-aperture className="frame aspect-[4/3] lg:col-span-7 lg:aspect-auto lg:min-h-[520px]">
          <div data-parallax="7" className="absolute inset-x-0 -inset-y-[10%]">
            <div data-aperture-img className="absolute inset-0">
              <Image
                src="/images/service2.webp"
                alt="Zeus Power International technician servicing an air circuit breaker in an LV switchboard"
                fill
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="object-cover object-[45%_50%]"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:col-span-5">
          <dl data-reveal="stagger" data-each="0.07" className="grid grid-cols-2 border-t border-line">
            {facts.map((f, i) => (
              <div
                key={f.label}
                className={`flex flex-col-reverse justify-end gap-1.5 border-b border-line py-6 ${
                  i % 2 ? 'border-l pl-6' : 'pr-6'
                }`}
              >
                <dt className="text-[0.875rem] leading-snug text-ink-3">{f.label}</dt>
                <dd className="num text-[clamp(1.75rem,2.6vw,2.25rem)] font-[650] leading-none tracking-[-0.03em]">
                  <Figure value={f.value} />
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-auto pt-10">
            <h3 className="text-[0.9375rem] font-semibold">Industries we serve</h3>
            <ul data-reveal="stagger" data-distance="14" data-each="0.05" className="mt-4 flex flex-wrap gap-2">
              {industries.map((i) => (
                <li key={i} className="rounded-[6px] border border-line bg-bg-2 px-3 py-1.5 text-[0.875rem] text-ink-2">
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
