'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Music, Cake, Star, Users, Building2, ArrowRight } from 'lucide-react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const scrollWidth = container.scrollWidth - container.clientWidth;

    // Only apply horizontal scroll on larger screens
    if (window.innerWidth >= 768) {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          container.scrollLeft = progress * scrollWidth;

          // Update active index based on scroll position
          const cardWidth = scrollWidth / (events.length - 1);
          const newIndex = Math.round(progress * (events.length - 1));
          setActiveIndex(Math.min(newIndex, events.length - 1));
        },
        invalidateOnRefresh: true,
      });
    }

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

      {/* Desktop - Horizontal scroll with pin */}
      <div className="hidden md:block h-screen">
        <div
          ref={containerRef}
          className="h-full flex items-center overflow-x-auto overflow-y-hidden"
          style={{ scrollBehavior: 'auto' }}
        >
          <div className="flex gap-8 px-[15vw] min-w-max">
            {events.map((event, index) => (
              <motion.div
                key={index}
                className="event-card w-[350px] lg:w-[400px] flex-shrink-0"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div
                  className={`relative h-[450px] rounded-3xl bg-gradient-to-br ${event.color} glassmorphism p-8 overflow-hidden group hover:scale-[1.02] transition-all duration-500 ${
                    activeIndex === index ? 'border-gold/50 shadow-gold' : ''
                  }`}
                >
                  <div
                    className="absolute top-0 right-0 w-32 h-32 opacity-30"
                    style={{
                      background: `radial-gradient(circle at top right, ${event.accent}40, transparent 70%)`,
                    }}
                  />

                  <div className="relative z-10 h-full flex flex-col">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                      style={{
                        background: `linear-gradient(135deg, ${event.accent}40, ${event.accent}10)`,
                        border: `1px solid ${event.accent}30`,
                      }}
                    >
                      <event.icon size={28} style={{ color: event.accent }} />
                    </div>

                    <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-gradient-gold transition-all duration-300">
                      {event.title}
                    </h3>

                    <p className="text-white/70 font-light leading-relaxed flex-grow text-base">
                      {event.description}
                    </p>

                    <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                      <span className="text-gold/80 text-sm">Explore More</span>
                      <motion.div
                        className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center group-hover:bg-gold transition-colors"
                        whileHover={{ scale: 1.1 }}
                      >
                        <ArrowRight className="w-5 h-5 text-gold group-hover:text-matte-black transition-colors" />
                      </motion.div>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-matte-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile - Vertical stack with scroll */}
      <div className="md:hidden py-24 px-4 space-y-6">
        {events.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="w-full"
          >
            <div
              className={`relative rounded-2xl bg-gradient-to-br ${event.color} glassmorphism p-6 overflow-hidden group ${
                activeIndex === index ? 'border-gold/30' : ''
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <div className="relative z-10 flex flex-col sm:flex-row gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${event.accent}40, ${event.accent}10)`,
                    border: `1px solid ${event.accent}30`,
                  }}
                >
                  <event.icon size={24} style={{ color: event.accent }} />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-display font-bold text-white mb-2">
                    {event.title}
                  </h3>
                  <p className="text-white/60 font-light text-sm">
                    {event.description}
                  </p>
                </div>
                <div className="flex items-center justify-end">
                  <ArrowRight className="w-5 h-5 text-gold" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-wider"
        >
          <span className="hidden md:inline">Scroll to explore</span>
          <div className="flex gap-1.5">
            {events.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? 'w-6 bg-gold'
                    : 'w-1.5 bg-white/30'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
