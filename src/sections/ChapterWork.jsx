import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

function ProjectPreview({ project, index }) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(project.image) && !imageFailed;

  return (
    <div className="project-preview relative aspect-[16/10] rounded-xl overflow-hidden glass-card group">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-glass-border">
        <span className="w-[6px] h-[6px] rounded-full bg-cyan/30" />
        <span className="w-[6px] h-[6px] rounded-full bg-purple/30" />
        <span className="w-[6px] h-[6px] rounded-full bg-ink-faint/30" />
        <span className="ml-3 text-[10px] text-ink-faint truncate">{project.url.replace('https://', '')}</span>
      </div>
      <div className="relative h-[calc(100%-37px)] overflow-hidden bg-gradient-to-br from-surface to-bg-alt">
        {showImage ? (
          <img src={project.image} alt={`Screenshot of the ${project.title} website`}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            loading="lazy" onError={() => setImageFailed(true)} />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-display text-4xl md:text-5xl text-ink-faint/25 select-none gradient-text">{index}</span>
          </div>
        )}
      </div>
      <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-cyan/15 transition-colors duration-500 pointer-events-none" />
    </div>
  );
}

export default function ChapterWork({ reducedMotion }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.project-row').forEach(row => {
        const preview = row.querySelector('.project-preview');
        if (reducedMotion) { gsap.set(row, { opacity: 1 }); return; }
        gsap.fromTo(row, { opacity: 0 }, {
          opacity: 1, duration: 0.6,
          scrollTrigger: { trigger: row, start: 'top 85%', once: true },
        });
        gsap.fromTo(preview, { scale: 0.94, y: 30 }, {
          scale: 1, y: 0, ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 85%', end: 'top 45%', scrub: 0.8 },
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <>
      <div className="chapter-divider max-w-6xl mx-auto" />
      <section id="work" ref={rootRef} className="relative py-28 md:py-40 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <p className="eyebrow mb-5">Chapter 03 — The Work</p>
          <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight mb-20 md:mb-28 max-w-lg">
            Live sites, built end to end.
          </h2>
          <div className="flex flex-col gap-28 md:gap-40">
            {projects.map((project, i) => {
              const indexLabel = String(i + 1).padStart(2, '0');
              return (
                <div key={project.id} className="project-row grid md:grid-cols-12 gap-8 md:gap-10 items-center">
                  <div className={`md:col-span-7 ${i % 2 === 1 ? 'md:order-2' : 'md:order-1'}`}>
                    <ProjectPreview project={project} index={indexLabel} />
                  </div>
                  <div className={`md:col-span-5 ${i % 2 === 1 ? 'md:order-1' : 'md:order-2'}`}>
                    <span className="text-xs text-cyan font-mono">{indexLabel}</span>
                    <h3 className="font-display text-3xl md:text-4xl text-ink mt-3 mb-4">{project.title}</h3>
                    <p className="text-ink-muted leading-relaxed max-w-sm mb-7">{project.description}</p>
                    <a href={project.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-cyan border border-cyan/20 rounded-full px-5 py-2.5 min-h-[44px] hover:bg-cyan/[0.08] hover:border-cyan/35 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] active:scale-[0.97] transition-all duration-300"
                      data-cursor-hover>
                      Visit project <ArrowUpRight size={15} strokeWidth={1.5} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
