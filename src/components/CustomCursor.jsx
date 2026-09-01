import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor({ enabled }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!enabled) return undefined;

    document.documentElement.classList.add("has-cursor");

    const dot = dotRef.current;
    const ring = ringRef.current;
    const ringPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const quickDotX = gsap.quickTo(dot, "x", { duration: 0.05, ease: "none" });
    const quickDotY = gsap.quickTo(dot, "y", { duration: 0.05, ease: "none" });
    const quickRingX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const quickRingY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    const handleMove = (e) => {
      quickDotX(e.clientX);
      quickDotY(e.clientY);
      quickRingX(e.clientX);
      quickRingY(e.clientY);
      ringPos.x = e.clientX;
      ringPos.y = e.clientY;
    };

    const handleOver = (e) => {
      if (e.target.closest("a, button, [data-cursor-hover]")) {
        ring.classList.add("is-active");
      }
    };
    const handleOut = (e) => {
      if (e.target.closest("a, button, [data-cursor-hover]")) {
        ring.classList.remove("is-active");
      }
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
