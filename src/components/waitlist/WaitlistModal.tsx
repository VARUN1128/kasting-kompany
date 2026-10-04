'use client';

import React, { useState, useEffect } from 'react';
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
];

const CASTING_CHALLENGES_OPTIONS = [
  "Finding the right look", "Finding people quickly", "Finding available people",
  "Finding people in a specific location", "Finding large numbers of people",
  "Contacting artists", "Getting responses", "Managing shortlisted artists",
  "Last-minute replacements", "No-shows", "Maintaining artist database",
  "Coordinating shoot details", "Payments", "Other"
];

export const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose, initialRole }) => {
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
      alert('PLEASE SELECT AT LEAST ONE ROLE TO PROCEED.');
      return;
    }
    if (step === 2) {
      if (!formData.full_name || !formData.phone || !formData.email) {
        alert('PLEASE FILL IN YOUR NAME, MOBILE NUMBER, AND EMAIL.');
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
      alert('FAILED TO SUBMIT APPLICATION. PLEASE TRY AGAIN.');
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 overflow-y-auto">
      <div className="relative w-full max-w-2xl border-heavy border-black bg-white p-6 sm:p-8 shadow-none my-auto text-black font-body">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 font-mono text-xs font-bold uppercase bg-black text-white px-2 py-1 border-2 border-black hover:bg-white hover:text-black transition-colors"
          aria-label="Close Modal"
        >
          [CLOSE X]
        </button>

        {/* Modal Header & Progress Indicator */}
        {step < 5 && (
          <div className="mb-6 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b-3 border-black pb-2 font-bold uppercase">
              <span className="font-headline text-sm">[EARLY ACCESS WAITLIST]</span>
              <span>STEP 0{step} OF 04</span>
            </div>

            {/* Step Progress Bar */}
            <div className="grid grid-cols-4 gap-2">
              {["01. ROLE", "02. INFO", "03. PROFILE", "04. NEEDS"].map((label, idx) => {
                const stepNum = idx + 1;
                const isCompleted = step > stepNum;
                const isCurrent = step === stepNum;
                return (
                  <div key={idx} className="space-y-1">
                    <div
                      className={`h-3 border-2 border-black ${
                        isCompleted || isCurrent ? 'bg-black' : 'bg-[#F0F0F0]'
                      }`}
                    />
                    <span className={`font-bold block truncate text-[10px] ${isCurrent ? 'text-black font-headline' : 'text-slate-600'}`}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 1: ROLE SELECTION */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="font-headline text-2xl text-black uppercase">
                WHAT BRINGS YOU TO KASTING KOMPANY?
              </h3>
              <p className="font-body text-xs text-black mt-1 font-semibold uppercase">
                SELECT ALL ROLES THAT BEST DESCRIBE YOUR POSITION IN THE CREATIVE NETWORK.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[360px] overflow-y-auto pr-1 font-mono text-xs">
              {ALL_ROLES.map((role) => {
                const isSelected = formData.roles.includes(role);
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => toggleRole(role)}
                    className={`p-3.5 border-3 border-black text-left flex items-center justify-between uppercase font-bold transition-all ${
                      isSelected
                        ? 'bg-black text-white'
                        : 'bg-white text-black hover:bg-black hover:text-white'
                    }`}
                  >
                    <span>{role}</span>
                    <span>{isSelected ? '[✓]' : '[+]'}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: COMMON CONTACT & LOCATION INFO */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h3 className="font-headline text-2xl text-black uppercase">
                CONTACT & INDUSTRY INFORMATION
              </h3>
              <p className="font-body text-xs text-black mt-1 font-semibold uppercase">
                BASIC INFORMATION SO FOUNDERS CAN VERIFY EARLY ACCESS.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              
              {/* Full Name */}
              <div>
                <label className="block font-headline text-xs uppercase mb-1">FULL NAME *</label>
                <input
                  type="text"
                  placeholder="VARUN NAIR"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="input-raw"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-headline text-xs uppercase mb-1">EMAIL ADDRESS *</label>
                <input
                  type="email"
                  placeholder="VARUN@EXAMPLE.COM"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-raw"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block font-headline text-xs uppercase mb-1">MOBILE PHONE NUMBER *</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="input-raw"
                />
              </div>

              {/* WhatsApp Radio (RawBlock Circle Dot exception) */}
              <div>
                <label className="block font-headline text-xs uppercase mb-1">WHATSAPP AVAILABLE?</label>
                <div className="flex gap-6 pt-2 font-bold">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span
                      onClick={() => setFormData({ ...formData, whatsapp_available: true })}
                      className="h-5 w-5 border-3 border-black raw-radio-dot flex items-center justify-center bg-white"
                    >
                      {formData.whatsapp_available && <span className="h-2.5 w-2.5 bg-black raw-radio-dot" />}
                    </span>
                    <span>YES</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span
                      onClick={() => setFormData({ ...formData, whatsapp_available: false })}
                      className="h-5 w-5 border-3 border-black raw-radio-dot flex items-center justify-center bg-white"
                    >
                      {!formData.whatsapp_available && <span className="h-2.5 w-2.5 bg-black raw-radio-dot" />}
                    </span>
                    <span>NO</span>
                  </label>
                </div>
              </div>

              {/* State */}
              <div>
                <label className="block font-headline text-xs uppercase mb-1">CURRENT STATE</label>
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
                  className="input-raw uppercase"
                >
                  {Object.keys(INDIAN_STATES_AND_CITIES).map((st) => (
                    <option key={st} value={st}>{st.toUpperCase()}</option>
                  ))}
                </select>
              </div>

              {/* City (Dependent) */}
              <div>
                <label className="block font-headline text-xs uppercase mb-1">CURRENT CITY</label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="input-raw uppercase"
                >
                  {availableCities.map((ct) => (
                    <option key={ct} value={ct}>{ct.toUpperCase()}</option>
                  ))}
                </select>
              </div>

              {/* Native Language */}
              <div>
                <label className="block font-headline text-xs uppercase mb-1">NATIVE LANGUAGE</label>
                <select
                  value={formData.native_language}
                  onChange={(e) => setFormData({ ...formData, native_language: e.target.value })}
                  className="input-raw uppercase"
                >
                  {LANGUAGES_LIST.map((lang) => (
                    <option key={lang} value={lang}>{lang.toUpperCase()}</option>
                  ))}
                </select>
              </div>

              {/* Years in Industry */}
              <div>
                <label className="block font-headline text-xs uppercase mb-1">YEARS IN INDUSTRY</label>
                <select
                  value={formData.years_in_industry}
                  onChange={(e) => setFormData({ ...formData, years_in_industry: e.target.value })}
                  className="input-raw uppercase"
                >
                  {YEARS_IN_INDUSTRY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt.toUpperCase()}</option>
                  ))}
                </select>
              </div>

            </div>
          </div>
        )}

        {/* STEP 3: ROLE-SPECIFIC DETAILED BRANCHING */}
        {step === 3 && (
          <div className="space-y-5 max-h-[420px] overflow-y-auto pr-1 font-mono text-xs">
            
            {/* IF TALENT ROLE */}
            {isTalent && (
              <div className="space-y-4">
                <div className="border-b-3 border-black pb-2">
                  <h4 className="font-headline text-lg text-black uppercase">
                    TALENT & PHYSICAL PROFILE ATTRIBUTES
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-headline text-xs uppercase mb-1">GENDER</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                      className="input-raw uppercase"
                    >
                      <option value="Male">MALE</option>
                      <option value="Female">FEMALE</option>
                      <option value="Non-binary">NON-BINARY</option>
                      <option value="Prefer not to say">PREFER NOT TO SAY</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-headline text-xs uppercase mb-1">PLAYING AGE RANGE</label>
                    <select
                      value={formData.playing_age_range}
                      onChange={(e) => setFormData({ ...formData, playing_age_range: e.target.value })}
                      className="input-raw uppercase"
                    >
                      {["10–15", "16–20", "21–25", "26–30", "31–35", "36–40", "41–50", "51–60", "60+"].map((rg) => (
                        <option key={rg} value={rg}>{rg} YEARS</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-headline text-xs uppercase mb-1">HEIGHT</label>
                    <select
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                      className="input-raw uppercase"
                    >
                      {["Below 150 cm", "150–160 cm", "161–170 cm", "171–180 cm", "181–190 cm", "191+ cm"].map((h) => (
                        <option key={h} value={h}>{h.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-headline text-xs uppercase mb-1">BUILD</label>
                    <select
                      value={formData.build}
                      onChange={(e) => setFormData({ ...formData, build: e.target.value })}
                      className="input-raw uppercase"
                    >
                      {["Slim", "Average", "Athletic", "Muscular", "Heavy", "Plus-size"].map((b) => (
                        <option key={b} value={b}>{b.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Skills Chips */}
                <div>
                  <label className="block font-headline text-xs uppercase mb-2">SPECIALIZED SKILLS (SELECT ALL)</label>
                  <div className="flex flex-wrap gap-1.5 font-mono text-[11px] font-bold">
                    {SKILLS_OPTIONS.map((sk) => {
                      const isSel = (formData.skills || []).includes(sk);
                      return (
                        <button
                          key={sk}
                          type="button"
                          onClick={() => toggleMultiSelect('skills', sk)}
                          className={`chip-filter ${isSel ? 'active' : ''}`}
                        >
                          {sk.toUpperCase()}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* IF INDUSTRY ROLE */}
            {isIndustry && (
              <div className="space-y-4">
                <div className="border-b-3 border-black pb-2">
                  <h4 className="font-headline text-lg text-black uppercase">
                    INDUSTRY PRODUCTION DETAILS
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-headline text-xs uppercase mb-1">PRODUCTION HOUSE / COMPANY</label>
                    <input
                      type="text"
                      placeholder="WAYFARER FILMS / INDEPENDENT"
                      value={formData.company_name || ''}
                      onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                      className="input-raw"
                    />
                  </div>

                  <div>
                    <label className="block font-headline text-xs uppercase mb-1">TYPICAL CAST SIZE PER PROJECT</label>
                    <select
                      value={formData.typical_cast_size}
                      onChange={(e) => setFormData({ ...formData, typical_cast_size: e.target.value as any })}
                      className="input-raw uppercase"
                    >
                      {["1–5", "6–20", "21–50", "51–100", "101–500", "500+"].map((sz) => (
                        <option key={sz} value={sz}>{sz} PEOPLE</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-headline text-xs uppercase mb-1">CASTING FREQUENCY</label>
                    <select
                      value={formData.casting_frequency}
                      onChange={(e) => setFormData({ ...formData, casting_frequency: e.target.value as any })}
                      className="input-raw uppercase"
                    >
                      {["Daily", "Several times a week", "Weekly", "Monthly", "Occasionally"].map((fq) => (
                        <option key={fq} value={fq}>{fq.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-headline text-xs uppercase mb-2">CURRENT SOURCING METHODS</label>
                  <div className="flex flex-wrap gap-1.5 font-mono text-[11px] font-bold">
                    {SOURCING_METHODS_OPTIONS.map((sm) => {
                      const isSel = (formData.current_sourcing_methods || []).includes(sm);
                      return (
                        <button
                          key={sm}
                          type="button"
                          onClick={() => toggleMultiSelect('current_sourcing_methods', sm)}
                          className={`chip-filter ${isSel ? 'active' : ''}`}
                        >
                          {sm.toUpperCase()}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* STEP 4: VALIDATION QUESTIONS & INTENT */}
        {step === 4 && (
          <div className="space-y-5 max-h-[420px] overflow-y-auto pr-1 font-mono text-xs">
            <div>
              <h3 className="font-headline text-2xl text-black uppercase">
                MARKET & PROBLEM VALIDATION
              </h3>
              <p className="font-body text-xs text-black font-semibold uppercase mt-1">
                HELP US DESIGN KASTING KOMPANY SPECIFICALLY FOR YOUR WORKFLOW NEEDS.
              </p>
            </div>

            {/* Biggest Challenges */}
            <div>
              <label className="block font-headline text-xs uppercase mb-2">
                WHAT ARE YOUR BIGGEST CHALLENGES WHEN CASTING? (SELECT ALL)
              </label>
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px] font-bold">
                {CASTING_CHALLENGES_OPTIONS.map((ch) => {
                  const isSel = (formData.biggest_problems || []).includes(ch);
                  return (
                    <button
                      key={ch}
                      type="button"
                      onClick={() => toggleMultiSelect('biggest_problems', ch)}
                      className={`chip-filter ${isSel ? 'active' : ''}`}
                    >
                      {ch.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Rating usefulness */}
            <div className="border-3 border-black bg-[#F0F0F0] p-4 space-y-3">
              <label className="block font-headline text-xs uppercase text-black">
                IMAGINE SEARCHING: &ldquo;MALE + 35–45 + BEARD + MALAYALAM + KOCHI + AVAILABLE TOMORROW&rdquo; AND INSTANTLY NOTIFYING MATCHING PEOPLE. HOW USEFUL WOULD THIS BE?
              </label>
              <div className="flex items-center gap-3">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setFormData({ ...formData, usefulness_score: num })}
                    className={`h-10 w-10 border-3 border-black font-headline text-sm flex items-center justify-center transition-all ${
                      formData.usefulness_score === num
                        ? 'bg-black text-white'
                        : 'bg-white text-black hover:bg-black hover:text-white'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Would Use Rating */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-headline text-xs uppercase mb-1">WOULD YOU USE THIS PLATFORM?</label>
                <select
                  value={formData.would_use}
                  onChange={(e) => setFormData({ ...formData, would_use: e.target.value as any })}
                  className="input-raw uppercase"
                >
                  {["Definitely", "Probably", "Maybe", "Probably not", "No"].map((opt) => (
                    <option key={opt} value={opt}>{opt.toUpperCase()}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-headline text-xs uppercase mb-1">PREFERRED PAYMENT MODEL</label>
                <select
                  value={formData.preferred_payment_model}
                  onChange={(e) => setFormData({ ...formData, preferred_payment_model: e.target.value as any })}
                  className="input-raw uppercase"
                >
                  {["Free", "Monthly subscription", "Per project", "Per casting requirement", "Not sure"].map((opt) => (
                    <option key={opt} value={opt}>{opt.toUpperCase()}</option>
                  ))}
                </select>
              </div>
            </div>

          </div>
        )}

        {/* STEP 5: SUCCESS & EARLY TESTING ACCESS SCREEN */}
        {step === 5 && (
          <div className="py-6 text-center space-y-6 font-mono">
            <div className="mx-auto h-16 w-16 bg-black text-white font-headline text-3xl flex items-center justify-center border-3 border-black">
              ✓
            </div>

            <div className="space-y-2">
              <h3 className="font-headline text-3xl text-black uppercase">
                YOU&apos;RE ON THE LIST.
              </h3>
              <p className="font-headline text-sm text-black bg-black text-white inline-block px-3 py-1 uppercase">
                WELCOME TO KASTING KOMPANY.
              </p>
            </div>

            <div className="border-3 border-black bg-[#F0F0F0] p-5 text-xs text-black font-bold uppercase max-w-md mx-auto">
              {isTalent ? (
                <p>
                  &ldquo;ONCE WE&apos;RE LIVE, YOU&apos;LL BE ABLE TO BUILD YOUR CREATIVE IDENTITY, SHOWCASE YOUR WORK, AND RECEIVE RELEVANT CASTING OPPORTUNITIES DIRECTLY.&rdquo;
                </p>
              ) : (
                <p>
                  &ldquo;ONCE WE&apos;RE LIVE, YOU&apos;LL BE ABLE TO DISCOVER TALENT, CREATE CASTING REQUIREMENTS, AND REACH MATCHING PROFESSIONALS FASTER THAN EVER.&rdquo;
                </p>
              )}
            </div>

            {/* Early Testing Conversion Box */}
            <div className="pt-2 border-t-3 border-black max-w-md mx-auto space-y-4">
              <h4 className="font-headline text-sm text-black uppercase">
                WANT TO HELP US BUILD IT?
              </h4>

              {earlyTestingJoined ? (
                <div className="p-3 border-3 border-black bg-black text-white text-xs font-headline uppercase">
                  ✓ EARLY ACCESS TESTING REQUESTED! WE WILL CONTACT YOU FIRST.
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleJoinEarlyTesting}
                  className="w-full btn-raw-primary text-center justify-center py-4 text-xs"
                >
                  JOIN EARLY TESTING COMMUNITY &rarr;
                </button>
              )}
            </div>

            <div className="pt-4">
              <button
                onClick={onClose}
                className="btn-raw-secondary font-mono text-xs py-2 px-6"
              >
                [CLOSE & RETURN HOME]
              </button>
            </div>
          </div>
        )}

        {/* Modal Controls Bar */}
        {step < 5 && (
          <div className="mt-8 pt-4 border-t-3 border-black flex items-center justify-between font-headline">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="btn-raw-secondary text-xs py-2 px-4"
              >
                &larr; BACK
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn-raw-primary text-xs py-2.5 px-6"
              >
                CONTINUE &rarr;
              </button>
            ) : (
              <button
                type="button"
                disabled={submitting}
                onClick={handleSubmit}
                className="btn-raw-primary text-xs py-2.5 px-7 disabled:opacity-50"
              >
                {submitting ? 'SAVING...' : 'SUBMIT APPLICATION ✓'}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
