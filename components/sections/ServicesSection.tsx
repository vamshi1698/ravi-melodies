'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mic, Music, Radio, Lightbulb, Crown } from 'lucide-react';

const services = [
  {
    title: 'Live Orchestra',
    description: 'Full band performances with professional musicians and instruments',
    icon: Music,
    angle: 0,
  },
  {
    title: 'Live Singers',
    description: 'Talented vocalists for every mood and occasion',
    icon: Mic,
    angle: 72,
  },
  {
    title: 'DJ Setup',
    description: 'State-of-the-art sound systems and DJ performances',
    icon: Radio,
    angle: 144,
  },
  {
    title: 'Event Lighting',
    description: 'Stunning stage lighting and visual effects',
    icon: Lightbulb,
    angle: 216,
  },
  {
    title: 'Anchoring',
    description: 'Professional hosts to engage your audience',
    icon: Crown,
    angle: 288,
  },
];

function ServiceCard({
  service,
  index,
  isActive,
  onHover,
}: {
  service: typeof services[0];
  index: number;
  isActive: boolean;
  onHover: () => void;
}) {
  const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 180 : 250;
  const angleRad = (service.angle * Math.PI) / 180;
  const x = Math.cos(angleRad) * radius;
  const y = Math.sin(angleRad) * radius;

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: isActive ? 1.15 : 1,
        x: x,
        y: y,
        zIndex: isActive ? 20 : 10,
      }}
      transition={{
        opacity: { delay: index * 0.1, duration: 0.5 },
        scale: { duration: 0.3 },
        x: { delay: index * 0.1, duration: 0.5 },
        y: { delay: index * 0.1, duration: 0.5 },
      }}
      onMouseEnter={onHover}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        className={`w-24 h-24 md:w-32 md:h-32 rounded-full flex flex-col items-center justify-center transition-all duration-300 ${
          isActive
            ? 'glassmorphism border-gold/50 shadow-gold'
            : 'glassmorphism border-white/10'
        }`}
        whileHover={{ rotateY: 10, rotateX: -5 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <service.icon
          size={isActive ? 32 : 24}
          className={isActive ? 'text-gold mb-2' : 'text-white/70 mb-1'}
          style={{ transition: 'all 0.3s' }}
        />
        <span
          className={`text-xs font-semibold text-center px-1 ${
            isActive ? 'text-white' : 'text-white/60'
          }`}
        >
          {service.title}
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [activeService, setActiveService] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const currentService = services[activeService];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-matte-black py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-radial-purple opacity-50" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold/60 uppercase tracking-[0.3em] text-xs">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mt-2">
            Our <span className="text-gradient-gold">Services</span>
          </h2>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div
            className="relative h-[400px] md:h-[500px]"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-deep-purple to-purple-accent/50 shadow-purple flex items-center justify-center"
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, #d4af3720, transparent 70%)',
                }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-4 rounded-full border-2 border-gold/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <Music size={48} className="text-gold" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-[500px] md:h-[500px] rounded-full border border-gold/10"
            >
              <div className="absolute inset-0 rounded-full border-t border-gold/30 animate-spin" style={{ animationDuration: '10s' }} />
            </motion.div>

            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                service={service}
                index={index}
                isActive={index === activeService}
                onHover={() => setActiveService(index)}
              />
            ))}
          </div>

          <motion.div
            key={activeService}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-12"
          >
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
              {currentService.title}
            </h3>
            <p className="text-white/70 max-w-md mx-auto text-lg">
              {currentService.description}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mt-16"
        >
          {['Wedding Entertainment', 'Birthday Events', 'Cultural Programs', 'Private Parties'].map((item, index) => (
            <span
              key={item}
              className="px-4 py-2 text-sm text-gold/80 border border-gold/30 rounded-full"
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
