import { useRef } from "react";
import gsap from "gsap";

/**
 * Wraps any element (usually a link/button) with a subtle magnetic pull
 * toward the cursor. Tasteful: capped displacement, snaps back on leave.
 * No-ops on touch devices since there is no hover/cursor concept there.
 */
export default function MagneticButton({ as: Tag = "button", className = "", children, strength = 18, ...props }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    gsap.to(el, {
      x: (relX / rect.width) * strength,
      y: (relY / rect.height) * strength,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <Tag
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      data-cursor-hover
      {...props}
    >
      {children}
    </Tag>
  );
}
