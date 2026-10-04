import { FullWaitlistUser } from './types';

export const DEMO_WAITLIST_USERS: FullWaitlistUser[] = [
  {
    user: {
      id: "usr_demo_01",
      full_name: "Rajesh Madhavan",
      email: "rajesh.m@wayfarerfilms.in",
      phone: "+91 98470 11223",
      whatsapp_available: true,
      state: "Kerala",
      city: "Kochi / Ernakulam",
      native_language: "Malayalam",
      other_languages: ["English", "Tamil"],
      years_in_industry: "6–10 years",
      created_at: "2026-10-01T10:30:00Z"
    },
    roles: ["Casting Director"],
    professional_profile: {
      id: "prof_01",
      user_id: "usr_demo_01",
      professional_role: "Casting Director",
      company_name: "Wayfarer Films",
      years_experience: "8 years",
      projects_count: "18 feature films",
      typical_cast_size: "51–100",
      casting_frequency: "Daily",
      current_sourcing_methods: ["WhatsApp groups", "Personal contacts", "Artist coordinators"],
      current_database_method: "Excel / Google Sheets",
      created_at: "2026-10-01T10:30:00Z"
    },
    validation_response: {
      id: "val_01",
      user_id: "usr_demo_01",
      biggest_problems: ["Finding the right look", "Finding available people", "Finding people quickly", "Last-minute replacements"],
      usefulness_score: 5,
      would_use: "Definitely",
      preferred_payment_model: "Monthly subscription",
      willingness_to_pay: "₹2,500–₹5,000",
      created_at: "2026-10-01T10:30:00Z"
    },
    waitlist: {
      id: "wait_01",
      user_id: "usr_demo_01",
      status: "reviewed",
      priority: "high",
      lead_score: 28,
      lead_tier: "HOT",
      early_access_requested: true,
      created_at: "2026-10-01T10:30:00Z"
    },
    notes: [
      {
        id: "note_01",
        user_id: "usr_demo_01",
        note: "Major casting director in Malayalam cinema. High intent for monthly subscription. Priority launch invite.",
        created_by: "Founder",
        created_at: "2026-10-01T11:00:00Z"
      }
    ]
  },
  {
    user: {
      id: "usr_demo_02",
      full_name: "Varun Nair",
      email: "varun.acting@gmail.com",
      phone: "+91 97455 33211",
      whatsapp_available: true,
      state: "Kerala",
      city: "Kochi / Ernakulam",
      native_language: "Malayalam",
      other_languages: ["English", "Hindi"],
      years_in_industry: "3–5 years",
      created_at: "2026-10-02T09:15:00Z"
    },
    roles: ["Actor"],
    artist_profile: {
      id: "art_02",
      user_id: "usr_demo_02",
      age: 27,
      gender: "Male",
      playing_age_range: "25–30",
      height: "175 cm (5'9\")",
      build: "Athletic",
      hair_length: "Medium",
      hair_colour: "Black",
      beard: true,
      beard_type: "Heavy stubble",
      moustache: true,
      skills: ["Acting", "Theatre", "Classical Dance", "Voice Acting", "Driving"],
      driving_licence: true,
      own_vehicle: true,
      travel_availability: "South India",
      current_availability: "Available most days",
      portfolio_url: "https://varunnair.portfolio.site",
      instagram_url: "https://instagram.com/varun_actor_official",
      youtube_url: "https://youtube.com/watch?v=demo_reel_varun",
      imdb_url: "https://imdb.com/name/nm9988771",
      created_at: "2026-10-02T09:15:00Z"
    },
    waitlist: {
      id: "wait_02",
      user_id: "usr_demo_02",
      status: "pending",
      priority: "medium",
      lead_score: 5,
      lead_tier: "COLD",
      early_access_requested: true,
      created_at: "2026-10-02T09:15:00Z"
    }
  },
  {
    user: {
      id: "usr_demo_03",
      full_name: "Sreeram Varma",
      email: "sreeram@lycaproductions.in",
      phone: "+91 98400 99887",
      whatsapp_available: true,
      state: "Tamil Nadu",
      city: "Chennai",
      native_language: "Tamil",
      other_languages: ["Malayalam", "English"],
      years_in_industry: "10+ years",
      created_at: "2026-10-02T14:20:00Z"
    },
    roles: ["Production Controller", "Casting Coordinator"],
    professional_profile: {
      id: "prof_03",
      user_id: "usr_demo_03",
      professional_role: "Production Controller",
      company_name: "Lyca Productions",
      years_experience: "12 years",
      projects_count: "25+ projects",
      typical_cast_size: "101–500",
      casting_frequency: "Daily",
      current_sourcing_methods: ["WhatsApp groups", "Artist coordinators", "Personal contacts"],
      current_database_method: "WhatsApp",
      created_at: "2026-10-02T14:20:00Z"
    },
    validation_response: {
      id: "val_03",
      user_id: "usr_demo_03",
      biggest_problems: ["Finding large numbers of people", "Finding people in a specific location", "No-shows", "Coordinating shoot details"],
      usefulness_score: 5,
      would_use: "Definitely",
      preferred_payment_model: "Per project",
      willingness_to_pay: "₹5,000–₹10,000",
      created_at: "2026-10-02T14:20:00Z"
    },
    waitlist: {
      id: "wait_03",
      user_id: "usr_demo_03",
      status: "reviewed",
      priority: "high",
      lead_score: 29,
      lead_tier: "HOT",
      early_access_requested: true,
      created_at: "2026-10-02T14:20:00Z"
    }
  },
  {
    user: {
      id: "usr_demo_04",
      full_name: "Ananya Pillai",
      email: "ananya.p@gmail.com",
      phone: "+91 94951 88776",
      whatsapp_available: true,
      state: "Kerala",
      city: "Thiruvananthapuram",
      native_language: "Malayalam",
      other_languages: ["English", "Tamil", "Hindi"],
      years_in_industry: "1–2 years",
      created_at: "2026-10-03T08:40:00Z"
    },
    roles: ["Actor", "Model"],
    artist_profile: {
      id: "art_04",
      user_id: "usr_demo_04",
      age: 24,
      gender: "Female",
      playing_age_range: "21–25",
      height: "168 cm (5'6\")",
      build: "Slim",
      hair_length: "Long",
      hair_colour: "Black",
      beard: false,
      moustache: false,
      skills: ["Acting", "Dance", "Anchoring", "Fitness"],
      driving_licence: true,
      own_vehicle: false,
      travel_availability: "Anywhere in India",
      current_availability: "Available most days",
      instagram_url: "https://instagram.com/ananya_pillai_model",
      created_at: "2026-10-03T08:40:00Z"
    },
    waitlist: {
      id: "wait_04",
      user_id: "usr_demo_04",
      status: "pending",
      priority: "medium",
      lead_score: 4,
      lead_tier: "COLD",
      early_access_requested: true,
      created_at: "2026-10-03T08:40:00Z"
    }
  },
  {
    user: {
      id: "usr_demo_05",
      full_name: "Karan Johar Directorial Team (Vivek)",
      email: "vivek.ad@dharmafilms.com",
      phone: "+91 98201 44556",
      whatsapp_available: true,
      state: "Maharashtra",
      city: "Mumbai",
      native_language: "Hindi",
      other_languages: ["English", "Punjabi"],
      years_in_industry: "6–10 years",
      created_at: "2026-10-03T11:10:00Z"
    },
    roles: ["Assistant Director", "Casting Coordinator"],
    professional_profile: {
      id: "prof_05",
      user_id: "usr_demo_05",
      professional_role: "Assistant Director",
      company_name: "Dharma Productions",
      years_experience: "7 years",
      projects_count: "10 feature films",
      typical_cast_size: "51–100",
      casting_frequency: "Several times a week",
      current_sourcing_methods: ["Casting websites", "Talentrack", "WhatsApp groups"],
      current_database_method: "Excel / Google Sheets",
      created_at: "2026-10-03T11:10:00Z"
    },
    validation_response: {
      id: "val_05",
      user_id: "usr_demo_05",
      biggest_problems: ["Finding people quickly", "Getting responses", "Managing shortlisted artists"],
      usefulness_score: 4,
      would_use: "Definitely",
      preferred_payment_model: "Monthly subscription",
      willingness_to_pay: "₹5,000–₹10,000",
      created_at: "2026-10-03T11:10:00Z"
    },
    waitlist: {
      id: "wait_05",
      user_id: "usr_demo_05",
      status: "pending",
      priority: "high",
      lead_score: 22,
      lead_tier: "HOT",
      early_access_requested: true,
      created_at: "2026-10-03T11:10:00Z"
    }
  },
  {
    user: {
      id: "usr_demo_06",
      full_name: "Mathew Thomas",
      email: "mathew.t@gmail.com",
      phone: "+91 95678 12345",
      whatsapp_available: true,
      state: "Kerala",
      city: "Kozhikode",
      native_language: "Malayalam",
      other_languages: ["English"],
      years_in_industry: "3–5 years",
      created_at: "2026-10-03T13:00:00Z"
    },
    roles: ["Actor"],
    artist_profile: {
      id: "art_06",
      user_id: "usr_demo_06",
      age: 23,
      gender: "Male",
      playing_age_range: "16–20",
      height: "172 cm (5'8\")",
      build: "Slim",
      hair_length: "Short",
      hair_colour: "Black",
      beard: false,
      moustache: false,
      skills: ["Acting", "Cycling", "Football", "Singing"],
      travel_availability: "Within Kerala",
      current_availability: "Weekends",
      created_at: "2026-10-03T13:00:00Z"
    },
    waitlist: {
      id: "wait_06",
      user_id: "usr_demo_06",
      status: "pending",
      priority: "medium",
      lead_score: 3,
      lead_tier: "COLD",
      early_access_requested: false,
      created_at: "2026-10-03T13:00:00Z"
    }
  },
  {
    user: {
      id: "usr_demo_07",
      full_name: "Siddharth Rao",
      email: "siddharth@mythrimovies.com",
      phone: "+91 99899 77665",
      whatsapp_available: true,
      state: "Telangana",
      city: "Hyderabad",
      native_language: "Telugu",
      other_languages: ["English", "Hindi"],
      years_in_industry: "10+ years",
      created_at: "2026-10-03T15:45:00Z"
    },
    roles: ["Casting Director"],
    professional_profile: {
      id: "prof_07",
      user_id: "usr_demo_07",
      professional_role: "Casting Director",
      company_name: "Mythri Movie Makers",
      years_experience: "14 years",
      projects_count: "30+ mega films",
      typical_cast_size: "500+",
      casting_frequency: "Daily",
      current_sourcing_methods: ["WhatsApp groups", "Artist coordinators", "Personal contacts", "Instagram"],
      current_database_method: "CRM/software",
      created_at: "2026-10-03T15:45:00Z"
    },
    validation_response: {
      id: "val_07",
      user_id: "usr_demo_07",
      biggest_problems: ["Finding large numbers of people", "Managing shortlisted artists", "Contacting artists", "No-shows"],
      usefulness_score: 5,
      would_use: "Definitely",
      preferred_payment_model: "Monthly subscription",
      willingness_to_pay: "₹10,000+",
      created_at: "2026-10-03T15:45:00Z"
    },
    waitlist: {
      id: "wait_07",
      user_id: "usr_demo_07",
      status: "pending",
      priority: "high",
      lead_score: 28,
      lead_tier: "HOT",
      early_access_requested: true,
      created_at: "2026-10-03T15:45:00Z"
    }
  },
  {
    user: {
      id: "usr_demo_08",
      full_name: "Preeti Shenoy",
      email: "preeti.s@gmail.com",
      phone: "+91 98860 11992",
      whatsapp_available: true,
      state: "Karnataka",
      city: "Bengaluru",
      native_language: "Kannada",
      other_languages: ["English", "Hindi", "Telugu"],
      years_in_industry: "3–5 years",
      created_at: "2026-10-03T17:30:00Z"
    },
    roles: ["Director", "Creative Professional"],
    professional_profile: {
      id: "prof_08",
      user_id: "usr_demo_08",
      professional_role: "Director",
      company_name: "Independent Studio",
      years_experience: "4 years",
      projects_count: "3 indie films",
      typical_cast_size: "6–20",
      casting_frequency: "Monthly",
      current_sourcing_methods: ["Instagram", "Personal contacts"],
      current_database_method: "Don't maintain one",
      created_at: "2026-10-03T17:30:00Z"
    },
    validation_response: {
      id: "val_08",
      user_id: "usr_demo_08",
      biggest_problems: ["Finding the right look", "Finding available people"],
      usefulness_score: 4,
      would_use: "Probably",
      preferred_payment_model: "Per casting requirement",
      willingness_to_pay: "₹1,000–₹2,500",
      created_at: "2026-10-03T17:30:00Z"
    },
    waitlist: {
      id: "wait_08",
      user_id: "usr_demo_08",
      status: "pending",
      priority: "medium",
      lead_score: 13,
      lead_tier: "WARM",
      early_access_requested: true,
      created_at: "2026-10-03T17:30:00Z"
    }
  }
];
