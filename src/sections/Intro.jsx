import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(SplitText);

export default function Intro({ reducedMotion }) {
  const lineOneRef = useRef(null);
  const lineTwoRef = useRef(null);
  const indicatorRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set([lineOneRef.current, lineTwoRef.current, indicatorRef.current], { opacity: 1, y: 0 });
        return;
      }

      const splitOne = new SplitText(lineOneRef.current, { type: "words" });
      const splitTwo = new SplitText(lineTwoRef.current, { type: "words" });

      const tl = gsap.timeline({ delay: 0.3 });
      tl.set([lineOneRef.current, lineTwoRef.current], { opacity: 1 })
        .from(splitOne.words, {
          yPercent: 120,
          opacity: 0,
          duration: 0.9,
          stagger: 0.05,
          ease: "power4.out",
        })
        .to(splitOne.words, {
          opacity: 0.3,
          filter: "blur(6px)",
          duration: 0.6,
          stagger: 0.02,
          ease: "power2.in",
        }, "+=0.5")
        .from(
          splitTwo.words,
          {
            yPercent: 120,
            opacity: 0,
            duration: 0.9,
            stagger: 0.05,
            ease: "power4.out",
          },
          "-=0.35"
        )
        .from(
          indicatorRef.current,
          { opacity: 0, y: -8, duration: 0.8, ease: "power2.out" },
          "-=0.2"
        );

      return () => {
        splitOne.revert();
        splitTwo.revert();
      };
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden"
    >
      <div className="max-w-4xl">
        <h1
          ref={lineOneRef}
          className="font-display text-[9vw] md:text-[4.2rem] leading-[1.05] text-ink opacity-0"
        >
          I don&rsquo;t just build websites.
        </h1>
        <h1
          ref={lineTwoRef}
          className="font-display italic text-[9vw] md:text-[4.2rem] leading-[1.05] text-accent opacity-0 mt-1"
        >
          I build experiences people remember.
        </h1>
      </div>

      <div
        ref={indicatorRef}
        className="absolute bottom-10 flex flex-col items-center gap-3 text-ink-muted"
      >
        <span className="text-xs tracking-[0.15em]">Scroll</span>
        <ArrowDown size={16} strokeWidth={1.25} className={reducedMotion ? "" : "animate-bounce"} />
      </div>
    </section>
  );
}
