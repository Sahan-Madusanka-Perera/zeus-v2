'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const EASE = 'expo.out';

// One scroll vocabulary for the whole page: content arrives through an aperture (a mask or clip)
// rather than floating in. Sections opt in with data attributes and stay server components.
// Every effect starts from the already-rendered final state, so no script means no hidden content,
// and reduced motion leaves the page exactly as it was printed.
export function Motion() {
  useEffect(() => {
    const all = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
      Array.from(root.querySelectorAll<T>(sel));
    const once = (trigger: Element, start = 'top 86%') => ({ trigger, start, once: true });

    const mm = gsap.matchMedia();
    mm.add(
      { motion: '(prefers-reduced-motion: no-preference)', phone: '(max-width: 767px)' },
      (ctx) => {
        const { motion, phone } = ctx.conditions as { motion: boolean; phone: boolean };
        if (!motion) return;

        // Headlines: each word rises from under its own baseline.
        all('[data-reveal="words"]').forEach((el) => {
          gsap.from(all('.mask > span', el), {
            yPercent: 118,
            duration: 1.1,
            ease: EASE,
            stagger: 0.045,
            scrollTrigger: once(el, 'top 90%'),
          });
        });

        all('[data-reveal="fade"]').forEach((el) => {
          gsap.from(el, {
            y: 28,
            autoAlpha: 0,
            duration: 1,
            ease: EASE,
            delay: Number(el.dataset.delay ?? 0.12),
            scrollTrigger: once(el, 'top 92%'),
          });
        });

        // A list that appears as a list: its children arrive in order.
        all('[data-reveal="stagger"]').forEach((el) => {
          gsap.from(el.children, {
            y: Number(el.dataset.distance ?? 36),
            autoAlpha: 0,
            duration: 0.9,
            ease: EASE,
            stagger: Number(el.dataset.each ?? 0.08),
            scrollTrigger: once(el),
          });
        });

        // A panel that settles onto a photograph, as the hero's service panel does.
        all('[data-reveal="dock"]').forEach((el) => {
          gsap.from(el, { y: 56, autoAlpha: 0, duration: 1.2, ease: EASE, delay: 0.35, scrollTrigger: once(el, 'top 95%') });
        });

        // Photographs open from the bottom edge of their frame while the image settles inside.
        const apertures = all('[data-aperture]');
        if (apertures.length) {
          gsap.set(apertures, { clipPath: 'inset(100% 0% 0% 0%)' });
          gsap.set(all('[data-aperture-img]'), { scale: 1.22 });
          ScrollTrigger.batch(apertures, {
            start: 'top 90%',
            once: true,
            onEnter: (batch) => {
              const imgs = batch.map((b) => b.querySelector('[data-aperture-img]')).filter(Boolean);
              gsap.to(batch, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: EASE, stagger: 0.08, clearProps: 'clipPath' });
              gsap.to(imgs, { scale: 1, duration: 1.7, ease: EASE, stagger: 0.08 });
            },
          });
        }

        // Depth inside a frame: the photograph travels a little slower than the page.
        all('[data-parallax]').forEach((el) => {
          const amount = Number(el.dataset.parallax || 7);
          gsap.fromTo(
            el,
            { yPercent: -amount },
            {
              yPercent: amount,
              ease: 'none',
              scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          );
        });

        // Hero: the photograph lags behind as the page lifts away, the copy drifts up and dims.
        const hero = document.getElementById('hero-photo');
        if (hero) {
          gsap
            .timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } })
            .to('[data-hero-media]', { yPercent: 16, ease: 'none' }, 0)
            .to('[data-hero-copy]', { y: phone ? -40 : -90, opacity: 0.15, ease: 'none' }, 0);
        }

        // Figures count up to the printed value. Screen readers get the printed value only.
        const counters = all('[data-count]');
        const printed = counters.map((el) => el.textContent);
        counters.forEach((el) => {
          const to = Number(el.dataset.count);
          const suffix = el.dataset.suffix ?? '';
          const state = { v: 0 };
          el.textContent = `0${suffix}`;
          gsap.to(state, {
            v: to,
            duration: 1.8,
            ease: 'expo.out',
            scrollTrigger: once(el, 'top 92%'),
            onUpdate: () => {
              el.textContent = `${Math.round(state.v)}${suffix}`;
            },
          });
        });

        // The hotline dials in, digit by digit, then its underline draws.
        all('[data-dial]').forEach((el) => {
          const line = el.querySelector('[data-dial-line]');
          const tl = gsap.timeline({ scrollTrigger: once(el, 'top 88%') });
          tl.from(all('.mask > span', el), { yPercent: 118, duration: 0.9, ease: EASE, stagger: 0.035 });
          if (line) tl.from(line, { scaleX: 0, duration: 0.9, ease: EASE, clearProps: 'transform' }, '-=0.45');
        });

        // History is read in order: the rule carries forward and each year lights as it is reached.
        const history = document.querySelector('[data-timeline]');
        if (history) {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: history, start: phone ? 'top 80%' : 'top 72%', end: phone ? 'bottom 75%' : 'bottom 58%', scrub: 0.6 },
          });
          all('li', history).forEach((li) => {
            const ring = li.querySelector('[data-tl-ring]');
            const body = li.querySelector('[data-tl-body]');
            const fill = li.querySelector('[data-tl-fill]');
            if (ring) tl.fromTo(ring, { scale: 0 }, { scale: 1, duration: 0.25, ease: 'power2.out' });
            if (body) tl.fromTo(body, { opacity: 0.3 }, { opacity: 1, duration: 0.25, ease: 'none' }, '<');
            if (fill)
              tl.fromTo(
                fill,
                phone ? { scaleX: 1, scaleY: 0, transformOrigin: '50% 0%' } : { scaleX: 0, scaleY: 1, transformOrigin: '0% 50%' },
                phone ? { scaleY: 1, duration: 1, ease: 'none' } : { scaleX: 1, duration: 1, ease: 'none' },
              );
          });
        }

        // The crew photograph widens to full frame as it comes into view.
        all('[data-widen]').forEach((el) => {
          const st = { trigger: el, start: 'top 95%', end: 'center 55%', scrub: 0.6 };
          gsap.fromTo(
            el,
            { clipPath: phone ? 'inset(4% 7% 4% 7% round 10px)' : 'inset(7% 14% 7% 14% round 10px)' },
            { clipPath: 'inset(0% 0% 0% 0% round 10px)', ease: 'none', scrollTrigger: st },
          );
          const media = el.querySelector('[data-widen-img]');
          if (media) gsap.fromTo(media, { scale: 1.16 }, { scale: 1, ease: 'none', scrollTrigger: st });
        });

        return () => counters.forEach((el, i) => (el.textContent = printed[i]));
      },
    );

    // Tabs, the gallery and late images change the page height; keep trigger positions true.
    let timer = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 160);
    });
    ro.observe(document.body);

    return () => {
      ro.disconnect();
      window.clearTimeout(timer);
      mm.revert();
    };
  }, []);

  return null;
}
