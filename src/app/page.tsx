'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { ProblemSection } from '@/components/landing/ProblemSection';
import { SolutionSection } from '@/components/landing/SolutionSection';
import { WorkflowSection } from '@/components/landing/WorkflowSection';
import { TwoSidesSection } from '@/components/landing/TwoSidesSection';
import { WaitlistCtaSection } from '@/components/landing/WaitlistCtaSection';
import { WaitlistModal } from '@/components/waitlist/WaitlistModal';

export default function Home() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [selectedRoleForWaitlist, setSelectedRoleForWaitlist] = useState<string | undefined>(undefined);

  const handleOpenWaitlist = (role?: string) => {
    setSelectedRoleForWaitlist(role);
    setIsWaitlistOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 selection:bg-orange-500 selection:text-white">
      {/* Navigation Bar */}
      <Navbar onOpenWaitlist={handleOpenWaitlist} />

      {/* Main Landing Sections */}
      <main>
        {/* Section 1: Hero */}
        <HeroSection onOpenWaitlist={handleOpenWaitlist} />

        {/* Section 2: The Problem */}
        <ProblemSection />

        {/* Section 3: The Solution (3 Pillars) */}
        <SolutionSection />

        {/* Section 4: Show the Casting Workflow (5-step simulator) */}
        <WorkflowSection />

        {/* Section 5: Two Sides of the Network (Talent vs Industry) */}
        <TwoSidesSection onOpenWaitlist={handleOpenWaitlist} />

        {/* Section 6: Waitlist CTA */}
        <WaitlistCtaSection onOpenWaitlist={() => handleOpenWaitlist()} />
      </main>

      {/* Footer */}
      <Footer onOpenWaitlist={() => handleOpenWaitlist()} />

      {/* Progressive Multi-Step Waitlist Modal */}
      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
        initialRole={selectedRoleForWaitlist}
      />
    </div>
  );
}
