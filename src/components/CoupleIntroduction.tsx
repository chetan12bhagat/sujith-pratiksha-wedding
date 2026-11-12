import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/* ──────────────────────── tiny SVG helpers ──────────────────────── */

const LotusIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 100 60" fill="none" className={className}>
    <path
      d="M50 5C45 20 30 35 15 45c15-5 25-2 35 10 10-12 20-15 35-10C70 35 55 20 50 5z"
      fill="currentColor"
      opacity={0.9}
    />
    <path
      d="M50 15c-3 10-12 20-22 27 10-3 17-1 22 7 5-8 12-10 22-7-10-7-19-17-22-27z"
      fill="currentColor"
      opacity={0.5}
    />
  </svg>
);

const BodhiLeaf = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 40 60" fill="none" className={className}>
    <path
      d="M20 2C12 15 4 28 8 42c3 10 8 14 12 16 4-2 9-6 12-16 4-14-4-27-12-40z"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
      opacity={0.7}
    />
    <path d="M20 10v40" stroke="currentColor" strokeWidth="0.7" opacity={0.5} />
    <path d="M20 18c-4 4-7 8-8 12" stroke="currentColor" strokeWidth="0.5" opacity={0.4} />
    <path d="M20 18c4 4 7 8 8 12" stroke="currentColor" strokeWidth="0.5" opacity={0.4} />
    <path d="M20 28c-3 3-6 6-7 10" stroke="currentColor" strokeWidth="0.5" opacity={0.4} />
    <path d="M20 28c3 3 6 6 7 10" stroke="currentColor" strokeWidth="0.5" opacity={0.4} />
  </svg>
);

const OrnamentDivider = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 200 20" fill="none" className={className}>
    <line x1="0" y1="10" x2="80" y2="10" stroke="currentColor" strokeWidth="0.5" opacity={0.5} />
    <circle cx="90" cy="10" r="2" fill="currentColor" opacity={0.6} />
    <circle cx="100" cy="10" r="3" fill="currentColor" opacity={0.8} />
    <circle cx="110" cy="10" r="2" fill="currentColor" opacity={0.6} />
    <line x1="120" y1="10" x2="200" y2="10" stroke="currentColor" strokeWidth="0.5" opacity={0.5} />
  </svg>
);

const CameraIcon = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const FieligreeCorner = ({ className = '' }: { className?: string }) => (
  <svg viewBox="0 0 120 120" fill="none" className={className}>
    <path
      d="M5 5c30 0 40 10 50 25 10-15 20-25 50-25"
      stroke="currentColor"
      strokeWidth="0.8"
    />
    <path
      d="M5 5c0 30 10 40 25 50-15 10-25 20-25 50"
      stroke="currentColor"
      strokeWidth="0.8"
    />
    <path
      d="M15 15c20 0 30 8 35 18"
      stroke="currentColor"
      strokeWidth="0.5"
    />
    <path
      d="M15 15c0 20 8 30 18 35"
      stroke="currentColor"
      strokeWidth="0.5"
    />
    <circle cx="12" cy="12" r="2" fill="currentColor" opacity={0.5} />
  </svg>
);

/* ──────────────────────── animation variants ──────────────────────── */

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const photoVariant = (delay: number) => ({
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, delay, ease: 'easeOut' },
  },
});

const quoteVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.6, ease: 'easeOut' },
  },
};

/* ──────────────────── floating dots data ─────────────────────── */

const dots = [
  { top: '8%', left: '12%', size: 3, delay: 0 },
  { top: '15%', right: '8%', size: 2, delay: 1.5 },
  { top: '35%', left: '5%', size: 2.5, delay: 0.8 },
  { top: '55%', right: '14%', size: 2, delay: 2 },
  { top: '70%', left: '18%', size: 3, delay: 1.2 },
  { top: '80%', right: '6%', size: 2, delay: 0.4 },
  { top: '45%', left: '90%', size: 2, delay: 1.8 },
  { top: '25%', left: '50%', size: 1.5, delay: 2.5 },
];

/* ──────────────────── Photo Placeholder Card ──────────────────── */

interface PhotoPlaceholderProps {
  name: string;
  delay: number;
  inView: boolean;
}

const PhotoPlaceholder = ({ name, delay, inView }: PhotoPlaceholderProps) => (
  <motion.div
    variants={photoVariant(delay)}
    initial="hidden"
    animate={inView ? 'visible' : 'hidden'}
    whileHover={{
      boxShadow: '0 0 30px 4px rgba(212,165,71,0.25)',
      transition: { duration: 0.4 },
    }}
    className="relative aspect-[3/4] w-full max-w-[350px] md:max-w-[400px] rounded-lg border-2 border-[#d4a547] overflow-hidden cursor-pointer group mx-auto"
  >
    {/* inner gradient */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#0f1b3d] via-[#0a1128] to-[#1e3366]" />

    {/* subtle shimmer overlay */}
    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#d4a547]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

    {/* content */}
    <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4">
      <CameraIcon className="w-8 h-8 text-[#d4a547]/40 group-hover:text-[#d4a547]/60 transition-colors duration-500" />
      <span className="font-display text-xl tracking-widest text-[#d4a547]/70 group-hover:text-[#d4a547] transition-colors duration-500">
        {name}
      </span>

      {/* tiny lotus under name */}
      <LotusIcon className="w-8 h-5 text-[#d4a547]/20" />
    </div>

    {/* corner accents */}
    <span className="absolute top-2 left-2 w-5 h-5 border-t border-l border-[#d4a547]/30 rounded-tl-sm" />
    <span className="absolute top-2 right-2 w-5 h-5 border-t border-r border-[#d4a547]/30 rounded-tr-sm" />
    <span className="absolute bottom-2 left-2 w-5 h-5 border-b border-l border-[#d4a547]/30 rounded-bl-sm" />
    <span className="absolute bottom-2 right-2 w-5 h-5 border-b border-r border-[#d4a547]/30 rounded-br-sm" />
  </motion.div>
);

/* ════════════════════════ MAIN COMPONENT ════════════════════════ */

const CoupleIntroduction = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 sm:py-32 bg-gradient-to-b from-[#0a1128] via-[#0f1b3d] to-[#0a1128]"
    >
      {/* ── filigree corners ── */}
      <FieligreeCorner className="absolute top-4 left-4 w-24 sm:w-32 text-[#d4a547] opacity-10" />
      <FieligreeCorner className="absolute top-4 right-4 w-24 sm:w-32 text-[#d4a547] opacity-10 -scale-x-100" />
      <FieligreeCorner className="absolute bottom-4 left-4 w-24 sm:w-32 text-[#d4a547] opacity-10 -scale-y-100" />
      <FieligreeCorner className="absolute bottom-4 right-4 w-24 sm:w-32 text-[#d4a547] opacity-10 -scale-x-100 -scale-y-100" />

      {/* ── floating gold dots ── */}
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-[#d4a547]/20 pointer-events-none"
          style={{
            top: d.top,
            left: d.left,
            right: (d as Record<string, unknown>).right as string | undefined,
            width: d.size,
            height: d.size,
          }}
          animate={{ opacity: [0.15, 0.4, 0.15], y: [0, -8, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: d.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* ── lotus watermark ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <LotusIcon className="w-[500px] h-[300px] text-[#d4a547] opacity-[0.03]" />
      </div>

      {/* ── CONTENT ── */}
      <motion.div
        className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* ─── Section Header ─── */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <motion.div variants={fadeUp}>
            <OrnamentDivider className="w-28 sm:w-36 text-[#d4a547] mb-4" />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="font-sans-elegant text-xs tracking-[0.3em] uppercase text-[#d4a547] mb-3"
          >
            The Couple
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-display text-4xl sm:text-6xl text-gold-gradient leading-tight"
          >
            Sujith &amp; Pratiksha
          </motion.h2>

          <motion.div variants={fadeUp} className="mt-4">
            <OrnamentDivider className="w-28 sm:w-36 text-[#d4a547]" />
          </motion.div>
        </div>

        {/* ─── Couple Photos ─── */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 mb-16 sm:mb-20">
          {/* Groom */}
          <div className="md:mr-[-30px] md:z-10">
            <PhotoPlaceholder name="SUJITH" delay={0.2} inView={inView} />
          </div>

          {/* Decorative element between (hidden on mobile, shown md+) */}
          <div className="hidden md:flex flex-col items-center justify-center z-20 mx-4">
            <LotusIcon className="w-12 h-8 text-[#d4a547]/50" />
            <span className="block w-px h-16 bg-gradient-to-b from-transparent via-[#d4a547]/40 to-transparent" />
            <span className="font-script text-[#d4a547]/60 text-lg">&amp;</span>
            <span className="block w-px h-16 bg-gradient-to-b from-transparent via-[#d4a547]/40 to-transparent" />
            <LotusIcon className="w-12 h-8 text-[#d4a547]/50 rotate-180" />
          </div>

          {/* Bride – offset slightly on desktop */}
          <div className="md:ml-[-30px] md:mt-12">
            <PhotoPlaceholder name="PRATIKSHA" delay={0.4} inView={inView} />
          </div>
        </div>

        {/* ─── Quote ─── */}
        <motion.div
          variants={quoteVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col items-center text-center"
        >
          <LotusIcon className="w-14 h-9 text-[#d4a547] mb-4" />

          <p className="font-script text-2xl sm:text-3xl text-[#d4a547] leading-relaxed max-w-xl">
            Two souls, one beautiful journey
          </p>

          <p className="mt-4 font-serif text-sm sm:text-base text-[#e5c97b]/60 italic max-w-md leading-relaxed">
            &ldquo;In the stillness of love, two hearts find their refuge — like
            lotus blossoms rising together toward the light.&rdquo;
          </p>

          <BodhiLeaf className="w-7 h-10 text-[#d4a547]/40 mt-6" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CoupleIntroduction;
