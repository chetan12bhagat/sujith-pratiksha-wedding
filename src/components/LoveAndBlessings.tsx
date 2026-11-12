import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { LotusFlower, OrnamentalDivider, DharmaChakra, BodhiLeaf } from './Decorations';

const LoveAndBlessings: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section
      ref={ref}
      id="blessings"
      className="relative py-24 sm:py-36 px-4 sm:px-6 lg:px-8 bg-navy-gradient text-ivory text-center overflow-hidden"
    >
      {/* Background Decorative Dharma Chakra (Subtle Buddhist motif) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
        <DharmaChakra size={550} color="#d4a547" spinning />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="relative bg-navy-800/40 backdrop-blur-sm border border-gold/30 rounded-2xl p-8 sm:p-16 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          {/* Inner Inset Gold Border */}
          <div className="absolute inset-3 sm:inset-4 border border-gold/20 rounded-xl pointer-events-none" />

          {/* Top Lotus */}
          <div className="flex justify-center mb-6">
            <LotusFlower size={42} color="#d4a547" />
          </div>

          {/* Section Subtitle */}
          <p className="font-sans-elegant text-xs sm:text-sm tracking-[0.35em] uppercase text-gold mb-4 font-medium">
            With Love & Blessings
          </p>

          <div className="flex justify-center mb-8">
            <OrnamentalDivider className="text-gold" width={240} />
          </div>

          {/* Heartfelt Message */}
          <p className="font-serif text-xl sm:text-2xl lg:text-3xl text-ivory/90 italic leading-relaxed max-w-2xl mx-auto mb-10 font-light">
            "Our families, with joy in their hearts, await your gracious presence
            and blessings as we begin this beautiful new journey together."
          </p>

          {/* Couple Names */}
          <div className="mb-4">
            <h3 className="font-display text-3xl sm:text-5xl lg:text-6xl text-gold-gradient font-normal tracking-wide">
              SUJITH & PRATIKSHA
            </h3>
          </div>

          {/* Date */}
          <p className="font-sans-elegant text-xs sm:text-sm tracking-[0.3em] uppercase text-ivory/70 mb-8">
            21 December 2026
          </p>

          {/* Bottom Bodhi Leaf Motif */}
          <div className="flex items-center justify-center gap-4 text-gold/60">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold/40" />
            <BodhiLeaf size={22} color="#d4a547" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold/40" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LoveAndBlessings;

