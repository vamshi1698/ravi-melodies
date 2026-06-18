'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const galleryItems = [
  {
    id: 1,
    type: 'image' as const,
    src: 'https://images.pexels.com/photos/1190138/pexels-photo-1190138.jpeg?auto=compress&cs=tinysrgb&w=800',
    thumbnail: 'https://images.pexels.com/photos/1190138/pexels-photo-1190138.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Wedding Performance',
    category: 'Wedding',
    span: 'col-span-2 row-span-2',
  },
  {
    id: 2,
    type: 'video' as const,
    thumbnail: 'https://images.pexels.com/photos/164747/pexels-photo-164747.jpeg?auto=compress&cs=tinysrgb&w=600',
    src: 'https://images.pexels.com/photos/164747/pexels-photo-164747.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Live Orchestra Show',
    category: 'Live Events',
    span: 'col-span-1 row-span-1',
  },
  {
    id: 3,
    type: 'image' as const,
    src: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?auto=compress&cs=tinysrgb&w=600',
    thumbnail: 'https://images.pexels.com/photos/2261477/pexels-photo-2261477.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Birthday Bash',
    category: 'Birthday',
    span: 'col-span-1 row-span-2',
  },
  {
    id: 4,
    type: 'image' as const,
    src: 'https://images.pexels.com/photos/1574941/pexels-photo-1574941.jpeg?auto=compress&cs=tinysrgb&w=600',
    thumbnail: 'https://images.pexels.com/photos/1574941/pexels-photo-1574941.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Cultural Night',
    category: 'Cultural',
    span: 'col-span-1 row-span-1',
  },
  {
    id: 5,
    type: 'video' as const,
    thumbnail: 'https://images.pexels.com/photos/167571/pexels-photo-167571.jpeg?auto=compress&cs=tinysrgb&w=600',
    src: 'https://images.pexels.com/photos/167571/pexels-photo-167571.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Corporate Gala',
    category: 'Corporate',
    span: 'col-span-2 row-span-1',
  },
  {
    id: 6,
    type: 'image' as const,
    src: 'https://images.pexels.com/photos/1540405/pexels-photo-1540405.jpeg?auto=compress&cs=tinysrgb&w=600',
    thumbnail: 'https://images.pexels.com/photos/1540405/pexels-photo-1540405.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Private Concert',
    category: 'Private',
    span: 'col-span-1 row-span-1',
  },
  {
    id: 7,
    type: 'image' as const,
    src: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=600',
    thumbnail: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'Wedding Melodies',
    category: 'Wedding',
    span: 'col-span-1 row-span-1',
  },
  {
    id: 8,
    type: 'video' as const,
    thumbnail: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=600',
    src: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=600',
    title: 'DJ Night',
    category: 'DJ Events',
    span: 'col-span-1 row-span-2',
  },
];

export default function GallerySection() {
  const [selectedItem, setSelectedItem] = useState<typeof galleryItems[0] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const openModal = (item: typeof galleryItems[0], index: number) => {
    setSelectedItem(item);
    setCurrentIndex(index);
  };

  const closeModal = () => setSelectedItem(null);

  const navigate = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev'
      ? (currentIndex - 1 + galleryItems.length) % galleryItems.length
      : (currentIndex + 1) % galleryItems.length;
    setCurrentIndex(newIndex);
    setSelectedItem(galleryItems[newIndex]);
  };

  return (
    <section id="gallery" ref={sectionRef} className="relative bg-matte-black py-16 sm:py-20 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-matte-black via-deep-purple/10 to-matte-black" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <span className="text-gold/60 uppercase tracking-[0.2em] sm:tracking-[0.3em] text-xs">
            Our Performances
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mt-2">
            Performance <span className="text-gradient-gold">Gallery</span>
          </h2>
          <p className="text-white/60 mt-3 sm:mt-4 max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base">
            Witness the magic we create at every event through our lens
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] sm:auto-rows-[180px] md:auto-rows-[200px] lg:auto-rows-[250px] gap-2 sm:gap-3 md:gap-4">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative group cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl ${item.span}`}
              onClick={() => openModal(item, index)}
              whileHover={{ scale: 1.02, zIndex: 10 }}
            >
              <div className="absolute inset-0 bg-deep-purple/50 animate-pulse">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-matte-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {item.type === 'video' && (
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 md:w-16 rounded-full bg-gold/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-gold"
                >
                  <Play size={18} className="text-matte-black ml-1 sm:w-6 sm:h-6" />
                </motion.div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6">
                <span className="text-gold/80 text-xs uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="text-white font-semibold text-xs sm:text-sm md:text-lg mt-1 group-hover:text-gold transition-colors">
                  {item.title}
                </h3>
              </div>

              <motion.div
                className="absolute inset-0 border-2 border-gold/0 rounded-xl sm:rounded-2xl group-hover:border-gold/50 transition-colors"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-matte-black/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4 md:p-8"
            onClick={closeModal}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 z-50 w-10 h-10 sm:w-12 sm:h-12 rounded-full glassmorphism flex items-center justify-center text-white hover:text-gold transition-colors"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigate('prev'); }}
              className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full glassmorphism flex items-center justify-center text-white hover:text-gold transition-colors z-50"
            >
              <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigate('next'); }}
              className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full glassmorphism flex items-center justify-center text-white hover:text-gold transition-colors z-50"
            >
              <ChevronRight size={20} className="sm:w-6 sm:h-6" />
            </button>

            <motion.div
              key={selectedItem.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl sm:max-w-5xl w-full max-h-[70vh] sm:max-h-[80vh] rounded-2xl sm:rounded-3xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <Image
                  src={selectedItem.src}
                  alt={selectedItem.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />

                {selectedItem.type === 'video' && (
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 md:w-24 sm:h-20 md:h-24 rounded-full bg-gold flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-gold"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Play size={28} className="text-matte-black ml-1 sm:w-10 md:w-12 sm:h-10 md:h-12" />
                  </motion.div>
                )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-matte-black to-transparent">
                <span className="text-gold text-xs sm:text-sm uppercase tracking-wider">
                  {selectedItem.category}
                </span>
                <h3 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-display font-bold mt-1">
                  {selectedItem.title}
                </h3>
              </div>
            </motion.div>

            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2">
              {galleryItems.map((_, index) => (
                <div
                  key={index}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${
                    index === currentIndex ? 'w-6 sm:w-8 bg-gold' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
