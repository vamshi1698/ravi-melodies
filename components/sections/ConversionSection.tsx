'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Phone, MessageCircle, Music } from 'lucide-react';

export default function ConversionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
  const spotlightOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0.5, 1]);

  const handleCall = () => {
    window.location.href = 'tel:+919347456157';
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hello Ravi Melodies,

I would like to inquire about your orchestra services.

Event Type:
Date:
Location:
Expected Guests:

Please share details and pricing.`);
    window.open(`https://wa.me/919347456157?text=${message}`, '_blank');
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-matte-black flex items-center justify-center overflow-hidden py-24"
    >
      <motion.div
        style={{ opacity: spotlightOpacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-gold/30 via-gold/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
          <div
            className="absolute inset-0"
            style={{
              background: 'conic-gradient(from 180deg at 50% 50%, transparent 0deg, #d4af3715 90deg, transparent 180deg, #d4af3715 270deg, transparent 360deg)',
              animation: 'spin 10s linear infinite',
            }}
          />
        </div>
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[200px] h-[400px] bg-gold/20 blur-[100px] rounded-full" />
      </motion.div>

      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-gold"
        >
          <Music size={36} className="text-matte-black" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight"
        >
          Ready To Make Your
          <br />
          <span className="text-gradient-gold">Event Unforgettable?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/70 text-lg md:text-xl mt-6 mb-12 max-w-2xl mx-auto"
        >
          Let&apos;s create magical moments together. Book Ravi Melodies for your next celebration.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            onClick={handleCall}
            className="group px-10 py-5 bg-gradient-to-r from-gold to-gold-light text-matte-black font-bold text-lg rounded-full flex items-center justify-center gap-3 hover:shadow-gold transition-all duration-500 magnetic-button relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 shimmer"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}
            />
            <Phone size={22} />
            <span>Call Now</span>
          </motion.button>

          <motion.button
            onClick={handleWhatsApp}
            className="group px-10 py-5 border-2 border-gold text-gold font-bold text-lg rounded-full flex items-center justify-center gap-3 hover:bg-gold/10 transition-all duration-500 magnetic-button relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle size={22} />
            <span>WhatsApp Booking</span>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 glassmorphism inline-block px-6 py-3 rounded-full"
        >
          <p className="text-white/80 text-sm">
            <span className="text-gold">Fast Response</span> - We typically reply within 1 hour
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        viewport={{ once: true }}
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-matte-black to-transparent"
      />
    </section>
  );
}
