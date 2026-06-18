'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, X, Send } from 'lucide-react';

export default function WhatsAppAssistant() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hello Ravi Melodies,

Event Type:
Date:
Location:
Expected Guests:

Please share details.`);
    window.open(`https://wa.me/919347456157?text=${message}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.8 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="fixed bottom-24 right-6 z-[60] md:bottom-8 md:right-8"
        >
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="absolute bottom-20 right-0 w-72 glassmorphism rounded-2xl p-5 mb-2"
              >
                <button
                  onClick={() => setIsExpanded(false)}
                  className="absolute top-3 right-3 text-white/60 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                    <Music size={18} className="text-matte-black" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">Ravi Melodies</p>
                    <p className="text-xs text-white/60">Event Coordinator</p>
                  </div>
                </div>
                <p className="text-white/80 text-sm mb-4">
                  Planning an event? Tell us your event type and date, and we&apos;ll create an unforgettable musical experience!
                </p>
                <button
                  onClick={handleWhatsApp}
                  className="w-full py-3 bg-gradient-to-r from-gold to-gold-light text-matte-black font-semibold rounded-xl flex items-center justify-center gap-2 hover:shadow-gold transition-all duration-300"
                >
                  <Send size={16} />
                  Start Conversation
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
              isExpanded
                ? 'bg-matte-black border border-gold/30'
                : 'bg-gradient-to-br from-gold to-gold-dark'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isExpanded ? (
              <X size={24} className="text-white" />
            ) : (
              <div className="relative">
                <Music size={24} className="text-matte-black" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
            )}
          </motion.button>

          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute right-16 top-1/2 -translate-y-1/2 glassmorphism px-3 py-2 rounded-lg text-xs text-white whitespace-nowrap"
            >
              Planning an event?
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
