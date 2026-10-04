'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserRoleType, WaitlistFormData } from '@/lib/types';
import { INDIAN_STATES_AND_CITIES, LANGUAGES_LIST, YEARS_IN_INDUSTRY_OPTIONS } from '@/lib/indian-locations';
import { submitWaitlistForm, updateEarlyAccessRequest } from '@/lib/data-store';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: string;
}

const FORM_STORAGE_KEY = 'kasting_kompany_draft_form_v1';

const ALL_ROLES: UserRoleType[] = [
  "Actor",
  "Junior Artist",
  "Model",
  "Casting Director",
  "Casting Coordinator",
  "Assistant Director",
  "Production Controller",
  "Director",
  "Production Professional",
  "Creative Professional",
  "Other"
];

const SKILLS_OPTIONS = [
  "Acting", "Theatre", "Dance", "Classical Dance", "Singing",
  "Martial Arts", "Stunts", "Swimming", "Driving", "Horse Riding",
  "Cycling", "Fitness", "Music Instrument", "Anchoring", "Voice Acting", "Other"
];

const SOURCING_METHODS_OPTIONS = [
  "WhatsApp groups", "Personal contacts", "Artist coordinators",
  "Instagram", "Talentrack", "Casting websites", "Existing database",
  "Excel / Google Sheets", "Facebook", "Other"
]; // eslint-disable-line @typescript-eslint/no-unused-vars

const CASTING_CHALLENGES_OPTIONS = [
  "Finding the right look", "Finding people quickly", "Finding available people",
  "Finding people in a specific location", "Finding large numbers of people",
  "Contacting artists", "Getting responses", "Managing shortlisted artists",
  "Last-minute replacements", "No-shows", "Maintaining artist database",
  "Coordinating shoot details", "Payments", "Other"
];

export const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose, initialRole }) => {
  const customEase = [0.22, 1, 0.36, 1] as const;
  const [step, setStep] = useState<number>(1);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [createdUserId, setCreatedUserId] = useState<string | null>(null);
  const [earlyTestingJoined, setEarlyTestingJoined] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState<WaitlistFormData>({
    roles: [],
    full_name: '',
    email: '',
    phone: '',
    whatsapp_available: true,
    state: 'Kerala',
    city: 'Kochi / Ernakulam',
    native_language: 'Malayalam',
    other_languages: ['English'],
    years_in_industry: '3–5 years',
    
    // Talent Defaults
    gender: 'Male',
    playing_age_range: '26–30',
    height: '171–180 cm',
    build: 'Athletic',
    hair_length: 'Short',
    hair_colour: 'Black',
    beard: true,
    beard_type: 'Heavy stubble',
    moustache: true,
    skills: ['Acting'],
    driving_licence: true,
    own_vehicle: false,
    travel_availability: 'South India',
    current_availability: 'Available most days',

    // Industry Defaults
    typical_cast_size: '21–50',
    casting_frequency: 'Weekly',
    current_sourcing_methods: ['WhatsApp groups', 'Personal contacts'],
    current_database_method: 'Excel / Google Sheets',
    biggest_problems: ['Finding the right look', 'Finding available people'],
    usefulness_score: 5,
    would_use: 'Definitely',
    preferred_payment_model: 'Monthly subscription',
    willingness_to_pay: '₹2,500–₹5,000'
  });

  // Auto-restore draft from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(FORM_STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setFormData((prev) => ({ ...prev, ...parsed }));
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  // Pre-select initial role if passed
  useEffect(() => {
    if (initialRole && ALL_ROLES.includes(initialRole as UserRoleType)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData((prev) => ({
        ...prev,
        roles: Array.from(new Set([...prev.roles, initialRole as UserRoleType]))
      }));
    }
  }, [initialRole]);

  // Auto-save form draft
  useEffect(() => {
    if (typeof window !== 'undefined' && step < 5) {
      localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData, step]);

  if (!isOpen) return null;

  const isTalent = formData.roles.some((r) =>
    ['Actor', 'Junior Artist', 'Model', 'Creative Professional'].includes(r)
  );
  const isIndustry = formData.roles.some((r) =>
    ['Casting Director', 'Casting Coordinator', 'Assistant Director', 'Production Controller', 'Director', 'Production Professional'].includes(r)
  );

  const toggleRole = (role: UserRoleType) => {
    setFormData((prev) => {
      const exists = prev.roles.includes(role);
      const updated = exists
        ? prev.roles.filter((r) => r !== role)
        : [...prev.roles, role];
      return { ...prev, roles: updated };
    });
  };

  const toggleMultiSelect = (field: keyof WaitlistFormData, value: string) => {
    setFormData((prev) => {
      const list = (prev[field] as string[]) || [];
      const updated = list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value];
      return { ...prev, [field]: updated };
    });
  };

  const handleNext = () => {
    if (step === 1 && formData.roles.length === 0) {
      alert('Please select at least one role to proceed.');
      return;
    }
    if (step === 2) {
      if (!formData.full_name || !formData.phone || !formData.email) {
        alert('Please fill in your name, mobile number, and email.');
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const res = await submitWaitlistForm(formData);
      if (res.success) {
        setCreatedUserId(res.id);
        localStorage.removeItem(FORM_STORAGE_KEY);
        setStep(5);
      }
    } catch (e) {
      console.error(e);
      alert('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleJoinEarlyTesting = () => {
    if (createdUserId) {
      updateEarlyAccessRequest(createdUserId);
      setEarlyTestingJoined(true);
    }
  };

  const availableCities = INDIAN_STATES_AND_CITIES[formData.state] || ["Kochi / Ernakulam", "Other"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/95 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.4, ease: customEase }}
        className="relative w-full max-w-3xl border-[3px] border-black bg-white p-6 sm:p-12 shadow-2xl my-auto text-black font-sans"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-xs font-bold uppercase tracking-widest text-black hover:text-white hover:bg-black px-4 py-2 border-2 border-black transition-colors"
          aria-label="Close Modal"
        >
          CLOSE ✕
        </button>

        {/* Modal Header & Animated Progress Indicator */}
        {step < 5 && (
          <div className="mb-12 space-y-6 font-sans">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-[3px] border-black pb-4 gap-4">
              <span className="font-display text-2xl font-black uppercase tracking-tighter">EARLY ACCESS ONBOARDING</span>
              <span className="text-gray-500 font-bold uppercase tracking-widest text-xs">STEP 0{step} OF 04</span>
            </div>

            {/* Step Progress Bar */}
            <div className="grid grid-cols-4 gap-2">
              {["01. YOU", "02. WORK", "03. SPECS", "04. NEEDS"].map((label, idx) => {
                const stepNum = idx + 1;
                const isCompleted = step > stepNum;
                const isCurrent = step === stepNum;
                return (
                  <div key={idx} className="space-y-2">
                    <div
                      className={`h-2 transition-all duration-300 ${
                        isCompleted || isCurrent ? 'bg-black' : 'bg-gray-200'
                      }`}
                    />
                    <span className={`text-[10px] font-bold block truncate uppercase ${isCurrent ? 'text-black' : 'text-gray-400'}`}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Animated Step Content Container */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: customEase }}
              className="space-y-8"
            >
              <div>
                <h3 className="font-display text-3xl sm:text-5xl font-black uppercase text-black tracking-tighter leading-none">
                  WHAT BRINGS YOU TO KASTING KOMPANY?
                </h3>
                <p className="text-sm text-gray-500 mt-4 uppercase font-bold tracking-widest">
                  SELECT ALL ROLES THAT BEST DESCRIBE YOUR POSITION IN THE CREATIVE NETWORK.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[360px] overflow-y-auto pr-2 font-sans text-xs font-bold">
                {ALL_ROLES.map((role) => {
                  const isSelected = formData.roles.includes(role);
                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => toggleRole(role)}
                      className={`p-5 border-2 text-left flex items-center justify-between uppercase transition-all ${
                        isSelected
                          ? 'border-[#E05638] bg-[#E05638] text-white'
                          : 'border-black bg-white text-black hover:bg-black hover:text-white'
                      }`}
                    >
                      <span className="tracking-widest">{role}</span>
                      <span>{isSelected ? '✓' : '+'}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: customEase }}
              className="space-y-8"
            >
              <div>
                <h3 className="font-display text-3xl sm:text-5xl font-black uppercase text-black tracking-tighter leading-none">
                  CONTACT & LOCATION
                </h3>
                <p className="text-sm text-gray-500 mt-4 uppercase font-bold tracking-widest">
                  BASIC INFORMATION FOR EARLY ACCESS VERIFICATION.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-sans font-bold uppercase tracking-widest">
                <div>
                  <label className="block text-gray-500 mb-2">Full Name *</label>
                  <input
                    type="text"
                    placeholder="Varun Nair"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full border-2 border-black bg-transparent p-4 text-black focus:border-[#E05638] focus:outline-none placeholder-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-gray-500 mb-2">Email Address *</label>
                  <input
                    type="email"
                    placeholder="varun@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border-2 border-black bg-transparent p-4 text-black focus:border-[#E05638] focus:outline-none placeholder-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-gray-500 mb-2">Mobile Number *</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border-2 border-black bg-transparent p-4 text-black focus:border-[#E05638] focus:outline-none placeholder-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-gray-500 mb-2">WhatsApp Available?</label>
                  <div className="flex gap-6 pt-3 text-black">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="whatsapp"
                        checked={formData.whatsapp_available === true}
                        onChange={() => setFormData({ ...formData, whatsapp_available: true })}
                        className="w-4 h-4 accent-black"
                      />
                      <span>YES</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="whatsapp"
                        checked={formData.whatsapp_available === false}
                        onChange={() => setFormData({ ...formData, whatsapp_available: false })}
                        className="w-4 h-4 accent-black"
                      />
                      <span>NO</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-500 mb-2">Current State</label>
                  <select
                    value={formData.state}
                    onChange={(e) => {
                      const newState = e.target.value;
                      const cities = INDIAN_STATES_AND_CITIES[newState] || [];
                      setFormData({
                        ...formData,
                        state: newState,
                        city: cities[0] || 'Other'
                      });
                    }}
                    className="w-full border-2 border-black bg-transparent p-4 text-black focus:border-[#E05638] focus:outline-none"
                  >
                    {Object.keys(INDIAN_STATES_AND_CITIES).map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-500 mb-2">Current City</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full border-2 border-black bg-transparent p-4 text-black focus:border-[#E05638] focus:outline-none"
                  >
                    {availableCities.map((ct) => (
                      <option key={ct} value={ct}>{ct}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-500 mb-2">Native Language</label>
                  <select
                    value={formData.native_language}
                    onChange={(e) => setFormData({ ...formData, native_language: e.target.value })}
                    className="w-full border-2 border-black bg-transparent p-4 text-black focus:border-[#E05638] focus:outline-none"
                  >
                    {LANGUAGES_LIST.map((lang) => (
                      <option key={lang} value={lang}>{lang}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-500 mb-2">Years in Industry</label>
                  <select
                    value={formData.years_in_industry}
                    onChange={(e) => setFormData({ ...formData, years_in_industry: e.target.value })}
                    className="w-full border-2 border-black bg-transparent p-4 text-black focus:border-[#E05638] focus:outline-none"
                  >
                    {YEARS_IN_INDUSTRY_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: customEase }}
              className="space-y-8 max-h-[460px] overflow-y-auto pr-2 text-xs font-sans font-bold uppercase tracking-widest"
            >
              {isTalent && (
                <div className="space-y-8">
                  <div className="border-b-[3px] border-black pb-4">
                    <h4 className="font-display text-2xl font-black text-black uppercase tracking-tighter">
                      TALENT & PHYSICAL SPECIFICATIONS
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-500 mb-2">Gender</label>
                      <select
                        value={formData.gender}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                        className="w-full border-2 border-black bg-transparent p-4 text-black focus:border-[#E05638] focus:outline-none"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-binary">Non-binary</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-500 mb-2">Playing Age Range</label>
                      <select
                        value={formData.playing_age_range}
                        onChange={(e) => setFormData({ ...formData, playing_age_range: e.target.value })}
                        className="w-full border-2 border-black bg-transparent p-4 text-black focus:border-[#E05638] focus:outline-none"
                      >
                        {["10–15", "16–20", "21–25", "26–30", "31–35", "36–40", "41–50", "51–60", "60+"].map((rg) => (
                          <option key={rg} value={rg}>{rg} Years</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-500 mb-4">Specialized Skills (Select All)</label>
                    <div className="flex flex-wrap gap-3 font-mono text-xs font-bold">
                      {SKILLS_OPTIONS.map((sk) => {
                        const isSel = (formData.skills || []).includes(sk);
                        return (
                          <button
                            key={sk}
                            type="button"
                            onClick={() => toggleMultiSelect('skills', sk)}
                            className={`px-4 py-2 border-2 transition-colors ${
                              isSel
                                ? 'bg-black border-black text-white'
                                : 'bg-transparent border-gray-300 text-gray-500 hover:border-black hover:text-black'
                            }`}
                          >
                            {sk.toUpperCase()}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {isIndustry && (
                <div className="space-y-8">
                  <div className="border-b-[3px] border-black pb-4">
                    <h4 className="font-display text-2xl font-black text-black uppercase tracking-tighter">
                      INDUSTRY PRODUCTION SPECIFICATIONS
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-500 mb-2">Company / Production House</label>
                      <input
                        type="text"
                        placeholder="Wayfarer Films / Independent"
                        value={formData.company_name || ''}
                        onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                        className="w-full border-2 border-black bg-transparent p-4 text-black focus:border-[#E05638] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-500 mb-2">Casting Frequency</label>
                      <select
                        value={formData.casting_frequency}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onChange={(e) => setFormData({ ...formData, casting_frequency: e.target.value as any })}
                        className="w-full border-2 border-black bg-transparent p-4 text-black focus:border-[#E05638] focus:outline-none"
                      >
                        {["Daily", "Several times a week", "Weekly", "Monthly", "Occasionally"].map((fq) => (
                          <option key={fq} value={fq}>{fq}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: customEase }}
              className="space-y-8 max-h-[460px] overflow-y-auto pr-2 text-xs font-sans font-bold uppercase tracking-widest"
            >
              <div>
                <h3 className="font-display text-3xl sm:text-5xl font-black uppercase text-black tracking-tighter leading-none">
                  MARKET VALIDATION
                </h3>
                <p className="text-sm text-gray-500 mt-4 uppercase font-bold tracking-widest">
                  HELP US TAILOR KASTING KOMPANY FOR YOUR SPECIFIC PRODUCTION NEEDS.
                </p>
              </div>

              <div>
                <label className="block text-gray-500 mb-4">
                  What are your biggest challenges when casting?
                </label>
                <div className="flex flex-wrap gap-3 font-mono text-xs font-bold">
                  {CASTING_CHALLENGES_OPTIONS.map((ch) => {
                    const isSel = (formData.biggest_problems || []).includes(ch);
                    return (
                      <button
                        key={ch}
                        type="button"
                        onClick={() => toggleMultiSelect('biggest_problems', ch)}
                        className={`px-4 py-2 border-2 transition-colors ${
                          isSel
                            ? 'bg-black border-black text-white'
                            : 'bg-transparent border-gray-300 text-gray-500 hover:border-black hover:text-black'
                        }`}
                      >
                        {ch.toUpperCase()}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="border-2 border-black bg-gray-50 p-6 space-y-6">
                <label className="block text-black text-sm">
                  Imagine searching: &ldquo;Male + 35–45 + Beard + Malayalam + Kochi + Available Tomorrow&rdquo; and instantly notifying matching talent. How useful would this be?
                </label>
                <div className="flex items-center gap-4">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setFormData({ ...formData, usefulness_score: num })}
                      className={`h-14 w-14 border-2 font-display text-xl font-black flex items-center justify-center transition-all ${
                        formData.usefulness_score === num
                          ? 'bg-[#E05638] border-[#E05638] text-white'
                          : 'bg-white border-black text-black hover:bg-black hover:text-white'
                      }`}
                    >
                      {num}★
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: customEase }}
              className="py-12 text-center space-y-8 font-sans"
            >
              <div className="space-y-4">
                <h3 className="font-display text-5xl font-black uppercase text-black tracking-tighter">
                  YOU&apos;RE ON THE LIST.
                </h3>
                <p className="font-sans text-sm font-bold uppercase tracking-widest text-[#E05638]">
                  WELCOME TO KASTING KOMPANY.
                </p>
              </div>

              <div className="border-2 border-black p-8 text-sm text-black font-bold uppercase tracking-widest leading-relaxed max-w-lg mx-auto">
                {isTalent ? (
                  <p>
                    &ldquo;Once we&apos;re live, you&apos;ll be able to build your creative identity, showcase your work, and receive relevant casting opportunities.&rdquo;
                  </p>
                ) : (
                  <p>
                    &ldquo;Once we&apos;re live, you&apos;ll be able to discover talent, create casting requirements, and reach matching professionals faster.&rdquo;
                  </p>
                )}
              </div>

              <div className="pt-8 border-t-[3px] border-black max-w-lg mx-auto space-y-6">
                <h4 className="font-display text-2xl font-black uppercase tracking-tighter text-black">
                  WANT TO HELP US BUILD IT?
                </h4>

                {earlyTestingJoined ? (
                  <div className="p-4 bg-black text-white text-xs font-bold uppercase tracking-widest">
                    ✓ EARLY ACCESS TESTING REQUESTED! WE WILL CONTACT YOU FIRST.
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleJoinEarlyTesting}
                    className="w-full bg-[#E05638] py-5 text-sm font-bold uppercase tracking-widest text-white hover:bg-black transition-colors"
                  >
                    JOIN EARLY TESTING COMMUNITY &rarr;
                  </button>
                )}
              </div>

              <div className="pt-8">
                <button
                  onClick={onClose}
                  className="border-b-2 border-black pb-1 text-xs font-bold uppercase tracking-widest text-black hover:text-[#E05638] hover:border-[#E05638] transition-colors"
                >
                  RETURN TO WEBSITE
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal Controls Bar */}
        {step < 5 && (
          <div className="mt-12 pt-6 border-t-[3px] border-black flex items-center justify-between font-sans text-xs font-bold uppercase tracking-widest">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-4 border-2 border-black text-black hover:bg-black hover:text-white transition-colors"
              >
                &larr; BACK
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-8 py-4 bg-black text-white hover:bg-[#E05638] transition-colors"
              >
                CONTINUE &rarr;
              </button>
            ) : (
              <button
                type="button"
                disabled={submitting}
                onClick={handleSubmit}
                className="px-8 py-4 bg-[#E05638] text-white hover:bg-black transition-colors disabled:opacity-50"
              >
                {submitting ? 'SAVING...' : 'SUBMIT APPLICATION ✓'}
              </button>
            )}
          </div>
        )}

      </motion.div>
    </div>
  );
};
