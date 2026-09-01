import { useEffect, useRef } from 'react';

/**
 * Rising firefly particles — neon blue glow, denser, atmospheric.
 */
export default function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 2 + 0.8;
        this.speedY = -(Math.random() * 0.35 + 0.12);
        this.speedX = (Math.random() - 0.5) * 0.12;
        this.opacity = Math.random() * 0.25 + 0.08;
        this.maxOpacity = this.opacity;
        this.life = 0;
        this.maxLife = Math.random() * 500 + 350;
        // Glow intensity varies per particle
        this.glowSize = this.size * (3 + Math.random() * 3);
        // Pulsing flicker
        this.flickerSpeed = Math.random() * 0.03 + 0.01;
        this.flickerOffset = Math.random() * Math.PI * 2;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.life * 0.006) * 0.12;
        this.life++;

        const progress = this.life / this.maxLife;
        // Fade in, sustain, fade out
        if (progress < 0.1) {
          this.opacity = this.maxOpacity * (progress / 0.1);
        } else if (progress > 0.7) {
          this.opacity = this.maxOpacity * (1 - (progress - 0.7) / 0.3);
        } else {
          // Firefly flicker
          this.opacity = this.maxOpacity * (0.8 + 0.2 * Math.sin(this.life * this.flickerSpeed + this.flickerOffset));
        }

        if (this.y < -20 || this.life >= this.maxLife) {
          this.reset();
        }
      }

      draw(ctx) {
        if (this.opacity <= 0) return;

        // Outer glow
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.glowSize);
        gradient.addColorStop(0, `rgba(0, 240, 255, ${this.opacity * 0.6})`);
        gradient.addColorStop(0.4, `rgba(0, 200, 255, ${this.opacity * 0.2})`);
        gradient.addColorStop(1, 'rgba(0, 240, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Core bright dot
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#00f0ff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Start with fewer, add more over time
    const maxCount = Math.min(240, Math.floor(canvas.width / 5));
    let spawnTimer = 0;
    const initialCount = Math.floor(maxCount * 0.4);
    for (let i = 0; i < initialCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Gradually spawn more particles over time
      spawnTimer++;
      if (spawnTimer % 3 === 0 && particles.length < maxCount) {
        particles.push(new Particle());
      }

      particles.forEach(p => {
        p.update();
        p.draw(ctx);
      });
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
