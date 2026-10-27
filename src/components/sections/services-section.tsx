'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Check, Mail, Phone } from 'lucide-react';
import { contact, services } from '@/content/site';
import { Words } from '@/components/split';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Four service lines as tabs. Each tab carries the service's anchor id, so the hero panel and the
// footer links land here with the right line already open.
export function ServicesSection() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const groupRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const placed = useRef(false);
  const shown = useRef(0);
  const [ready, setReady] = useState(false);

  const selectById = useCallback((hash: string) => {
    const i = services.findIndex((s) => `#${s.id}` === hash);
    if (i >= 0) setActive(i);
    return i;
  }, []);

  useEffect(() => {
    selectById(window.location.hash);
    const onHash = () => selectById(window.location.hash);
    // Links to a service land on the whole tab group, not the tab button, so the open panel is in view.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="#service-"]');
      if (!a) return;
      const href = a.getAttribute('href') ?? '';
      const i = selectById(href);
      if (i < 0) return;
      e.preventDefault();
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      groupRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
      tabRefs.current[i]?.focus({ preventScroll: true });
      history.replaceState(null, '', href);
    };
    window.addEventListener('hashchange', onHash);
    document.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('hashchange', onHash);
      document.removeEventListener('click', onClick);
    };
  }, [selectById]);

  // The selected tab's white plate slides to the new tab, so the change reads as one object moving.
  useEffect(() => {
    const list = listRef.current;
    const plate = indicatorRef.current;
    const tab = tabRefs.current[active];
    if (!list || !plate || !tab) return;
    const place = (animate: boolean) => {
      const to = { x: tab.offsetLeft, y: tab.offsetTop, width: tab.offsetWidth, height: tab.offsetHeight };
      if (animate && !reduced()) gsap.to(plate, { ...to, duration: 0.6, ease: 'expo.out', overwrite: true });
      else gsap.set(plate, to);
    };
    place(placed.current);
    placed.current = true;
    setReady(true);
    const ro = new ResizeObserver(() => place(false));
    ro.observe(list);
    return () => ro.disconnect();
  }, [active]);

  // The incoming panel's contents arrive in reading order; the check marks land last.
  useEffect(() => {
    if (shown.current === active) return;
    shown.current = active;
    const panel = panelRefs.current[active];
    if (!panel || reduced()) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-panel-item]', { y: 18, autoAlpha: 0, duration: 0.65, ease: 'expo.out', stagger: 0.035 });
      gsap.from('[data-check]', { scale: 0.3, duration: 0.55, ease: 'back.out(2.4)', stagger: 0.05, delay: 0.2 });
    }, panel);
    return () => ctx.revert();
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next: number | null = null;
    if (e.key in keys) next = (active + keys[e.key] + services.length) % services.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = services.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="services" aria-labelledby="services-title" className="bg-bg-2 py-[clamp(80px,10vw,144px)]">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="services-title" data-reveal="words" className="h-section max-w-[18ch] lg:col-span-7">
            <Words>Technical services for the systems your operation runs on.</Words>
          </h2>
          <p data-reveal="fade" className="max-w-[46ch] text-ink-2 lg:col-span-5 lg:col-start-8">
            Dedicated to providing comprehensive technical support and emergency response services to minimize
            manufacturing downtime and ensure continuous operations across all industries.
          </p>
        </div>

        <div
          ref={groupRef}
          className="mt-[clamp(40px,5vw,64px)] grid gap-4 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-6"
        >
          {/* phones: all four lines visible at once as a 2x2 grid; a vertical list from lg */}
          <div
            ref={listRef}
            role="tablist"
            aria-label="Service lines"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="relative grid grid-cols-2 gap-2 self-start lg:flex lg:flex-col"
          >
            <span
              ref={indicatorRef}
              className={`pointer-events-none absolute left-0 top-0 rounded-[10px] bg-surface shadow-raise transition-opacity duration-300 ${
                ready ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden="true"
            />
            {services.map((s, i) => {
              const selected = i === active;
              return (
                <button
                  key={s.id}
                  id={s.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`${s.id}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`group relative flex min-h-14 items-center justify-between gap-6 rounded-[10px] border px-4 py-3.5 text-left transition-[background-color,border-color,box-shadow] duration-200 sm:px-5 sm:py-4 lg:px-6 lg:py-5 ${
                    selected
                      ? `border-transparent ${ready ? '' : 'bg-surface shadow-raise'}`
                      : 'border-line hover:border-line-strong hover:bg-surface/60'
                  }`}
                >
                  <span>
                    <span className={`block font-semibold leading-snug lg:text-[1.125rem] ${selected ? 'text-ink' : 'text-ink-2'}`}>
                      {s.title}
                    </span>
                    <span className="mt-1 hidden text-[0.875rem] text-ink-3 lg:block">{s.subtitle}</span>
                  </span>
                  <ArrowRight
                    className={`hidden h-[18px] w-[18px] shrink-0 transition-[opacity,transform,color] duration-300 lg:block ${
                      selected ? 'translate-x-0 text-crimson opacity-100' : '-translate-x-1 text-ink-3 opacity-0 group-hover:opacity-100'
                    }`}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>

          {services.map((s, i) => (
            <div
              key={s.id}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              id={`${s.id}-panel`}
              role="tabpanel"
              aria-labelledby={s.id}
              hidden={i !== active}
              tabIndex={0}
              className="panel p-6 shadow-raise md:p-10 lg:p-12"
            >
              <div data-panel-item className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="h-sub">{s.title}</h3>
                <p className="text-[0.875rem] text-ink-3">{s.subtitle}</p>
              </div>
              <p data-panel-item className="lead mt-5 max-w-[60ch] text-ink-2">{s.description}</p>

              <h4 data-panel-item className="mt-10 border-t border-line pt-8 text-[0.9375rem] font-semibold">What&apos;s included</h4>
              <ul className="mt-5 grid gap-x-10 gap-y-5 md:grid-cols-2">
                {s.details.map((d) => (
                  <li key={d.text} data-panel-item className="flex gap-3.5">
                    <span data-check className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-bg-3 text-ink">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    <span>
                      {d.term ? <span className="block font-medium text-ink">{d.term}</span> : null}
                      <span className={d.term ? 'mt-1 block text-[0.9375rem] text-ink-2' : 'text-ink'}>{d.text}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <div data-panel-item className="mt-10 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-center">
                <a href={contact.phoneHref} className="btn btn-primary">
                  <Phone className="h-4 w-4" aria-hidden="true" /> Report a breakdown
                </a>
                <a
                  href={`${contact.emailHref}?subject=${encodeURIComponent(`${s.title}: maintenance enquiry`)}`}
                  className="btn btn-outline"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" /> Plan maintenance
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
