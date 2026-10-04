'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface NavbarProps {
  onOpenWaitlist: (initialRole?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWaitlist }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b-5 border-black">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center bg-black text-white font-headline text-xl border-3 border-black">
            K
          </div>
          <div className="flex flex-col">
            <span className="font-headline text-xl tracking-tight text-black group-hover:bg-black group-hover:text-white transition-colors px-1">
              KASTING KOMPANY
            </span>
            <span className="font-mono text-[11px] tracking-widest text-black font-bold uppercase border-t-2 border-black pt-0.5">
              CREATIVE NETWORK
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-sm font-bold text-black uppercase tracking-wider">
          <a href="#problem" className="hover:underline">01. Problem</a>
          <a href="#solution" className="hover:underline">02. Solution</a>
          <a href="#workflow" className="hover:underline">03. Workflow</a>
          <a href="#network" className="hover:underline">04. Network</a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/admin"
            className="font-mono text-xs font-bold uppercase text-black hover:bg-black hover:text-white px-3 py-2 border-3 border-black transition-colors"
          >
            [ADMIN PORTAL]
          </Link>
          <button
            onClick={() => onOpenWaitlist()}
            className="btn-raw-primary"
          >
            JOIN EARLY ACCESS &rarr;
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden px-3 py-2 font-mono text-xs font-bold bg-black text-white border-3 border-black uppercase"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? '[CLOSE]' : '[MENU]'}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-3 border-black bg-white px-4 py-6 space-y-4 font-mono text-sm font-bold text-black uppercase">
          <a
            href="#problem"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b-2 border-black hover:bg-black hover:text-white px-2"
          >
            01. The Problem
          </a>
          <a
            href="#solution"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b-2 border-black hover:bg-black hover:text-white px-2"
          >
            02. Platform Solution
          </a>
          <a
            href="#workflow"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b-2 border-black hover:bg-black hover:text-white px-2"
          >
            03. Casting Workflow
          </a>
          <a
            href="#network"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 border-b-2 border-black hover:bg-black hover:text-white px-2"
          >
            04. For Talent & Industry
          </a>
          <div className="pt-4 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWaitlist();
              }}
              className="w-full btn-raw-primary text-center justify-center"
            >
              JOIN EARLY ACCESS &rarr;
            </button>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center font-mono text-xs font-bold py-2 border-3 border-black hover:bg-black hover:text-white"
            >
              [SUPERADMIN PORTAL]
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
