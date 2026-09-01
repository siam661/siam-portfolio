import { lazy, Suspense, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AbstractForm = lazy(() => import('../components/AbstractForm'));

const STAGES = ['Idea', 'Structure', 'Motion', 'Detail', 'Experience'];

export default function ChapterCraft({ reducedMotion }) {
  const rootRef = useRef(null);
  const lineRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set('.craft-stage', { opacity: 1 });
        gsap.set(lineRef.current, { scaleX: 1 });
        return;
      }
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left center' });
      gsap.to(lineRef.current, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top 70%', end: 'bottom 60%', scrub: 0.6 },
      });
      gsap.utils.toArray('.craft-stage').forEach((stage, i) => {
        gsap.fromTo(stage, { opacity: 0.25 }, {
          opacity: 1, ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: `top+=${i * 12}% 70%`,
            end: `top+=${i * 12 + 20}% 60%`,
            scrub: 0.6,
          },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <>
      <div className="chapter-divider max-w-6xl mx-auto" />
      <section ref={rootRef} className="relative py-28 md:py-40 px-6 md:px-10 bg-bg-alt/40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple/[0.03] rounded-full blur-[160px] pointer-events-none" />
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-center relative">
          <div className="md:col-span-6">
            <p className="eyebrow mb-5">Chapter 02 — The Craft</p>
            <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight mb-10 max-w-md">
              An idea only becomes an experience once every stage gets attention.
            </h2>
            <div className="relative">
              <div className="hidden md:block absolute top-[7px] left-0 right-0 h-px bg-line">
                <div ref={lineRef} className="h-full bg-gradient-to-r from-cyan to-purple" />
              </div>
              <ol className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-2 md:pt-6">
                {STAGES.map(stage => (
                  <li key={stage} className="craft-stage flex md:flex-col items-center md:items-start gap-3 md:gap-4">
                    <span className="hidden md:block w-[5px] h-[5px] rounded-full bg-cyan shadow-[0_0_6px_rgba(0,240,255,0.5)]" />
                    <span className="text-sm md:text-base text-ink">{stage}</span>
                  </li>
                ))}
              </ol>
            </div>
            <p className="text-ink-muted leading-relaxed max-w-sm mt-10">
              Structure carries the content. Motion carries meaning. Detail is
              where care becomes visible. None of it matters without the others.
            </p>
          </div>
          <div className="md:col-span-6">
            <Suspense fallback={<div className="w-full min-h-[280px]" aria-hidden="true" />}>
              <AbstractForm reducedMotion={reducedMotion} />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
