import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fades + lifts a set of elements into place as they cross into the
 * viewport. Used for chapter-transition-level reveals (Level 1/2 in the
 * animation hierarchy) -- not for ambient/looping motion.
 */
export function revealOnScroll(targets, { trigger, stagger = 0.08, y = 28, reducedMotion = false } = {}) {
  if (!targets) return null;
  if (reducedMotion) {
    gsap.set(targets, { opacity: 1, y: 0 });
    return null;
  }

  return gsap.from(targets, {
    opacity: 0,
    y,
    duration: 0.9,
    stagger,
    ease: "power3.out",
    scrollTrigger: {
      trigger: trigger || targets,
      start: "top 82%",
      once: true,
    },
  });
}
