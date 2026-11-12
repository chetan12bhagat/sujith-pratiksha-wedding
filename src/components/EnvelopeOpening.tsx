import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ───────────────────────────── Types ───────────────────────────── */
interface EnvelopeOpeningProps {
  onOpen: () => void;
}

type Phase = 'envelope' | 'stamp' | 'text' | 'cta' | 'opening';

/* ───────────────────────── Gold Particles ──────────────────────── */
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const generateParticles = (count: number): Particle[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
    opacity: Math.random() * 0.5 + 0.15,
  }));

const GoldParticles: React.FC = () => {
  const particles = useMemo(() => generateParticles(15), []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, #e5c97b, #d4a547)`,
          }}
          animate={{
            y: [0, -40, 10, -20, 0],
            x: [0, 15, -10, 20, 0],
            opacity: [p.opacity, p.opacity * 1.8, p.opacity * 0.6, p.opacity * 1.4, p.opacity],
            scale: [1, 1.3, 0.8, 1.1, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

/* ───────────────── SVG: Corner Filigree ───────────────── */
const CornerFiligree: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className, style }) => (
  <svg
    viewBox="0 0 120 120"
    className={className}
    style={style}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 5 C5 5 30 5 50 15 C70 25 80 50 80 50"
      stroke="url(#filigree-gold)"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.7"
    />
    <path
      d="M5 5 C5 5 5 30 15 50 C25 70 50 80 50 80"
      stroke="url(#filigree-gold)"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.7"
    />
    <path
      d="M5 5 C15 15 20 10 30 20 C40 30 35 40 45 45"
      stroke="#d4a547"
      strokeWidth="0.8"
      opacity="0.5"
    />
    <path
      d="M5 5 C10 20 15 25 20 35 C25 45 35 48 40 55"
      stroke="#d4a547"
      strokeWidth="0.8"
      opacity="0.5"
    />
    {/* Tiny lotus accent */}
    <path
      d="M20 20 C20 14 25 10 25 10 C25 10 30 14 30 20 C30 24 25 27 25 27 C25 27 20 24 20 20Z"
      stroke="#e5c97b"
      strokeWidth="0.6"
      fill="none"
      opacity="0.6"
    />
    <circle cx="8" cy="8" r="2" fill="#d4a547" opacity="0.4" />
    <defs>
      <linearGradient id="filigree-gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d4a547" />
        <stop offset="50%" stopColor="#f7e7ce" />
        <stop offset="100%" stopColor="#d4a547" />
      </linearGradient>
    </defs>
  </svg>
);

/* ─────────────────── SVG: Stamp Monogram ──────────────── */
const StampMonogram: React.FC = () => (
  <svg viewBox="0 0 160 160" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    {/* Outer circle */}
    <circle cx="80" cy="80" r="75" stroke="#d4a547" strokeWidth="2" fill="none" opacity="0.9" />
    <circle cx="80" cy="80" r="70" stroke="#d4a547" strokeWidth="0.5" fill="none" opacity="0.6" />
    {/* Inner decorative circle with dots */}
    <circle cx="80" cy="80" r="58" stroke="#d4a547" strokeWidth="0.8" fill="none" opacity="0.7" />
    {Array.from({ length: 24 }).map((_, i) => {
      const angle = (i * 15 * Math.PI) / 180;
      const cx = 80 + 64 * Math.cos(angle);
      const cy = 80 + 64 * Math.sin(angle);
      return <circle key={i} cx={cx} cy={cy} r="1" fill="#d4a547" opacity="0.5" />;
    })}
    {/* Lotus petals top */}
    <path
      d="M80 18 C80 18 88 28 88 35 C88 40 80 44 80 44 C80 44 72 40 72 35 C72 28 80 18 80 18Z"
      stroke="#e5c97b"
      strokeWidth="0.8"
      fill="none"
      opacity="0.7"
    />
    <path
      d="M80 18 C84 22 92 26 94 32 C96 38 88 44 80 44"
      stroke="#e5c97b"
      strokeWidth="0.6"
      fill="none"
      opacity="0.5"
    />
    <path
      d="M80 18 C76 22 68 26 66 32 C64 38 72 44 80 44"
      stroke="#e5c97b"
      strokeWidth="0.6"
      fill="none"
      opacity="0.5"
    />
    {/* Lotus petals bottom */}
    <path
      d="M80 142 C80 142 88 132 88 125 C88 120 80 116 80 116 C80 116 72 120 72 125 C72 132 80 142 80 142Z"
      stroke="#e5c97b"
      strokeWidth="0.8"
      fill="none"
      opacity="0.7"
    />
    <path
      d="M80 142 C84 138 92 134 94 128 C96 122 88 116 80 116"
      stroke="#e5c97b"
      strokeWidth="0.6"
      fill="none"
      opacity="0.5"
    />
    <path
      d="M80 142 C76 138 68 134 66 128 C64 122 72 116 80 116"
      stroke="#e5c97b"
      strokeWidth="0.6"
      fill="none"
      opacity="0.5"
    />
    {/* S & P text */}
    <text
      x="80"
      y="90"
      textAnchor="middle"
      fontFamily="'Playfair Display', Georgia, serif"
      fontSize="32"
      fontWeight="600"
      fill="#d4a547"
      letterSpacing="2"
    >
      S
    </text>
    <text
      x="80"
      y="90"
      textAnchor="middle"
      fontFamily="'Great Vibes', cursive"
      fontSize="16"
      fill="#e5c97b"
      dx="0"
      dy="-6"
      opacity="0.9"
    >
      &amp;
    </text>
    {/* We need S on left, & in center, P on right */}
    {/* Clear previous text approach - use grouped positioning */}
    <text
      x="52"
      y="95"
      textAnchor="middle"
      fontFamily="'Playfair Display', Georgia, serif"
      fontSize="34"
      fontWeight="600"
      fill="#d4a547"
    >
      S
    </text>
    <text
      x="80"
      y="90"
      textAnchor="middle"
      fontFamily="'Great Vibes', cursive"
      fontSize="20"
      fill="#e5c97b"
    >
      &amp;
    </text>
    <text
      x="108"
      y="95"
      textAnchor="middle"
      fontFamily="'Playfair Display', Georgia, serif"
      fontSize="34"
      fontWeight="600"
      fill="#d4a547"
    >
      P
    </text>
    {/* Decorative line under text */}
    <line x1="45" y1="102" x2="115" y2="102" stroke="#d4a547" strokeWidth="0.5" opacity="0.6" />
  </svg>
);

/* ───────────────── SVG: Wax Seal ──────────────────────── */
const WaxSeal: React.FC<{ cracked?: boolean }> = ({ cracked }) => (
  <div className="relative">
    <div
      className="wax-seal rounded-full flex items-center justify-center"
      style={{ width: 52, height: 52 }}
    >
      {/* Inner emboss ring */}
      <div
        className="absolute rounded-full border border-white/10"
        style={{ width: 42, height: 42 }}
      />
      {/* S & P embossed */}
      <span
        className="font-display text-sm tracking-wider relative z-10"
        style={{
          color: 'rgba(255,255,255,0.25)',
          textShadow: '0 1px 1px rgba(0,0,0,0.4), 0 -1px 0 rgba(255,255,255,0.1)',
        }}
      >
        S&P
      </span>
    </div>
    {/* Crack SVG overlay */}
    {cracked && (
      <motion.svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 52 52"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <path
          d="M15 10 L22 20 L18 26 L26 32 L20 42"
          stroke="rgba(0,0,0,0.6)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M37 8 L30 18 L34 24 L28 30 L35 40"
          stroke="rgba(0,0,0,0.5)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
      </motion.svg>
    )}
  </div>
);

/* ──────────────── Shimmer Ripple Effect ────────────────── */
const ShimmerRipple: React.FC = () => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: 160,
      height: 160,
      left: '50%',
      top: '50%',
      x: '-50%',
      y: '-50%',
      border: '1px solid rgba(212,165,71,0.4)',
    }}
    initial={{ scale: 0.3, opacity: 0.8 }}
    animate={{ scale: 3, opacity: 0 }}
    transition={{ duration: 1.5, ease: 'easeOut' }}
  />
);

/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════ */
const EnvelopeOpening: React.FC<EnvelopeOpeningProps> = ({ onOpen }) => {
  const [phase, setPhase] = useState<Phase>('envelope');
  const [showShimmer, setShowShimmer] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  /* ── Phase sequencing ── */
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('stamp'), 2000);
    const t2 = setTimeout(() => {
      setShowShimmer(true);
      setTimeout(() => setShowShimmer(false), 1500);
    }, 3200);
    const t3 = setTimeout(() => setPhase('text'), 3500);
    const t4 = setTimeout(() => setPhase('cta'), 5000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  /* ── Open handler ── */
  const handleOpen = useCallback(() => {
    if (isOpening) return;
    setIsOpening(true);
    setPhase('opening');
    setTimeout(() => onOpen(), 1800);
  }, [isOpening, onOpen]);

  /* ── Envelope dimensions (responsive) ── */
  const envelopeW = 'min(88vw, 420px)';
  const envelopeH = 'min(56vw, 270px)';

  return (
    <AnimatePresence mode="wait">
      {phase !== 'opening' || isOpening ? (
        <motion.div
          key="envelope-screen"
          className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
          style={{ height: '100dvh', background: 'linear-gradient(180deg, #0a1128 0%, #0d1630 40%, #0a1128 100%)' }}
          animate={
            isOpening
              ? { backgroundColor: '#faf3e5', transition: { delay: 1, duration: 0.8 } }
              : {}
          }
        >
          {/* Gold particles background */}
          <GoldParticles />

          {/* Subtle radial glow behind envelope */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: '600px',
              height: '600px',
              left: '50%',
              top: '45%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(212,165,71,0.06) 0%, transparent 70%)',
            }}
          />

          {/* ═══════ ENVELOPE ═══════ */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.8, 0.25, 1] }}
          >
            {/* Envelope container */}
            <motion.div
              className="relative"
              style={{ width: envelopeW, perspective: '1200px' }}
              animate={
                isOpening
                  ? { y: 200, opacity: 0, transition: { delay: 0.6, duration: 0.8 } }
                  : {}
              }
            >
              {/* ── Envelope flap (triangle) ── */}
              <motion.div
                className="absolute left-0 right-0 z-20"
                style={{
                  height: `calc(${envelopeH} * 0.5)`,
                  top: `calc(${envelopeH} * -0.46)`,
                  transformOrigin: 'top center',
                  transformStyle: 'preserve-3d',
                }}
                animate={
                  isOpening
                    ? {
                        rotateX: 180,
                        transition: { duration: 0.7, ease: [0.45, 0, 0.55, 1] },
                      }
                    : {}
                }
              >
                {/* Flap shape using clip-path */}
                <div
                  className="w-full h-full relative"
                  style={{
                    clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                    background: 'linear-gradient(180deg, #0e1a38 0%, #132348 100%)',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  {/* Gold border on flap */}
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    <polygon
                      points="0,0 100%,0 50%,100%"
                      fill="none"
                      stroke="url(#flap-gold)"
                      strokeWidth="1.5"
                      vectorEffect="non-scaling-stroke"
                    />
                    <defs>
                      <linearGradient id="flap-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#d4a547" stopOpacity="0.6" />
                        <stop offset="50%" stopColor="#f7e7ce" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#d4a547" stopOpacity="0.6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  {/* Paper texture overlay */}
                  <div className="absolute inset-0 opacity-[0.04]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
                  }} />
                </div>
              </motion.div>

              {/* ── Envelope body ── */}
              <div
                className="relative envelope-shadow rounded-md overflow-hidden"
                style={{
                  width: '100%',
                  height: envelopeH,
                  background: 'linear-gradient(170deg, #132348 0%, #0f1b3d 50%, #0e1835 100%)',
                }}
              >
                {/* Paper texture */}
                <div className="absolute inset-0 opacity-[0.04]" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n2)' opacity='1'/%3E%3C/svg%3E")`,
                }} />

                {/* Gold edge border */}
                <div className="absolute inset-0 rounded-md" style={{
                  border: '1px solid rgba(212,165,71,0.25)',
                  boxShadow: 'inset 0 0 30px rgba(212,165,71,0.03)',
                }} />

                {/* Inner gold line */}
                <div className="absolute rounded-sm" style={{
                  inset: '8px',
                  border: '0.5px solid rgba(212,165,71,0.12)',
                }} />

                {/* V-fold lines inside envelope */}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                  <line x1="0" y1="0" x2="50%" y2="65%" stroke="rgba(212,165,71,0.08)" strokeWidth="0.5" />
                  <line x1="100%" y1="0" x2="50%" y2="65%" stroke="rgba(212,165,71,0.08)" strokeWidth="0.5" />
                </svg>

                {/* Corner filigrees */}
                <CornerFiligree className="absolute top-1 left-1 w-14 h-14 sm:w-20 sm:h-20 opacity-50" />
                <CornerFiligree className="absolute top-1 right-1 w-14 h-14 sm:w-20 sm:h-20 opacity-50" style={{ transform: 'scaleX(-1)' } as React.CSSProperties} />
                <CornerFiligree className="absolute bottom-1 left-1 w-14 h-14 sm:w-20 sm:h-20 opacity-50" style={{ transform: 'scaleY(-1)' } as React.CSSProperties} />
                <CornerFiligree className="absolute bottom-1 right-1 w-14 h-14 sm:w-20 sm:h-20 opacity-50" style={{ transform: 'scale(-1, -1)' } as React.CSSProperties} />

                {/* Invitation card peeking / sliding out */}
                <AnimatePresence>
                  {isOpening && (
                    <motion.div
                      className="absolute left-[8%] right-[8%] rounded-sm"
                      style={{
                        height: '85%',
                        bottom: '8%',
                        background: 'linear-gradient(180deg, #faf3e5 0%, #fdf8f0 60%, #faf3e5 100%)',
                        boxShadow: '0 -4px 20px rgba(0,0,0,0.2)',
                      }}
                      initial={{ y: 0 }}
                      animate={{ y: '-120%' }}
                      transition={{ delay: 0.3, duration: 0.9, ease: [0.25, 0.8, 0.25, 1] }}
                    >
                      {/* Card inner border */}
                      <div className="absolute rounded-sm" style={{
                        inset: '6px',
                        border: '0.5px solid rgba(212,165,71,0.3)',
                      }} />
                      {/* Card content hint */}
                      <div className="flex flex-col items-center justify-center h-full gap-1 opacity-60">
                        <div className="w-16 h-[1px] bg-gold/30" />
                        <span className="font-display text-[10px] text-navy-800 tracking-[0.2em] uppercase">
                          You are invited
                        </span>
                        <div className="w-16 h-[1px] bg-gold/30" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Wax seal - centered on top edge */}
                <motion.div
                  className="absolute left-1/2 z-30"
                  style={{ top: -14, transform: 'translateX(-50%)' }}
                  animate={
                    isOpening
                      ? { opacity: 0, scale: 1.3, transition: { duration: 0.4 } }
                      : {}
                  }
                >
                  <WaxSeal cracked={isOpening} />
                </motion.div>
              </div>

              {/* ── Stamp monogram ── */}
              <AnimatePresence>
                {(phase === 'stamp' || phase === 'text' || phase === 'cta') && !isOpening && (
                  <motion.div
                    className="absolute z-30 stamp-effect"
                    style={{
                      width: 100,
                      height: 100,
                      right: '8%',
                      bottom: '10%',
                    }}
                    initial={{ scale: 3, rotate: -20, opacity: 0 }}
                    animate={{ scale: 1, rotate: -4, opacity: 0.85 }}
                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 16,
                      mass: 0.8,
                    }}
                  >
                    {/* Ink/transparent overlay */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'rgba(212,165,71,0.06)',
                        mixBlendMode: 'multiply',
                      }}
                    />
                    <StampMonogram />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Shimmer ripple after stamp */}
              {showShimmer && (
                <>
                  <ShimmerRipple />
                  <motion.div
                    className="absolute pointer-events-none rounded-full"
                    style={{
                      width: 120,
                      height: 120,
                      right: 'calc(8% + 40px - 60px)',
                      bottom: 'calc(10% + 50px - 60px)',
                      border: '1px solid rgba(212,165,71,0.3)',
                    }}
                    initial={{ scale: 0.5, opacity: 0.6 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.15 }}
                  />
                </>
              )}
            </motion.div>

            {/* ═══════ TEXT REVEAL ═══════ */}
            <AnimatePresence>
              {(phase === 'text' || phase === 'cta') && !isOpening && (
                <motion.div
                  className="mt-8 sm:mt-10 flex flex-col items-center gap-3 z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.3 } }}
                >
                  {/* Names */}
                  <motion.h1
                    className="font-display text-gold-gradient text-2xl sm:text-3xl md:text-4xl tracking-[0.06em] text-center leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  >
                    SUJITH & PRATIKSHA
                  </motion.h1>

                  {/* Divider */}
                  <motion.div
                    className="divider-ornament text-gold"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    {/* Lotus icon center */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 3 C12 3 15 8 15 12 C15 16 12 18 12 18 C12 18 9 16 9 12 C9 8 12 3 12 3Z"
                        stroke="#d4a547"
                        strokeWidth="1"
                        fill="none"
                      />
                      <path d="M12 3 C14 6 18 9 19 12 C20 16 15 18 12 18" stroke="#d4a547" strokeWidth="0.7" fill="none" />
                      <path d="M12 3 C10 6 6 9 5 12 C4 16 9 18 12 18" stroke="#d4a547" strokeWidth="0.7" fill="none" />
                    </svg>
                  </motion.div>

                  {/* Subtitle */}
                  <motion.p
                    className="font-sans text-[10px] sm:text-xs tracking-[0.3em] uppercase text-gold/70"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    The Wedding Celebration
                  </motion.p>

                  {/* Date */}
                  <motion.p
                    className="font-serif text-sm sm:text-base tracking-[0.15em] text-champagne/80"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.45 }}
                  >
                    21 · December · 2026
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ═══════ CTA BUTTON ═══════ */}
            <AnimatePresence>
              {phase === 'cta' && !isOpening && (
                <motion.div
                  className="mt-8 sm:mt-10 z-10"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  <motion.button
                    onClick={handleOpen}
                    className="relative px-8 py-3 sm:px-10 sm:py-4 border border-gold/50 rounded-sm
                               font-sans text-[10px] sm:text-xs tracking-[0.25em] uppercase text-gold
                               bg-transparent cursor-pointer overflow-hidden
                               transition-colors duration-300
                               hover:bg-gold/10 hover:border-gold
                               focus:outline-none focus:ring-1 focus:ring-gold/40"
                    animate={{
                      boxShadow: [
                        '0 0 8px rgba(212,165,71,0.15)',
                        '0 0 20px rgba(212,165,71,0.3)',
                        '0 0 8px rgba(212,165,71,0.15)',
                      ],
                    }}
                    transition={{
                      boxShadow: {
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {/* Shimmer sweep overlay */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(90deg, transparent, rgba(212,165,71,0.08), transparent)',
                        backgroundSize: '200% 100%',
                      }}
                      animate={{ backgroundPosition: ['-200% 0', '200% 0'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    />
                    <span className="relative z-10">Tap to Begin the Celebration</span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ═══════ FULL-SCREEN FADE TO IVORY ON OPEN ═══════ */}
          <AnimatePresence>
            {isOpening && (
              <motion.div
                className="fixed inset-0 z-50 pointer-events-none"
                style={{ background: '#faf3e5' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.7, ease: 'easeInOut' }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default EnvelopeOpening;
