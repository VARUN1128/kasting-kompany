'use client';

import React, { useState } from 'react';

export const SolutionSection: React.FC = () => {
  // Interactive Smart Casting Filter state for Pillar 3
  const [selectedGender, setSelectedGender] = useState('MALE');
  const [selectedAge, setSelectedAge] = useState('35–45');
  const [selectedLanguage, setSelectedLanguage] = useState('MALAYALAM');
  const [hasBeard, setHasBeard] = useState(true);
  const [selectedCity, setSelectedCity] = useState('KOCHI');

  return (
    <section id="solution" className="py-24 bg-white border-b-5 border-black relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <span className="font-mono text-xs font-bold uppercase tracking-widest bg-black text-white px-3 py-1 border-2 border-black inline-block">
            [SECTION 02 // THE PLATFORM SOLUTION]
          </span>
          <h2 className="font-headline text-3xl sm:text-5xl text-black uppercase leading-[1.05]">
            ONE PROFESSIONAL NETWORK. <br />
            <span className="bg-black text-white px-2">BUILT FOR THE WAY CASTING ACTUALLY WORKS.</span>
          </h2>
          <p className="font-body text-base sm:text-lg text-black leading-relaxed max-w-3xl mx-auto">
            KASTING KOMPANY BRIDGES THE GAP BETWEEN TALENT AND INDUSTRY PROFESSIONALS WITH A STRUCTURED, VERIFIED IDENTITY NETWORK.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* PILLAR 01: CREATIVE IDENTITY */}
          <div className="card-raw-default flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b-3 border-black">
                <span className="font-headline text-5xl text-black">01</span>
                <span className="font-mono text-xs font-bold bg-black text-white px-2.5 py-1 uppercase">
                  IDENTITY
                </span>
              </div>
              <h3 className="font-headline text-2xl text-black uppercase">CREATIVE IDENTITY</h3>
              <p className="font-body text-sm text-black leading-relaxed">
                BUILD A PROFESSIONAL PROFILE THAT EVOLVES WITH YOUR CAREER. STRUCTURED METADATA INSTEAD OF UNFORMATTED TEXT.
              </p>

              {/* Feature Chips */}
              <div className="flex flex-wrap gap-2 pt-2 font-mono text-[11px] font-bold">
                {[
                  "PROFILE & BIO", "PORTFOLIO", "VERIFIED SKILLS", "LANGUAGES", "CREDITS", 
                  "ACTING REELS", "LOCATION", "PLAYING AGE", "LIVE AVAILABILITY"
                ].map((tag, i) => (
                  <span key={i} className="chip-filter">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t-3 border-black font-mono text-xs font-bold text-black uppercase">
              ✓ STANDARDIZED PHYSICAL & SKILL ATTRIBUTES
            </div>
          </div>

          {/* PILLAR 02: LIVING PORTFOLIO */}
          <div className="card-raw-default flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b-3 border-black">
                <span className="font-headline text-5xl text-black">02</span>
                <span className="font-mono text-xs font-bold bg-black text-white px-2.5 py-1 uppercase">
                  PORTFOLIO
                </span>
              </div>
              <h3 className="font-headline text-2xl text-black uppercase">LIVING PORTFOLIO</h3>
              <p className="font-body text-sm text-black leading-relaxed">
                YOUR PROFILE DOESN&apos;T HAVE TO STAY STATIC. PUBLISH POSTS THAT DEMONSTRATE YOUR ACTIVE CREATIVE JOURNEY.
              </p>

              {/* Sample Feed Items Box */}
              <div className="space-y-3 pt-2 font-mono text-xs">
                <div className="border-2 border-black p-3 bg-[#F0F0F0] space-y-1">
                  <div className="flex justify-between font-bold text-black border-b border-black pb-1">
                    <span>ACTING REEL</span>
                    <span>YESTERDAY</span>
                  </div>
                  <p className="text-black uppercase font-semibold">EMOTIONAL SCENE MONOLOGUE PERFORMANCE</p>
                </div>

                <div className="border-2 border-black p-3 bg-[#F0F0F0] space-y-1">
                  <div className="flex justify-between font-bold text-black border-b border-black pb-1">
                    <span>BTS MOMENT</span>
                    <span>3 DAYS AGO</span>
                  </div>
                  <p className="text-black uppercase font-semibold">BEHIND THE SCENES ON SET OF FEATURE FILM</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t-3 border-black font-mono text-xs font-bold text-black uppercase">
              ✓ POSTS BECOME LIVING PORTFOLIO ASSETS
            </div>
          </div>

          {/* PILLAR 03: SMART CASTING DISCOVERY */}
          <div className="card-raw-default flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b-3 border-black">
                <span className="font-headline text-5xl text-black">03</span>
                <span className="font-mono text-xs font-bold bg-black text-white px-2.5 py-1 uppercase">
                  DISCOVERY
                </span>
              </div>
              <h3 className="font-headline text-2xl text-black uppercase">SMART CASTING DISCOVERY</h3>
              <p className="font-body text-sm text-black leading-relaxed">
                FIND EXACTLY WHO YOU NEED USING INSTANT MULTI-ATTRIBUTE STRUCTURED FILTERS.
              </p>

              {/* Interactive Demo Filter Controls */}
              <div className="border-3 border-black p-4 bg-[#F0F0F0] space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between font-bold text-black border-b-2 border-black pb-2">
                  <span>FILTER CRITERIA</span>
                  <span className="bg-black text-white px-2 py-0.5 text-[10px] uppercase">LIVE PREVIEW</span>
                </div>

                {/* Filter chip buttons */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <button onClick={() => setSelectedGender(selectedGender === 'MALE' ? 'FEMALE' : 'MALE')} className="chip-filter active">
                    {selectedGender}
                  </button>
                  <button onClick={() => setSelectedAge(selectedAge === '35–45' ? '25–30' : '35–45')} className="chip-filter active">
                    AGE: {selectedAge}
                  </button>
                  <button onClick={() => setSelectedLanguage(selectedLanguage === 'MALAYALAM' ? 'TAMIL' : 'MALAYALAM')} className="chip-filter active">
                    {selectedLanguage}
                  </button>
                  <button onClick={() => setHasBeard(!hasBeard)} className="chip-filter active">
                    {hasBeard ? 'BEARD: YES' : 'BEARD: ANY'}
                  </button>
                  <button onClick={() => setSelectedCity(selectedCity === 'KOCHI' ? 'CHENNAI' : 'KOCHI')} className="chip-filter active">
                    {selectedCity}
                  </button>
                </div>

                {/* Match result box */}
                <div className="pt-2 border-t-2 border-black flex items-center justify-between font-bold">
                  <span className="text-black">MATCHING MEMBERS:</span>
                  <span className="bg-black text-white px-2 py-1 text-sm font-headline">247 MATCHES</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t-3 border-black font-mono text-xs font-bold text-black uppercase">
              ✓ TARGETED CASTING ALERT SYSTEM
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
