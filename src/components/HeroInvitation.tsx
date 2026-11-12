import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// --- SVG Components ---

const LotusIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 80 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Center petal */}
    <path
      d="M40 5 C35 20, 30 35, 40 48 C50 35, 45 20, 40 5Z"
      fill="currentColor"
      opacity="0.9"
    />
    {/* Left petals */}
    <path
      d="M40 48 C30 30, 15 18, 5 22 C12 30, 25 40, 40 48Z"
      fill="currentColor"
      opacity="0.7"
    />
    <path
      d="M40 48 C32 35, 20 25, 10 15 C10 25, 22 38, 40 48Z"
      fill="currentColor"
      opacity="0.5"
    />
    {/* Right petals */}
    <path
      d="M40 48 C50 30, 65 18, 75 22 C68 30, 55 40, 40 48Z"
      fill="currentColor"
      opacity="0.7"
    />
    <path
      d="M40 48 C48 35, 60 25, 70 15 C70 25, 58 38, 40 48Z"
      fill="currentColor"
      opacity="0.5"
    />
  </svg>
);

const DharmaChakraWatermark: React.FC = () => (
  <svg
    viewBox="0 0 400 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] opacity-[0.03] pointer-events-none"
  >
    {/* Outer ring */}
    <circle cx="200" cy="200" r="180" stroke="#d4a547" strokeWidth="4" />
    <circle cx="200" cy="200" r="165" stroke="#d4a547" strokeWidth="1.5" />
    {/* Inner hub */}
    <circle cx="200" cy="200" r="35" stroke="#d4a547" strokeWidth="3" />
    <circle cx="200" cy="200" r="15" fill="#d4a547" opacity="0.5" />
    {/* 8 spokes */}
    {Array.from({ length: 8 }).map((_, i) => {
      const angle = (i * 45 * Math.PI) / 180;
      const x1 = 200 + 35 * Math.cos(angle);
      const y1 = 200 + 35 * Math.sin(angle);
      const x2 = 200 + 165 * Math.cos(angle);
      const y2 = 200 + 165 * Math.sin(angle);
      return (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#d4a547"
          strokeWidth="2.5"
        />
      );
    })}
    {/* Crescent tips on the rim */}
    {Array.from({ length: 8 }).map((_, i) => {
      const angle = (i * 45 * Math.PI) / 180;
      const cx = 200 + 180 * Math.cos(angle);
      const cy = 200 + 180 * Math.sin(angle);
      return <circle key={`tip-${i}`} cx={cx} cy={cy} r="8" fill="#d4a547" opacity="0.6" />;
    })}
  </svg>
);

const OrnamentalDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 200 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="goldLine" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="transparent" />
        <stop offset="15%" stopColor="#d4a547" />
        <stop offset="35%" stopColor="#e5c97b" />
        <stop offset="50%" stopColor="#d4a547" />
        <stop offset="65%" stopColor="#e5c97b" />
        <stop offset="85%" stopColor="#d4a547" />
        <stop offset="100%" stopColor="transparent" />
      </linearGradient>
    </defs>
    <line x1="0" y1="6" x2="85" y2="6" stroke="url(#goldLine)" strokeWidth="0.75" />
    <line x1="115" y1="6" x2="200" y2="6" stroke="url(#goldLine)" strokeWidth="0.75" />
    {/* Center diamond */}
    <path d="M100 2 L104 6 L100 10 L96 6 Z" fill="#d4a547" />
    {/* Decorative dots */}
    <circle cx="88" cy="6" r="1.2" fill="#d4a547" />
    <circle cx="112" cy="6" r="1.2" fill="#d4a547" />
  </svg>
);

// --- Floating Particles ---

interface ParticleProps {
  size: number;
  top: string;
  left: string;
  delay: number;
  duration: number;
}

const PARTICLES: ParticleProps[] = [
  { size: 3, top: '15%', left: '10%', delay: 0, duration: 6 },
  { size: 2, top: '25%', left: '85%', delay: 1.5, duration: 7 },
  { size: 4, top: '60%', left: '8%', delay: 0.8, duration: 5.5 },
  { size: 2.5, top: '70%', left: '90%', delay: 2, duration: 6.5 },
  { size: 3, top: '45%', left: '92%', delay: 0.5, duration: 7.5 },
];

const FloatingParticle: React.FC<ParticleProps> = ({ size, top, left, delay, duration }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      top,
      left,
      background: 'radial-gradient(circle, #e5c97b 0%, rgba(212,165,71,0.3) 70%, transparent 100%)',
      boxShadow: `0 0 ${size * 2}px rgba(212,165,71,0.4)`,
    }}
    animate={{
      y: [0, -20, 5, -15, 0],
      x: [0, 8, -5, 10, 0],
      opacity: [0.3, 0.7, 0.4, 0.8, 0.3],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

// --- Gold Frame ---

const GoldFrame: React.FC<{ inView: boolean }> = ({ inView }) => {
  const cornerSize = 30;

  return (
    <div className="absolute inset-4 sm:inset-8 md:inset-12 lg:inset-16 pointer-events-none">
      {/* Animated border lines */}
      {/* Top */}
      <motion.div
        className="absolute top-0 left-[30px] right-[30px] h-px bg-gradient-to-r from-transparent via-gold to-transparent"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
        style={{ originX: 0.5 }}
      />
      {/* Bottom */}
      <motion.div
        className="absolute bottom-0 left-[30px] right-[30px] h-px bg-gradient-to-r from-transparent via-gold to-transparent"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
        style={{ originX: 0.5 }}
      />
      {/* Left */}
      <motion.div
        className="absolute left-0 top-[30px] bottom-[30px] w-px bg-gradient-to-b from-transparent via-gold to-transparent"
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
        style={{ originY: 0.5 }}
      />
      {/* Right */}
      <motion.div
        className="absolute right-0 top-[30px] bottom-[30px] w-px bg-gradient-to-b from-transparent via-gold to-transparent"
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
        style={{ originY: 0.5 }}
      />

      {/* Corner ornaments - Top Left */}
      <motion.svg
        className="absolute top-0 left-0"
        width={cornerSize}
        height={cornerSize}
        viewBox="0 0 30 30"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <path d="M0 30 L0 8 Q0 0 8 0 L30 0" fill="none" stroke="#d4a547" strokeWidth="1" />
        <path d="M0 20 L0 5 Q0 0 5 0 L20 0" fill="none" stroke="#d4a547" strokeWidth="0.5" opacity="0.5" />
        <circle cx="3" cy="3" r="1.5" fill="#d4a547" opacity="0.7" />
      </motion.svg>

      {/* Top Right */}
      <motion.svg
        className="absolute top-0 right-0"
        width={cornerSize}
        height={cornerSize}
        viewBox="0 0 30 30"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <path d="M0 0 L22 0 Q30 0 30 8 L30 30" fill="none" stroke="#d4a547" strokeWidth="1" />
        <path d="M10 0 L25 0 Q30 0 30 5 L30 20" fill="none" stroke="#d4a547" strokeWidth="0.5" opacity="0.5" />
        <circle cx="27" cy="3" r="1.5" fill="#d4a547" opacity="0.7" />
      </motion.svg>

      {/* Bottom Left */}
      <motion.svg
        className="absolute bottom-0 left-0"
        width={cornerSize}
        height={cornerSize}
        viewBox="0 0 30 30"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.0 }}
      >
        <path d="M0 0 L0 22 Q0 30 8 30 L30 30" fill="none" stroke="#d4a547" strokeWidth="1" />
        <path d="M0 10 L0 25 Q0 30 5 30 L20 30" fill="none" stroke="#d4a547" strokeWidth="0.5" opacity="0.5" />
        <circle cx="3" cy="27" r="1.5" fill="#d4a547" opacity="0.7" />
      </motion.svg>

      {/* Bottom Right */}
      <motion.svg
        className="absolute bottom-0 right-0"
        width={cornerSize}
        height={cornerSize}
        viewBox="0 0 30 30"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.1 }}
      >
        <path d="M30 0 L30 22 Q30 30 22 30 L0 30" fill="none" stroke="#d4a547" strokeWidth="1" />
        <path d="M30 10 L30 25 Q30 30 25 30 L10 30" fill="none" stroke="#d4a547" strokeWidth="0.5" opacity="0.5" />
        <circle cx="27" cy="27" r="1.5" fill="#d4a547" opacity="0.7" />
      </motion.svg>
    </div>
  );
};

// --- Scroll Indicator ---

const ScrollIndicator: React.FC = () => (
  <motion.div
    className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 3, duration: 1 }}
  >
    <span className="font-sans-elegant text-[10px] tracking-[0.3em] uppercase text-ivory/40">
      Scroll to Explore
    </span>
    <div className="flex flex-col items-center gap-1">
      <motion.div className="w-px h-8 bg-gradient-to-b from-gold/60 to-transparent" />
      <motion.svg
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
        className="text-gold/60"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M1 1 L6 6 L11 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>
    </div>
  </motion.div>
);

// --- Animation Variants ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.6,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// --- Main Component ---

const HeroInvitation: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 50% 40%, #1e3366 0%, #0f1b3d 35%, #0a1128 70%, #060d1f 100%)',
      }}
    >
      {/* Paper texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '150px 150px',
        }}
      />

      {/* Dharma Chakra watermark */}
      <DharmaChakraWatermark />

      {/* Floating gold particles */}
      {PARTICLES.map((p, i) => (
        <FloatingParticle key={i} {...p} />
      ))}

      {/* Animated gold frame */}
      <GoldFrame inView={inView} />

      {/* Main content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 sm:px-10 md:px-16 py-16"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Lotus icon */}
        <motion.div variants={itemVariants}>
          <LotusIcon className="w-10 h-auto text-gold mb-4" />
        </motion.div>

        {/* "The Wedding Celebration Of" */}
        <motion.p
          variants={itemVariants}
          className="font-sans-elegant text-xs sm:text-sm uppercase tracking-[0.3em] text-gold mb-5 sm:mb-6"
        >
          The Wedding Celebration of
        </motion.p>

        {/* Ornamental divider */}
        <motion.div variants={itemVariants} className="mb-5 sm:mb-6">
          <OrnamentalDivider className="w-36 sm:w-48 h-auto" />
        </motion.div>

        {/* SUJITH */}
        <motion.h1
          variants={itemVariants}
          className="font-display text-gold-gradient leading-none mb-2 sm:mb-3"
          style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
          }}
        >
          Sujith
        </motion.h1>

        {/* Decorative star */}
        <motion.span
          variants={itemVariants}
          className="text-gold text-lg sm:text-xl mb-2 sm:mb-3 block"
        >
          ✦
        </motion.span>

        {/* PRATIKSHA */}
        <motion.h1
          variants={itemVariants}
          className="font-display text-gold-gradient leading-none mb-5 sm:mb-6"
          style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
          }}
        >
          Pratiksha
        </motion.h1>

        {/* Ornamental divider */}
        <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
          <OrnamentalDivider className="w-36 sm:w-48 h-auto" />
        </motion.div>

        {/* Date */}
        <motion.p
          variants={itemVariants}
          className="font-serif text-xl sm:text-2xl tracking-wide text-ivory mb-2"
        >
          Monday, 21 December 2026
        </motion.p>

        {/* Diamond */}
        <motion.span
          variants={itemVariants}
          className="text-gold/70 text-xs mb-2 block"
        >
          ◆
        </motion.span>

        {/* Time */}
        <motion.p
          variants={itemVariants}
          className="font-serif text-lg text-ivory/90 mb-8 sm:mb-10"
        >
          11:00 AM
        </motion.p>

        {/* Venue */}
        <motion.p
          variants={itemVariants}
          className="font-sans-elegant text-sm tracking-[0.2em] uppercase text-gold mb-1.5"
        >
          Ashirwad Celebration
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="font-sans-elegant text-xs tracking-[0.2em] uppercase text-ivory/50"
        >
          Wardha, Maharashtra
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
};

export default HeroInvitation;
