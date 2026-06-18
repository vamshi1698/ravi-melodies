'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Music, Cake, Star, Users, Building2 } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const events = [
  {
    title: 'Wedding Celebrations',
    description: 'Make your special day extraordinary with live performances that create magical moments',
    icon: Music,
    color: 'from-gold/20 to-gold/5',
    accent: '#d4af37',
  },
  {
    title: 'Birthday Parties',
    description: 'Energetic entertainment that brings joy to every birthday celebration',
    icon: Cake,
    color: 'from-purple-accent/20 to-purple-accent/5',
    accent: '#4a1a7a',
  },
  {
    title: 'Private Events',
    description: 'Intimate musical experiences tailored for exclusive gatherings',
    icon: Star,
    color: 'from-gold/20 to-gold/5',
    accent: '#d4af37',
  },
  {
    title: 'Cultural Programs',
    description: 'Celebrate tradition with authentic musical performances and cultural showcases',
    icon: Users,
    color: 'from-purple-accent/20 to-purple-accent/5',
    accent: '#4a1a7a',
  },
  {
    title: 'Corporate Events',
    description: 'Professional entertainment that elevates your business gatherings',
    icon: Building2,
    color: 'from-gold/20 to-gold/5',
    accent: '#d4af37',
  },
];

export default function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;

    const cards = cardsRef.current.querySelectorAll('.event-card');
    const totalCards = cards.length;
    const cardWidth = window.innerWidth < 768 ? 300 : 400;
    const totalWidth = totalCards * cardWidth;

    const scrollTween = gsap.to(cardsRef.current, {
      x: -(totalWidth - window.innerWidth + 100),
      ease: 'none',
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: () => `+=${totalWidth}`,
      pin: true,
      scrub: 1,
      animation: scrollTween,
      invalidateOnRefresh: true,
    });

    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { rotateY: 15, opacity: 0.5 },
        {
          rotateY: 0,
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: card,
            horizontal: true,
            start: 'left center',
            end: 'center center',
            scrub: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="events"
      ref={sectionRef}
      className="relative min-h-screen bg-matte-black overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-conic-stage opacity-30" />

      <div className="absolute top-8 sm:top-12 left-4 sm:left-8 z-20">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-gold/60 uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs"
        >
          Our Specializations
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mt-2"
        >
          Events We <span className="text-gradient-gold">Transform</span>
        </motion.h2>
      </div>

      <div className="h-screen flex items-center">
        <div
          ref={cardsRef}
          className="flex gap-4 sm:gap-6 md:gap-8 pl-[15vw] sm:pl-[20vw] md:pl-[20vw] pr-[15vw] will-change-transform"
          style={{ perspective: '1000px' }}
        >
          {events.map((event, index) => (
            <motion.div
              key={index}
              className="event-card flex-shrink-0 w-[280px] sm:w-[350px] md:w-[400px]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                className={`relative h-[350px] sm:h-[400px] md:h-[450px] rounded-2xl sm:rounded-3xl bg-gradient-to-br ${event.color} glassmorphism p-5 sm:p-6 md:p-8 overflow-hidden group hover:scale-[1.02] transition-transform duration-500`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 opacity-30"
                  style={{
                    background: `radial-gradient(circle at top right, ${event.accent}40, transparent 70%)`,
                  }}
                />

                <div className="relative z-10 h-full flex flex-col">
                  <div
                    className="w-12 h-12 sm:w-14 md:w-16 sm:h-14 md:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6"
                    style={{
                      background: `linear-gradient(135deg, ${event.accent}40, ${event.accent}10)`,
                      border: `1px solid ${event.accent}30`,
                    }}
                  >
                    <event.icon size={24} style={{ color: event.accent }} className="sm:w-7 sm:h-7 md:w-8 md:h-8" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-3 sm:mb-4 group-hover:text-gradient-gold transition-all duration-300">
                    {event.title}
                  </h3>

                  <p className="text-white/70 font-light leading-relaxed text-sm sm:text-base flex-grow">
                    {event.description}
                  </p>

                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="text-gold/80 text-xs sm:text-sm">Explore More</span>
                    <motion.div
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold/20 flex items-center justify-center group-hover:bg-gold transition-colors"
                      whileHover={{ scale: 1.1 }}
                    >
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-gold group-hover:text-matte-black transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </motion.div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-matte-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-wider"
        >
          <span>Scroll to explore</span>
          <motion.span
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}
