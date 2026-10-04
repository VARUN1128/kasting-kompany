export type UserRoleType = 
  | 'Actor'
  | 'Junior Artist'
  | 'Model'
  | 'Casting Director'
  | 'Casting Coordinator'
  | 'Assistant Director'
  | 'Production Controller'
  | 'Director'
  | 'Production Professional'
  | 'Creative Professional'
  | 'Other';

export interface User {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  whatsapp_available: boolean;
  state: string;
  city: string;
  native_language: string;
  other_languages: string[];
  years_in_industry: string;
  created_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: UserRoleType;
  created_at: string;
}

export interface ArtistProfile {
  id: string;
  user_id: string;
  age?: number;
  gender?: 'Male' | 'Female' | 'Non-binary' | 'Prefer not to say';
  playing_age_min?: number;
  playing_age_max?: number;
  playing_age_range?: string;
  height?: string;
  build?: string;
  hair_length?: string;
  hair_colour?: string;
  beard?: boolean;
  beard_type?: string;
  moustache?: boolean;
  skills?: string[];
  driving_licence?: boolean;
  own_vehicle?: boolean;
  travel_availability?: string;
  current_availability?: string;
  portfolio_url?: string;
  instagram_url?: string;
  youtube_url?: string;
  imdb_url?: string;
  created_at: string;
}

export interface ProfessionalProfile {
  id: string;
  user_id: string;
  professional_role: string;
  company_name?: string;
  years_experience?: string;
  projects_count?: string;
  typical_cast_size?: '1–5' | '6–20' | '21–50' | '51–100' | '101–500' | '500+';
  casting_frequency?: 'Daily' | 'Several times a week' | 'Weekly' | 'Monthly' | 'Occasionally';
  current_sourcing_methods?: string[];
  current_database_method?: string;
  created_at: string;
}

export interface ValidationResponse {
  id: string;
  user_id: string;
  biggest_problems?: string[];
  usefulness_score?: number; // 1 to 5
  would_use?: 'Definitely' | 'Probably' | 'Maybe' | 'Probably not' | 'No';
  preferred_payment_model?: 'Free' | 'Monthly subscription' | 'Per project' | 'Per casting requirement' | 'Not sure';
  willingness_to_pay?: string; // e.g., "₹1,000–₹2,500"
  created_at: string;
}

export interface WaitlistEntry {
  id: string;
  user_id: string;
  status: 'pending' | 'reviewed' | 'approved' | 'contacted';
  priority: 'high' | 'medium' | 'low';
  lead_score: number;
  lead_tier: 'HOT' | 'WARM' | 'COLD';
  early_access_requested: boolean;
  created_at: string;
}

export interface AdminNote {
  id: string;
  user_id: string;
  note: string;
  created_by: string;
  created_at: string;
}

export interface FullWaitlistUser {
  user: User;
  roles: UserRoleType[];
  artist_profile?: ArtistProfile;
  professional_profile?: ProfessionalProfile;
  validation_response?: ValidationResponse;
  waitlist: WaitlistEntry;
  notes?: AdminNote[];
}

export interface WaitlistFormData {
  // Common
  roles: UserRoleType[];
  full_name: string;
  email: string;
  phone: string;
  whatsapp_available: boolean;
  state: string;
  city: string;
  native_language: string;
  other_languages: string[];
  years_in_industry: string;

  // Talent attributes
  age?: number;
  gender?: 'Male' | 'Female' | 'Non-binary' | 'Prefer not to say';
  playing_age_range?: string;
  height?: string;
  build?: string;
  hair_length?: string;
  hair_colour?: string;
  beard?: boolean;
  beard_type?: string;
  moustache?: boolean;
  skills?: string[];
  driving_licence?: boolean;
  own_vehicle?: boolean;
  travel_availability?: string;
  current_availability?: string;
  portfolio_url?: string;
  instagram_url?: string;
  youtube_url?: string;
  imdb_url?: string;

  // Industry attributes
  company_name?: string;
  years_experience?: string;
  projects_count?: string;
  typical_cast_size?: '1–5' | '6–20' | '21–50' | '51–100' | '101–500' | '500+';
  casting_frequency?: 'Daily' | 'Several times a week' | 'Weekly' | 'Monthly' | 'Occasionally';
  current_sourcing_methods?: string[];
  current_database_method?: string;

  // Validation
  biggest_problems?: string[];
  usefulness_score?: number;
  would_use?: 'Definitely' | 'Probably' | 'Maybe' | 'Probably not' | 'No';
  preferred_payment_model?: 'Free' | 'Monthly subscription' | 'Per project' | 'Per casting requirement' | 'Not sure';
  willingness_to_pay?: string;
  early_access_requested?: boolean;
}
