import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { revealOnScroll } from '../animations/scrollReveal';

const STAGES = [
  {
    year: 'The start',
    label: 'Learning HTML by writing it, not just reading it',
  },
  { year: 'Then', label: 'Working through layout, structure, and CSS by hand' },
  {
    year: 'Now',
    label:
      'Pairing that foundation with AI tools to build faster, deliberately',
  },
];

export default function ChapterBeginning({ reducedMotion }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealOnScroll('.beginning-copy', { reducedMotion });
      revealOnScroll('.beginning-stage', { stagger: 0.12, reducedMotion });
    }, rootRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="story"
      ref={rootRef}
      className="relative py-32 md:py-44 px-6 md:px-10"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 md:gap-8">
        <div className="md:col-span-5">
          <p className="eyebrow mb-5">Chapter 01 — The Beginning</p>
          <h2 className="beginning-copy font-display text-3xl md:text-4xl text-ink leading-tight mb-6 max-w-md">
            Every site starts the same way here: curiosity, then practice.
          </h2>
          <p className="beginning-copy text-ink-muted leading-relaxed max-w-sm">
            No shortcuts through the fundamentals. Structure and markup first,
            by hand, until they were second nature — then AI tools layered on
            top, used to move faster without losing the understanding
            underneath.
          </p>
        </div>

        <div className="md:col-span-6 md:col-start-7 flex flex-col gap-10 md:gap-14 md:pt-4">
          {STAGES.map(stage => (
            <div
              key={stage.label}
              className="beginning-stage flex gap-6 border-t border-line pt-5"
            >
              <span className="text-xs text-ink-faint w-20 shrink-0 pt-1">
                {stage.year}
              </span>
              <p className="font-display text-xl md:text-2xl text-ink leading-snug">
                {stage.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
