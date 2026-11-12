import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/* ───────────────── inline SVG helpers ───────────────── */

const LotusIcon = ({ size = 30, className = '' }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M32 8c0 0-6 10-6 22s6 22 6 22 6-10 6-22S32 8 32 8z"
      fill="currentColor"
      opacity="0.9"
    />
    <path
      d="M32 52c0 0-14-8-18-20S12 8 12 8s4 12 10 22 10 22 10 22z"
      fill="currentColor"
      opacity="0.7"
    />
    <path
      d="M32 52c0 0 14-8 18-20S52 8 52 8s-4 12-10 22-10 22-10 22z"
      fill="currentColor"
      opacity="0.7"
    />
    <path
      d="M32 52c0 0-22-4-28-16S2 12 2 12s8 14 16 22 14 18 14 18z"
      fill="currentColor"
      opacity="0.45"
    />
    <path
      d="M32 52c0 0 22-4 28-16S62 12 62 12s-8 14-16 22-14 18-14 18z"
      fill="currentColor"
      opacity="0.45"
    />
  </svg>
);

const GoldDivider = ({ width = 120 }: { width?: number }) => (
  <svg
    width={width}
    height="12"
    viewBox={`0 0 ${width} 12`}
    fill="none"
    className="mx-auto"
  >
    <line x1="0" y1="6" x2={width} y2="6" stroke="#d4a547" strokeWidth="0.5" />
    <circle cx={width / 2} cy="6" r="2.5" fill="#d4a547" />
    <circle cx={width / 2 - 16} cy="6" r="1.2" fill="#d4a547" opacity="0.6" />
    <circle cx={width / 2 + 16} cy="6" r="1.2" fill="#d4a547" opacity="0.6" />
  </svg>
);

const OrnamentalDivider = () => (
  <svg
    width="200"
    height="20"
    viewBox="0 0 200 20"
    fill="none"
    className="mx-auto"
  >
    <path
      d="M20 10 Q40 2 60 10 Q80 18 100 10 Q120 2 140 10 Q160 18 180 10"
      stroke="#d4a547"
      strokeWidth="0.8"
      fill="none"
    />
    <line x1="0" y1="10" x2="18" y2="10" stroke="#d4a547" strokeWidth="0.5" />
    <line x1="182" y1="10" x2="200" y2="10" stroke="#d4a547" strokeWidth="0.5" />
    <circle cx="100" cy="10" r="2" fill="#d4a547" />
  </svg>
);

const DharmaChakra = ({ size = 28 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-gold-500"
  >
    <circle cx="32" cy="32" r="28" stroke="#d4a547" strokeWidth="1.5" fill="none" />
    <circle cx="32" cy="32" r="8" stroke="#d4a547" strokeWidth="1.2" fill="none" />
    <circle cx="32" cy="32" r="3" fill="#d4a547" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      const x1 = 32 + 8 * Math.cos(rad);
      const y1 = 32 + 8 * Math.sin(rad);
      const x2 = 32 + 28 * Math.cos(rad);
      const y2 = 32 + 28 * Math.sin(rad);
      return (
        <line
          key={angle}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#d4a547"
          strokeWidth="1"
        />
      );
    })}
  </svg>
);

const BodhiLeaf = ({ size = 32 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M32 4 C16 20 8 40 12 56 C16 68 24 74 32 76 C40 74 48 68 52 56 C56 40 48 20 32 4z"
      fill="none"
      stroke="#d4a547"
      strokeWidth="1.2"
    />
    <path d="M32 4 L32 76" stroke="#d4a547" strokeWidth="0.8" />
    <path d="M32 24 Q22 32 16 44" stroke="#d4a547" strokeWidth="0.6" fill="none" />
    <path d="M32 24 Q42 32 48 44" stroke="#d4a547" strokeWidth="0.6" fill="none" />
    <path d="M32 38 Q24 44 18 54" stroke="#d4a547" strokeWidth="0.6" fill="none" />
    <path d="M32 38 Q40 44 46 54" stroke="#d4a547" strokeWidth="0.6" fill="none" />
    <path d="M32 50 Q26 56 22 64" stroke="#d4a547" strokeWidth="0.6" fill="none" />
    <path d="M32 50 Q38 56 42 64" stroke="#d4a547" strokeWidth="0.6" fill="none" />
  </svg>
);

const Ampersand = () => (
  <span className="block font-script text-2xl text-[#d4a547] my-1 select-none">
    &amp;
  </span>
);

const FlourishLeft = () => (
  <svg width="60" height="20" viewBox="0 0 60 20" fill="none" className="inline-block">
    <path
      d="M58 10 Q48 2 38 10 Q28 18 18 10 Q12 5 4 10"
      stroke="#d4a547"
      strokeWidth="0.8"
      fill="none"
    />
  </svg>
);

const FlourishRight = () => (
  <svg width="60" height="20" viewBox="0 0 60 20" fill="none" className="inline-block">
    <path
      d="M2 10 Q12 2 22 10 Q32 18 42 10 Q48 5 56 10"
      stroke="#d4a547"
      strokeWidth="0.8"
      fill="none"
    />
  </svg>
);

/* ───────────────── animation variants ───────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } },
};

const nameReveal = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeInItem = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

/* ───────────────── Family Card ───────────────── */

interface FamilyCardProps {
  label: string;
  parent1: string;
  parent2: string;
  childName: string;
  description: string;
  direction: 'left' | 'right';
  inView: boolean;
}

const FamilyCard = ({
  label,
  parent1,
  parent2,
  childName,
  description,
  direction,
  inView,
}: FamilyCardProps) => {
  const cardVariant = direction === 'left' ? fadeLeft : fadeRight;

  return (
    <motion.div
      variants={cardVariant}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="relative flex-1 min-w-[280px] max-w-lg mx-auto"
    >
      {/* Decorative gold frame */}
      <div className="relative border border-[#d4a547]/30 p-8 sm:p-10 md:p-12">
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#d4a547]" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#d4a547]" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#d4a547]" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#d4a547]" />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center space-y-5"
        >
          {/* Label */}
          <motion.p
            variants={fadeInItem}
            className="font-sans-elegant text-xs tracking-[0.3em] uppercase text-[#d4a547]"
          >
            {label}
          </motion.p>

          <motion.div variants={fadeInItem}>
            <GoldDivider width={80} />
          </motion.div>

          {/* Parent Names */}
          <motion.div variants={fadeInItem} className="space-y-1">
            <p className="font-serif text-2xl text-[#0a1128] italic">{parent1}</p>
            <Ampersand />
            <p className="font-serif text-2xl text-[#0a1128] italic">{parent2}</p>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={fadeInItem}
            className="font-serif text-base text-[#0a1128]/70 italic leading-relaxed max-w-xs mx-auto"
          >
            {description}
          </motion.p>

          <motion.div variants={fadeInItem}>
            <GoldDivider width={60} />
          </motion.div>

          {/* Child Name */}
          <motion.div variants={nameReveal} className="pt-2">
            <div className="flex justify-center mb-3">
              <LotusIcon size={22} className="text-[#d4a547]" />
            </div>
            <h3 className="font-display text-4xl sm:text-5xl font-bold text-[#0a1128] tracking-wide">
              {childName}
            </h3>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ───────────────── Main Component ───────────────── */

const FamilyBlessings = () => {
  const [sectionRef, sectionInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [centerRef, centerInView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #faf3e5 0%, #fdf8f0 50%, #faf3e5 100%)',
      }}
    >
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={sectionInView ? 'visible' : 'hidden'}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="flex justify-center mb-5">
            <LotusIcon size={30} className="text-[#d4a547]" />
          </div>
          <h2 className="font-sans-elegant text-xs sm:text-sm tracking-[0.3em] uppercase text-[#d4a547] mb-6">
            With the Blessings of Our Parents
          </h2>
          <OrnamentalDivider />
        </motion.div>

        {/* Family Cards Container */}
        <div className="flex flex-col md:flex-row items-center md:items-stretch gap-8 md:gap-0">
          {/* Groom's Family */}
          <div className="w-full md:w-5/12">
            <FamilyCard
              label="Groom's Family"
              parent1="Samuel John"
              parent2="Alice Samuel"
              childName="SUJITH"
              description="Request the presence and blessings of friends and family on the auspicious occasion of their son's wedding."
              direction="left"
              inView={sectionInView}
            />
          </div>

          {/* Center Connection */}
          <div ref={centerRef} className="flex items-center justify-center md:w-2/12 py-6 md:py-0">
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate={centerInView ? 'visible' : 'hidden'}
              className="flex flex-col items-center gap-3"
            >
              <FlourishLeft />
              <span className="font-script text-3xl sm:text-4xl text-[#d4a547] select-none">
                with
              </span>
              <FlourishRight />
              <div className="mt-2">
                <DharmaChakra size={28} />
              </div>
            </motion.div>
          </div>

          {/* Bride's Family */}
          <div className="w-full md:w-5/12">
            <FamilyCard
              label="Bride's Family"
              parent1="Sanjay Bhagat"
              parent2="Madhuri Bhagat"
              childName="PRATIKSHA"
              description="Request the presence and blessings of friends and family on the auspicious occasion of their daughter's wedding."
              direction="right"
              inView={sectionInView}
            />
          </div>
        </div>

        {/* Bottom Decoration */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={sectionInView ? 'visible' : 'hidden'}
          className="text-center mt-16 sm:mt-20 space-y-4"
        >
          <OrnamentalDivider />
          <div className="flex justify-center pt-2">
            <BodhiLeaf size={32} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FamilyBlessings;
