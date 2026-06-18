'use client';

import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';

export default function StickyMobileCTA() {
  const handleCall = () => {
    window.location.href = 'tel:+919347456157';
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hello Ravi Melodies, I would like to inquire about your orchestra services.');
    window.open(`https://wa.me/919347456157?text=${message}`, '_blank');
  };

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-matte-black/95 backdrop-blur-lg border-t border-gold/20 p-3"
    >
      <div className="flex gap-3">
        <button
          onClick={handleCall}
          className="flex-1 py-3 bg-gradient-to-r from-gold to-gold-dark text-matte-black font-semibold rounded-xl flex items-center justify-center gap-2"
        >
          <Phone size={18} />
          Call Now
        </button>
        <button
          onClick={handleWhatsApp}
          className="flex-1 py-3 border-2 border-gold text-gold font-semibold rounded-xl flex items-center justify-center gap-2"
        >
          <MessageCircle size={18} />
          WhatsApp
        </button>
      </div>
    </motion.div>
  );
}
