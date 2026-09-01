import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { revealOnScroll } from '../animations/scrollReveal';

function NeonButton({ href, target, rel, children, className = '' }) {
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    gsap.to(el, {
      x: (relX / rect.width) * 10,
      y: (relY / rect.height) * 6,
      duration: 0.4,
      ease: 'power3.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
  };

  return (
    <a
      ref={btnRef}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-hover
      className={`neon-btn inline-flex items-center justify-center gap-2.5 rounded-full px-5 py-3 min-h-[48px] text-sm font-medium w-full sm:w-auto transition-all duration-300 ${className}`}
    >
      {children}
    </a>
  );
}

export default function FinalContact({ reducedMotion }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealOnScroll('.contact-reveal', { stagger: 0.1, reducedMotion });
    }, rootRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <>
      <div className="chapter-divider max-w-6xl mx-auto" />
      <section id="contact" ref={rootRef} className="relative py-32 md:py-48 px-6 md:px-10 bg-bg-alt/40">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-cyan/[0.025] rounded-full blur-[160px] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          <p className="eyebrow contact-reveal mb-6">Final Chapter</p>
          <h2 className="contact-reveal font-display text-4xl md:text-6xl text-ink leading-tight mb-4">
            The story doesn&rsquo;t end here.
          </h2>
          <p className="contact-reveal font-display italic text-2xl md:text-3xl gradient-text mb-4">
            Maybe the next story is yours.
          </p>
          <p className="contact-reveal font-body text-sm md:text-base tracking-[0.18em] text-ink-faint uppercase mb-14">
            Let&rsquo;s build something worth remembering.
          </p>

          <div className="contact-reveal flex flex-col sm:flex-row items-center justify-center gap-5 px-4 sm:px-0">
            {/* Email me — dark surface, subtle warm border */}
            <NeonButton
              href="https://mail.google.com/mail/?view=cm&fs=1&to=mdsiamislam8644@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#2a0f15] border border-[#ff0000]/40 text-ink hover:border-[#ff0000] hover:bg-[#3a1018] hover:text-[#ff3333] hover:shadow-[0_4px_0_0_rgba(255,0,0,0.35),0_8px_30px_rgba(255,0,0,0.15)]"
            >
              <img src={`${import.meta.env.BASE_URL}icons/gmail.jpg`} alt="" className="w-5 h-5 rounded-sm object-cover" />
              Email me
            </NeonButton>

            {/* WhatsApp — dark surface, subtle green border */}
            <NeonButton
              href="https://wa.me/8801881490692"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0f2218] border border-[#25d366]/35 text-ink hover:border-[#25d366] hover:bg-[#14321f] hover:text-[#2ed974] hover:shadow-[0_4px_0_0_rgba(37,211,102,0.35),0_8px_30px_rgba(37,211,102,0.15)]"
            >
              <img src={`${import.meta.env.BASE_URL}icons/whatsapp.jpg`} alt="" className="w-5 h-5 rounded-sm object-cover" />
              WhatsApp
            </NeonButton>
          </div>
        </div>

        <footer className="max-w-6xl mx-auto mt-28 md:mt-40 pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-faint relative">
          <span>&copy; {new Date().getFullYear()} Siam</span>
          <div className="flex items-center gap-2">
            <span className="w-[4px] h-[4px] rounded-full bg-cyan shadow-[0_0_4px_rgba(0,240,255,0.5)]" />
            <span>Built with React, GSAP &amp; Three.js</span>
          </div>
        </footer>
      </section>
    </>
  );
}
