'use client';

import React, { useState, useEffect } from 'react';

export const WorkflowSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  // Auto progression every 3.5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev % 5) + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const steps = [
    {
      id: 1,
      title: "STEP 1: CREATE REQUIREMENT",
      subtitle: "SET PHYSICAL & TALENT CRITERIA",
      tag: "REQUIREMENT FILTER",
      content: {
        heading: "MALE · 35–45 · BEARD · MALAYALAM · KOCHI",
        detail: "CASTING COORDINATORS DEFINE PRECISE PARAMETERS INSTEAD OF POSTING VAGUE TEXT MESSAGES."
      },
      metric: "5 FILTERS APPLIED"
    },
    {
      id: 2,
      title: "STEP 2: FIND MATCHING TALENT",
      subtitle: "INSTANT NETWORK QUERY",
      tag: "SMART MATCHING",
      content: {
        heading: "247 MATCHING MEMBERS FOUND",
        detail: "REAL-TIME QUERY CROSS-REFERENCES PLAYING AGE, LANGUAGE PROFICIENCY, PHYSICAL TRAITS, AND LOCATION."
      },
      metric: "247 MATCHES"
    },
    {
      id: 3,
      title: "STEP 3: SEND TARGETED ALERT",
      subtitle: "REACH MATCHING PROFILES DIRECTLY",
      tag: "PUSH NOTIFICATION",
      content: {
        heading: "NOTIFY 120 MATCHING MEMBERS",
        detail: "TARGETED CASTING NOTIFICATION SENT DIRECTLY TO RELEVANT ACTORS' PROFILES WITH SHOOT DATES."
      },
      metric: "120 ALERTS SENT"
    },
    {
      id: 4,
      title: "STEP 4: RECEIVE RESPONSES",
      subtitle: "ACTORS CONFIRM REAL-TIME AVAILABILITY",
      tag: "LIVE AVAILABILITY",
      content: {
        heading: "73 AVAILABLE FOR SHOOT DATES",
        detail: "TALENT RESPONDS WITH ONE TAP ('AVAILABLE' OR 'UNAVAILABLE'), ALONG WITH RECENT HEADSHOTS."
      },
      metric: "73 AVAILABLE"
    },
    {
      id: 5,
      title: "STEP 5: SHORTLIST",
      subtitle: "BUILD FINAL AUDITION ROSTER",
      tag: "FINAL SHORTLIST",
      content: {
        heading: "40 SELECTED FOR AUDITION",
        detail: "CASTING DIRECTOR REVIEWS LIVING PORTFOLIOS, REELS, AND CONFIRMS AUDITION SCHEDULES IN MINUTES."
      },
      metric: "40 SHORTLISTED"
    }
  ];

  return (
    <section id="workflow" className="py-24 bg-white border-b-5 border-black relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4 max-w-3xl">
            <span className="font-mono text-xs font-bold uppercase tracking-widest bg-black text-white px-3 py-1 border-2 border-black inline-block">
              [SECTION 03 // CASTING WORKFLOW SIMULATOR]
            </span>
            <h2 className="font-headline text-3xl sm:text-5xl text-black uppercase leading-[1.05]">
              FROM REQUIREMENT TO SHORTLIST <span className="bg-black text-white px-2">IN MINUTES.</span>
            </h2>
            <p className="font-body text-base text-black">
              EXPERIENCE HOW KASTING KOMPANY TRANSFORMS DAYS OF MANUAL CHASING INTO A STRUCTURED, 5-STEP AUTOMATED WORKFLOW.
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="btn-raw-secondary font-mono text-xs py-2 px-4"
            >
              {isAutoPlaying ? '[PAUSE DEMO]' : '[AUTO PLAY]'}
            </button>
          </div>
        </div>

        {/* Step Tabs Timeline */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8 font-mono text-xs">
          {steps.map((step) => {
            const isActive = activeStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => {
                  setActiveStep(step.id);
                  setIsAutoPlaying(false);
                }}
                className={`p-4 border-3 border-black text-left transition-all uppercase ${
                  isActive
                    ? 'bg-black text-white font-bold'
                    : 'bg-white text-black hover:bg-black hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between font-bold border-b border-current pb-1 mb-2">
                  <span>STEP 0{step.id}</span>
                </div>
                <p className="font-bold truncate">
                  {step.title.split(':')[1]?.trim() || step.title}
                </p>
                <span className="text-[10px] font-bold block mt-2 border-t border-current pt-1">
                  {step.metric}
                </span>
              </button>
            );
          })}
        </div>

        {/* Display Active Step Visual Card */}
        {(() => {
          const current = steps.find((s) => s.id === activeStep) || steps[0];
          return (
            <div className="card-raw-elevated p-8 sm:p-10 space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Information Column */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="bg-black text-white px-3 py-1 font-bold border-2 border-black">
                      [{current.tag}]
                    </span>
                    <span className="font-bold text-black uppercase">
                      {current.subtitle}
                    </span>
                  </div>

                  <h3 className="font-headline text-2xl sm:text-3xl text-black uppercase leading-snug">
                    {current.content.heading}
                  </h3>

                  <p className="font-body text-base text-black leading-relaxed font-normal">
                    {current.content.detail}
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setActiveStep((prev) => (prev % 5) + 1);
                        setIsAutoPlaying(false);
                      }}
                      className="btn-raw-primary"
                    >
                      NEXT STEP SIMULATOR &rarr;
                    </button>
                  </div>
                </div>

                {/* Simulated UI Screen Column */}
                <div className="lg:col-span-5">
                  <div className="border-3 border-black bg-[#F0F0F0] p-6 space-y-5 font-mono text-xs">
                    <div className="flex items-center justify-between pb-3 border-b-3 border-black font-bold">
                      <div>
                        <span className="text-black block font-headline text-sm uppercase">WORKFLOW ENGINE</span>
                        <span className="text-[10px] text-black">STATUS TRACKER</span>
                      </div>
                      <span className="bg-black text-white px-3 py-1 font-headline text-xs">
                        {current.metric}
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between font-bold text-black">
                        <span>PROGRESS</span>
                        <span>{activeStep * 20}%</span>
                      </div>
                      <div className="h-4 w-full border-2 border-black bg-white p-0.5">
                        <div
                          className="h-full bg-black transition-all duration-300"
                          style={{ width: `${activeStep * 20}%` }}
                        />
                      </div>
                    </div>

                    {/* Step-specific simulated logs */}
                    <div className="border-2 border-black bg-white p-4 space-y-2 font-mono text-[11px] font-bold text-black">
                      <div className="border-b border-black pb-1">[✓] FILTER PARAMETERS VALIDATED</div>
                      <div className="border-b border-black pb-1">[✓] KOCHI & KERALA LOCATION MATCHED</div>
                      <div>[✓] NOTIFICATIONS QUEUED TO VERIFIED DEVICES</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })()}

      </div>
    </section>
  );
};
