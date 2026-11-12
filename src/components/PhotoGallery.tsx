import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { LotusFlower, OrnamentalDivider, BodhiLeaf } from './Decorations';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  aspect: string;
  bgGradient: string;
  iconType: 'lotus' | 'rings' | 'hands' | 'venue' | 'decor' | 'portrait';
  caption: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'The Sacred Union',
    category: 'Ceremony',
    aspect: 'aspect-[3/4]',
    bgGradient: 'from-[#0f1b3d] via-[#1a2d5a] to-[#0a1128]',
    iconType: 'portrait',
    caption: 'Sujith & Pratiksha in traditional wedding attire',
  },
  {
    id: 2,
    title: 'Golden Rings of Eternity',
    category: 'Details',
    aspect: 'aspect-[4/3]',
    bgGradient: 'from-[#141d3b] via-[#222e54] to-[#0d1630]',
    iconType: 'rings',
    caption: 'Symbols of eternal commitment and love',
  },
  {
    id: 3,
    title: 'Ashirwad Celebration',
    category: 'Venue',
    aspect: 'aspect-[4/3]',
    bgGradient: 'from-[#1a2444] via-[#2a3866] to-[#121a36]',
    iconType: 'venue',
    caption: 'The majestic celebration venue in Wardha',
  },
  {
    id: 4,
    title: 'Lotus & Floral Splendour',
    category: 'Aesthetics',
    aspect: 'aspect-[3/4]',
    bgGradient: 'from-[#121c38] via-[#1f305c] to-[#0a1226]',
    iconType: 'decor',
    caption: 'Handcrafted floral arrangements and golden accents',
  },
  {
    id: 5,
    title: 'Sacred Blessings',
    category: 'Moments',
    aspect: 'aspect-[4/3]',
    bgGradient: 'from-[#152042] via-[#233568] to-[#0d1732]',
    iconType: 'hands',
    caption: 'Elderly blessings and auspicious Buddhist chants',
  },
  {
    id: 6,
    title: 'Together in Serenity',
    category: 'Portraits',
    aspect: 'aspect-[3/4]',
    bgGradient: 'from-[#0f1a36] via-[#1c2e5b] to-[#091124]',
    iconType: 'lotus',
    caption: 'A quiet moment of joy and contemplation',
  },
];

const PhotoGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const categories = ['All', 'Ceremony', 'Details', 'Venue', 'Aesthetics', 'Portraits'];

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  const renderIcon = (type: GalleryItem['iconType']) => {
    switch (type) {
      case 'lotus':
        return <LotusFlower size={48} color="#d4a547" />;
      case 'rings':
        return (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d4a547" strokeWidth="1.2">
            <circle cx="8" cy="12" r="5" />
            <circle cx="16" cy="12" r="5" />
            <path d="M12 7l1-2h2l-1 2" strokeWidth="1" />
          </svg>
        );
      case 'hands':
        return (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d4a547" strokeWidth="1.2">
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            <path d="M5 11h14v10H5z" />
            <circle cx="12" cy="16" r="2" />
          </svg>
        );
      case 'venue':
        return (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d4a547" strokeWidth="1.2">
            <path d="M3 21h18M5 21V9l7-6 7 6v12M9 21v-6h6v6" />
          </svg>
        );
      case 'decor':
        return <BodhiLeaf size={48} color="#d4a547" />;
      case 'portrait':
      default:
        return (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d4a547" strokeWidth="1.2">
            <circle cx="12" cy="8" r="4" />
            <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
          </svg>
        );
    }
  };

  const handleNext = () => {
    if (!selectedPhoto) return;
    const currentIndex = galleryItems.findIndex((item) => item.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % galleryItems.length;
    setSelectedPhoto(galleryItems[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedPhoto) return;
    const currentIndex = galleryItems.findIndex((item) => item.id === selectedPhoto.id);
    const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    setSelectedPhoto(galleryItems[prevIndex]);
  };

  return (
    <section
      ref={ref}
      id="gallery"
      className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-ivory text-navy-900 overflow-hidden"
    >
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 bg-lotus-pattern opacity-40 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex justify-center mb-4">
            <LotusFlower size={36} color="#d4a547" />
          </div>

          <p className="font-sans-elegant text-xs sm:text-sm tracking-[0.3em] uppercase text-gold-700 mb-2 font-medium">
            Treasured Moments
          </p>

          <div className="flex justify-center mb-4">
            <OrnamentalDivider className="text-gold" width={220} />
          </div>

          <h2 className="font-display text-3xl sm:text-5xl text-navy-900 font-normal tracking-wide mb-4">
            Celebration Gallery
          </h2>

          <p className="font-serif text-lg sm:text-xl text-navy-700/80 max-w-xl mx-auto italic">
            A glimpse into the joy, love, and sacred rituals of our wedding celebration.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-sans-elegant text-xs tracking-wider px-4 py-1.5 rounded-full border transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-navy-900 text-ivory border-navy-900 shadow-md'
                    : 'bg-transparent text-navy-800 border-gold/40 hover:border-gold hover:text-navy-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredItems.map((item, idx) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedPhoto(item)}
              className="group relative cursor-pointer overflow-hidden rounded-xl bg-navy-900 border border-gold/30 shadow-lg"
            >
              <div
                className={`w-full ${item.aspect} bg-gradient-to-br ${item.bgGradient} relative flex flex-col items-center justify-center p-6 text-center transition-all duration-500 group-hover:scale-105`}
              >
                {/* Subtle Ornamental Frame inside card */}
                <div className="absolute inset-3 border border-gold/25 rounded-lg pointer-events-none group-hover:border-gold/50 transition-colors duration-300" />

                {/* Corner Diamonds */}
                <span className="absolute top-4 left-4 text-gold/40 text-xs">✦</span>
                <span className="absolute top-4 right-4 text-gold/40 text-xs">✦</span>
                <span className="absolute bottom-4 left-4 text-gold/40 text-xs">✦</span>
                <span className="absolute bottom-4 right-4 text-gold/40 text-xs">✦</span>

                {/* Central Icon */}
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300 opacity-80 group-hover:opacity-100">
                  {renderIcon(item.iconType)}
                </div>

                <h3 className="font-display text-xl text-ivory tracking-wide mb-1 px-4">
                  {item.title}
                </h3>
                <p className="font-sans-elegant text-[11px] text-gold tracking-[0.2em] uppercase mb-2">
                  {item.category}
                </p>
                <p className="font-serif text-sm text-ivory/60 italic max-w-xs line-clamp-2 px-2">
                  {item.caption}
                </p>

                {/* Overlay hover prompt */}
                <div className="absolute inset-0 bg-navy-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="font-sans-elegant text-xs text-gold tracking-widest uppercase border border-gold/60 px-4 py-2 rounded-full backdrop-blur-sm">
                    View Fullscreen
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Note on actual photos */}
        <div className="text-center mt-12">
          <p className="font-serif text-sm text-navy-800/60 italic">
            ✦ High-resolution event photographs will be updated here live during the celebrations ✦
          </p>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-navy-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 text-ivory/70 hover:text-gold transition-colors z-20 p-2"
              aria-label="Close lightbox"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 sm:left-8 text-ivory/70 hover:text-gold transition-colors z-20 p-3 rounded-full bg-navy-900/60 border border-gold/30 hover:border-gold"
              aria-label="Previous photo"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 sm:right-8 text-ivory/70 hover:text-gold transition-colors z-20 p-3 rounded-full bg-navy-900/60 border border-gold/30 hover:border-gold"
              aria-label="Next photo"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-navy-900 border border-gold/40 rounded-2xl p-8 sm:p-12 text-center shadow-2xl overflow-hidden"
            >
              {/* Inner Ornamental Frame */}
              <div className="absolute inset-3 border border-gold/20 rounded-xl pointer-events-none" />

              <div className="flex justify-center mb-6">
                {renderIcon(selectedPhoto.iconType)}
              </div>

              <p className="font-sans-elegant text-xs text-gold tracking-[0.3em] uppercase mb-2">
                {selectedPhoto.category}
              </p>

              <h3 className="font-display text-2xl sm:text-4xl text-ivory mb-4">
                {selectedPhoto.title}
              </h3>

              <div className="flex justify-center mb-6">
                <OrnamentalDivider className="text-gold" width={180} />
              </div>

              <p className="font-serif text-lg text-ivory/80 italic mb-6 leading-relaxed">
                {selectedPhoto.caption}
              </p>

              <div className="inline-flex items-center gap-2 text-gold/70 text-xs font-sans-elegant tracking-widest uppercase">
                <span>Ashirwad Celebration</span>
                <span>•</span>
                <span>Wardha</span>
                <span>•</span>
                <span>21 Dec 2026</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotoGallery;

