-- DEMO SEED DATA FOR KASTING KOMPANY SUPABASE DATABASE
-- Clearly labeled as DEMO DATA

INSERT INTO public.users (id, full_name, email, phone, whatsapp_available, state, city, native_language, other_languages, years_in_industry)
VALUES 
('usr_demo_01', 'Rajesh Madhavan', 'rajesh.m@wayfarerfilms.in', '+91 98470 11223', true, 'Kerala', 'Kochi / Ernakulam', 'Malayalam', ARRAY['English', 'Tamil'], '6–10 years'),
('usr_demo_02', 'Varun Nair', 'varun.acting@gmail.com', '+91 97455 33211', true, 'Kerala', 'Kochi / Ernakulam', 'Malayalam', ARRAY['English', 'Hindi'], '3–5 years'),
('usr_demo_03', 'Sreeram Varma', 'sreeram@lycaproductions.in', '+91 98400 99887', true, 'Tamil Nadu', 'Chennai', 'Tamil', ARRAY['Malayalam', 'English'], '10+ years');

INSERT INTO public.user_roles (user_id, role)
VALUES
('usr_demo_01', 'Casting Director'),
('usr_demo_02', 'Actor'),
('usr_demo_03', 'Production Controller');

INSERT INTO public.artist_profiles (user_id, age, gender, playing_age_range, height, build, hair_length, hair_colour, beard, beard_type, moustache, skills, travel_availability, current_availability, portfolio_url)
VALUES
('usr_demo_02', 27, 'Male', '25–30', '175 cm', 'Athletic', 'Medium', 'Black', true, 'Heavy stubble', true, ARRAY['Acting', 'Theatre', 'Classical Dance'], 'South India', 'Available most days', 'https://varunnair.portfolio.site');

INSERT INTO public.professional_profiles (user_id, professional_role, company_name, years_experience, projects_count, typical_cast_size, casting_frequency, current_sourcing_methods, current_database_method)
VALUES
('usr_demo_01', 'Casting Director', 'Wayfarer Films', '8 years', '18 feature films', '51–100', 'Daily', ARRAY['WhatsApp groups', 'Personal contacts'], 'Excel / Google Sheets'),
('usr_demo_03', 'Production Controller', 'Lyca Productions', '12 years', '25+ projects', '101–500', 'Daily', ARRAY['WhatsApp groups', 'Artist coordinators'], 'WhatsApp');

INSERT INTO public.validation_responses (user_id, biggest_problems, usefulness_score, would_use, preferred_payment_model, willingness_to_pay)
VALUES
('usr_demo_01', ARRAY['Finding the right look', 'Finding available people'], 5, 'Definitely', 'Monthly subscription', '₹2,500–₹5,000'),
('usr_demo_03', ARRAY['Finding large numbers of people', 'No-shows'], 5, 'Definitely', 'Per project', '₹5,000–₹10,000');

INSERT INTO public.waitlist (user_id, status, priority, lead_score, lead_tier, early_access_requested)
VALUES
('usr_demo_01', 'reviewed', 'high', 28, 'HOT', true),
('usr_demo_02', 'pending', 'medium', 5, 'COLD', true),
('usr_demo_03', 'reviewed', 'high', 29, 'HOT', true);
