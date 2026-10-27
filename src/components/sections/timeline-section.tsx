import { timeline } from '@/content/site';
import { Words } from '@/components/split';

// Hidden until motion draws them; without script the timeline reads as printed.
const unset = { transform: 'scale(0)' };

export function TimelineSection() {
  return (
    <section id="history" aria-labelledby="history-title" className="bg-bg-2 py-[clamp(80px,10vw,144px)]">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="history-title" data-reveal="words" className="h-section max-w-[18ch] lg:col-span-7">
            <Words>From engineering firm to dedicated service company.</Words>
          </h2>
          <p data-reveal="fade" className="max-w-[46ch] text-ink-2 lg:col-span-5 lg:col-start-8">
            From the founding of Illukkumbura Industrial Automation in 1992 to a company built only for breakdowns and
            maintenance.
          </p>
        </div>

        <ol data-timeline className="mt-[clamp(48px,6vw,80px)] grid md:grid-cols-3 md:gap-y-14 xl:grid-cols-6">
          {timeline.map((t, i) => {
            const last = i === timeline.length - 1;
            return (
              <li key={t.year} className="relative pb-10 pl-9 last:pb-0 md:pb-0 md:pl-0 md:pr-7 md:pt-10">
                {/* the rule runs down on phones and across from md up */}
                <span
                  className={`absolute bg-line-strong max-md:bottom-0 max-md:left-[5px] max-md:top-2 max-md:w-px md:left-0 md:top-[5px] md:h-px ${
                    last ? 'max-md:hidden md:w-3' : 'md:right-0'
                  }`}
                  aria-hidden="true"
                />
                {last ? null : (
                  <span
                    data-tl-fill
                    style={unset}
                    className="absolute bg-ink max-md:bottom-0 max-md:left-[5px] max-md:top-2 max-md:w-px md:left-0 md:right-0 md:top-[5px] md:h-px"
                    aria-hidden="true"
                  />
                )}
                <span
                  className={`absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 md:top-0 ${
                    last ? 'border-ink bg-ink' : 'border-ink-3 bg-bg-2'
                  }`}
                  aria-hidden="true"
                />
                <span
                  data-tl-ring
                  style={unset}
                  className={`absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 border-ink md:top-0 ${
                    last ? 'bg-ink' : 'bg-bg-2'
                  }`}
                  aria-hidden="true"
                />
                <div data-tl-body>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="num text-[1.75rem] font-[650] leading-none tracking-[-0.03em]">{t.year}</span>
                    <span className="rounded-[6px] border border-line-strong px-2 py-0.5 text-[0.75rem] font-semibold text-ink-2">
                      {t.entity}
                    </span>
                    {last ? <span className="text-[0.8125rem] font-semibold text-ink">Today</span> : null}
                  </div>
                  <h3 className="mt-4 text-[1.0625rem] font-semibold leading-snug">{t.title}</h3>
                  <p className="mt-2 max-w-[52ch] text-[0.9375rem] leading-relaxed text-ink-2">{t.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
