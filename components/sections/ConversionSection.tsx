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
      className="relative min-h-screen bg-matte-black flex items-center justify-center overflow-hidden py-16 sm:py-20 md:py-24"
    >
      <motion.div
        style={{ opacity: spotlightOpacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 sm:w-1 h-full bg-gradient-to-b from-gold/30 via-gold/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] md:w-[800px] md:h-[800px]">
          <div
            className="absolute inset-0"
            style={{
              background: 'conic-gradient(from 180deg at 50% 50%, transparent 0deg, #d4af3715 90deg, transparent 180deg, #d4af3715 270deg, transparent 360deg)',
              animation: 'spin 10s linear infinite',
            }}
          />
        </div>
        <div className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 w-[150px] h-[300px] sm:w-[200px] sm:h-[400px] bg-gold/20 blur-[80px] sm:blur-[100px] rounded-full" />
      </motion.div>

      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 max-w-3xl sm:max-w-4xl mx-auto px-4 sm:px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="w-14 h-14 sm:w-16 md:w-20 mx-auto mb-6 sm:mb-8 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-gold"
        >
          <Music size={28} className="text-matte-black sm:w-8 sm:h-8 md:w-10 md:h-10" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white leading-tight"
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
          className="text-white/70 text-base sm:text-lg md:text-xl mt-4 sm:mt-6 mb-8 sm:mb-10 md:mb-12 max-w-xl sm:max-w-2xl mx-auto"
        >
          Let&apos;s create magical moments together. Book Ravi Melodies for your next celebration.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4"
        >
          <motion.button
            onClick={handleCall}
            className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-gold to-gold-light text-matte-black font-bold text-base sm:text-lg rounded-full flex items-center justify-center gap-3 hover:shadow-gold transition-all duration-500 magnetic-button relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 shimmer"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }}
            />
            <Phone size={20} className="sm:w-6 sm:h-6" />
            <span>Call Now</span>
          </motion.button>

          <motion.button
            onClick={handleWhatsApp}
            className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 border-2 border-gold text-gold font-bold text-base sm:text-lg rounded-full flex items-center justify-center gap-3 hover:bg-gold/10 transition-all duration-500 magnetic-button relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle size={20} className="sm:w-6 sm:h-6" />
            <span>WhatsApp Booking</span>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 sm:mt-10 md:mt-12 glassmorphism inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-full"
        >
          <p className="text-white/80 text-xs sm:text-sm">
            <span className="text-gold">Fast Response</span> - We typically reply within 1 hour
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        viewport={{ once: true }}
        className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 md:h-32 bg-gradient-to-t from-matte-black to-transparent"
      />
    </section>
  );
}
