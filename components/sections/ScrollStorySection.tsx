'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollStorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  useEffect(() => {
    if (!sectionRef.current || !spotlightRef.current) return;

    const spotlight = spotlightRef.current;

    gsap.to(spotlight, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
      opacity: 0.8,
      scale: 1.2,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 sm:py-24 md:py-32"
    >
      <div
        ref={spotlightRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, rgba(212, 175, 55, 0.1) 30%, transparent 70%)',
          filter: 'blur(40px) sm:blur-[60px]',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-matte-black via-transparent to-matte-black pointer-events-none" />

      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 text-center px-4 sm:px-6 max-w-3xl sm:max-w-4xl mx-auto"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="inline-block text-gold text-4xl sm:text-5xl md:text-6xl lg:text-8xl mb-4 sm:mb-6 md:mb-8"
        >
          &ldquo;
        </motion.span>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-display font-bold text-white leading-tight mb-4 sm:mb-6">
          Every Event Deserves
          <br />
          <span className="text-gradient-gold">A Magical Soundtrack</span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-white/70 text-base sm:text-lg md:text-xl font-light max-w-xl sm:max-w-2xl mx-auto"
        >
          From intimate gatherings to grand celebrations, we bring the soul of live music
          to create moments that resonate forever in your memories.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-10 md:mt-12 mx-auto w-16 sm:w-20 md:w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
        />
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-matte-black to-transparent" />
    </section>
  );
}
