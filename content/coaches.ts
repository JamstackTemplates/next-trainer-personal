import type { TemperColour } from './business.ts';

export interface Coach {
  /** URL-safe unique coach identifier. */
  id: 'mara-okafor' | 'theo-lindqvist';
  /** Full name. */
  name: string;
  /** Role title. */
  role: string;
  /** One-line credo displayed on Home and Coaching. */
  credo: string;
  /** Short teaser line for Home. */
  teaser: string;
  /** Full biography for Coaching. */
  bio: string;
  /** Focus areas. */
  specialties: string[];
  /** Generic credentials (no real certifying-body logos). */
  credentials: string[];
  /** Temper colour backing the portrait disc. */
  temperColour: TemperColour;
}

export const coaches: Coach[] = [
  {
    id: 'mara-okafor',
    name: 'Mara Okafor',
    role: 'Head coach & founder',
    credo: 'Strength is a skill. We practise it.',
    teaser: '12 years coaching beginners and return-to-lifting clients.',
    bio: 'Mara founded Forge after twelve years coaching everyday adults and a collegiate career as a shot-put and hammer thrower. She specializes in first-time barbell lifters, postnatal strength and clients rebuilding after injury—translating technical mechanics into plain, calm cues.',
    specialties: ['Iron Foundations', 'Return to Lifting', 'Small Crew Strength'],
    credentials: [
      'Nationally certified strength coach',
      'Pre- & postnatal strength specialist coursework',
      'CPR/AED certified',
    ],
    temperColour: 'straw',
  },
  {
    id: 'theo-lindqvist',
    name: 'Theo Lindqvist',
    role: 'Strength coach',
    credo: 'Write it down, add five pounds, show up Thursday.',
    teaser: '93 kg competitive lifter coaching Strength Blocks and Meet Prep.',
    bio: 'Theo competes in the 93 kg raw powerlifting class and leads our Barbell Strength Block, Meet Prep and Forge Remote rosters. He is obsessed with clean programming, patient progression and helping busy adults break multi-year plateaus without burning out.',
    specialties: ['Barbell Strength Block', 'Meet Prep', 'Forge Remote'],
    credentials: [
      'Nationally certified strength coach',
      'Competitive 93 kg powerlifter & meet handler',
      'CPR/AED certified',
    ],
    temperColour: 'purple',
  },
];

const URL_SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateCoaches(list: readonly Coach[]): void {
  if (list.length === 0) throw new Error('coaches: at least one coach is required');
  const seen = new Set<string>();
  for (const item of list) {
    const label = `coach "${item.id || '(missing id)'}"`;
    if (!URL_SAFE_ID.test(item.id)) throw new Error(`${label}: id must be URL-safe`);
    if (seen.has(item.id)) throw new Error(`${label}: duplicate id`);
    seen.add(item.id);
    if (!item.name.trim()) throw new Error(`${label}: name is required`);
    if (!item.role.trim()) throw new Error(`${label}: role is required`);
    if (!item.credo.trim()) throw new Error(`${label}: credo is required`);
    if (!item.bio.trim()) throw new Error(`${label}: bio is required`);
    if (!item.credentials.length) throw new Error(`${label}: at least one credential is required`);
  }
}
