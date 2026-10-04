'use client';

import React, { useState } from 'react';

interface HeroSectionProps {
  onOpenWaitlist: (role?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenWaitlist }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'reels' | 'posts'>('profile');
  const [isPlayingReel, setIsPlayingReel] = useState(false);

  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-white border-b-5 border-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* Status Chip */}
            <div className="inline-block border-2 border-black bg-white px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-black">
              [RAWBLOCK V1.0 // THE PROFESSIONAL CREATIVE NETWORK FOR INDIA]
            </div>

            {/* Main H1 Headline: Archivo Black 64px */}
            <h1 className="font-headline text-4xl sm:text-6xl lg:text-6xl text-black uppercase leading-[1.0] tracking-tight">
              YOUR CREATIVE CAREER DESERVES MORE THAN A <span className="bg-black text-white px-2">WHATSAPP GROUP.</span>
            </h1>

            {/* Subheadline: Work Sans */}
            <p className="font-body text-lg sm:text-xl text-black leading-relaxed font-normal border-l-5 border-black pl-4">
              Kasting Kompany is building a professional network for India&apos;s creative industry — where talent builds a living portfolio, gets discovered, and receives casting opportunities matched to them.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 font-headline">
              <button
                onClick={() => onOpenWaitlist()}
                className="btn-raw-primary text-base py-4 px-8"
              >
                JOIN EARLY ACCESS &rarr;
              </button>

              <a
                href="#workflow"
                className="btn-raw-secondary text-base py-4 px-8 text-center"
              >
                SEE HOW IT WORKS
              </a>
            </div>

            {/* Brutalist Trust Line */}
            <div className="pt-6 flex flex-wrap gap-4 font-mono text-xs font-bold uppercase text-black border-t-3 border-black">
              <span className="bg-black text-white px-2 py-1">[✓ VERIFIED PROFILES]</span>
              <span className="bg-black text-white px-2 py-1">[✓ DIRECT CASTING ALERTS]</span>
              <span className="bg-black text-white px-2 py-1">[✓ ZERO SPAM]</span>
            </div>
          </div>

          {/* Right Column: Hero Profile Raw Card Mockup */}
          <div className="lg:col-span-5">
            <div className="card-raw-elevated space-y-6">
              
              {/* Profile Card Header */}
              <div className="flex items-start justify-between pb-4 border-b-3 border-black">
                <div className="flex items-center gap-4">
                  {/* Square Avatar Container */}
                  <div className="h-14 w-14 bg-black text-white font-headline text-2xl flex items-center justify-center border-3 border-black">
                    VN
                  </div>
                  <div>
                    <h3 className="font-headline text-xl text-black uppercase">VARUN NAIR</h3>
                    <p className="font-mono text-xs font-bold text-black uppercase">ACTOR / CREATIVE PROFESSIONAL</p>
                    <p className="font-mono text-xs text-black mt-0.5">LOCATION: KOCHI, KERALA</p>
                  </div>
                </div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest bg-black text-white px-2 py-1">
                  DEMO PROFILE
                </span>
              </div>

              {/* Physical Attributes & Languages Grid */}
              <div className="grid grid-cols-2 gap-3 font-mono text-xs border-b-3 border-black pb-4">
                <div className="border-2 border-black p-2 bg-[#F0F0F0]">
                  <span className="font-bold text-black block uppercase">PLAYING AGE:</span>
                  <span className="text-black font-bold">25–30 YEARS</span>
                </div>
                <div className="border-2 border-black p-2 bg-[#F0F0F0]">
                  <span className="font-bold text-black block uppercase">LANGUAGES:</span>
                  <span className="text-black font-bold">MALAYALAM · ENG · HINDI</span>
                </div>
              </div>

              {/* Navigation Tabs (Full Black/White Inversion) */}
              <div className="flex items-center gap-2 border-b-3 border-black pb-4 font-mono text-xs font-bold">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-3 py-1.5 border-2 border-black uppercase ${
                    activeTab === 'profile' ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'
                  }`}
                >
                  PORTFOLIO
                </button>
                <button
                  onClick={() => setActiveTab('reels')}
                  className={`px-3 py-1.5 border-2 border-black uppercase ${
                    activeTab === 'reels' ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'
                  }`}
                >
                  ACTING REEL
                </button>
                <button
                  onClick={() => setActiveTab('posts')}
                  className={`px-3 py-1.5 border-2 border-black uppercase ${
                    activeTab === 'posts' ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'
                  }`}
                >
                  LIVING FEED
                </button>
              </div>

              {/* Recent Acting Reel Post Preview */}
              <div className="border-3 border-black p-4 space-y-4 bg-white">
                <div className="flex items-center justify-between font-mono text-xs border-b-2 border-black pb-2">
                  <span className="font-bold uppercase text-black">RECENT PORTFOLIO POST</span>
                  <span className="text-black">2 DAYS AGO</span>
                </div>

                <p className="font-body text-sm font-bold text-black uppercase">
                  &ldquo;NEW ACTING REEL — EMOTIONAL MONOLOGUE SCENE (MALAYALAM / DRAMA)&rdquo;
                </p>

                {/* Simulated Reel Media Player Box */}
                <div
                  onClick={() => setIsPlayingReel(!isPlayingReel)}
                  className="border-3 border-black bg-black p-6 text-center cursor-pointer hover:bg-white hover:text-black transition-colors group"
                >
                  {isPlayingReel ? (
                    <div className="font-mono text-xs font-bold text-white group-hover:text-black uppercase">
                      [|| PLAYING SCENE REEL... CLICK TO PAUSE]
                    </div>
                  ) : (
                    <div className="font-headline text-sm text-white group-hover:text-black uppercase">
                      [▶ CLICK TO PREVIEW REEL]
                    </div>
                  )}
                </div>

                {/* Skill Chips */}
                <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px] font-bold">
                  <span className="chip-filter">BEARD</span>
                  <span className="chip-filter">HEAVY STUBBLE</span>
                  <span className="chip-filter">THEATRE TRAINED</span>
                  <span className="chip-filter">DRIVING LICENCE</span>
                </div>
              </div>

              {/* Match Score & Action */}
              <div className="flex items-center justify-between pt-2 font-mono text-xs border-t-3 border-black">
                <span className="font-bold text-black uppercase">KOCHI MATCH SCORE: 98%</span>
                <button
                  onClick={() => onOpenWaitlist('Actor')}
                  className="btn-raw-ghost font-bold uppercase"
                >
                  BUILD YOUR PROFILE &rarr;
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
