'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, Music } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '#' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

const services = [
  'Live Orchestra',
  'DJ & Sound System',
  'Event Lighting',
  'Wedding Entertainment',
  'Anchoring',
  'Birthday Events',
];

export default function Footer() {
  const handleWhatsApp = () => {
    window.open('https://wa.me/919347456157', '_blank');
  };

  return (
    <footer className="relative bg-matte-black border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-t from-deep-purple/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                <Music size={24} className="text-matte-black" />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-white">Ravi Melodies</h3>
                <p className="text-gold/80 text-sm">Events & Orchestra</p>
              </div>
            </div>
            <p className="text-white/60 leading-relaxed">
              Creating unforgettable musical experiences for weddings, events, and celebrations across Andhra Pradesh.
            </p>
            <div className="flex gap-3 mt-6">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center text-white/70 hover:text-gold transition-colors"
              >
                <Instagram size={18} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center text-white/70 hover:text-gold transition-colors"
              >
                <Facebook size={18} />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full glassmorphism flex items-center justify-center text-white/70 hover:text-gold transition-colors"
              >
                <Youtube size={18} />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-white font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-white/60">{service}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-white font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-gold mt-1 flex-shrink-0" />
                <div>
                  <a href="tel:+919347456157" className="text-white hover:text-gold transition-colors">
                    +91 9347456157
                  </a>
                  <p className="text-white/40 text-sm">Call us anytime</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-gold mt-1 flex-shrink-0" />
                <div>
                  <a href="mailto:info@ravimelodies.com" className="text-white hover:text-gold transition-colors">
                    info@ravimelodies.com
                  </a>
                  <p className="text-white/40 text-sm">Email us</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-gold mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white/80">Gopavaram, Badvel</p>
                  <p className="text-white/60">Kadapa District, Andhra Pradesh</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            {new Date().getFullYear()} Ravi Melodies Events & Orchestra. All rights reserved.
          </p>
          <motion.button
            onClick={handleWhatsApp}
            className="flex items-center gap-2 text-gold hover:text-gold-light transition-colors"
            whileHover={{ x: 5 }}
          >
            <span className="text-sm">Book Now</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.65-.236-.375a9.86 9.86 0 01-1.517-5.26c.001-5.423 4.422-9.84 9.852-9.84 2.619 0 5.079 1.023 6.929 2.882a9.83 9.83 0 012.714 6.936c-.003 5.423-4.424 9.84-9.852 9.84m8.367-18.206C18.042 1.328 15.562 0 12.907 0 6.448 0 1.006 5.446 1.003 11.91c-.001 2.096.547 4.142 1.588 5.945L0 24l6.304-1.654a11.88 11.88 0 005.683 1.448h.005c6.455 0 11.895-5.447 11.9-11.886.002-3.181-1.234-6.173-3.49-8.42z"/>
            </svg>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
