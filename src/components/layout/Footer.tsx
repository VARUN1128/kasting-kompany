'use client';

import React from 'react';
import Link from 'next/link';

interface FooterProps {
  onOpenWaitlist: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenWaitlist }) => {
  return (
    <footer className="border-t-5 border-black bg-black text-white py-16 px-4 sm:px-6 lg:px-8 font-body">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-start gap-12">
        
        {/* Brand info */}
        <div className="space-y-4 max-w-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-white text-black font-headline text-xl border-3 border-white">
              K
            </div>
            <span className="font-headline text-2xl tracking-tight text-white">
              KASTING KOMPANY
            </span>
          </div>
          <p className="font-body text-sm leading-relaxed text-white">
            THE PROFESSIONAL CREATIVE NETWORK FOR INDIA&apos;S FILM AND ENTERTAINMENT INDUSTRY. 
            BUILD YOUR CREATIVE IDENTITY. GET DISCOVERED. GET CAST.
          </p>
          <p className="font-mono text-xs text-white border-t-2 border-white/40 pt-3">
            &copy; {new Date().getFullYear()} KASTING KOMPANY. ALL RIGHTS RESERVED. RAWBLOCK SYSTEM V1.0
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 font-mono text-xs uppercase tracking-wider">
          <div>
            <h4 className="font-headline text-sm text-white border-b-3 border-white pb-2 mb-3">PLATFORM</h4>
            <ul className="space-y-2">
              <li><a href="#problem" className="text-blue-400 underline hover:bg-white hover:text-black px-1">01. PROBLEM</a></li>
              <li><a href="#solution" className="text-blue-400 underline hover:bg-white hover:text-black px-1">02. SOLUTION</a></li>
              <li><a href="#workflow" className="text-blue-400 underline hover:bg-white hover:text-black px-1">03. WORKFLOW</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline text-sm text-white border-b-3 border-white pb-2 mb-3">NETWORK</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenWaitlist} className="text-blue-400 underline hover:bg-white hover:text-black px-1 text-left uppercase">
                  JOIN AS TALENT
                </button>
              </li>
              <li>
                <button onClick={onOpenWaitlist} className="text-blue-400 underline hover:bg-white hover:text-black px-1 text-left uppercase">
                  JOIN AS INDUSTRY PRO
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline text-sm text-white border-b-3 border-white pb-2 mb-3">SYSTEM</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenWaitlist}
                  className="bg-white text-black font-headline px-2 py-1 border-2 border-white hover:bg-black hover:text-white"
                >
                  [EARLY ACCESS]
                </button>
              </li>
              <li className="pt-2">
                <Link href="/admin" className="text-white underline hover:bg-white hover:text-black px-1">
                  ADMIN DASHBOARD &rarr;
                </Link>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </footer>
  );
};
