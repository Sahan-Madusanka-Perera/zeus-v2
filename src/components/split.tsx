import { Fragment } from 'react';

// Server-rendered text masks. Each word (or character) sits in a clipping span so motion can raise it
// from under its own baseline. Without script the text simply renders in place.

export function Words({ children }: { children: string }) {
  const words = children.split(' ');
  return words.map((w, i) => (
    <Fragment key={i}>
      <span className="mask">
        <span style={{ '--i': i } as React.CSSProperties}>{w}</span>
      </span>
      {i < words.length - 1 ? ' ' : null}
    </Fragment>
  ));
}

export function Chars({ children }: { children: string }) {
  return [...children].map((c, i) =>
    c === ' ' ? (
      <Fragment key={i}> </Fragment>
    ) : (
      <span key={i} className="mask">
        <span>{c}</span>
      </span>
    ),
  );
}
