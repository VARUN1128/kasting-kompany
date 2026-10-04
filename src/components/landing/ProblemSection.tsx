'use client';

import React from 'react';

export const ProblemSection: React.FC = () => {
  const fragmentedNodes = [
    { label: "01. REQUIREMENT", desc: "CASTING CALL DEFINED" },
    { label: "02. WHATSAPP", desc: "BROADCAST TO HUNDREDS" },
    { label: "03. CONTACTS", desc: "CALL LOCAL COORDINATORS" },
    { label: "04. PHOTOS", desc: "UNVERIFIED HEADSHOTS" },
    { label: "05. CALLS", desc: "MANUAL VERIFICATION" },
    { label: "06. FOLLOW-UPS", desc: "STATUS CHECKS" },
    { label: "07. AVAILABILITY", desc: "PAPER TRACKING" },
    { label: "08. CASTING", desc: "FINAL SHORTLIST" },
  ];

  return (
    <section id="problem" className="py-20 bg-white border-b-5 border-black relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <span className="font-mono text-xs font-bold uppercase tracking-widest bg-black text-white px-3 py-1 border-2 border-black inline-block">
            [SECTION 01 // THE CURRENT REALITY]
          </span>
          <h2 className="font-headline text-3xl sm:text-5xl text-black uppercase leading-[1.05]">
            TALENT IS EVERYWHERE. <br />
            <span className="bg-black text-white px-2">FINDING THE RIGHT TALENT IS STILL HARD.</span>
          </h2>
          <p className="font-body text-base sm:text-lg text-black leading-relaxed max-w-3xl mx-auto">
            WHEN A CASTING COORDINATOR NEEDS 30 ACTORS WITH A VERY SPECIFIC LOOK BY TOMORROW MORNING, TODAY&apos;S PROCESS BREAKS DOWN ACROSS FRAGMENTED CHANNELS AND UNVERIFIED DATABASES.
          </p>
        </div>

        {/* Fragmented Channel Grid Badges */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center font-mono text-xs font-bold uppercase">
          {[
            "WHATSAPP GROUPS",
            "PERSONAL CONTACTS",
            "INSTAGRAM DMS",
            "EXCEL SHEETS",
            "OLD PORTFOLIOS",
            "PHONE CALLS",
            "SCATTERED DBS"
          ].map((channel, idx) => (
            <div key={idx} className="border-3 border-black p-3 bg-[#F0F0F0] text-black">
              [{channel}]
            </div>
          ))}
        </div>

        {/* Workflow Comparison Graphic */}
        <div className="mt-14 card-raw-elevated space-y-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b-3 border-black gap-2">
            <div>
              <h3 className="font-headline text-xl text-black uppercase">
                TODAY&apos;S FRAGMENTED CASTING PIPELINE
              </h3>
              <p className="font-mono text-xs text-black mt-1">
                TYPICAL MANUAL EFFORT REQUIRED FOR A SINGLE CASTING REQUIREMENT
              </p>
            </div>
            <span className="font-mono text-xs font-bold bg-black text-white px-3 py-1 uppercase">
              HIGH FRICTION PIPELINE
            </span>
          </div>

          {/* Visual Step-by-Step Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-4 font-mono text-xs">
            {fragmentedNodes.map((node, index) => (
              <div key={index} className="border-3 border-black p-4 bg-white space-y-1">
                <span className="font-headline text-sm text-black block">{node.label}</span>
                <span className="text-black block text-[11px]">{node.desc}</span>
              </div>
            ))}
          </div>

          {/* Summary Banner */}
          <div className="border-3 border-black bg-black p-6 text-center text-white">
            <p className="font-headline text-2xl uppercase tracking-wide">
              &ldquo;TOO MUCH TIME. TOO LITTLE STRUCTURE.&rdquo;
            </p>
            <p className="font-body text-sm mt-2 max-w-2xl mx-auto">
              Creative professionals miss opportunities because they are not seen. Casting directors waste hours chasing unverified contacts.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
