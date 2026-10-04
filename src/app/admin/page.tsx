'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { FullWaitlistUser, UserRoleType } from '@/lib/types';
import { getWaitlistEntries, addAdminNote } from '@/lib/data-store';
import { INDIAN_STATES_AND_CITIES } from '@/lib/indian-locations';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [passcode, setPasscode] = useState<string>('');
  const [passcodeError, setPasscodeError] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'analytics'>('overview');
  const [users, setUsers] = useState<FullWaitlistUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<FullWaitlistUser | null>(null);
  const [noteInput, setNoteInput] = useState<string>('');

  // Filters State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [stateFilter, setStateFilter] = useState<string>('All');
  const [tierFilter, setTierFilter] = useState<string>('All');
  const [frequencyFilter, setFrequencyFilter] = useState<string>('All');
  const [usefulnessFilter, setUsefulnessFilter] = useState<string>('All');

  useEffect(() => {
    setUsers(getWaitlistEntries());
  }, []);

  const refreshData = () => {
    setUsers(getWaitlistEntries());
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

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'admin' || passcode.trim() === 'kasting2026') {
      setIsAuthenticated(true);
      setPasscodeError(false);
    } else {
      setPasscodeError(true);
    }
  };

  const handleAddNote = () => {
    if (!selectedUser || !noteInput.trim()) return;
    addAdminNote(selectedUser.user.id, noteInput.trim());
    setNoteInput('');
    refreshData();
    const updatedList = getWaitlistEntries();
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
    return Object.keys(counts).map(k => ({ name: k.toUpperCase(), count: counts[k] }));
  }, [users]);

  const stateChartData = useMemo(() => {
    const counts: Record<string, number> = {};
    users.forEach(u => {
      counts[u.user.state] = (counts[u.user.state] || 0) + 1;
    });
    return Object.keys(counts).map(k => ({ name: k.toUpperCase(), count: counts[k] }));
  }, [users]);

  const paymentModelData = useMemo(() => {
    const counts: Record<string, number> = {};
    users.forEach(u => {
      const pm = u.validation_response?.preferred_payment_model || 'Unspecified';
      counts[pm] = (counts[pm] || 0) + 1;
    });
    return Object.keys(counts).map(k => ({ name: k.toUpperCase(), value: counts[k] }));
  }, [users]);

  const COLORS = ['#000000', '#555555', '#888888', '#aaaaaa', '#cccccc'];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4 font-mono">
        <div className="w-full max-w-md card-raw-elevated space-y-6 text-black">
          <div className="text-center space-y-2">
            <div className="mx-auto h-12 w-12 bg-black text-white font-headline text-2xl flex items-center justify-center border-3 border-black">
              K
            </div>
            <h2 className="font-headline text-2xl text-black uppercase">SUPERADMIN ACCESS</h2>
            <p className="text-xs font-bold text-black uppercase">ENTER FOUNDER PASSCODE TO UNLOCK DASHBOARD.</p>
          </div>

          <form onSubmit={handlePasscodeSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="ENTER PASSCODE (DEFAULT: ADMIN)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="input-raw uppercase"
              />
              {passcodeError && (
                <p className="text-xs text-red-600 font-bold mt-1 uppercase">
                  [!] INCORRECT PASSCODE. TRY &ldquo;ADMIN&rdquo;
                </p>
              )}
            </div>
            <button type="submit" className="w-full btn-raw-primary text-center justify-center">
              AUTHENTICATE DASHBOARD &rarr;
            </button>
          </form>

          <div className="text-center pt-2 font-bold">
            <Link href="/" className="text-xs text-black underline">
              &larr; RETURN TO LANDING PAGE
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black font-body">
      
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-30 border-b-5 border-black bg-white">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between px-4 py-3 sm:px-6 lg:px-8 gap-4 font-mono">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-bold text-black border-2 border-black px-2 py-1 hover:bg-black hover:text-white">
              &larr; HOME
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center bg-black text-white font-headline text-sm border-2 border-black">
                K
              </div>
              <h1 className="font-headline text-lg text-black uppercase tracking-tight">
                KASTING KOMPANY <span className="bg-black text-white px-2 py-0.5 text-xs font-mono">SUPERADMIN</span>
              </h1>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 font-bold text-xs uppercase">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-2 border-3 border-black ${
                activeTab === 'overview' ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'
              }`}
            >
              01. OVERVIEW & HIGH INTENT
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-3 py-2 border-3 border-black ${
                activeTab === 'users' ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'
              }`}
            >
              02. WAITLIST ({users.length})
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3 py-2 border-3 border-black ${
                activeTab === 'analytics' ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'
              }`}
            >
              03. ANALYTICS
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8 font-mono">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* Top Stat Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 font-mono text-xs">
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
                  className={`p-3.5 border-3 border-black flex flex-col justify-between ${
                    card.hot
                      ? 'bg-black text-white'
                      : card.highlight
                      ? 'bg-[#F0F0F0] text-black font-bold'
                      : 'bg-white text-black'
                  }`}
                >
                  <span className="font-bold uppercase text-[10px] block border-b border-current pb-1">
                    {card.label}
                  </span>
                  <span className="font-headline text-3xl mt-2 block">
                    {card.val}
                  </span>
                </div>
              ))}
            </div>

            {/* HIGH-INTENT USERS SECTION */}
            <div className="card-raw-elevated space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-3 border-black pb-4">
                <div>
                  <h2 className="font-headline text-2xl text-black uppercase">
                    HIGH-INTENT INDUSTRY LEADS
                  </h2>
                  <p className="font-mono text-xs text-black font-bold uppercase mt-1">
                    INDUSTRY DECISION-MAKERS WITH FREQUENT CASTING NEEDS (20+ CAST SIZE, HIGH USEFULNESS SCORE).
                  </p>
                </div>
                <button
                  onClick={() => {
                    setTierFilter('HOT');
                    setActiveTab('users');
                  }}
                  className="btn-raw-primary text-xs py-2 px-4"
                >
                  VIEW ALL HIGH INTENT &rarr;
                </button>
              </div>

              {/* High Intent User Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {highIntentUsers.map((item) => (
                  <div
                    key={item.user.id}
                    onClick={() => setSelectedUser(item)}
                    className="border-3 border-black p-5 space-y-3 cursor-pointer bg-white hover:bg-black hover:text-white transition-colors group"
                  >
                    <div className="flex items-start justify-between border-b-2 border-current pb-2">
                      <div>
                        <h4 className="font-headline text-base text-black group-hover:text-white uppercase">
                          {item.user.full_name}
                        </h4>
                        <p className="font-mono text-xs font-bold text-black group-hover:text-white uppercase">
                          {item.professional_profile?.professional_role || item.roles.join(', ')}
                        </p>
                        <p className="font-mono text-[11px] text-black group-hover:text-white uppercase">
                          {item.professional_profile?.company_name || 'INDEPENDENT'} · {item.user.city}
                        </p>
                      </div>
                      <span className="border-2 border-current px-2 py-1 font-headline text-xs">
                        {item.waitlist.lead_tier} ({item.waitlist.lead_score} PTS)
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] border-2 border-current p-2.5 bg-[#F0F0F0] text-black">
                      <div>
                        <span className="block font-bold">CASTING FREQ:</span>
                        <span>{item.professional_profile?.casting_frequency?.toUpperCase() || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="block font-bold">TYPICAL CAST:</span>
                        <span>{item.professional_profile?.typical_cast_size || 'N/A'} PEOPLE</span>
                      </div>
                      <div>
                        <span className="block font-bold">USEFULNESS:</span>
                        <span>{item.validation_response?.usefulness_score || 'N/A'} / 5 STARS</span>
                      </div>
                      <div>
                        <span className="block font-bold">WILLING TO PAY:</span>
                        <span>{item.validation_response?.willingness_to_pay || 'N/A'}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-bold uppercase pt-1">
                      <span>SOURCING: {item.professional_profile?.current_sourcing_methods?.[0]?.toUpperCase() || 'WHATSAPP'}</span>
                      <span className="underline">DETAILS &rarr;</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* WAITLIST TABLE TAB */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            
            {/* Filter Bar Controls */}
            <div className="card-raw-default space-y-4 font-mono text-xs">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                {/* Search Bar */}
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="SEARCH BY NAME, EMAIL, CITY, ROLE, OR COMPANY..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-raw uppercase"
                  />
                </div>

                {/* Export CSV Button */}
                <button
                  onClick={exportToCSV}
                  className="btn-raw-secondary text-xs py-3 px-5 font-bold"
                >
                  EXPORT CSV &rarr;
                </button>
              </div>

              {/* Select Dropdown Filters */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-xs">
                <div>
                  <label className="block font-bold uppercase mb-1">FILTER ROLE</label>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="input-raw uppercase"
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
                  <label className="block font-bold uppercase mb-1">FILTER STATE</label>
                  <select
                    value={stateFilter}
                    onChange={(e) => setStateFilter(e.target.value)}
                    className="input-raw uppercase"
                  >
                    <option value="All">ALL STATES</option>
                    {Object.keys(INDIAN_STATES_AND_CITIES).map((s) => (
                      <option key={s} value={s}>{s.toUpperCase()}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase mb-1">LEAD TIER</label>
                  <select
                    value={tierFilter}
                    onChange={(e) => setTierFilter(e.target.value)}
                    className="input-raw uppercase"
                  >
                    <option value="All">ALL TIERS</option>
                    <option value="HOT">HOT LEADS</option>
                    <option value="WARM">WARM LEADS</option>
                    <option value="COLD">COLD LEADS</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase mb-1">CASTING FREQ</label>
                  <select
                    value={frequencyFilter}
                    onChange={(e) => setFrequencyFilter(e.target.value)}
                    className="input-raw uppercase"
                  >
                    <option value="All">ALL FREQUENCIES</option>
                    <option value="Daily">DAILY</option>
                    <option value="Several times a week">SEVERAL TIMES A WEEK</option>
                    <option value="Weekly">WEEKLY</option>
                    <option value="Monthly">MONTHLY</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase mb-1">USEFULNESS SCORE</label>
                  <select
                    value={usefulnessFilter}
                    onChange={(e) => setUsefulnessFilter(e.target.value)}
                    className="input-raw uppercase"
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
            <div className="border-3 border-black bg-white overflow-x-auto">
              <table className="w-full text-left font-mono text-xs text-black border-collapse">
                <thead className="bg-black text-white font-headline text-[11px] uppercase tracking-wider border-b-3 border-black">
                  <tr>
                    <th className="p-3 border-r border-white">LEAD TIER</th>
                    <th className="p-3 border-r border-white">NAME & CONTACT</th>
                    <th className="p-3 border-r border-white">ROLE(S)</th>
                    <th className="p-3 border-r border-white">LOCATION</th>
                    <th className="p-3 border-r border-white">EXP</th>
                    <th className="p-3 border-r border-white">CASTING FREQ</th>
                    <th className="p-3 border-r border-white">CAST SIZE</th>
                    <th className="p-3 border-r border-white">SCORE</th>
                    <th className="p-3 border-r border-white">PAYMENT MODEL</th>
                    <th className="p-3">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-black">
                  {filteredUsers.map((item) => {
                    const tier = item.waitlist.lead_tier;
                    return (
                      <tr
                        key={item.user.id}
                        className="hover:bg-black hover:text-white transition-colors cursor-pointer"
                        onClick={() => setSelectedUser(item)}
                      >
                        <td className="p-3 border-r border-black font-bold">
                          [{tier} - {item.waitlist.lead_score} PTS]
                        </td>
                        <td className="p-3 border-r border-black">
                          <div className="font-bold">{item.user.full_name.toUpperCase()}</div>
                          <div className="text-[11px]">{item.user.email}</div>
                        </td>
                        <td className="p-3 border-r border-black font-bold uppercase">
                          {item.roles.join(', ')}
                        </td>
                        <td className="p-3 border-r border-black uppercase">
                          {item.user.city}, {item.user.state}
                        </td>
                        <td className="p-3 border-r border-black uppercase">
                          {item.user.years_in_industry}
                        </td>
                        <td className="p-3 border-r border-black uppercase font-bold">
                          {item.professional_profile?.casting_frequency?.toUpperCase() || 'N/A'}
                        </td>
                        <td className="p-3 border-r border-black uppercase">
                          {item.professional_profile?.typical_cast_size || 'N/A'}
                        </td>
                        <td className="p-3 border-r border-black font-bold">
                          {item.validation_response?.usefulness_score ? `${item.validation_response.usefulness_score}/5★` : 'N/A'}
                        </td>
                        <td className="p-3 border-r border-black uppercase font-bold">
                          {item.validation_response?.willingness_to_pay || 'N/A'}
                        </td>
                        <td className="p-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedUser(item);
                            }}
                            className="border-2 border-current px-2 py-1 font-bold text-[10px] uppercase hover:underline"
                          >
                            [DETAILS]
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 font-mono">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Role Distribution Chart */}
              <div className="card-raw-default space-y-4">
                <h3 className="font-headline text-lg text-black uppercase">
                  WAITLIST BREAKDOWN BY PROFESSIONAL ROLE
                </h3>
                <div className="h-64 border-3 border-black p-2 bg-white">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={roleChartData}>
                      <XAxis dataKey="name" stroke="#000000" fontSize={10} font-weight="bold" />
                      <YAxis stroke="#000000" fontSize={10} font-weight="bold" />
                      <Tooltip contentStyle={{ backgroundColor: '#000000', borderColor: '#000000', color: '#ffffff' }} />
                      <Bar dataKey="count" fill="#000000" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Payment Model Preference Chart */}
              <div className="card-raw-default space-y-4">
                <h3 className="font-headline text-lg text-black uppercase">
                  PREFERRED MONETIZATION & PAYMENT MODELS
                </h3>
                <div className="h-64 border-3 border-black p-2 bg-white">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={paymentModelData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }: { name?: string; percent?: number }) => `${name || ''} (${((percent || 0) * 100).toFixed(0)}%)`}
                      >
                        {paymentModelData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#000000', borderColor: '#000000', color: '#ffffff' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* State Geographic Breakdown */}
              <div className="card-raw-default space-y-4 lg:col-span-2">
                <h3 className="font-headline text-lg text-black uppercase">
                  GEOGRAPHIC DEMAND DISTRIBUTION ACROSS INDIA
                </h3>
                <div className="h-64 border-3 border-black p-2 bg-white">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stateChartData}>
                      <XAxis dataKey="name" stroke="#000000" fontSize={11} font-weight="bold" />
                      <YAxis stroke="#000000" fontSize={11} font-weight="bold" />
                      <Tooltip contentStyle={{ backgroundColor: '#000000', borderColor: '#000000', color: '#ffffff' }} />
                      <Bar dataKey="count" fill="#000000" />
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
        <div className="fixed inset-0 z-50 flex justify-end bg-black/70 font-mono">
          <div className="w-full max-w-xl bg-white border-l-5 border-black p-6 space-y-6 overflow-y-auto text-black">
            
            {/* Header */}
            <div className="flex items-start justify-between border-b-3 border-black pb-4">
              <div>
                <span className="bg-black text-white px-3 py-1 font-headline text-xs uppercase">
                  [{selectedUser.waitlist.lead_tier} LEAD - {selectedUser.waitlist.lead_score} PTS]
                </span>
                <h3 className="font-headline text-2xl text-black uppercase mt-3">{selectedUser.user.full_name}</h3>
                <p className="font-mono text-xs font-bold text-black uppercase">{selectedUser.roles.join(', ')}</p>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="font-headline text-sm bg-black text-white px-2 py-1 border-2 border-black hover:bg-white hover:text-black uppercase"
              >
                [CLOSE X]
              </button>
            </div>

            {/* Contact Details */}
            <div className="border-3 border-black bg-[#F0F0F0] p-4 space-y-2 text-xs">
              <h4 className="font-headline text-xs uppercase text-black border-b-2 border-black pb-1">CONTACT DETAILS (CONFIDENTIAL)</h4>
              <div className="grid grid-cols-2 gap-2 font-bold">
                <div><span className="font-normal block">EMAIL:</span> {selectedUser.user.email}</div>
                <div><span className="font-normal block">PHONE:</span> {selectedUser.user.phone}</div>
                <div><span className="font-normal block">WHATSAPP:</span> {selectedUser.user.whatsapp_available ? 'YES' : 'NO'}</div>
                <div><span className="font-normal block">LOCATION:</span> {selectedUser.user.city.toUpperCase()}, {selectedUser.user.state.toUpperCase()}</div>
                <div><span className="font-normal block">LANGUAGES:</span> {selectedUser.user.native_language.toUpperCase()}</div>
                <div><span className="font-normal block">EXPERIENCE:</span> {selectedUser.user.years_in_industry.toUpperCase()}</div>
              </div>
            </div>

            {/* Talent Specs */}
            {selectedUser.artist_profile && (
              <div className="border-3 border-black p-4 space-y-2 text-xs bg-white">
                <h4 className="font-headline text-xs uppercase text-black border-b-2 border-black pb-1">ARTIST & TALENT ATTRIBUTES</h4>
                <div className="grid grid-cols-2 gap-2 font-bold">
                  <div><span className="font-normal block">AGE / RANGE:</span> {selectedUser.artist_profile.age || 'N/A'} ({selectedUser.artist_profile.playing_age_range})</div>
                  <div><span className="font-normal block">GENDER:</span> {selectedUser.artist_profile.gender?.toUpperCase()}</div>
                  <div><span className="font-normal block">HEIGHT:</span> {selectedUser.artist_profile.height?.toUpperCase()}</div>
                  <div><span className="font-normal block">BUILD:</span> {selectedUser.artist_profile.build?.toUpperCase()}</div>
                  <div><span className="font-normal block">BEARD:</span> {selectedUser.artist_profile.beard ? `YES (${selectedUser.artist_profile.beard_type?.toUpperCase()})` : 'NO'}</div>
                  <div><span className="font-normal block">SKILLS:</span> {selectedUser.artist_profile.skills?.join(', ')?.toUpperCase()}</div>
                </div>
              </div>
            )}

            {/* Industry Profile */}
            {selectedUser.professional_profile && (
              <div className="border-3 border-black p-4 space-y-2 text-xs bg-white">
                <h4 className="font-headline text-xs uppercase text-black border-b-2 border-black pb-1">INDUSTRY PRODUCTION WORKFLOW</h4>
                <div className="grid grid-cols-2 gap-2 font-bold">
                  <div><span className="font-normal block">COMPANY:</span> {selectedUser.professional_profile.company_name?.toUpperCase()}</div>
                  <div><span className="font-normal block">CASTING FREQ:</span> {selectedUser.professional_profile.casting_frequency?.toUpperCase()}</div>
                  <div><span className="font-normal block">TYPICAL CAST:</span> {selectedUser.professional_profile.typical_cast_size} PEOPLE</div>
                  <div><span className="font-normal block">METHODS:</span> {selectedUser.professional_profile.current_sourcing_methods?.join(', ')?.toUpperCase()}</div>
                </div>
              </div>
            )}

            {/* Admin Notes Section */}
            <div className="space-y-3 pt-2">
              <h4 className="font-headline text-xs text-black uppercase">FOUNDER ADMIN NOTES</h4>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="ADD PRIVATE NOTE FOR THIS LEAD..."
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  className="input-raw uppercase flex-1"
                />
                <button
                  onClick={handleAddNote}
                  className="btn-raw-primary text-xs py-2 px-4"
                >
                  ADD NOTE
                </button>
              </div>

              {/* Notes List */}
              <div className="space-y-2">
                {(selectedUser.notes || []).map((n) => (
                  <div key={n.id} className="border-2 border-black p-3 bg-[#F0F0F0] text-xs font-mono space-y-1">
                    <div className="flex justify-between font-bold border-b border-black pb-1">
                      <span>{n.created_by.toUpperCase()}</span>
                      <span>{new Date(n.created_at).toLocaleDateString()}</span>
                    </div>
                    <p className="text-black font-bold uppercase">{n.note}</p>
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
