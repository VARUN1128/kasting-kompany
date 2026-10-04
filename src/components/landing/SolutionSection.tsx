'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface SolutionSectionProps {
  onOpenWaitlist?: (role?: string) => void;
}

export const SolutionSection: React.FC<SolutionSectionProps> = ({ onOpenWaitlist }) => {
  const customEase = [0.22, 1, 0.36, 1] as const;

  return (
    <section id="discovery" className="py-32 bg-black text-white relative">
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-12 space-y-40">
        
        {/* PART 1: CREATIVE IDENTITY */}
        <div id="talent" className="space-y-16">
          <div className="max-w-5xl space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: customEase }}
              className="font-display text-5xl sm:text-7xl lg:text-[7.5rem] font-black uppercase tracking-tighter leading-[0.9]"
            >
              YOUR PROFILE.
              <br />
              YOUR WORK.
              <br />
              <span className="text-[#E05638]">YOUR STORY.</span>
            </motion.h2>
          </div>

          {/* Premium Fictional Talent Portfolio Experience (Editorial Feel) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: customEase }}
            className="border-t-2 border-white pt-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left: Giant Image / Identity */}
              <div className="lg:col-span-5 relative aspect-[3/4] sm:aspect-square lg:aspect-[3/4] bg-[#111] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                <Image 
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop"
                  alt="Talent Profile"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                  <div>
                    <h3 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tighter">VARUN NAIR</h3>
                    <p className="font-sans text-sm font-bold uppercase tracking-widest text-[#E05638] mt-2">Actor / Creative Professional</p>
                  </div>
                </div>
              </div>

              {/* Right: Brutalist Spec Sheet */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div className="grid grid-cols-2 gap-x-8 gap-y-12 font-sans text-sm">
                  <div className="border-b border-white/20 pb-4">
                    <span className="text-gray-500 uppercase font-bold tracking-widest block text-[10px] mb-2">Location</span>
                    <span className="font-bold text-white text-lg uppercase tracking-tight">Kochi, Kerala</span>
                  </div>
                  <div className="border-b border-white/20 pb-4">
                    <span className="text-gray-500 uppercase font-bold tracking-widest block text-[10px] mb-2">Playing Age</span>
                    <span className="font-bold text-white text-lg uppercase tracking-tight">25–30 Years</span>
                  </div>
                  <div className="border-b border-white/20 pb-4">
                    <span className="text-gray-500 uppercase font-bold tracking-widest block text-[10px] mb-2">Languages</span>
                    <span className="font-bold text-white text-lg uppercase tracking-tight">Malayalam, English, Hindi</span>
                  </div>
                  <div className="border-b border-white/20 pb-4">
                    <span className="text-gray-500 uppercase font-bold tracking-widest block text-[10px] mb-2">Specialized Skills</span>
                    <span className="font-bold text-white text-lg uppercase tracking-tight">Theatre, Dance, Stunts</span>
                  </div>
                </div>

                <div className="mt-12 space-y-6">
                  <span className="font-sans text-[10px] text-gray-500 font-bold uppercase tracking-widest block">FEATURED CREDITS</span>
                  <ul className="space-y-4 font-display text-xl sm:text-2xl font-black uppercase tracking-tighter">
                    <li className="flex justify-between items-end border-b border-white/10 pb-4 hover:text-[#E05638] transition-colors">
                      <span>&ldquo;Malabar Days&rdquo; (2025)</span>
                      <span className="text-sm font-sans tracking-normal font-normal text-gray-400">Supporting Actor</span>
                    </li>
                    <li className="flex justify-between items-end border-b border-white/10 pb-4 hover:text-[#E05638] transition-colors">
                      <span>&ldquo;Echoes of Kochi&rdquo; (2024)</span>
                      <span className="text-sm font-sans tracking-normal font-normal text-gray-400">Lead Role</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => onOpenWaitlist && onOpenWaitlist('Actor')}
                    className="mt-8 text-sm font-bold uppercase tracking-widest text-[#E05638] hover:text-white transition-colors flex items-center gap-2"
                  >
                    View Full Portfolio &rarr;
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        </div>

        {/* PART 2: LIVING PORTFOLIO */}
        <div className="space-y-16">
          <div className="max-w-5xl space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: customEase }}
              className="font-display text-5xl sm:text-7xl lg:text-[7.5rem] font-black uppercase tracking-tighter leading-[0.9]"
            >
              YOUR PORTFOLIO IS <br />
              <span className="text-[#E05638]">
                ALWAYS MOVING.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: customEase }}
              className="font-sans text-lg sm:text-2xl text-gray-400 leading-snug max-w-3xl font-light mt-8"
            >
              Members create living portfolio posts — acting reels, behind-the-scenes moments, new project announcements, and availability updates. They become part of your professional identity.
            </motion.p>
          </div>

          {/* Brutalist Feed Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t-2 border-l-2 border-white">
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: customEase }}
              className="border-b-2 border-r-2 border-white p-8 sm:p-10 space-y-8 flex flex-col justify-between hover:bg-[#111] transition-colors group"
            >
              <div className="space-y-6">
                <span className="font-sans text-[10px] uppercase font-bold text-white tracking-widest border border-white px-3 py-1">
                  ACTING REEL
                </span>
                <h4 className="font-display text-2xl font-black text-white uppercase tracking-tighter leading-none group-hover:text-[#E05638] transition-colors">
                  New Monologue — Dramatic Scene (Malayalam)
                </h4>
                <p className="text-gray-400 font-sans text-sm">
                  Emotional dramatic performance recorded for upcoming feature audition requirement.
                </p>
              </div>
              <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                2 DAYS AGO
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
              className="border-b-2 border-r-2 border-white p-8 sm:p-10 space-y-8 flex flex-col justify-between hover:bg-[#111] transition-colors group"
            >
              <div className="space-y-6">
                <span className="font-sans text-[10px] uppercase font-bold text-white tracking-widest border border-white px-3 py-1">
                  BTS & PROJECTS
                </span>
                <h4 className="font-display text-2xl font-black text-white uppercase tracking-tighter leading-none group-hover:text-[#E05638] transition-colors">
                  Behind The Scenes — Shoot Wraps
                </h4>
                <p className="text-gray-400 font-sans text-sm">
                  Wrapped 10 days of principal photography on location in Kozhikode.
                </p>
              </div>
              <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                5 DAYS AGO
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: customEase }}
              className="border-b-2 border-r-2 border-white p-8 sm:p-10 space-y-8 flex flex-col justify-between hover:bg-[#111] transition-colors group"
            >
              <div className="space-y-6">
                <span className="font-sans text-[10px] uppercase font-bold text-white tracking-widest border border-white px-3 py-1 bg-white text-black">
                  AVAILABILITY
                </span>
                <h4 className="font-display text-2xl font-black text-white uppercase tracking-tighter leading-none group-hover:text-[#E05638] transition-colors">
                  Available for Shoot Dates Next Month
                </h4>
                <p className="text-gray-400 font-sans text-sm">
                  Open for feature film and commercial bookings across Kochi, Chennai, and Hyderabad.
                </p>
              </div>
              <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                TODAY
              </div>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
};
