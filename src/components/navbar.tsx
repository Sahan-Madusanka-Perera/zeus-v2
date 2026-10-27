'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { Menu, Phone, X } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { contact, navItems } from '@/content/site';

const menuItems = [...navItems.slice(0, 3), { label: 'History', href: '#history' }, ...navItems.slice(3)];

function Logo({ onPhoto }: { onPhoto: boolean }) {
  return (
    <a href="#top" className="relative block h-[40px] shrink-0 lg:h-[44px]" aria-label="Zeus Power International, back to top">
      {/* white mark over the photograph and in the evening theme, dark mark on white */}
      <Image
        src="/images/logo.webp"
        alt=""
        width={150}
        height={60}
        sizes="150px"
        loading="eager"
        className={`h-full w-auto ${onPhoto ? 'block' : 'hidden dark:block'}`}
      />
      <Image
        src="/images/logo_for_light.webp"
        alt=""
        width={150}
        height={60}
        sizes="150px"
        loading="eager"
        className={`h-full w-auto ${onPhoto ? 'hidden' : 'block dark:hidden'}`}
      />
    </a>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [active, setActive] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Transparent over the hero photograph; a solid bar once the page moves under it.
  useEffect(() => {
    const photo = document.getElementById('hero-photo');
    if (!photo) return;
    const io = new IntersectionObserver(([e]) => setOverHero(e.isIntersecting), {
      rootMargin: '-72px 0px 0px 0px',
      threshold: 0,
    });
    io.observe(photo);
    return () => io.disconnect();
  }, []);

  // Scrollspy for the desktop links.
  useEffect(() => {
    const ids = ['top', ...navItems.map((n) => n.href.slice(1))];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id === 'top' ? null : e.target.id);
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    document.documentElement.style.overflow = 'hidden';
    const menu = menuRef.current;
    menu?.querySelector('a')?.focus();
    // The sheet unrolls from under the bar and the links rise into place.
    let tl: gsap.core.Timeline | undefined;
    if (menu && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      tl = gsap
        .timeline()
        .fromTo(
          menu,
          { clipPath: 'inset(0% 0% 100% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: 'expo.out', clearProps: 'clipPath' },
        )
        .from(menu.querySelectorAll('[data-menu-link]'), { yPercent: 118, duration: 0.75, ease: 'expo.out', stagger: 0.05 }, 0.06)
        .from(menu.querySelectorAll('[data-menu-foot] > *'), { y: 24, autoAlpha: 0, duration: 0.6, ease: 'expo.out', stagger: 0.07 }, 0.24);
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      tl?.kill();
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      toggle?.focus();
    };
  }, [open]);

  const onPhoto = overHero && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
        onPhoto
          ? 'on-dark border-white/15 bg-transparent'
          : 'border-line bg-surface shadow-[0_10px_30px_-18px_rgb(10_15_30/0.25)]'
      }`}
    >
      {/* the hero only shades its top on phones; from md up the links on the right need their own shade over the bright photograph */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 -z-10 hidden h-[170px] bg-[linear-gradient(180deg,rgb(10_15_30/0.6)_0%,rgb(10_15_30/0.3)_50%,rgb(10_15_30/0)_100%)] transition-opacity duration-300 md:block ${
          onPhoto ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />
      <div className="cq">
        <div
          className={`wrap flex items-center gap-9 text-ink transition-[height] duration-300 ease-[var(--ease-out)] ${
            onPhoto ? 'h-[var(--nav-h-solid)] lg:h-[var(--nav-h)]' : 'h-[var(--nav-h-solid)]'
          }`}
        >
          <Logo onPhoto={onPhoto} />

          <nav aria-label="Primary" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-[30px] text-[0.9375rem]">
              {navItems.map((item) => {
                const isActive = active === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? 'location' : undefined}
                      className={`relative py-2 no-underline transition-colors hover:text-ink ${
                        isActive ? 'text-ink' : onPhoto ? 'text-white/85' : 'text-ink-2'
                      }`}
                    >
                      {item.label}
                      <span
                        className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-left rounded-full bg-crimson transition-transform duration-300 ${
                          isActive ? 'scale-x-100' : 'scale-x-0'
                        }`}
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <a href={contact.phoneHref} className="btn btn-primary hidden md:inline-flex">
              <span className="inline-flex items-center gap-2.5">
                Call 24/7
                <span className="h-3.5 w-px bg-white/45" aria-hidden="true" />
                <span className="num">{contact.phoneDisplay}</span>
              </span>
            </a>
            <a
              href={contact.phoneHref}
              className="btn btn-primary !w-12 !px-0 md:hidden"
              aria-label={`Call the 24/7 emergency line, ${contact.phoneDisplay}`}
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
            </a>
            <button
              ref={toggleRef}
              type="button"
              className={`inline-flex h-12 w-12 items-center justify-center rounded-[6px] border transition-colors lg:hidden ${
                onPhoto ? 'border-white/35 text-white hover:border-white/70' : 'border-line-strong hover:border-ink'
              }`}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="fixed inset-x-0 bottom-0 top-[var(--nav-h-solid)] z-40 flex flex-col overflow-y-auto bg-surface text-ink lg:hidden"
        >
          <nav aria-label="Mobile" className="wrap pt-2">
            <ul>
              {menuItems.map((item) => (
                <li key={item.href} className="border-b border-line">
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-16 items-center text-[1.625rem] font-[650] tracking-[-0.025em] no-underline"
                  >
                    <span className="mask">
                      <span data-menu-link>{item.label}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div data-menu-foot className="wrap mt-auto grid gap-3 pb-10 pt-10">
            <a href={contact.phoneHref} className="btn btn-primary btn-lg w-full">
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span className="inline-flex items-center gap-2.5">
                Call 24/7
                <span className="h-3.5 w-px bg-white/45" aria-hidden="true" />
                <span className="num">{contact.phoneDisplay}</span>
              </span>
            </a>
            <ThemeToggle withLabel className="btn-lg w-full" />
          </div>
        </div>
      ) : null}
    </header>
  );
}
