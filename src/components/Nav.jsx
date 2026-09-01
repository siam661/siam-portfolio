import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { href: '#story', label: 'Story' },
  { href: '#work', label: 'Work' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const firstLinkRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(
        menuRef.current,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.65,
          ease: 'power4.inOut',
        },
      );
      gsap.fromTo(
        '.mobile-link',
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.06,
          delay: 0.2,
          ease: 'power3.out',
        },
      );
      firstLinkRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const handleKey = e => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-6 md:py-8">
        <a
          href="#top"
          className="font-display text-sm tracking-wide text-ink"
          data-cursor-hover
        >
          Siam
        </a>

        <nav className="hidden md:flex items-center gap-9" aria-label="Primary">
          {LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-ink-muted hover:text-ink transition-colors duration-300"
              data-cursor-hover
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="md:hidden flex items-center justify-center w-10 h-10 text-ink"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
        >
          <Menu size={22} strokeWidth={1.5} />
        </button>
      </header>

      <div
        ref={menuRef}
        className="fixed inset-0 z-[70] bg-bg md:hidden flex flex-col"
        style={{
          clipPath: 'inset(0% 0% 100% 0%)',
          visibility: open ? 'visible' : 'hidden',
        }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between px-6 py-6">
          <span className="font-display text-sm text-ink">Siam</span>
          <button
            ref={closeBtnRef}
            type="button"
            className="flex items-center justify-center w-10 h-10 text-ink"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        <nav
          className="flex-1 flex flex-col justify-center px-8 gap-2"
          aria-label="Mobile primary"
        >
          {LINKS.map((link, i) => (
            <a
              key={link.href}
              ref={i === 0 ? firstLinkRef : null}
              href={link.href}
              className="mobile-link font-display text-4xl py-3 text-ink"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="px-8 pb-8 text-xs text-ink-faint">
          mdsiamislam8644@gmail.com
        </p>
      </div>
    </>
  );
}
