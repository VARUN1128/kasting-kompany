'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TwoSidesSectionProps {
  onOpenWaitlist: (initialRole?: string) => void;
}

export const TwoSidesSection: React.FC<TwoSidesSectionProps> = ({ onOpenWaitlist }) => {
  const customEase = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="bg-black text-white relative">
      {/* Split Section Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        
        {/* FOR TALENT */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: customEase }}
          className="border-r-2 border-b-2 lg:border-b-0 border-white p-12 sm:p-24 flex flex-col justify-center space-y-16 group hover:bg-[#111] transition-colors duration-500"
        >
          <div className="space-y-4">
            <h3 className="font-display text-6xl sm:text-7xl lg:text-[7rem] font-black uppercase tracking-tighter leading-none group-hover:text-[#E05638] transition-colors duration-500">
              FOR
              <br />
              TALENT
            </h3>
          </div>

          <ul className="space-y-6 font-display text-2xl sm:text-4xl font-black uppercase tracking-tighter">
            <li className="flex items-center gap-6 border-b-2 border-white/20 pb-4">
              <span className="text-[#E05638] text-lg">01.</span>
              <span>BUILD YOUR IDENTITY.</span>
            </li>
            <li className="flex items-center gap-6 border-b-2 border-white/20 pb-4">
              <span className="text-[#E05638] text-lg">02.</span>
              <span>SHOW YOUR WORK.</span>
            </li>
            <li className="flex items-center gap-6 border-b-2 border-white/20 pb-4">
              <span className="text-[#E05638] text-lg">03.</span>
              <span>GET DISCOVERED.</span>
            </li>
            <li className="flex items-center gap-6 border-b-2 border-white/20 pb-4">
              <span className="text-[#E05638] text-lg">04.</span>
              <span>RECEIVE RELEVANT OPPORTUNITIES.</span>
            </li>
          </ul>

          <div className="pt-8">
            <button
              onClick={() => onOpenWaitlist('Actor')}
              className="text-sm font-bold uppercase tracking-widest transition-all border-2 border-white py-5 px-8 hover:bg-white hover:text-black"
            >
              JOIN AS TALENT &rarr;
            </button>
          </div>
        </motion.div>

        {/* FOR INDUSTRY */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: customEase }}
          className="p-12 sm:p-24 flex flex-col justify-center space-y-16 group hover:bg-[#111] transition-colors duration-500 bg-[#0a0a0a]"
        >
          <div className="space-y-4">
            <h3 className="font-display text-6xl sm:text-7xl lg:text-[7rem] font-black uppercase tracking-tighter leading-none group-hover:text-white text-gray-500 transition-colors duration-500">
              FOR
              <br />
              INDUSTRY
            </h3>
          </div>

          <ul className="space-y-6 font-display text-2xl sm:text-4xl font-black uppercase tracking-tighter text-gray-400 group-hover:text-white transition-colors duration-500">
            <li className="flex items-center gap-6 border-b-2 border-white/10 pb-4">
              <span className="text-gray-600 text-lg group-hover:text-white transition-colors">01.</span>
              <span>SEARCH TALENT.</span>
            </li>
            <li className="flex items-center gap-6 border-b-2 border-white/10 pb-4">
              <span className="text-gray-600 text-lg group-hover:text-white transition-colors">02.</span>
              <span>FILTER PRECISELY.</span>
            </li>
            <li className="flex items-center gap-6 border-b-2 border-white/10 pb-4">
              <span className="text-gray-600 text-lg group-hover:text-white transition-colors">03.</span>
              <span>SEND TARGETED ALERTS.</span>
            </li>
            <li className="flex items-center gap-6 border-b-2 border-white/10 pb-4">
              <span className="text-gray-600 text-lg group-hover:text-white transition-colors">04.</span>
              <span>MANAGE RESPONSES.</span>
            </li>
          </ul>

          <div className="pt-8">
            <button
              onClick={() => onOpenWaitlist('Casting Director')}
              className="text-sm font-bold uppercase tracking-widest transition-all border-2 border-gray-600 text-gray-400 py-5 px-8 hover:border-white hover:text-white group-hover:border-white group-hover:text-white"
            >
              JOIN AS INDUSTRY &rarr;
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
