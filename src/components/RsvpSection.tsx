import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { LotusFlower, OrnamentalDivider } from './Decorations';
import { submitRsvpToDatabase } from '../utils/supabase';

interface RsvpFormData {
  fullName: string;
  mobile: string;
  guestCount: number;
  attendance: 'attending' | 'declining';
  message: string;
}

const RsvpSection: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  const [formData, setFormData] = useState<RsvpFormData>({
    fullName: '',
    mobile: '',
    guestCount: 1,
    attendance: 'attending',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RsvpFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof RsvpFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    const mobileClean = formData.mobile.replace(/[\s-]/g, '');
    const phoneRegex = /^[+]?[0-9]{10,14}$/;
    if (!mobileClean) {
      newErrors.mobile = 'Please enter your mobile number';
    } else if (!phoneRegex.test(mobileClean)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    if (formData.attendance === 'attending') {
      if (!formData.guestCount || formData.guestCount < 1) {
        newErrors.guestCount = 'At least 1 guest required';
      } else if (formData.guestCount > 10) {
        newErrors.guestCount = 'For groups over 10, please contact the families directly';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (attendanceChoice: 'attending' | 'declining') => {
    const updatedData = { ...formData, attendance: attendanceChoice };
    setFormData(updatedData);

    // Validate
    const newErrors: Partial<Record<keyof RsvpFormData, string>> = {};
    if (!updatedData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    }
    const mobileClean = updatedData.mobile.replace(/[\s-]/g, '');
    if (!mobileClean || !/^[+]?[0-9]{10,14}$/.test(mobileClean)) {
      newErrors.mobile = 'Please enter a valid mobile number';
    }
    if (attendanceChoice === 'attending' && (updatedData.guestCount < 1 || updatedData.guestCount > 10)) {
      newErrors.guestCount = 'Please select a valid guest count';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);

    try {
      const id = 'RSVP-' + Math.random().toString(36).substring(2, 9).toUpperCase();
      const submissionRecord = {
        id,
        ...updatedData,
        submittedAt: new Date().toISOString(),
      };

      await submitRsvpToDatabase(submissionRecord);

      setSubmissionId(id);
      setIsSubmitted(true);
    } catch {
      alert('Unable to save RSVP right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      mobile: '',
      guestCount: 1,
      attendance: 'attending',
      message: '',
    });
    setErrors({});
    setIsSubmitted(false);
    setSubmissionId(null);
  };

  return (
    <section
      ref={ref}
      id="rsvp"
      className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-ivory text-navy-900 overflow-hidden"
    >
      <div className="absolute inset-0 bg-lotus-pattern opacity-40 pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
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
            Join Our Celebration
          </p>

          <div className="flex justify-center mb-4">
            <OrnamentalDivider className="text-gold" width={220} />
          </div>

          <h2 className="font-display text-3xl sm:text-5xl text-navy-900 font-normal tracking-wide mb-4">
            RSVP
          </h2>

          <p className="font-serif text-lg sm:text-xl text-navy-700/80 max-w-lg mx-auto italic">
            Kindly confirm your presence by responding below. Your presence is our most cherished gift.
          </p>
        </motion.div>

        {/* Form Container */}
        <div className="relative bg-white/80 backdrop-blur-md rounded-2xl border border-gold/30 p-8 sm:p-12 shadow-xl">
          <div className="absolute inset-2 border border-gold/15 rounded-xl pointer-events-none" />

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={(e) => e.preventDefault()}
                className="space-y-6 relative z-10"
              >
                {/* Full Name */}
                <div>
                  <label className="block font-sans-elegant text-xs tracking-wider uppercase text-navy-800 mb-2">
                    Full Name <span className="text-gold-700">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-ivory-50 border border-gold/40 rounded-lg px-4 py-3 text-navy-900 font-serif text-lg placeholder-navy-400 focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-all"
                  />
                  {errors.fullName && (
                    <p className="text-red-700 text-xs mt-1.5 font-sans-elegant">{errors.fullName}</p>
                  )}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block font-sans-elegant text-xs tracking-wider uppercase text-navy-800 mb-2">
                    Mobile Number <span className="text-gold-700">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-ivory-50 border border-gold/40 rounded-lg px-4 py-3 text-navy-900 font-serif text-lg placeholder-navy-400 focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-all"
                  />
                  {errors.mobile && (
                    <p className="text-red-700 text-xs mt-1.5 font-sans-elegant">{errors.mobile}</p>
                  )}
                </div>

                {/* Number of Guests */}
                <div>
                  <label className="block font-sans-elegant text-xs tracking-wider uppercase text-navy-800 mb-2">
                    Number of Guests Attending
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, guestCount: Math.max(1, formData.guestCount - 1) })}
                      className="w-10 h-10 rounded-full border border-gold/40 text-navy-800 flex items-center justify-center hover:bg-gold/10 transition-colors font-sans-elegant text-lg"
                    >
                      -
                    </button>
                    <span className="font-display text-2xl text-navy-900 w-12 text-center">
                      {formData.guestCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, guestCount: Math.min(10, formData.guestCount + 1) })}
                      className="w-10 h-10 rounded-full border border-gold/40 text-navy-800 flex items-center justify-center hover:bg-gold/10 transition-colors font-sans-elegant text-lg"
                    >
                      +
                    </button>
                    <span className="font-serif text-sm text-navy-600 italic">
                      (including yourself)
                    </span>
                  </div>
                  {errors.guestCount && (
                    <p className="text-red-700 text-xs mt-1.5 font-sans-elegant">{errors.guestCount}</p>
                  )}
                </div>

                {/* Personal Message */}
                <div>
                  <label className="block font-sans-elegant text-xs tracking-wider uppercase text-navy-800 mb-2">
                    Personal Message / Blessings (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Leave a sweet note or blessing for Sujith & Pratiksha..."
                    className="w-full bg-ivory-50 border border-gold/40 rounded-lg px-4 py-3 text-navy-900 font-serif text-base placeholder-navy-400 focus:outline-none focus:border-gold-600 focus:ring-1 focus:ring-gold-600 transition-all resize-none"
                  />
                </div>

                {/* Action Buttons */}
                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => handleSubmit('attending')}
                    className="w-full py-4 px-6 rounded-lg bg-navy-900 text-gold hover:bg-navy-800 border border-gold shadow-lg font-sans-elegant text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting...' : 'Accept Invitation'}
                  </button>

                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => handleSubmit('declining')}
                    className="w-full py-4 px-6 rounded-lg bg-transparent text-navy-800 hover:text-navy-950 border border-navy-300 hover:border-navy-500 font-sans-elegant text-xs sm:text-sm tracking-[0.2em] uppercase font-medium transition-all duration-300 disabled:opacity-50"
                  >
                    Regretfully Decline
                  </button>
                </div>

                <div className="text-center pt-2">
                  <p className="font-serif text-xs text-navy-600 italic">
                    Ashirwad Celebration, Wardha • 21 December 2026, 11:00 AM IST
                  </p>
                </div>
              </motion.form>
            ) : (
              /* Confirmation Screen */
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-8 px-4"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold flex items-center justify-center">
                    <LotusFlower size={36} color="#d4a547" />
                  </div>
                </div>

                <p className="font-sans-elegant text-xs text-gold-700 tracking-[0.3em] uppercase mb-2">
                  Response Received
                </p>

                <h3 className="font-display text-3xl sm:text-4xl text-navy-900 mb-4">
                  Thank You, {formData.fullName}!
                </h3>

                <div className="flex justify-center mb-6">
                  <OrnamentalDivider className="text-gold" width={180} />
                </div>

                <p className="font-serif text-lg text-navy-800 italic mb-6 max-w-md mx-auto">
                  {formData.attendance === 'attending'
                    ? `We are delighted that you and your party of ${formData.guestCount} will join us to celebrate Sujith & Pratiksha's sacred union.`
                    : 'We will miss your presence on our special day, but we are deeply grateful for your warm thoughts and blessings.'}
                </p>

                {submissionId && (
                  <div className="inline-block px-4 py-2 rounded-full border border-gold/30 bg-gold/5 font-sans-elegant text-xs text-navy-700 tracking-wider mb-8">
                    Confirmation Reference: <span className="font-mono font-semibold">{submissionId}</span>
                  </div>
                )}

                <div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="font-sans-elegant text-xs tracking-widest uppercase text-navy-700 hover:text-gold-700 underline underline-offset-4 transition-colors"
                  >
                    Submit Another Response
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default RsvpSection;

