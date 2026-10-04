'use client';

import React from 'react';

interface WaitlistCtaSectionProps {
  onOpenWaitlist: () => void;
}

export const WaitlistCtaSection: React.FC<WaitlistCtaSectionProps> = ({ onOpenWaitlist }) => {
  return (
    <section className="py-24 bg-white relative">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="card-raw-elevated p-8 sm:p-14 space-y-8 bg-white">
          
          <div className="inline-block border-2 border-black bg-black text-white px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest">
            [LIMITED EARLY ACCESS COMMUNITY]
          </div>

          <h2 className="font-headline text-3xl sm:text-5xl lg:text-6xl text-black uppercase leading-[1.0] tracking-tight">
            BE PART OF THE FIRST NETWORK BUILT FOR <br className="hidden sm:inline" />
            <span className="bg-black text-white px-2">INDIA&apos;S CREATIVE INDUSTRY.</span>
          </h2>

          <p className="font-body text-base sm:text-lg text-black max-w-2xl mx-auto leading-relaxed">
            WE&apos;RE STARTING WITH A LIMITED EARLY-ACCESS COMMUNITY OF TALENT AND INDUSTRY PROFESSIONALS IN MALAYALAM, TAMIL, TELUGU, HINDI, AND KANNADA CINEMA.
          </p>

          {/* Action Button */}
          <div className="pt-4 flex justify-center">
            <button
              onClick={onOpenWaitlist}
              className="btn-raw-primary text-base py-5 px-10"
            >
              JOIN EARLY ACCESS NOW &rarr;
            </button>
          </div>

          {/* Trust Statement */}
          <div className="pt-6 border-t-3 border-black flex flex-col sm:flex-row items-center justify-center gap-4 font-mono text-xs font-bold text-black uppercase">
            <span className="bg-[#F0F0F0] border-2 border-black px-3 py-1">
              [✓ STRICT DATA PRIVACY]
            </span>
            <span className="bg-[#F0F0F0] border-2 border-black px-3 py-1">
              [✓ NO SPAM · NO UNNECESSARY CALLS]
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
