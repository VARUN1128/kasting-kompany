'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onOpenWaitlist: (initialRole?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWaitlist }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-black border-b-[3px] border-white py-4'
            : 'bg-transparent py-8'
        }`}
      >
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-6 sm:px-12">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="flex h-10 w-10 items-center justify-center bg-white text-black font-display font-black text-xl tracking-tighter">
              K
            </div>
            <span className={`font-display text-2xl font-black tracking-tighter uppercase transition-colors ${scrolled ? 'text-white' : 'text-white'} group-hover:text-[#E05638]`}>
              KASTING KOMPANY
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-10 font-sans text-sm font-bold uppercase tracking-widest text-white">
            <a href="#discovery" className="hover:text-[#E05638] transition-colors border-b-2 border-transparent hover:border-[#E05638] pb-1">Discover</a>
            <a href="#workflow" className="hover:text-[#E05638] transition-colors border-b-2 border-transparent hover:border-[#E05638] pb-1">How It Works</a>
            <a href="#talent" className="hover:text-[#E05638] transition-colors border-b-2 border-transparent hover:border-[#E05638] pb-1">For Talent</a>
            <a href="#industry" className="hover:text-[#E05638] transition-colors border-b-2 border-transparent hover:border-[#E05638] pb-1">For Industry</a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => onOpenWaitlist()}
              className="bg-white text-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#E05638] hover:text-white transition-colors"
            >
              JOIN EARLY ACCESS
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-xs font-bold uppercase tracking-widest text-black bg-white px-4 py-2"
          >
            {mobileMenuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </header>

      {/* Full-Screen Animated Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-white text-black px-6 py-8 flex flex-col justify-between"
          >
            {/* Top Bar inside Menu */}
            <div className="flex items-center justify-between border-b-[3px] border-black pb-6 mt-2">
              <span className="font-display text-2xl font-black tracking-tighter uppercase">KASTING KOMPANY</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-widest text-white bg-black px-4 py-2"
              >
                CLOSE ✕
              </button>
            </div>

            {/* Menu Links */}
            <div className="space-y-8 my-auto font-display text-4xl sm:text-6xl font-black uppercase tracking-tighter">
              <a
                href="#discovery"
                onClick={() => setMobileMenuOpen(false)}
                className="block hover:text-[#E05638] transition-colors"
              >
                DISCOVER
              </a>
              <a
                href="#workflow"
                onClick={() => setMobileMenuOpen(false)}
                className="block hover:text-[#E05638] transition-colors"
              >
                HOW IT WORKS
              </a>
              <a
                href="#talent"
                onClick={() => setMobileMenuOpen(false)}
                className="block hover:text-[#E05638] transition-colors"
              >
                FOR TALENT
              </a>
              <a
                href="#industry"
                onClick={() => setMobileMenuOpen(false)}
                className="block hover:text-[#E05638] transition-colors"
              >
                FOR INDUSTRY
              </a>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-4 border-t-[3px] border-black pt-8">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWaitlist();
                }}
                className="w-full bg-black py-5 text-sm font-bold uppercase tracking-widest text-white text-center hover:bg-[#E05638] transition-colors"
              >
                JOIN EARLY ACCESS
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
