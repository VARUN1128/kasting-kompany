'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface HeroSectionProps {
  onOpenWaitlist: (role?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenWaitlist }) => {
  const customEase = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center bg-black overflow-hidden pt-20 sm:pt-0">
      
      {/* Cinematic Full-width Background Image */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 2, ease: customEase }}
        className="absolute inset-0 w-full h-full"
      >
        <Image 
          src="https://images.unsplash.com/photo-1604004555489-723a93d6ce74?q=80&w=2574&auto=format&fit=crop" 
          alt="Cinematic Creative Professional" 
          fill
          className="object-cover object-top opacity-60 mix-blend-luminosity"
          priority
        />
        {/* Deep black gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-screen-2xl px-6 sm:px-12 w-full flex flex-col justify-end pb-20 h-full min-h-[80vh]">
        
        {/* Headline Line Reveal */}
        <div className="max-w-5xl">
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: customEase }}
              className="font-display text-5xl sm:text-7xl lg:text-[7.5rem] font-black uppercase tracking-tighter text-white leading-[0.9]"
            >
              WHERE CREATIVE
            </motion.h1>
          </div>
          <div className="overflow-hidden pb-4 sm:pb-6">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.1, ease: customEase }}
              className="font-display text-5xl sm:text-7xl lg:text-[7.5rem] font-black uppercase tracking-tighter text-white leading-[0.9]"
            >
              PEOPLE <span className="text-[#E05638]">GET DISCOVERED.</span>
            </motion.h1>
          </div>
        </div>

        <div className="mt-8 flex flex-col lg:flex-row lg:items-end justify-between gap-10 lg:gap-20 max-w-7xl">
          {/* Subtext Fade-Up */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: customEase }}
            className="font-sans text-lg sm:text-2xl text-gray-300 leading-snug max-w-2xl font-light"
          >
            Kasting Kompany is building a professional network for India&apos;s creative industry — where talent builds a living portfolio and casting professionals find the right people faster.
          </motion.p>

          {/* CTA Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: customEase }}
            className="shrink-0"
          >
            <button
              onClick={() => onOpenWaitlist()}
              className="group relative overflow-hidden bg-white text-black px-10 py-5 text-sm font-bold uppercase tracking-widest transition-all hover:bg-gray-200 active:scale-95 flex items-center justify-center gap-4 border border-transparent hover:border-white/20"
            >
              <span>JOIN EARLY ACCESS</span>
              <span className="transition-transform duration-500 group-hover:translate-x-2">&rarr;</span>
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
