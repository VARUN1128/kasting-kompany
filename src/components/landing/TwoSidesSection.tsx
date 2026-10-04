'use client';

import React from 'react';

interface TwoSidesSectionProps {
  onOpenWaitlist: (initialRole?: string) => void;
}

export const TwoSidesSection: React.FC<TwoSidesSectionProps> = ({ onOpenWaitlist }) => {
  return (
    <section id="network" className="py-24 bg-white border-b-5 border-black relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
          <span className="font-mono text-xs font-bold uppercase tracking-widest bg-black text-white px-3 py-1 border-2 border-black inline-block">
            [SECTION 04 // TWO SIDES OF THE NETWORK]
          </span>
          <h2 className="font-headline text-3xl sm:text-5xl text-black uppercase leading-[1.05]">
            BUILT FOR EVERYONE IN <span className="bg-black text-white px-2">THE ECOSYSTEM.</span>
          </h2>
          <p className="font-body text-base text-black max-w-3xl mx-auto">
            WHETHER YOU&apos;RE BUILDING YOUR CREATIVE IDENTITY OR CASTING MAJOR FEATURE FILMS AND COMMERCIALS, KASTING KOMPANY GIVES YOU PURPOSE-BUILT TOOLS.
          </p>
        </div>

        {/* Split Screen Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* LEFT: FOR CREATIVE PROFESSIONALS */}
          <div className="card-raw-elevated flex flex-col justify-between space-y-8 bg-white">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b-3 border-black pb-4 font-mono text-xs font-bold">
                <span className="bg-black text-white px-3 py-1 text-sm font-headline">FOR TALENT</span>
                <span className="text-black uppercase">[CREATIVE IDENTITY]</span>
              </div>

              <div>
                <h3 className="font-headline text-3xl text-black uppercase">
                  FOR CREATIVE PROFESSIONALS
                </h3>
                <p className="font-headline text-base text-black uppercase mt-1 bg-black text-white inline-block px-2">
                  &ldquo;BUILD YOUR IDENTITY.&rdquo;
                </p>
                <p className="font-body text-sm text-black mt-3 leading-relaxed">
                  STOP RELYING ON SCATTERED PHONE CHATS. OWN A VERIFIED DIGITAL IDENTITY THAT GETS YOU SEEN BY TOP CASTING DIRECTORS.
                </p>
              </div>

              {/* Bullet List */}
              <ul className="space-y-3 font-mono text-xs font-bold border-t-3 border-black pt-4 text-black">
                {[
                  "CREATE YOUR PROFESSIONAL PROFILE",
                  "SHOWCASE YOUR WORK & ACTING REELS",
                  "PUBLISH POSTS TO YOUR LIVING PORTFOLIO",
                  "BUILD VERIFIED CREDITS & EXPERIENCE",
                  "GET DISCOVERED BY INDUSTRY LEADS",
                  "RECEIVE RELEVANT, TARGETED CASTING OPPORTUNITIES"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 border-b border-black pb-2">
                    <span className="bg-black text-white px-1.5 py-0.5 text-[10px] font-bold">[✓]</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="pt-6 border-t-3 border-black">
              <button
                onClick={() => onOpenWaitlist('Actor')}
                className="w-full btn-raw-primary text-center justify-center py-4 text-sm"
              >
                JOIN AS TALENT &rarr;
              </button>
            </div>
          </div>

          {/* RIGHT: FOR INDUSTRY PROFESSIONALS */}
          <div className="card-raw-elevated flex flex-col justify-between space-y-8 bg-white">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b-3 border-black pb-4 font-mono text-xs font-bold">
                <span className="bg-black text-white px-3 py-1 text-sm font-headline">FOR INDUSTRY</span>
                <span className="text-black uppercase">[CASTING DISCOVERY]</span>
              </div>

              <div>
                <h3 className="font-headline text-3xl text-black uppercase">
                  FOR INDUSTRY PROFESSIONALS
                </h3>
                <p className="font-headline text-base text-black uppercase mt-1 bg-black text-white inline-block px-2">
                  &ldquo;FIND THE RIGHT PEOPLE FASTER.&rdquo;
                </p>
                <p className="font-body text-sm text-black mt-3 leading-relaxed">
                  ACCELERATE YOUR PRODUCTION CASTING PIPELINE. SEARCH, FILTER, ALERT, AND SHORTLIST TALENT WITH STRUCTURED CLARITY.
                </p>
              </div>

              {/* Bullet List */}
              <ul className="space-y-3 font-mono text-xs font-bold border-t-3 border-black pt-4 text-black">
                {[
                  "SEARCH TALENT ACROSS INDIA WITH INSTANT FILTERS",
                  "FILTER BY PLAYING AGE, LANGUAGE, BEARD, HEIGHT, CITY",
                  "CREATE DETAILED CASTING REQUIREMENTS",
                  "SEND TARGETED CASTING ALERTS DIRECTLY",
                  "MANAGE REAL-TIME AVAILABILITY RESPONSES",
                  "BUILD PRIVATE TALENT DATABASES FOR FUTURE PROJECTS"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 border-b border-black pb-2">
                    <span className="bg-black text-white px-1.5 py-0.5 text-[10px] font-bold">[✓]</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="pt-6 border-t-3 border-black">
              <button
                onClick={() => onOpenWaitlist('Casting Director')}
                className="w-full btn-raw-secondary text-center justify-center py-4 text-sm"
              >
                JOIN AS INDUSTRY PRO &rarr;
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
