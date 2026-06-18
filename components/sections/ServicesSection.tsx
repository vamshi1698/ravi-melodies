'use client';

import { useRef, useState, useEffect } from 'react';
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

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [activeService, setActiveService] = useState(0);
  const [radius, setRadius] = useState(180);

  useEffect(() => {
    const updateRadius = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setRadius(140);
      } else if (width < 768) {
        setRadius(170);
      } else if (width < 1024) {
        setRadius(200);
      } else {
        setRadius(250);
      }
    };

    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  const currentService = services[activeService];

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative min-h-screen bg-matte-black py-16 sm:py-20 md:py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-radial-purple opacity-50" />

      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <span className="text-gold/60 uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs">
            What We Offer
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mt-2">
            Our <span className="text-gradient-gold">Services</span>
          </h2>
        </motion.div>

        {/* Desktop - Circular Layout */}
        <div className="hidden md:block relative max-w-4xl mx-auto">
          <div className="relative h-[400px] md:h-[500px]">
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

            {services.map((service, index) => {
              const angleRad = (service.angle * Math.PI) / 180;
              const x = Math.cos(angleRad) * radius;
              const y = Math.sin(angleRad) * radius;
              const isActive = index === activeService;

              return (
                <motion.div
                  key={service.title}
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
                  onMouseEnter={() => setActiveService(index)}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div
                    className={`w-28 md:w-32 h-28 md:h-32 rounded-full flex flex-col items-center justify-center transition-all duration-300 ${
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
            })}
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

        {/* Mobile - Grid Layout */}
        <div className="md:hidden grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`glassmorphism rounded-2xl p-4 sm:p-6 text-center cursor-pointer transition-all ${
                activeService === index ? 'border-gold/50 shadow-gold' : 'border-white/10'
              }`}
              onClick={() => setActiveService(index)}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center">
                <service.icon size={20} className="text-gold sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-white font-semibold text-sm">{service.title}</h3>
            </motion.div>
          ))}
        </div>

        {/* Mobile Description */}
        <motion.div
          key={`mobile-${activeService}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-6 glassmorphism rounded-2xl p-6 text-center"
        >
          <h3 className="text-xl font-display font-bold text-white mb-2">
            {currentService.title}
          </h3>
          <p className="text-white/70 text-sm">
            {currentService.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mt-8 sm:mt-12 md:mt-16"
        >
          {['Wedding Entertainment', 'Birthday Events', 'Cultural Programs', 'Private Parties'].map((item) => (
            <span
              key={item}
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gold/80 border border-gold/30 rounded-full"
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
