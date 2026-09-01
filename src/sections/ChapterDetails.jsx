import { useRef } from 'react';
import gsap from 'gsap';

function BorderTraceTile() {
  return (
    <div className="group relative rounded-xl border border-line p-7 overflow-hidden transition-colors duration-500 hover:border-cyan/25" data-cursor-hover>
      <span className="absolute inset-0 rounded-xl border border-cyan/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <p className="font-display text-lg text-ink mb-2">Borders that respond</p>
      <p className="text-sm text-ink-muted leading-relaxed">
        A hover state that shows up as a quiet trace of light, not a color swap.
      </p>
    </div>
  );
}

function DisplaceTextTile() {
  const wordsRef = useRef(null);
  const handleEnter = () => { gsap.to(wordsRef.current, { yPercent: -100, duration: 0.45, ease: 'power3.inOut' }); };
  const handleLeave = () => { gsap.to(wordsRef.current, { yPercent: 0, duration: 0.45, ease: 'power3.inOut' }); };

  return (
    <div className="relative rounded-xl border border-line p-7 overflow-hidden cursor-default transition-colors duration-500 hover:border-purple/25"
      onMouseEnter={handleEnter} onMouseLeave={handleLeave} data-cursor-hover>
      <div className="h-7 overflow-hidden mb-2">
        <div ref={wordsRef}>
          <p className="font-display text-lg text-ink h-7 leading-7">Text that moves</p>
          <p className="font-display text-lg gradient-text h-7 leading-7">on purpose</p>
        </div>
      </div>
      <p className="text-sm text-ink-muted leading-relaxed">
        Hover to see the second line arrive. Small, deliberate, never automatic.
      </p>
    </div>
  );
}

function MagnetHintTile() {
  const dotRef = useRef(null);
  const handleMove = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    gsap.to(dotRef.current, {
      x: (e.clientX - rect.left - rect.width / 2) * 0.3,
      y: (e.clientY - rect.top - rect.height / 2) * 0.3,
      duration: 0.3, ease: 'power3.out',
    });
  };
  const handleLeave = () => { gsap.to(dotRef.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' }); };

  return (
    <div className="relative rounded-xl border border-line p-7 overflow-hidden transition-colors duration-500 hover:border-cyan/20"
      onMouseMove={handleMove} onMouseLeave={handleLeave} data-cursor-hover>
      <div className="flex items-center gap-3 mb-2">
        <span ref={dotRef} className="w-[6px] h-[6px] rounded-full bg-cyan inline-block shadow-[0_0_6px_rgba(0,240,255,0.5)]" />
        <p className="font-display text-lg text-ink">Elements with weight</p>
      </div>
      <p className="text-sm text-ink-muted leading-relaxed">
        A slight pull toward the cursor, then a settle. It should feel physical.
      </p>
    </div>
  );
}

export default function ChapterDetails() {
  return (
    <>
      <div className="chapter-divider max-w-6xl mx-auto" />
      <section className="relative py-28 md:py-40 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <p className="eyebrow mb-5">Chapter 04 — The Details</p>
          <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight mb-16 max-w-lg">
            Small moments, not left as defaults.
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            <BorderTraceTile />
            <DisplaceTextTile />
            <MagnetHintTile />
          </div>
        </div>
      </section>
    </>
  );
}
