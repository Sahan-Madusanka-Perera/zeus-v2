'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ChevronDown, ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { photos } from '@/content/site';
import { Words } from '@/components/split';

const INITIAL = 6;
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// A lead photograph and a measured grid; the rest of the archive opens on request.
// On phones the same photographs become a swipe strip, so the archive costs one screen, not eleven.
export function GallerySection() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const direction = useRef(0);
  const touchX = useRef<number | null>(null);
  const [index, setIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [slide, setSlide] = useState(0);

  const open = (i: number) => {
    direction.current = 0;
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const step = useCallback((d: number) => {
    direction.current = d;
    setIndex((i) => (i === null ? i : (i + d + photos.length) % photos.length));
  }, []);

  const expand = () => {
    setShowAll(true);
    // move focus to the first newly revealed photo
    requestAnimationFrame(() => gridRef.current?.querySelectorAll('button')[INITIAL]?.focus());
  };

  // Phone strip: which photograph is in front, and how far through the set the visitor is.
  const onStripScroll = () => {
    const ul = gridRef.current;
    if (!ul || window.matchMedia('(min-width: 640px)').matches) return;
    const max = ul.scrollWidth - ul.clientWidth;
    const p = max > 0 ? ul.scrollLeft / max : 0;
    if (barRef.current) barRef.current.style.transform = `scaleX(${Math.max(1 / photos.length, p)})`;
    setSlide(Math.round(p * (photos.length - 1)));
  };
  const nudge = (d: number) => {
    const ul = gridRef.current;
    const item = ul?.querySelector('li');
    if (!ul || !item) return;
    ul.scrollBy({ left: d * (item.clientWidth + 12), behavior: reduced() ? 'auto' : 'smooth' });
  };

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const onKey = (e: KeyboardEvent) => {
      if (!dlg.open) return;
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    const onClose = () => setIndex(null);
    window.addEventListener('keydown', onKey);
    dlg.addEventListener('close', onClose);
    return () => {
      window.removeEventListener('keydown', onKey);
      dlg.removeEventListener('close', onClose);
    };
  }, [step]);

  // The viewer slides in the direction of travel; opening it settles the photo from slightly small.
  useEffect(() => {
    const stage = stageRef.current;
    if (index === null || !stage || reduced()) return;
    const d = direction.current;
    const tween = d
      ? gsap.fromTo(stage, { x: d * 64, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.55, ease: 'expo.out' })
      : gsap.fromTo(stage, { scale: 0.96, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.6, ease: 'expo.out' });
    return () => {
      tween.progress(1).kill();
    };
  }, [index]);

  const current = index === null ? null : photos[index];

  return (
    <section id="projects" aria-labelledby="projects-title" className="py-[clamp(80px,10vw,144px)]">
      <div className="wrap grid gap-6 lg:grid-cols-12 lg:items-end">
        <h2 id="projects-title" data-reveal="words" className="h-section lg:col-span-7">
          <Words>Work in the field.</Words>
        </h2>
        <p data-reveal="fade" className="max-w-[46ch] text-ink-2 lg:col-span-5 lg:col-start-8">
          Our technicians at work on switchboards, fire systems and plant rooms. Select a photograph to view it full
          screen.
        </p>
      </div>

      <ul
        ref={gridRef}
        onScroll={onStripScroll}
        className="wrap no-scrollbar mt-[clamp(40px,5vw,64px)] flex snap-x snap-mandatory scroll-px-[var(--pad-x)] gap-3 overflow-x-auto overscroll-x-contain sm:grid sm:snap-none sm:grid-cols-2 sm:auto-rows-[clamp(200px,24vw,260px)] sm:gap-4 sm:overflow-visible lg:grid-cols-3 lg:gap-6"
        aria-label="Photographs of our work"
      >
        {photos.map((p, i) => (
          <li
            key={p.src}
            data-aperture
            className={`h-[clamp(240px,68vw,330px)] w-[84%] shrink-0 snap-start sm:h-auto sm:w-auto ${
              i === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
            } ${!showAll && i >= INITIAL ? 'sm:hidden' : ''}`}
          >
            <button
              type="button"
              onClick={() => open(i)}
              className="group frame block h-full w-full text-left"
              aria-label={`View full screen: ${p.alt}`}
            >
              <span data-aperture-img className="absolute inset-0">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes={
                    i === 0
                      ? '(min-width: 1024px) 66vw, (min-width: 640px) 50vw, 84vw'
                      : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 84vw'
                  }
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.035]"
                />
              </span>
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-[linear-gradient(0deg,rgb(10_15_30/0.82),rgb(10_15_30/0))] px-5 pb-4 pt-14 text-white">
                <span>
                  <span
                    className={`block font-medium leading-snug ${i === 0 ? 'text-[0.9375rem] lg:text-[1.125rem]' : 'text-[0.9375rem]'}`}
                  >
                    {p.alt}
                  </span>
                  <span className="mt-0.5 block text-[0.8125rem] text-white/75">{p.category}</span>
                </span>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[6px] bg-white/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 max-sm:opacity-100">
                  <Expand className="h-4 w-4" aria-hidden="true" />
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* phones: position in the strip, and buttons for those who don't swipe */}
      <div className="wrap mt-5 flex items-center gap-4 sm:hidden">
        <p className="num w-[4.5rem] shrink-0 text-[0.875rem] text-ink-3">
          {slide + 1} of {photos.length}
        </p>
        <span className="h-[2px] flex-1 overflow-hidden rounded-full bg-line" aria-hidden="true">
          <span
            ref={barRef}
            className="block h-full origin-left rounded-full bg-ink transition-transform duration-150"
            style={{ transform: `scaleX(${1 / photos.length})` }}
          />
        </span>
        <div className="flex gap-2">
          <button type="button" onClick={() => nudge(-1)} className="btn btn-outline !w-11 !px-0" aria-label="Previous photograph">
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => nudge(1)} className="btn btn-outline !w-11 !px-0" aria-label="Next photograph">
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {!showAll ? (
        <div className="wrap mt-10 hidden justify-center sm:flex">
          <button type="button" onClick={expand} className="btn btn-outline">
            Show all {photos.length} photographs <ChevronDown className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      ) : null}

      <dialog ref={dialogRef} className="lightbox" aria-label="Photo viewer">
        {current && index !== null ? (
          <div className="grid h-full grid-rows-[auto_minmax(0,1fr)_auto]">
            <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-8">
              <p className="num text-[0.875rem] text-white/75">
                {index + 1} of {photos.length}
              </p>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="inline-flex h-12 w-12 items-center justify-center rounded-[6px] border border-white/25 hover:border-white"
                aria-label="Close photo viewer"
                autoFocus
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            {/* swipe left or right on touch screens */}
            <div
              className="relative mx-4 touch-pan-y overflow-hidden md:mx-20"
              onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                touchX.current = null;
                if (Math.abs(dx) > 48) step(dx < 0 ? 1 : -1);
              }}
            >
              <div ref={stageRef} className="absolute inset-0">
                <Image key={current.src} src={current.src} alt={current.alt} fill sizes="100vw" className="rounded-[10px] object-contain" />
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
              <button
                type="button"
                onClick={() => step(-1)}
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[6px] border border-white/25 hover:border-white"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <p className="text-center text-[0.9375rem]">
                {current.alt}
                <span className="ml-2 text-white/60">{current.category}</span>
              </p>
              <button
                type="button"
                onClick={() => step(1)}
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[6px] border border-white/25 hover:border-white"
                aria-label="Next photo"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
