'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const WorkflowSection: React.FC = () => {
  const customEase = [0.22, 1, 0.36, 1] as const;
  const [responseState, setResponseState] = useState<'none' | 'available' | 'unavailable'>('none');

  return (
    <section id="workflow" className="py-32 bg-white text-black relative overflow-hidden">
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-12 space-y-40">
        
        {/* PART 1: SMART CASTING DISCOVERY */}
        <div className="space-y-16">
          <div className="max-w-5xl space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: customEase }}
              className="font-display text-5xl sm:text-7xl lg:text-[7.5rem] font-black uppercase tracking-tighter leading-[0.9]"
            >
              SEARCH PRECISELY. <br />
              <span className="text-gray-400">SHORTLIST FAST.</span>
            </motion.h2>
          </div>

          <div className="border-t-[3px] border-black pt-12 space-y-16">
            
            {/* Filter Tags Bar */}
            <div className="space-y-6">
              <span className="font-sans text-xs font-bold uppercase tracking-widest block">
                ACTIVE CASTING QUERY
              </span>
              <div className="flex flex-wrap gap-4 font-display text-2xl sm:text-4xl font-black uppercase tracking-tighter">
                {["MALE", "35–45", "BEARD", "LONG HAIR", "MALAYALAM", "KOCHI", "AVAILABLE TOMORROW"].map((chip, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.05, ease: customEase }}
                    className="border-b-2 border-black pb-1 hover:text-[#E05638] transition-colors"
                  >
                    {chip}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Animated Funnel Numbers - Brutalist */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pt-8">
              {[
                { num: "247", label: "MATCHES" },
                { num: "120", label: "NOTIFIED" },
                { num: "73", label: "AVAILABLE" },
                { num: "40", label: "SHORTLISTED" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 + (i * 0.1), ease: customEase }}
                  className="space-y-2 border-l-[3px] border-black pl-6"
                >
                  <span className="font-display text-5xl sm:text-6xl lg:text-7xl font-black text-black block leading-none">
                    {item.num}
                  </span>
                  <span className="font-sans text-xs font-bold text-gray-500 uppercase tracking-widest block">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>

          </div>
        </div>

        {/* PART 2: TARGETED CASTING ALERTS */}
        <div id="industry" className="space-y-16">
          <div className="max-w-5xl space-y-4">
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: customEase }}
              className="font-display text-5xl sm:text-7xl lg:text-[7.5rem] font-black uppercase tracking-tighter leading-[0.9]"
            >
              TARGETED ALERTS. <br />
              <span className="text-[#E05638]">ZERO SPAM.</span>
            </motion.h3>
          </div>

          <div className="border-t-[3px] border-black pt-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: customEase }}
              className="max-w-3xl border-2 border-black p-8 sm:p-12 space-y-10 bg-[#f7f7f7]"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-black pb-6 gap-4">
                <span className="font-display text-3xl font-black uppercase tracking-tighter">CASTING ALERT</span>
                <span className="font-sans text-xs uppercase font-bold text-white bg-black px-3 py-1">
                  MATCH SCORE: 98%
                </span>
              </div>

              <div className="space-y-4">
                <h4 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-tighter">
                  FEATURE FILM — CHARACTER ROLE (MALAYALAM / KOCHI)
                </h4>
                <p className="font-sans text-sm font-bold uppercase tracking-widest text-[#E05638]">
                  &ldquo;You&apos;re receiving this opportunity because your profile matches the requirement.&rdquo;
                </p>
                <p className="font-sans text-sm text-gray-600 max-w-xl">
                  Shoot Dates: October 15–18. Location: Ernakulam, Kochi. Production: Feature Film Project.
                </p>
              </div>

              <div className="pt-8 border-t-2 border-black space-y-6">
                <span className="font-sans text-[10px] text-gray-500 font-bold uppercase tracking-widest block">
                  ACTION REQUIRED:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setResponseState('available')}
                    className={`py-4 px-6 text-sm font-bold uppercase tracking-widest transition-all border-2 border-black flex items-center justify-center gap-2 ${
                      responseState === 'available'
                        ? 'bg-[#E05638] border-[#E05638] text-white'
                        : 'bg-transparent text-black hover:bg-black hover:text-white'
                    }`}
                  >
                    AVAILABLE
                  </button>
                  <button
                    onClick={() => setResponseState('unavailable')}
                    className={`py-4 px-6 text-sm font-bold uppercase tracking-widest transition-all border-2 border-black flex items-center justify-center gap-2 ${
                      responseState === 'unavailable'
                        ? 'bg-black text-white'
                        : 'bg-transparent text-black hover:bg-black hover:text-white'
                    }`}
                  >
                    NOT AVAILABLE
                  </button>
                </div>

                <AnimatePresence>
                  {responseState !== 'none' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="pt-2"
                    >
                      {responseState === 'available' ? (
                        <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#E05638]">→ Notified casting director.</span>
                      ) : (
                        <span className="font-sans text-xs font-bold uppercase tracking-widest text-gray-500">→ Marked as unavailable.</span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};
