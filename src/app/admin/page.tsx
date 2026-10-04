'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { FullWaitlistUser, UserRoleType } from '@/lib/types';
import { fetchWaitlistFromSupabase, addAdminNote } from '@/lib/data-store';
import { INDIAN_STATES_AND_CITIES } from '@/lib/indian-locations';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [authError, setAuthError] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'analytics'>('overview');
  const [users, setUsers] = useState<FullWaitlistUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<FullWaitlistUser | null>(null);
  const [noteInput, setNoteInput] = useState<string>('');

  // Filters State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [stateFilter, setStateFilter] = useState<string>('All');
  const [tierFilter, setTierFilter] = useState<string>('All');
  const [frequencyFilter, setFrequencyFilter] = useState<string>('All');
  const [usefulnessFilter, setUsefulnessFilter] = useState<string>('All');

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchWaitlistFromSupabase();
      setUsers(data);
    } catch (err) {
      console.error('Failed to load waitlist entries:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated, loadData]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      emailInput.trim().toLowerCase() === 'varunharidas.in@gmail.com' &&
      passwordInput.trim() === 'developer@2026'
    ) {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmailInput('');
    setPasswordInput('');
    setAuthError(false);
  };

  const highIntentUsers = useMemo(() => {
    return users.filter((u) => {
      const isIndustryRole = u.roles.some((r) =>
        ['Casting Director', 'Casting Coordinator', 'Assistant Director', 'Production Controller', 'Director', 'Production Professional'].includes(r)
      );
      const freq = u.professional_profile?.casting_frequency;
      const frequentCasting = freq === 'Daily' || freq === 'Several times a week' || freq === 'Weekly';
      const castSize = u.professional_profile?.typical_cast_size;
      const largeCast = castSize && ['21–50', '51–100', '101–500', '500+'].includes(castSize);
      const score = u.validation_response?.usefulness_score || 0;
      const wouldUse = u.validation_response?.would_use;

      return isIndustryRole && (frequentCasting || largeCast || score >= 4 || wouldUse === 'Definitely');
    });
  }, [users]);

  const metrics = useMemo(() => {
    const total = users.length;
    const actors = users.filter((u) => u.roles.includes('Actor')).length;
    const juniorArtists = users.filter((u) => u.roles.includes('Junior Artist')).length;
    const castingDirectors = users.filter((u) => u.roles.includes('Casting Director')).length;
    const castingCoordinators = users.filter((u) => u.roles.includes('Casting Coordinator')).length;
    const assistantDirectors = users.filter((u) => u.roles.includes('Assistant Director')).length;
    const productionControllers = users.filter((u) => u.roles.includes('Production Controller')).length;
    const totalIndustry = users.filter((u) =>
      u.roles.some((r) => ['Casting Director', 'Casting Coordinator', 'Assistant Director', 'Production Controller', 'Director', 'Production Professional'].includes(r))
    ).length;

    const hotLeads = users.filter((u) => u.waitlist.lead_tier === 'HOT').length;

    return {
      total,
      actors,
      juniorArtists,
      castingDirectors,
      castingCoordinators,
      assistantDirectors,
      productionControllers,
      totalIndustry,
      hotLeads
    };
  }, [users]);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const text = `${u.user.full_name} ${u.user.email} ${u.user.city} ${u.user.state} ${u.roles.join(' ')} ${u.professional_profile?.company_name || ''}`.toLowerCase();
      if (searchQuery && !text.includes(searchQuery.toLowerCase())) return false;
      if (roleFilter !== 'All' && !u.roles.includes(roleFilter as UserRoleType)) return false;
      if (stateFilter !== 'All' && u.user.state !== stateFilter) return false;
      if (tierFilter !== 'All' && u.waitlist.lead_tier !== tierFilter) return false;
      if (frequencyFilter !== 'All' && u.professional_profile?.casting_frequency !== frequencyFilter) return false;
      if (usefulnessFilter !== 'All' && String(u.validation_response?.usefulness_score) !== usefulnessFilter) return false;
      return true;
    });
  }, [users, searchQuery, roleFilter, stateFilter, tierFilter, frequencyFilter, usefulnessFilter]);

  const exportToCSV = () => {
    const headers = [
      'ID', 'Name', 'Email', 'Phone', 'WhatsApp', 'State', 'City', 'Roles', 'Years in Industry',
      'Lead Tier', 'Lead Score', 'Casting Freq', 'Cast Size', 'Usefulness Score', 'Would Use', 'Payment Model', 'Willingness to Pay', 'Early Access'
    ];
    const rows = filteredUsers.map((u) => [
      u.user.id,
      `"${u.user.full_name}"`,
      u.user.email,
      u.user.phone,
      u.user.whatsapp_available ? 'Yes' : 'No',
      `"${u.user.state}"`,
      `"${u.user.city}"`,
      `"${u.roles.join(', ')}"`,
      `"${u.user.years_in_industry}"`,
      u.waitlist.lead_tier,
      u.waitlist.lead_score,
      `"${u.professional_profile?.casting_frequency || 'N/A'}"`,
      `"${u.professional_profile?.typical_cast_size || 'N/A'}"`,
      u.validation_response?.usefulness_score || 'N/A',
      u.validation_response?.would_use || 'N/A',
      `"${u.validation_response?.preferred_payment_model || 'N/A'}"`,
      `"${u.validation_response?.willingness_to_pay || 'N/A'}"`,
      u.waitlist.early_access_requested ? 'Yes' : 'No'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `kasting_kompany_waitlist_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddNote = async () => {
    if (!selectedUser || !noteInput.trim()) return;
    await addAdminNote(selectedUser.user.id, noteInput.trim());
    setNoteInput('');
    const updatedList = await fetchWaitlistFromSupabase();
    setUsers(updatedList);
    const updatedUser = updatedList.find(u => u.user.id === selectedUser.user.id);
    if (updatedUser) setSelectedUser(updatedUser);
  };

  const roleChartData = useMemo(() => {
    const counts: Record<string, number> = {};
    users.forEach(u => {
      u.roles.forEach(r => {
        counts[r] = (counts[r] || 0) + 1;
      });
    });
    return Object.keys(counts).map(k => ({ name: k, count: counts[k] }));
  }, [users]);

  const stateChartData = useMemo(() => {
    const counts: Record<string, number> = {};
    users.forEach(u => {
      counts[u.user.state] = (counts[u.user.state] || 0) + 1;
    });
    return Object.keys(counts).map(k => ({ name: k, count: counts[k] }));
  }, [users]);

  const paymentModelData = useMemo(() => {
    const counts: Record<string, number> = {};
    users.forEach(u => {
      const pm = u.validation_response?.preferred_payment_model || 'Unspecified';
      counts[pm] = (counts[pm] || 0) + 1;
    });
    return Object.keys(counts).map(k => ({ name: k, value: counts[k] }));
  }, [users]);

  const COLORS = ['#000000', '#E05638', '#444444', '#888888', '#CCCCCC'];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md border-[4px] border-black bg-white p-8 space-y-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          
          <div className="text-center space-y-4">
            <div className="mx-auto h-16 w-16 bg-black text-white font-display font-black text-3xl flex items-center justify-center border-2 border-black">
              K
            </div>
            <div>
              <h2 className="font-display text-3xl font-black uppercase tracking-tighter text-black">
                ADMIN PORTAL
              </h2>
              <p className="font-sans text-xs font-bold uppercase tracking-widest text-gray-500 mt-2">
                Kasting Kompany Management Console
              </p>
            </div>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block font-sans text-xs font-bold uppercase tracking-widest text-black">
                ADMIN EMAIL
              </label>
              <input
                type="email"
                required
                placeholder="varunharidas.in@gmail.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full border-2 border-black bg-white p-3 font-sans text-sm font-semibold text-black focus:outline-none focus:bg-yellow-50 transition-colors placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-sans text-xs font-bold uppercase tracking-widest text-black">
                PASSWORD
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full border-2 border-black bg-white p-3 font-sans text-sm font-semibold text-black focus:outline-none focus:bg-yellow-50 transition-colors placeholder:text-gray-400"
              />
            </div>

            {authError && (
              <div className="p-3 border-2 border-red-600 bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
                [!] Invalid email or password. Access denied.
              </div>
            )}

            <button
              type="submit"
              className="w-full border-2 border-black bg-black py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-[#E05638] hover:border-[#E05638] transition-colors"
            >
              AUTHENTICATE &rarr;
            </button>
          </form>

          <div className="text-center pt-2 border-t-2 border-black">
            <Link href="/" className="font-sans text-xs font-bold uppercase tracking-widest text-gray-600 hover:text-black transition-colors">
              &larr; Return to Main Site
            </Link>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-30 border-b-[3px] border-black bg-black text-white py-4 px-6 sm:px-12">
        <div className="mx-auto max-w-screen-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-sans">
          
          <div className="flex items-center gap-6">
            <Link href="/" className="font-sans text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
              &larr; WEBSITE
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center bg-white text-black font-display font-black text-xl tracking-tighter">
                K
              </div>
              <div className="flex items-center gap-2">
                <span className="font-display text-xl font-black uppercase tracking-tighter text-white">
                  KASTING KOMPANY
                </span>
                <span className="bg-[#E05638] text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest">
                  ADMIN PORTAL
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs & Actions */}
          <div className="flex flex-wrap items-center gap-3 font-sans text-xs font-bold uppercase tracking-widest">
            <button
              onClick={loadData}
              className="px-3.5 py-2.5 border-2 border-white bg-transparent text-white hover:bg-white/15 transition-colors flex items-center gap-2"
            >
              ↻ REFRESH
            </button>
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2.5 border-2 border-white transition-colors ${
                activeTab === 'overview'
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-white hover:bg-white/15'
              }`}
            >
              OVERVIEW & LEADS
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2.5 border-2 border-white transition-colors ${
                activeTab === 'users'
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-white hover:bg-white/15'
              }`}
            >
              WAITLIST ({users.length})
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2.5 border-2 border-white transition-colors ${
                activeTab === 'analytics'
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-white hover:bg-white/15'
              }`}
            >
              ANALYTICS
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2.5 border-2 border-[#E05638] bg-[#E05638] text-white hover:bg-black hover:border-white transition-colors"
            >
              LOGOUT ✕
            </button>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-screen-2xl px-6 sm:px-12 py-10 space-y-10">
        
        {/* Loading Indicator */}
        {isLoading && (
          <div className="p-6 border-[3px] border-black bg-yellow-100 text-black font-sans text-xs font-bold uppercase tracking-widest flex items-center gap-3">
            <span className="animate-spin text-lg">⏳</span>
            <span>LOADING WAITLIST DATA...</span>
          </div>
        )}

        {/* Empty State Banner */}
        {!isLoading && users.length === 0 && (
          <div className="p-10 border-[3px] border-black bg-white space-y-4 text-center">
            <h3 className="font-display text-2xl font-black uppercase text-black">NO WAITLIST ENTRIES FOUND</h3>
            <p className="font-sans text-xs font-bold uppercase tracking-widest text-gray-500 max-w-lg mx-auto">
              No entries found yet. Submissions from the main site will appear here.
            </p>
            <Link
              href="/"
              className="inline-block bg-black text-white px-6 py-3 border-2 border-black font-sans text-xs font-bold uppercase tracking-widest hover:bg-[#E05638] hover:border-[#E05638] transition-colors mt-2"
            >
              GO TO MAIN SITE &rarr;
            </Link>
          </div>
        )}

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && users.length > 0 && (
          <div className="space-y-10 font-sans">
            
            {/* Top Stat Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 text-xs">
              {[
                { label: "TOTAL WAITLIST", val: metrics.total, highlight: true },
                { label: "HOT LEADS", val: metrics.hotLeads, hot: true },
                { label: "INDUSTRY PROS", val: metrics.totalIndustry },
                { label: "CASTING DIRS", val: metrics.castingDirectors },
                { label: "COORDINATORS", val: metrics.castingCoordinators },
                { label: "PROD CONTROLLERS", val: metrics.productionControllers },
                { label: "ACTORS", val: metrics.actors },
                { label: "JUNIOR ARTISTS", val: metrics.juniorArtists },
              ].map((card, i) => (
                <div
                  key={i}
                  className={`p-4 border-[3px] border-black flex flex-col justify-between transition-transform hover:-translate-y-0.5 ${
                    card.hot
                      ? 'bg-[#E05638] text-white'
                      : card.highlight
                      ? 'bg-black text-white'
                      : 'bg-white text-black'
                  }`}
                >
                  <span className={`font-sans text-[10px] font-black uppercase tracking-widest block ${card.hot || card.highlight ? 'text-gray-300' : 'text-gray-500'}`}>
                    {card.label}
                  </span>
                  <span className="font-display text-3xl font-black tracking-tighter mt-3 block">
                    {card.val}
                  </span>
                </div>
              ))}
            </div>

            {/* HIGH-INTENT USERS SECTION */}
            <div className="border-[3px] border-black bg-white p-8 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b-[3px] border-black pb-6">
                <div>
                  <h2 className="font-display text-3xl font-black text-black uppercase tracking-tighter">
                    HIGH-INTENT INDUSTRY LEADS
                  </h2>
                  <p className="font-sans text-xs font-bold uppercase tracking-widest text-gray-500 mt-2">
                    Industry decision-makers with frequent casting needs (20+ cast size, high usefulness rating).
                  </p>
                </div>
                <button
                  onClick={() => {
                    setTierFilter('HOT');
                    setActiveTab('users');
                  }}
                  className="bg-black text-white border-2 border-black px-6 py-3 font-sans text-xs font-bold uppercase tracking-widest hover:bg-[#E05638] hover:border-[#E05638] transition-colors self-start sm:self-auto"
                >
                  VIEW ALL HIGH INTENT &rarr;
                </button>
              </div>

              {/* High Intent User Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
                {highIntentUsers.map((item) => (
                  <div
                    key={item.user.id}
                    onClick={() => setSelectedUser(item)}
                    className="border-[3px] border-black bg-white p-6 space-y-4 cursor-pointer hover:border-[#E05638] transition-all group hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <div className="flex items-start justify-between border-b-2 border-black pb-4">
                      <div>
                        <h4 className="font-display text-xl font-black text-black uppercase tracking-tighter group-hover:text-[#E05638] transition-colors">
                          {item.user.full_name}
                        </h4>
                        <p className="font-sans text-xs font-bold text-[#E05638] uppercase tracking-wider mt-1">
                          {item.professional_profile?.professional_role || item.roles.join(', ')}
                        </p>
                        <p className="font-sans text-[11px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">
                          {item.professional_profile?.company_name || 'INDEPENDENT'} · {item.user.city}
                        </p>
                      </div>
                      <span className="px-2.5 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-widest border border-black">
                        {item.waitlist.lead_tier} ({item.waitlist.lead_score} PTS)
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-[11px] font-sans font-bold uppercase border-2 border-black p-3 bg-gray-50">
                      <div>
                        <span className="text-gray-500 block text-[9px] tracking-widest">CASTING FREQ</span>
                        <span className="text-black">{item.professional_profile?.casting_frequency || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-[9px] tracking-widest">CAST SIZE</span>
                        <span className="text-black">{item.professional_profile?.typical_cast_size || 'N/A'} PEOPLE</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-[9px] tracking-widest">USEFULNESS</span>
                        <span className="text-emerald-700">{item.validation_response?.usefulness_score || 'N/A'} / 5 STARS</span>
                      </div>
                      <div>
                        <span className="text-gray-500 block text-[9px] tracking-widest">WILLING TO PAY</span>
                        <span className="text-[#E05638]">{item.validation_response?.willingness_to_pay || 'N/A'}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-black pt-1">
                      <span>SOURCING: {item.professional_profile?.current_sourcing_methods?.[0] || 'WHATSAPP'}</span>
                      <span className="text-[#E05638] group-hover:underline">DETAILS &rarr;</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* WAITLIST TABLE TAB */}
        {activeTab === 'users' && users.length > 0 && (
          <div className="space-y-8 text-xs font-sans">
            
            {/* Filter Bar Controls */}
            <div className="border-[3px] border-black bg-white p-6 space-y-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="SEARCH BY NAME, EMAIL, CITY, ROLE, OR COMPANY..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border-2 border-black bg-white p-3.5 font-sans text-xs font-bold uppercase tracking-wider text-black focus:outline-none focus:bg-yellow-50 placeholder:text-gray-400"
                  />
                </div>

                <button
                  onClick={exportToCSV}
                  className="bg-black text-white border-2 border-black py-3.5 px-6 font-sans text-xs font-bold uppercase tracking-widest hover:bg-[#E05638] hover:border-[#E05638] transition-colors whitespace-nowrap"
                >
                  EXPORT CSV &rarr;
                </button>
              </div>

              {/* Select Dropdown Filters */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                <div>
                  <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">ROLE FILTER</label>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="w-full border-2 border-black bg-white p-2.5 font-sans text-xs font-bold uppercase tracking-wider text-black focus:outline-none"
                  >
                    <option value="All">ALL ROLES</option>
                    <option value="Casting Director">CASTING DIRECTOR</option>
                    <option value="Casting Coordinator">CASTING COORDINATOR</option>
                    <option value="Production Controller">PRODUCTION CONTROLLER</option>
                    <option value="Assistant Director">ASSISTANT DIRECTOR</option>
                    <option value="Director">DIRECTOR</option>
                    <option value="Actor">ACTOR</option>
                    <option value="Junior Artist">JUNIOR ARTIST</option>
                    <option value="Model">MODEL</option>
                  </select>
                </div>

                <div>
                  <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">STATE FILTER</label>
                  <select
                    value={stateFilter}
                    onChange={(e) => setStateFilter(e.target.value)}
                    className="w-full border-2 border-black bg-white p-2.5 font-sans text-xs font-bold uppercase tracking-wider text-black focus:outline-none"
                  >
                    <option value="All">ALL STATES</option>
                    {Object.keys(INDIAN_STATES_AND_CITIES).map((s) => (
                      <option key={s} value={s}>{s.toUpperCase()}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">LEAD TIER</label>
                  <select
                    value={tierFilter}
                    onChange={(e) => setTierFilter(e.target.value)}
                    className="w-full border-2 border-black bg-white p-2.5 font-sans text-xs font-bold uppercase tracking-wider text-black focus:outline-none"
                  >
                    <option value="All">ALL TIERS</option>
                    <option value="HOT">HOT LEADS</option>
                    <option value="WARM">WARM LEADS</option>
                    <option value="COLD">COLD LEADS</option>
                  </select>
                </div>

                <div>
                  <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">CASTING FREQ</label>
                  <select
                    value={frequencyFilter}
                    onChange={(e) => setFrequencyFilter(e.target.value)}
                    className="w-full border-2 border-black bg-white p-2.5 font-sans text-xs font-bold uppercase tracking-wider text-black focus:outline-none"
                  >
                    <option value="All">ALL FREQUENCIES</option>
                    <option value="Daily">DAILY</option>
                    <option value="Several times a week">SEVERAL TIMES A WEEK</option>
                    <option value="Weekly">WEEKLY</option>
                    <option value="Monthly">MONTHLY</option>
                  </select>
                </div>

                <div>
                  <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">USEFULNESS SCORE</label>
                  <select
                    value={usefulnessFilter}
                    onChange={(e) => setUsefulnessFilter(e.target.value)}
                    className="w-full border-2 border-black bg-white p-2.5 font-sans text-xs font-bold uppercase tracking-wider text-black focus:outline-none"
                  >
                    <option value="All">ALL SCORES</option>
                    <option value="5">5 / 5 STARS</option>
                    <option value="4">4 / 5 STARS</option>
                    <option value="3">3 / 5 STARS</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="border-[3px] border-black bg-white overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-black">
                  <thead className="bg-black text-white font-sans text-[11px] font-bold uppercase tracking-widest border-b-[3px] border-black">
                    <tr>
                      <th className="py-4 px-4">LEAD TIER</th>
                      <th className="py-4 px-4">NAME & CONTACT</th>
                      <th className="py-4 px-4">ROLE(S)</th>
                      <th className="py-4 px-4">LOCATION</th>
                      <th className="py-4 px-4">EXP</th>
                      <th className="py-4 px-4">CASTING FREQ</th>
                      <th className="py-4 px-4">CAST SIZE</th>
                      <th className="py-4 px-4">SCORE</th>
                      <th className="py-4 px-4">WILLINGNESS TO PAY</th>
                      <th className="py-4 px-4">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-black font-sans font-bold uppercase">
                    {filteredUsers.map((item) => {
                      const tier = item.waitlist.lead_tier;
                      return (
                        <tr
                          key={item.user.id}
                          className="hover:bg-yellow-50 transition-colors cursor-pointer"
                          onClick={() => setSelectedUser(item)}
                        >
                          <td className="py-4 px-4">
                            <span
                              className={`px-2.5 py-1 text-[10px] font-bold border border-black ${
                                tier === 'HOT'
                                  ? 'bg-[#E05638] text-white'
                                  : tier === 'WARM'
                                  ? 'bg-yellow-400 text-black'
                                  : 'bg-gray-200 text-black'
                              }`}
                            >
                              {tier} ({item.waitlist.lead_score})
                            </span>
                          </td>

                          <td className="py-4 px-4">
                            <div className="font-display font-black text-sm text-black tracking-tight">{item.user.full_name}</div>
                            <div className="text-[11px] text-gray-500 font-bold tracking-wider">{item.user.email}</div>
                          </td>

                          <td className="py-4 px-4 text-[#E05638] tracking-wider">
                            {item.roles.join(', ')}
                          </td>

                          <td className="py-4 px-4">
                            {item.user.city}, {item.user.state}
                          </td>

                          <td className="py-4 px-4">
                            {item.user.years_in_industry}
                          </td>

                          <td className="py-4 px-4">
                            {item.professional_profile?.casting_frequency || 'N/A'}
                          </td>

                          <td className="py-4 px-4">
                            {item.professional_profile?.typical_cast_size || 'N/A'}
                          </td>

                          <td className="py-4 px-4 text-emerald-700">
                            {item.validation_response?.usefulness_score ? `${item.validation_response.usefulness_score}/5★` : 'N/A'}
                          </td>

                          <td className="py-4 px-4 text-[#E05638]">
                            {item.validation_response?.willingness_to_pay || 'N/A'}
                          </td>

                          <td className="py-4 px-4">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedUser(item);
                              }}
                              className="px-3.5 py-1.5 border-2 border-black bg-black hover:bg-[#E05638] text-white text-[10px] font-bold uppercase tracking-widest transition-colors"
                            >
                              DETAILS
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === 'analytics' && users.length > 0 && (
          <div className="space-y-8 font-sans">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              <div className="border-[3px] border-black bg-white p-8 space-y-6">
                <h3 className="font-display text-xl font-black text-black uppercase tracking-tighter">
                  WAITLIST BREAKDOWN BY PROFESSIONAL ROLE
                </h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={roleChartData}>
                      <XAxis dataKey="name" stroke="#000000" fontSize={10} fontWeight="bold" />
                      <YAxis stroke="#000000" fontSize={10} fontWeight="bold" />
                      <Tooltip contentStyle={{ backgroundColor: '#000000', borderColor: '#000000', color: '#ffffff', fontWeight: 'bold' }} />
                      <Bar dataKey="count" fill="#E05638" stroke="#000000" strokeWidth={2} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="border-[3px] border-black bg-white p-8 space-y-6">
                <h3 className="font-display text-xl font-black text-black uppercase tracking-tighter">
                  PREFERRED MONETIZATION & PAYMENT MODELS
                </h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={paymentModelData}
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        dataKey="value"
                        label={({ name, percent }: { name?: string; percent?: number }) => `${name || ''} (${((percent || 0) * 100).toFixed(0)}%)`}
                      >
                        {paymentModelData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="#000000" strokeWidth={2} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#000000', borderColor: '#000000', color: '#ffffff', fontWeight: 'bold' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="border-[3px] border-black bg-white p-8 space-y-6 lg:col-span-2">
                <h3 className="font-display text-xl font-black text-black uppercase tracking-tighter">
                  GEOGRAPHIC DEMAND DISTRIBUTION ACROSS INDIA
                </h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stateChartData}>
                      <XAxis dataKey="name" stroke="#000000" fontSize={11} fontWeight="bold" />
                      <YAxis stroke="#000000" fontSize={11} fontWeight="bold" />
                      <Tooltip contentStyle={{ backgroundColor: '#000000', borderColor: '#000000', color: '#ffffff', fontWeight: 'bold' }} />
                      <Bar dataKey="count" fill="#000000" stroke="#000000" strokeWidth={2} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* USER DETAIL PROFILE DRAWER MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs font-sans">
          <div className="w-full max-w-xl bg-white border-l-[4px] border-black p-8 space-y-6 overflow-y-auto text-black">
            
            <div className="flex items-start justify-between border-b-[3px] border-black pb-6">
              <div>
                <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest border border-black bg-[#E05638] text-white">
                  {selectedUser.waitlist.lead_tier} LEAD ({selectedUser.waitlist.lead_score} PTS)
                </span>
                <h3 className="font-display text-3xl font-black text-black uppercase tracking-tighter mt-4">{selectedUser.user.full_name}</h3>
                <p className="font-sans text-xs font-bold text-[#E05638] uppercase tracking-wider mt-1">{selectedUser.roles.join(', ')}</p>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="font-sans text-xs font-bold uppercase tracking-widest text-white bg-black hover:bg-[#E05638] px-3 py-1.5 border-2 border-black transition-colors"
              >
                CLOSE ✕
              </button>
            </div>

            <div className="border-2 border-black bg-gray-50 p-5 space-y-3 text-xs font-bold uppercase">
              <h4 className="font-display text-sm font-black text-black tracking-tight border-b-2 border-black pb-2">CONTACT DETAILS (CONFIDENTIAL)</h4>
              <div className="grid grid-cols-2 gap-3 text-black">
                <div><span className="text-gray-500 text-[10px] block">EMAIL</span> {selectedUser.user.email}</div>
                <div><span className="text-gray-500 text-[10px] block">PHONE</span> {selectedUser.user.phone}</div>
                <div><span className="text-gray-500 text-[10px] block">WHATSAPP AVAILABLE</span> {selectedUser.user.whatsapp_available ? 'YES' : 'NO'}</div>
                <div><span className="text-gray-500 text-[10px] block">LOCATION</span> {selectedUser.user.city}, {selectedUser.user.state}</div>
                <div><span className="text-gray-500 text-[10px] block">LANGUAGES</span> {selectedUser.user.native_language}</div>
                <div><span className="text-gray-500 text-[10px] block">INDUSTRY EXP</span> {selectedUser.user.years_in_industry}</div>
              </div>
            </div>

            {selectedUser.artist_profile && (
              <div className="border-2 border-black bg-gray-50 p-5 space-y-3 text-xs font-bold uppercase">
                <h4 className="font-display text-sm font-black text-[#E05638] tracking-tight border-b-2 border-black pb-2">TALENT SPECIFICATIONS</h4>
                <div className="grid grid-cols-2 gap-3 text-black">
                  <div><span className="text-gray-500 text-[10px] block">AGE RANGE</span> {selectedUser.artist_profile.playing_age_range}</div>
                  <div><span className="text-gray-500 text-[10px] block">GENDER</span> {selectedUser.artist_profile.gender}</div>
                  <div><span className="text-gray-500 text-[10px] block">HEIGHT</span> {selectedUser.artist_profile.height}</div>
                  <div><span className="text-gray-500 text-[10px] block">BUILD</span> {selectedUser.artist_profile.build}</div>
                  <div className="col-span-2"><span className="text-gray-500 text-[10px] block">SKILLS</span> {selectedUser.artist_profile.skills?.join(', ')}</div>
                </div>
              </div>
            )}

            <div className="space-y-4 pt-2">
              <h4 className="font-display text-sm font-black text-black uppercase tracking-tight">FOUNDER ADMIN NOTES</h4>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="ADD PRIVATE NOTE FOR THIS LEAD..."
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  className="flex-1 border-2 border-black bg-white p-3 text-xs font-bold uppercase text-black focus:outline-none focus:bg-yellow-50 placeholder:text-gray-400"
                />
                <button
                  onClick={handleAddNote}
                  className="px-5 py-3 border-2 border-black bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-[#E05638] hover:border-[#E05638] transition-colors whitespace-nowrap"
                >
                  ADD NOTE
                </button>
              </div>

              <div className="space-y-3 max-h-48 overflow-y-auto">
                {(selectedUser.notes || []).map((n) => (
                  <div key={n.id} className="p-4 border-2 border-black bg-gray-50 text-xs font-bold uppercase space-y-1">
                    <div className="flex justify-between text-[10px] text-gray-500">
                      <span className="text-[#E05638]">{n.created_by}</span>
                      <span>{new Date(n.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="text-black">{n.note}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
