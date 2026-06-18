'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Suresh Kumar',
    event: 'Wedding Celebration',
    location: 'Kadapa',
    rating: 5,
    review: 'Ravi Melodies made our wedding unforgettable. The live orchestra performance was magical, and every guest was mesmerized. Highly recommended!',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 2,
    name: 'Lakshmi Devi',
    event: 'Birthday Party',
    location: 'Badvel',
    rating: 5,
    review: 'The team was professional and the music selection was perfect. They understood exactly what we wanted and delivered beyond expectations.',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    id: 3,
    name: 'Venkat Reddy',
    event: 'Corporate Event',
    location: 'Kadapa District',
    rating: 5,
    review: 'Fantastic performance for our company annual event. The DJ and live music combination was perfect. Great sound quality and professional setup.',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className="relative"
    >
      <div
        className={`glassmorphism rounded-3xl p-8 transition-all duration-300 ${
          isHovered ? 'border-gold/30 shadow-gold' : ''
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <Quote
          className="text-gold/30 absolute top-6 right-6"
          size={40}
        />

        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-gold/30">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-white font-semibold">{testimonial.name}</h3>
            <p className="text-white/60 text-sm">{testimonial.location}</p>
          </div>
        </div>

        <div className="flex gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} size={16} className="text-gold fill-gold" />
          ))}
        </div>

        <p className="text-white/80 leading-relaxed mb-6">
          &ldquo;{testimonial.review}&rdquo;
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <span className="text-gold/80 text-sm">{testimonial.event}</span>
          <motion.div
            className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center"
            animate={isHovered ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.5 }}
          >
            <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="relative bg-matte-black py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-purple/5 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-gold/60 uppercase tracking-[0.3em] text-xs">
            Client Love
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white mt-2">
            What They <span className="text-gradient-gold">Say</span>
          </h2>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">
            Hear from families who experienced the magic of Ravi Melodies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-2 mt-12"
        >
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${i === 1 ? 'w-8 bg-gold' : 'bg-white/30'}`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
