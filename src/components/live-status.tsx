'use client';

import { useEffect, useState } from 'react';

type Clock = { day: string; hour: number; time: string };

function colomboNow(): Clock {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Colombo',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  return { day: get('weekday'), hour: Number(get('hour')), time: `${get('hour')}:${get('minute')}` };
}

// Colombo local time, filled in after hydration so the server and client markup agree.
function useColomboClock() {
  const [now, setNow] = useState<Clock | null>(null);
  useEffect(() => {
    const tick = () => setNow(colomboNow());
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

export function LineStatus({ className = '' }: { className?: string }) {
  const now = useColomboClock();
  return (
    <p className={`flex items-center gap-2.5 text-[0.875rem] text-white/75 ${className}`}>
      <span className="pulse text-crimson" aria-hidden="true" />
      <span>
        Emergency line open now
        {now ? (
          <>
            {' · '}
            <span className="num text-white">{now.time}</span> in Colombo
          </>
        ) : null}
      </span>
    </p>
  );
}

// Holidays are not modelled, so this says "office hours", never "the office is open".
export function OfficeStatus() {
  const now = useColomboClock();
  if (!now) return null;
  const within = now.day !== 'Sun' && now.hour >= 8 && now.hour < 18;
  return (
    <span className="mt-1 block text-[0.875rem] font-normal text-ink-3">
      <span className="num">{now.time}</span> in Colombo ·{' '}
      {within ? 'within office hours' : 'outside office hours, the emergency line is open'}
    </span>
  );
}
