import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { LotusFlower, OrnamentalDivider, MonogramStamp, BodhiLeaf, DharmaChakra } from './Decorations';
import { shareOnWhatsApp, openGoogleMaps } from '../utils/weddingData';

const FinalMessage: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const handleAddToCalendar = () => {
    // Google Calendar Event Link
    const title = encodeURIComponent('Sujith & Pratiksha Wedding Ceremony');
    const details = encodeURIComponent(
      'Wedding Ceremony of Sujith & Pratiksha at Ashirwad Celebration, Wardha, Maharashtra, India.'
    );
    const location = encodeURIComponent('Ashirwad Celebration, Wardha, Maharashtra, India');
    // 20261221T110000+0530 to 20261221T160000+0530 in UTC:
    // 11:00 AM IST = 05:30 UTC
    // 04:00 PM IST = 10:30 UTC
    const dates = '20261221T053000Z/20261221T103000Z';
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
    window.open(gCalUrl, '_blank');
  };


  return (
    <footer
      ref={ref}
      id="conclusion"
      className="relative py-24 sm:py-36 px-4 sm:px-6 lg:px-8 bg-navy-950 text-ivory text-center overflow-hidden"
    >
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
        <DharmaChakra size={700} color="#d4a547" spinning />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
        >
          {/* Monogram Stamp in Closing Section */}
          <div className="flex justify-center mb-8">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            >
              <MonogramStamp size={110} />
            </motion.div>
          </div>

          {/* Invitation Headline */}
          <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl text-ivory font-normal tracking-wide max-w-3xl mx-auto mb-8 leading-snug">
            WE WOULD LOVE TO CELEBRATE THIS SPECIAL DAY WITH YOU.
          </h2>

          <div className="flex justify-center mb-8">
            <OrnamentalDivider className="text-gold" width={260} />
          </div>

          <p className="font-script text-3xl sm:text-4xl text-gold mb-2">
            With Love,
          </p>

          <h3 className="font-display text-4xl sm:text-6xl lg:text-7xl text-gold-gradient font-normal tracking-wider mb-6">
            SUJITH & PRATIKSHA
          </h3>

          <div className="inline-block px-6 py-2.5 rounded-full border border-gold/30 bg-navy-900/60 mb-6">
            <p className="font-sans-elegant text-xs sm:text-sm tracking-[0.3em] uppercase text-ivory">
              21 December 2026 • 11:00 AM
            </p>
          </div>

          <div className="mb-10 text-ivory/80 font-serif text-lg sm:text-xl">
            <p className="font-medium tracking-wide">ASHIRWAD CELEBRATION</p>
            <p className="text-sm font-sans-elegant tracking-[0.25em] text-gold/80 uppercase mt-1">
              Wardha, Maharashtra
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            {/* WhatsApp Share */}
            <button
              onClick={shareOnWhatsApp}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366]/10 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/20 transition-all font-sans-elegant text-xs tracking-wider uppercase"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.58 2.08.887 3.226.887 3.18 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.774-5.767-5.774zm0 10.373c-.985 0-1.928-.275-2.738-.756l-.196-.116-1.574.412.421-1.536-.128-.203c-.53-.842-.81-1.815-.81-2.809.001-2.88 2.345-5.223 5.228-5.223 2.881 0 5.224 2.343 5.225 5.223-.001 2.88-2.344 5.224-5.226 5.224z" />
              </svg>
              Share Invitation
            </button>

            {/* Google Maps Directions */}
            <button
              onClick={openGoogleMaps}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold/10 border border-gold/40 text-gold hover:bg-gold/20 transition-all font-sans-elegant text-xs tracking-wider uppercase"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 21s-8-7.5-8-12a8 8 0 1 1 16 0c0 4.5-8 12-8 12z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              View Venue Map
            </button>

            {/* Add to Calendar */}
            <button
              onClick={handleAddToCalendar}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-navy-800 border border-ivory/20 text-ivory hover:border-gold/50 transition-all font-sans-elegant text-xs tracking-wider uppercase"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Add to Calendar
            </button>
          </div>

          {/* Footer Floral & Bodhi Leaf Accent */}
          <div className="flex items-center justify-center gap-3 text-gold/50 mb-6">
            <BodhiLeaf size={20} color="#d4a547" />
            <LotusFlower size={24} color="#d4a547" />
            <BodhiLeaf size={20} color="#d4a547" />
          </div>

          <p className="font-serif text-xs text-ivory/40 tracking-wider">
            Sujith & Pratiksha Wedding Celebration • Wardha, Maharashtra, India • 2026
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default FinalMessage;

