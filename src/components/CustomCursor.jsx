import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor({ enabled }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Desktop mouse
    const handleMouseMove = (e) => {
      setVisible(true);
      gsap.quickTo(dot, "x", { duration: 0.05, ease: "none" })(e.clientX);
      gsap.quickTo(dot, "y", { duration: 0.05, ease: "none" })(e.clientY);
      gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" })(e.clientX);
      gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" })(e.clientY);
    };

    const handleMouseOver = (e) => {
      if (e.target.closest("a, button, [data-cursor-hover]")) {
        ring.classList.add("is-active");
      }
    };
    const handleMouseOut = (e) => {
      if (e.target.closest("a, button, [data-cursor-hover]")) {
        ring.classList.remove("is-active");
      }
    };

    // Mobile touch
    let hideTimeout;
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        setVisible(true);
        clearTimeout(hideTimeout);
        const touch = e.touches[0];
        gsap.quickTo(dot, "x", { duration: 0.05, ease: "none" })(touch.clientX);
        gsap.quickTo(dot, "y", { duration: 0.05, ease: "none" })(touch.clientY);
        gsap.quickTo(ring, "x", { duration: 0.2, ease: "power2.out" })(touch.clientX);
        gsap.quickTo(ring, "y", { duration: 0.2, ease: "power2.out" })(touch.clientY);

        // Check if touching interactive element
        const target = document.elementFromPoint(touch.clientX, touch.clientY);
        if (target?.closest("a, button, [data-cursor-hover]")) {
          ring.classList.add("is-active");
        }
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        gsap.quickTo(dot, "x", { duration: 0.05, ease: "none" })(touch.clientX);
        gsap.quickTo(dot, "y", { duration: 0.05, ease: "none" })(touch.clientY);
        gsap.quickTo(ring, "x", { duration: 0.15, ease: "power2.out" })(touch.clientX);
        gsap.quickTo(ring, "y", { duration: 0.15, ease: "power2.out" })(touch.clientY);
      }
    };

    const handleTouchEnd = () => {
      ring.classList.remove("is-active");
      // Hide cursor after delay
      hideTimeout = setTimeout(() => setVisible(false), 800);
    };

    // Add desktop listeners
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    // Add mobile listeners
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    // Set cursor style
    if (enabled) {
      document.documentElement.classList.add("has-cursor");
    }

    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      clearTimeout(hideTimeout);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
        aria-hidden="true"
      />
    </>
  );
}
