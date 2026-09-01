import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function Wireframe({ reducedMotion }) {
  const groupRef = useRef(null);

  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.12;
    groupRef.current.rotation.x += delta * 0.045;
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial color="#c9a227" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh scale={0.62}>
        <icosahedronGeometry args={[1.6, 0]} />
        <meshBasicMaterial color="#edeae3" wireframe transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

/**
 * Mounts the WebGL canvas only while the section is within (or near) the
 * viewport, so idle GPU work is avoided entirely once the visitor has
 * scrolled past it. Falls back to a static SVG glyph if WebGL is
 * unavailable, and does nothing extra for reduced-motion beyond freezing
 * rotation (the shape itself still communicates the idea).
 */
export default function AbstractForm({ reducedMotion }) {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [supportsWebGL, setSupportsWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setSupportsWebGL(false);
    } catch {
      setSupportsWebGL(false);
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[280px]" aria-hidden="true">
      {supportsWebGL && inView && (
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 4.2], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
          >
            <Wireframe reducedMotion={reducedMotion} />
          </Canvas>
        </Suspense>
      )}
      {(!supportsWebGL || !inView) && (
        <div className="w-full h-full flex items-center justify-center">
          <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
            <polygon
              points="90,10 165,55 165,125 90,170 15,125 15,55"
              stroke="#c9a227"
              strokeWidth="1"
              opacity="0.5"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
