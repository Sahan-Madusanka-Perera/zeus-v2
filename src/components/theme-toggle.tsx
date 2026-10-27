'use client';

import { Moon, Sun } from 'lucide-react';

type ViewTransitionDoc = Document & { startViewTransition?: (cb: () => void) => unknown };

function applyTheme(next: 'light' | 'dark') {
  document.documentElement.classList.toggle('dark', next === 'dark');
  try {
    localStorage.setItem('theme', next);
  } catch {
    /* storage blocked: theme still applies for this visit */
  }
}

export function ThemeToggle({ className = '', withLabel = false }: { className?: string; withLabel?: boolean }) {
  const toggle = () => {
    const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    const doc = document as ViewTransitionDoc;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (doc.startViewTransition && !reduce) {
      doc.startViewTransition(() => applyTheme(next));
    } else {
      applyTheme(next);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`btn btn-outline ${withLabel ? '' : '!w-12 !px-0'} ${className}`}
      aria-label={withLabel ? undefined : 'Switch between light and dark theme'}
    >
      <Moon className="h-[18px] w-[18px] dark:hidden" strokeWidth={1.75} aria-hidden="true" />
      <Sun className="hidden h-[18px] w-[18px] dark:block" strokeWidth={1.75} aria-hidden="true" />
      {withLabel ? (
        <span>
          <span className="dark:hidden">Dark theme</span>
          <span className="hidden dark:inline">Light theme</span>
        </span>
      ) : null}
    </button>
  );
}
