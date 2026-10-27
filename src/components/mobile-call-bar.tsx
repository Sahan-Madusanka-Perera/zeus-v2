'use client';

import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { contact } from '@/content/site';

// On phones, keep the hotline one thumb away once the hero has scrolled off,
// and step aside while another hotline is already on screen.
export function MobileCallBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-hotline]'));
    if (!targets.length) return;
    const visible = new Set<Element>();
    let pastFirst = false;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
        if (e.target === targets[0]) pastFirst = !e.isIntersecting && e.boundingClientRect.top < 0;
      }
      setShow(pastFirst && visible.size === 0);
    });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface px-4 pt-3 shadow-[0_-12px_30px_-18px_rgb(10_15_30/0.3)] transition-transform duration-300 ease-out md:hidden ${
        show ? 'translate-y-0' : 'pointer-events-none translate-y-full'
      }`}
      style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
      aria-hidden={!show}
    >
      <a href={contact.phoneHref} tabIndex={show ? 0 : -1} className="btn btn-primary btn-lg w-full">
        <Phone className="h-4 w-4" aria-hidden="true" />
        <span className="inline-flex items-center gap-2.5">
          Call 24/7
          <span className="h-3.5 w-px bg-white/45" aria-hidden="true" />
          <span className="num">{contact.phoneDisplay}</span>
        </span>
      </a>
    </div>
  );
}
