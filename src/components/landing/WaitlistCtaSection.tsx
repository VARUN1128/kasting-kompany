'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface WaitlistCtaSectionProps {
  onOpenWaitlist: () => void;
}

export const WaitlistCtaSection: React.FC<WaitlistCtaSectionProps> = ({ onOpenWaitlist }) => {
  const customEase = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="py-40 bg-white text-black relative overflow-hidden">
      
      <div className="relative mx-auto max-w-screen-2xl px-6 sm:px-12 text-center space-y-16">
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: customEase }}
          className="font-display text-5xl sm:text-7xl lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.85]"
        >
          BE PART OF <br />
          <span className="text-[#E05638]">WHAT&apos;S NEXT.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: customEase }}
          className="font-sans text-lg sm:text-2xl text-gray-500 max-w-2xl mx-auto leading-snug font-bold uppercase tracking-widest"
        >
          We&apos;re starting with a limited early-access community.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: customEase }}
          className="pt-10 flex justify-center"
        >
          <button
            onClick={onOpenWaitlist}
            className="group bg-black px-12 py-6 text-sm font-bold uppercase tracking-widest text-white hover:bg-[#E05638] transition-all flex items-center gap-4"
          >
            <span>JOIN EARLY ACCESS</span>
            <span className="group-hover:translate-x-2 transition-transform duration-300">&rarr;</span>
          </button>
        </motion.div>

        {/* Brand Mantra Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5, ease: customEase }}
          className="pt-20 mt-20 border-t-[3px] border-black"
        >
          <p className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tighter text-black max-w-3xl mx-auto">
            Kasting Kompany — Where creative careers move.
          </p>
        </motion.div>

      </div>
    </section>
  );
};
