'use client';

import React from 'react';
import Link from 'next/link';

interface FooterProps {
  onOpenWaitlist: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenWaitlist }) => {
  return (
    <footer className="border-t-[3px] border-black bg-white text-black py-20 px-6 sm:px-12 font-sans">
      <div className="mx-auto max-w-screen-2xl flex flex-col md:flex-row justify-between items-start gap-16">
        
        {/* Brand info */}
        <div className="space-y-6 max-w-md">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center bg-black text-white font-display font-black text-2xl tracking-tighter">
              K
            </div>
            <span className="font-display text-3xl font-black tracking-tighter uppercase text-black">
              KASTING KOMPANY
            </span>
          </div>
          <p className="font-sans text-sm font-bold uppercase tracking-widest leading-relaxed text-gray-500">
            THE PROFESSIONAL CREATIVE NETWORK FOR INDIA&apos;S FILM AND ENTERTAINMENT INDUSTRY. 
            BUILD YOUR CREATIVE IDENTITY. GET DISCOVERED. GET CAST.
          </p>
          <p className="font-sans text-xs font-bold uppercase tracking-widest text-black border-t-2 border-black pt-4">
            &copy; {new Date().getFullYear()} KASTING KOMPANY. ALL RIGHTS RESERVED.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 font-sans text-xs font-bold uppercase tracking-widest">
          <div>
            <h4 className="font-display text-lg font-black text-black border-b-2 border-black pb-2 mb-4 tracking-tighter">PLATFORM</h4>
            <ul className="space-y-4">
              <li><a href="#discovery" className="hover:text-[#E05638] transition-colors">01. DISCOVER</a></li>
              <li><a href="#workflow" className="hover:text-[#E05638] transition-colors">02. WORKFLOW</a></li>
              <li><a href="#talent" className="hover:text-[#E05638] transition-colors">03. TALENT</a></li>
              <li><a href="#industry" className="hover:text-[#E05638] transition-colors">04. INDUSTRY</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-black text-black border-b-2 border-black pb-2 mb-4 tracking-tighter">NETWORK</h4>
            <ul className="space-y-4">
              <li>
                <button onClick={onOpenWaitlist} className="hover:text-[#E05638] transition-colors text-left uppercase">
                  JOIN AS TALENT
                </button>
              </li>
              <li>
                <button onClick={onOpenWaitlist} className="hover:text-[#E05638] transition-colors text-left uppercase">
                  JOIN AS INDUSTRY PRO
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-black text-black border-b-2 border-black pb-2 mb-4 tracking-tighter">SYSTEM</h4>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={onOpenWaitlist}
                  className="bg-black text-white px-4 py-3 hover:bg-[#E05638] transition-colors"
                >
                  EARLY ACCESS
                </button>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </footer>
  );
};
