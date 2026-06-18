'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Users, Heart } from 'lucide-react';

interface CounterProps {
  target: number;
  suffix?: string;
  label: string;
  icon: React.ElementType;
}

function AnimatedCounter({ target, suffix = '', label, icon: Icon }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div className="glassmorphism rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-center hover:border-gold/30 transition-all duration-500">
        <motion.div
          className="w-12 h-12 sm:w-14 md:w-16 mx-auto mb-4 sm:mb-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center"
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <Icon size={24} className="text-gold sm:w-7 sm:h-7 md:w-8 md:h-8" />
        </motion.div>

        <div className="overflow-hidden">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gradient-gold"
          >
            {count.toLocaleString()}{suffix}
          </motion.span>
        </div>

        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="block text-white/70 text-base sm:text-lg mt-2 sm:mt-3"
        >
          {label}
        </motion.span>

        <motion.div
          className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      </div>
    </motion.div>
  );
}

export default function SocialProofSection() {
  const stats = [
    { target: 100, suffix: '+', label: 'Events Completed', icon: Trophy },
    { target: 5000, suffix: '+', label: 'Audience Reached', icon: Users },
    { target: 50, suffix: '+', label: 'Happy Families', icon: Heart },
  ];

  return (
    <section className="relative bg-matte-black py-16 sm:py-20 md:py-24 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] md:w-[600px] md:h-[600px] bg-purple-accent/20 rounded-full blur-[80px] sm:blur-[100px] opacity-30" />
        <div className="absolute top-1/4 right-1/4 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-gold/10 rounded-full blur-[60px] sm:blur-[80px] opacity-40" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <span className="text-gold/60 uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs">
            Our Impact
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mt-2">
            Numbers That <span className="text-gradient-gold">Speak</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
          {stats.map((stat) => (
            <AnimatedCounter
              key={stat.label}
              target={stat.target}
              suffix={stat.suffix}
              label={stat.label}
              icon={stat.icon}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10 sm:mt-12 md:mt-16"
        >
          <p className="text-white/60 text-base sm:text-lg">
            Trusted by families across{' '}
            <span className="text-gold">Kadapa</span>,{' '}
            <span className="text-gold">Badvel</span>, and{' '}
            <span className="text-gold">Andhra Pradesh</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
