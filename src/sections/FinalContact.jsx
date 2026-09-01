import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { Mail, MessageCircle } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import { revealOnScroll } from '../animations/scrollReveal';

export default function FinalContact({ reducedMotion }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealOnScroll('.contact-reveal', { stagger: 0.1, reducedMotion });
    }, rootRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="contact"
      ref={rootRef}
      className="relative py-36 md:py-52 px-6 md:px-10 bg-surface/40"
    >
      <div className="max-w-4xl mx-auto text-center">
        <p className="eyebrow contact-reveal mb-6">Final Chapter</p>
        <h2 className="contact-reveal font-display text-4xl md:text-6xl text-ink leading-tight mb-4">
          The story doesn&rsquo;t end here.
        </h2>
        <p className="contact-reveal font-display italic text-2xl md:text-3xl text-ink-muted mb-4">
          Maybe the next story is yours.
        </p>
        <p className="contact-reveal font-body text-sm md:text-base tracking-[0.18em] text-ink-faint uppercase mb-14">
          Let&rsquo;s build something worth remembering.
        </p>

        <div className="contact-reveal flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticButton
            as="a"
            href="mailto:mdsiamislam8644@gmail.com"
            className="inline-flex items-center gap-2.5 bg-accent text-bg rounded-full px-7 py-3.5 text-sm font-medium hover:bg-ink transition-colors duration-300"
          >
            <Mail size={16} strokeWidth={1.75} />
            Email me
          </MagneticButton>
          <MagneticButton
            as="a"
            href="https://wa.me/8801881490692"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 border border-line text-ink rounded-full px-7 py-3.5 text-sm font-medium hover:border-accent hover:text-accent transition-colors duration-300"
          >
            <MessageCircle size={16} strokeWidth={1.75} />
            WhatsApp
          </MagneticButton>
        </div>
      </div>

      <footer className="max-w-6xl mx-auto mt-32 md:mt-44 pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-faint">
        <span>&copy; {new Date().getFullYear()} Siam</span>
        <span>Built with React, GSAP &amp; Three.js</span>
      </footer>
    </section>
  );
}
