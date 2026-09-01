import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

export default function Intro({ reducedMotion }) {
  const lineOneRef = useRef(null);
  const lineTwoRef = useRef(null);
  const indicatorRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set([lineOneRef.current, lineTwoRef.current], { opacity: 1, y: 0 });
        gsap.set(indicatorRef.current, { opacity: 1, y: 0 });
        return;
      }

      const splitOne = new SplitText(lineOneRef.current, { type: 'words' });
      const splitTwo = new SplitText(lineTwoRef.current, { type: 'words' });

      // Initial state: both hidden
      gsap.set([lineOneRef.current, lineTwoRef.current], { opacity: 1 });
      gsap.set(splitOne.words, { yPercent: 110, opacity: 0 });
      gsap.set(splitTwo.words, { yPercent: 110, opacity: 0 });
      gsap.set(indicatorRef.current, { opacity: 0 });

      const tl = gsap.timeline({ delay: 0.4 });

      // Phase 1: First line words slide up into view
      tl.to(splitOne.words, {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.04,
        ease: 'power3.out',
      })

      // Phase 2: First line fades and blurs — makes room for second
      .to(splitOne.words, {
        opacity: 0.15,
        filter: 'blur(5px)',
        duration: 0.6,
        stagger: 0.01,
        ease: 'power2.in',
      }, '+=0.5')

      // Phase 3: Second line words slide up into view
      .to(splitTwo.words, {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.04,
        ease: 'power3.out',
      }, '-=0.2')

      // Phase 4: Scroll indicator
      .to(indicatorRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.1');

      return () => {
        splitOne.revert();
        splitTwo.revert();
      };
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="top" ref={rootRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">
      {/* Atmospheric glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan/[0.035] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-purple/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl relative">
        <h1 ref={lineOneRef}
          className="font-display text-[8vw] md:text-[4rem] leading-[1.1] text-ink opacity-0">
          I don&rsquo;t just build websites.
        </h1>
        <h1 ref={lineTwoRef}
          className="font-display italic text-[8vw] md:text-[4rem] leading-[1.1] text-accent opacity-0 mt-1">
          I build experiences people remember.
        </h1>
      </div>

      <div ref={indicatorRef} className="absolute bottom-10 flex flex-col items-center gap-3 text-ink-muted opacity-0">
        <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-cyan/50 to-transparent" />
      </div>
    </section>
  );
}
