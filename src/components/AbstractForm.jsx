import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function InteractiveWireframe({ reducedMotion }) {
  const groupRef = useRef(null);
  const stateRef = useRef({
    velocity: { x: 0, y: 0 },
    isDragging: false,
    lastPos: { x: 0, y: 0 },
    canvas: null,
  });

  // Auto-rotation when idle
  useFrame((_, delta) => {
    if (reducedMotion || !groupRef.current) return;
    const s = stateRef.current;

    if (!s.isDragging) {
      // Friction — buttery smooth deceleration
      s.velocity.x *= 0.95;
      s.velocity.y *= 0.95;

      // Subtle auto-rotation when idle
      s.velocity.x += 0.003 * delta;
      s.velocity.y += 0.008 * delta;

      groupRef.current.rotation.x += s.velocity.x;
      groupRef.current.rotation.y += s.velocity.y;
    }
  });

  // Setup canvas events via useFrame (runs after mount)
  useFrame(({ gl }) => {
    const s = stateRef.current;
    if (s.canvas) return;
    s.canvas = gl.domElement;
    const canvas = s.canvas;

    canvas.style.cursor = 'grab';
    canvas.style.touchAction = 'none';

    // Mouse events
    canvas.addEventListener('pointerdown', (e) => {
      s.isDragging = true;
      s.lastPos = { x: e.clientX, y: e.clientY };
      s.velocity = { x: 0, y: 0 };
      canvas.style.cursor = 'grabbing';
    });

    canvas.addEventListener('pointermove', (e) => {
      if (!s.isDragging) return;
      const dy = e.clientY - s.lastPos.y;
      const dx = e.clientX - s.lastPos.x;
      s.lastPos = { x: e.clientX, y: e.clientY };
      s.velocity = { x: dy * 0.005, y: dx * 0.005 };
      if (groupRef.current) {
        groupRef.current.rotation.x += s.velocity.x;
        groupRef.current.rotation.y += s.velocity.y;
      }
    });

    const stopDrag = () => {
      s.isDragging = false;
      canvas.style.cursor = 'grab';
    };
    canvas.addEventListener('pointerup', stopDrag);
    canvas.addEventListener('pointerleave', stopDrag);

    // Touch events
    canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        s.isDragging = true;
        s.lastPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        s.velocity = { x: 0, y: 0 };
      }
    }, { passive: true });

    canvas.addEventListener('touchmove', (e) => {
      if (!s.isDragging || e.touches.length !== 1) return;
      e.preventDefault();
      const dy = e.touches[0].clientY - s.lastPos.y;
      const dx = e.touches[0].clientX - s.lastPos.x;
      s.lastPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      s.velocity = { x: dy * 0.005, y: dx * 0.005 };
      if (groupRef.current) {
        groupRef.current.rotation.x += s.velocity.x;
        groupRef.current.rotation.y += s.velocity.y;
      }
    }, { passive: false });

    canvas.addEventListener('touchend', () => { s.isDragging = false; });
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.35} />
      </mesh>
      <mesh scale={0.62}>
        <icosahedronGeometry args={[1.6, 0]} />
        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.2} />
      </mesh>
      <mesh scale={0.3}>
        <icosahedronGeometry args={[1.6, 0]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.06} />
      </mesh>
    </group>
  );
}

function detectWebGL() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return Boolean(gl);
  } catch { return false; }
}

export default function AbstractForm({ reducedMotion }) {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [supportsWebGL] = useState(detectWebGL);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting !== inView) setInView(entry.isIntersecting); },
      { rootMargin: '200px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView]);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[280px]" aria-hidden="true">
      {supportsWebGL && inView && (
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
            <InteractiveWireframe reducedMotion={reducedMotion} />
          </Canvas>
        </Suspense>
      )}
      {(!supportsWebGL || !inView) && (
        <div className="w-full h-full flex items-center justify-center">
          <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
            <polygon points="90,10 165,55 165,125 90,170 15,125 15,55" stroke="#00f0ff" strokeWidth="1" opacity="0.4" />
            <polygon points="90,35 140,62 140,118 90,145 40,118 40,62" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.25" />
          </svg>
        </div>
      )}
    </div>
  );
}
