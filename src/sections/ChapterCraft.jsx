import { lazy, Suspense, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Three.js/R3F are the heaviest dependencies in this app -- code-split so
// they only load once a visitor actually scrolls near this chapter.
const AbstractForm = lazy(() => import("../components/AbstractForm"));

const STAGES = ["Idea", "Structure", "Motion", "Detail", "Experience"];

export default function ChapterCraft({ reducedMotion }) {
  const rootRef = useRef(null);
  const lineRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(".craft-stage", { opacity: 1 });
        gsap.set(lineRef.current, { scaleX: 1 });
        return;
      }

      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });

      gsap.to(lineRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 70%",
          end: "bottom 60%",
          scrub: 0.6,
        },
      });

      gsap.utils.toArray(".craft-stage").forEach((stage, i) => {
        gsap.fromTo(
          stage,
          { opacity: 0.25 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: `top+=${i * 12}% 70%`,
              end: `top+=${i * 12 + 20}% 60%`,
              scrub: 0.6,
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={rootRef} className="relative py-32 md:py-44 px-6 md:px-10 bg-surface/40">
      <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-6">
          <p className="eyebrow mb-5">Chapter 02 — The Craft</p>
          <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight mb-10 max-w-md">
            An idea only becomes an experience once every stage gets attention.
          </h2>

          <div className="relative">
            <div className="hidden md:block absolute top-[7px] left-0 right-0 h-px bg-line">
              <div ref={lineRef} className="h-full bg-accent" />
            </div>
            <ol className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-2 md:pt-6">
              {STAGES.map((stage) => (
                <li key={stage} className="craft-stage flex md:flex-col items-center md:items-start gap-3 md:gap-4">
                  <span className="hidden md:block w-[7px] h-[7px] rounded-full bg-accent md:mb-0" />
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
  );
}
