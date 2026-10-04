import { FullWaitlistUser, WaitlistFormData } from './types';
import { calculateLeadScore } from './lead-scoring';
import { DEMO_WAITLIST_USERS } from './demo-seed';
import { supabase, isSupabaseConfigured } from './supabase';

const LOCAL_STORAGE_KEY = 'kasting_kompany_waitlist_v1';

export function getWaitlistEntries(): FullWaitlistUser[] {
  if (typeof window === 'undefined') {
    return DEMO_WAITLIST_USERS;
  }

  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEMO_WAITLIST_USERS));
    return DEMO_WAITLIST_USERS;
  }

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEMO_WAITLIST_USERS;
  } catch {
    return DEMO_WAITLIST_USERS;
  }
}

export async function submitWaitlistForm(data: WaitlistFormData): Promise<{ success: boolean; id: string; error?: string }> {
  const { score, tier } = calculateLeadScore(data);
  const now = new Date().toISOString();
  const userId = 'usr_' + Math.random().toString(36).substring(2, 9);

  const newUser: FullWaitlistUser = {
    user: {
      id: userId,
      full_name: data.full_name,
      email: data.email,
      phone: data.phone,
      whatsapp_available: data.whatsapp_available,
      state: data.state,
      city: data.city,
      native_language: data.native_language,
      other_languages: data.other_languages,
      years_in_industry: data.years_in_industry,
      created_at: now
    },
    roles: data.roles,
    artist_profile: data.roles.some(r => ['Actor', 'Junior Artist', 'Model', 'Creative Professional'].includes(r)) ? {
      id: 'art_' + Math.random().toString(36).substring(2, 9),
      user_id: userId,
      age: data.age,
      gender: data.gender,
      playing_age_range: data.playing_age_range,
      height: data.height,
      build: data.build,
      hair_length: data.hair_length,
      hair_colour: data.hair_colour,
      beard: data.beard,
      beard_type: data.beard_type,
      moustache: data.moustache,
      skills: data.skills,
      driving_licence: data.driving_licence,
      own_vehicle: data.own_vehicle,
      travel_availability: data.travel_availability,
      current_availability: data.current_availability,
      portfolio_url: data.portfolio_url,
      instagram_url: data.instagram_url,
      youtube_url: data.youtube_url,
      imdb_url: data.imdb_url,
      created_at: now
    } : undefined,
    professional_profile: data.roles.some(r => ['Casting Director', 'Casting Coordinator', 'Assistant Director', 'Production Controller', 'Director', 'Production Professional'].includes(r)) ? {
      id: 'prof_' + Math.random().toString(36).substring(2, 9),
      user_id: userId,
      professional_role: data.roles.find(r => ['Casting Director', 'Casting Coordinator', 'Assistant Director', 'Production Controller', 'Director', 'Production Professional'].includes(r)) || data.roles[0],
      company_name: data.company_name,
      years_experience: data.years_experience,
      projects_count: data.projects_count,
      typical_cast_size: data.typical_cast_size,
      casting_frequency: data.casting_frequency,
      current_sourcing_methods: data.current_sourcing_methods,
      current_database_method: data.current_database_method,
      created_at: now
    } : undefined,
    validation_response: {
      id: 'val_' + Math.random().toString(36).substring(2, 9),
      user_id: userId,
      biggest_problems: data.biggest_problems,
      usefulness_score: data.usefulness_score,
      would_use: data.would_use,
      preferred_payment_model: data.preferred_payment_model,
      willingness_to_pay: data.willingness_to_pay,
      created_at: now
    },
    waitlist: {
      id: 'wait_' + Math.random().toString(36).substring(2, 9),
      user_id: userId,
      status: 'pending',
      priority: tier === 'HOT' ? 'high' : tier === 'WARM' ? 'medium' : 'low',
      lead_score: score,
      lead_tier: tier,
      early_access_requested: Boolean(data.early_access_requested),
      created_at: now
    }
  };

  // 1. Try Supabase if configured
  if (isSupabaseConfigured() && supabase) {
    try {
      // Insert user
      const { error: userErr } = await supabase.from('users').insert({
        id: newUser.user.id,
        full_name: newUser.user.full_name,
        email: newUser.user.email,
        phone: newUser.user.phone,
        whatsapp_available: newUser.user.whatsapp_available,
        state: newUser.user.state,
        city: newUser.user.city,
        native_language: newUser.user.native_language,
        other_languages: newUser.user.other_languages,
        years_in_industry: newUser.user.years_in_industry
      });

      if (!userErr) {
        // Insert roles
        for (const role of data.roles) {
          await supabase.from('user_roles').insert({
            user_id: newUser.user.id,
            role
          });
        }

        // Insert artist profile if present
        if (newUser.artist_profile) {
          await supabase.from('artist_profiles').insert(newUser.artist_profile);
        }

        // Insert professional profile if present
        if (newUser.professional_profile) {
          await supabase.from('professional_profiles').insert(newUser.professional_profile);
        }

        // Insert validation response
        if (newUser.validation_response) {
          await supabase.from('validation_responses').insert(newUser.validation_response);
        }

        // Insert waitlist
        await supabase.from('waitlist').insert(newUser.waitlist);
      }
    } catch (e) {
      console.warn('Supabase insertion warning, falling back to client store:', e);
    }
  }

  // 2. Local store update
  if (typeof window !== 'undefined') {
    const current = getWaitlistEntries();
    const updated = [newUser, ...current];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  }

  return { success: true, id: userId };
}

export function updateEarlyAccessRequest(userId: string): void {
  if (typeof window === 'undefined') return;

  const entries = getWaitlistEntries();
  const updated = entries.map(item => {
    if (item.user.id === userId) {
      return {
        ...item,
        waitlist: {
          ...item.waitlist,
          early_access_requested: true,
          lead_score: item.waitlist.lead_score + 2,
          lead_tier: (item.waitlist.lead_score + 2 >= 18) ? ('HOT' as const) : (item.waitlist.lead_score + 2 >= 10) ? ('WARM' as const) : ('COLD' as const)
        }
      };
    }
    return item;
  });

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
}

export function addAdminNote(userId: string, noteText: string, createdBy: string = 'Superadmin'): void {
  if (typeof window === 'undefined') return;

  const entries = getWaitlistEntries();
  const updated = entries.map(item => {
    if (item.user.id === userId) {
      const existingNotes = item.notes || [];
      const newNote = {
        id: 'note_' + Math.random().toString(36).substring(2, 9),
        user_id: userId,
        note: noteText,
        created_by: createdBy,
        created_at: new Date().toISOString()
      };
      return {
        ...item,
        notes: [newNote, ...existingNotes]
      };
    }
    return item;
  });

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
}
