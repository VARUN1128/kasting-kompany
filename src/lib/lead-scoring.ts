import { WaitlistFormData } from './types';

export interface LeadScoreBreakdown {
  score: number;
  tier: 'HOT' | 'WARM' | 'COLD';
  reasons: string[];
}

export function calculateLeadScore(data: Partial<WaitlistFormData>): LeadScoreBreakdown {
  let score = 0;
  const reasons: string[] = [];

  const roles = data.roles || [];
  
  // 1. Role Score
  if (roles.includes('Casting Director')) {
    score += 5;
    reasons.push('+5 Casting Director');
  } else if (roles.includes('Casting Coordinator')) {
    score += 5;
    reasons.push('+5 Casting Coordinator');
  } else if (roles.includes('Production Controller')) {
    score += 5;
    reasons.push('+5 Production Controller');
  } else if (roles.includes('Assistant Director')) {
    score += 4;
    reasons.push('+4 Assistant Director');
  } else if (roles.includes('Director')) {
    score += 3;
    reasons.push('+3 Director');
  } else if (roles.includes('Production Professional')) {
    score += 3;
    reasons.push('+3 Production Professional');
  }

  // 2. Casting Frequency
  if (data.casting_frequency === 'Daily') {
    score += 5;
    reasons.push('+5 Daily casting');
  } else if (data.casting_frequency === 'Several times a week' || data.casting_frequency === 'Weekly') {
    score += 3;
    reasons.push('+3 Weekly casting');
  }

  // 3. Typical Cast Size
  const largeCastSizes = ['21–50', '51–100', '101–500', '500+'];
  if (data.typical_cast_size && largeCastSizes.includes(data.typical_cast_size)) {
    score += 3;
    reasons.push('+3 20+ people/project');
  }

  // 4. Product Usefulness Score
  if (data.usefulness_score === 5) {
    score += 5;
    reasons.push('+5 Usefulness rating 5/5');
  } else if (data.usefulness_score === 4) {
    score += 4;
    reasons.push('+4 Usefulness rating 4/5');
  }

  // 5. Would Use Intent
  if (data.would_use === 'Definitely') {
    score += 5;
    reasons.push('+5 Definitely would use');
  } else if (data.would_use === 'Probably') {
    score += 3;
    reasons.push('+3 Probably would use');
  }

  // 6. Willingness to Pay / Payment Intent
  if (data.willingness_to_pay && data.willingness_to_pay !== '₹0' && data.preferred_payment_model !== 'Free') {
    score += 3;
    reasons.push('+3 Willing to pay');
  }

  // 7. Early Access Request
  if (data.early_access_requested) {
    score += 2;
    reasons.push('+2 Requested early testing');
  }

  let tier: 'HOT' | 'WARM' | 'COLD' = 'COLD';
  if (score >= 18) {
    tier = 'HOT';
  } else if (score >= 10) {
    tier = 'WARM';
  }

  return { score, tier, reasons };
}
