'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const ProblemSection: React.FC = () => {
  const customEase = [0.22, 1, 0.36, 1] as const;

  const fragmentedSteps = [
    "WhatsApp",
    "Contacts",
    "Instagram",
    "Spreadsheets",
    "Calls",
    "Follow-ups"
  ];

  return (
    <section id="problem" className="py-32 bg-white text-black relative overflow-hidden">
      <div className="mx-auto max-w-screen-2xl px-6 sm:px-12">
        
        {/* Large Editorial Typography */}
        <div className="max-w-6xl space-y-2 mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: customEase }}
            className="font-display text-5xl sm:text-7xl lg:text-[7.5rem] font-black uppercase tracking-tighter leading-[0.9]"
          >
            TALENT IS
            <br />
            EVERYWHERE.
          </motion.h2>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: customEase }}
            className="font-display text-4xl sm:text-6xl lg:text-[5.5rem] font-black uppercase tracking-tighter text-gray-400 leading-[0.9] pt-4 sm:pt-8"
          >
            FINDING THE RIGHT TALENT SHOULDN&apos;T BE.
          </motion.h2>
        </div>

        {/* Fragmented Workflow Visual Pipeline - Anti-Design/Brutalist feel */}
        <div className="border-t-[3px] border-black pt-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: customEase }}
            className="font-sans text-sm font-bold uppercase tracking-widest mb-12"
          >
            THE CURRENT FRAGMENTED WORKFLOW
          </motion.p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-display text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tighter">
            {fragmentedSteps.map((item, idx) => (
              <React.Fragment key={idx}>
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: customEase }}
                  className="text-gray-300 hover:text-black transition-colors duration-300"
                >
                  {item}
                </motion.span>
                {idx < fragmentedSteps.length - 1 && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.1 + 0.05, ease: customEase }}
                    className="text-[#E05638]"
                  >
                    &rarr;
                  </motion.span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Transition Banner into Kasting Kompany */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.6, ease: customEase }}
          className="mt-32 pt-10 border-t border-gray-200"
        >
          <h3 className="font-display text-2xl sm:text-4xl font-black uppercase tracking-tight text-black max-w-3xl">
            ENTER <span className="text-[#E05638]">KASTING KOMPANY</span>. ONE UNIFIED NETWORK FOR LIVING PORTFOLIOS AND TARGETED DISCOVERY.
          </h3>
        </motion.div>

      </div>
    </section>
  );
};
