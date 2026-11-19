import type { Program } from './programs.ts';

export interface Testimonial {
  /** URL-safe unique testimonial ID. */
  id: string;
  /** Client display name (first name + initial). */
  name: string;
  /** Must reference an existing program in content/programs.ts. */
  programId: string;
  /** Year client started training (2019–current year). */
  since: number;
  /** Short client quote (<= 220 characters). */
  quote: string;
  /** Exactly three testimonials are featured on the Home page. */
  featured: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: 'jess-k',
    name: 'Jess K.',
    programId: 'iron-foundations',
    since: 2024,
    featured: true,
    quote:
      'I was scared of the barbell. Mara made it boring in the best way: same cues, every rep, until it clicked.',
  },
  {
    id: 'omar-b',
    name: 'Omar B.',
    programId: 'barbell-strength',
    since: 2022,
    featured: true,
    quote:
      "Theo's programming is the reason I stopped program-hopping. Twelve weeks, one plan, a 40 lb PR.",
  },
  {
    id: 'linda-w',
    name: 'Linda W.',
    programId: 'small-crew',
    since: 2021,
    featured: true,
    quote:
      "Tuesday and Thursday at 6am with the same three people. I haven't missed a month in three years.",
  },
  {
    id: 'sam-p',
    name: 'Sam P.',
    programId: 'forge-remote',
    since: 2025,
    featured: false,
    quote: 'I train in a hotel gym half the month. The weekly video notes keep me honest.',
  },
  {
    id: 'rachel-d',
    name: 'Rachel D.',
    programId: 'return-to-lifting',
    since: 2024,
    featured: false,
    quote: "They talked to my physio before I touched a bar. That's why I trusted them.",
  },
  {
    id: 'kenji-m',
    name: 'Kenji M.',
    programId: 'meet-prep',
    since: 2023,
    featured: false,
    quote: 'Theo picked my attempts on the day. Nine for nine.',
  },
  {
    id: 'beth-o',
    name: 'Beth O.',
    programId: 'iron-foundations',
    since: 2025,
    featured: false,
    quote: 'No mirrors, no shouting, no supplements for sale. Just coaching.',
  },
  {
    id: 'carlos-v',
    name: 'Carlos V.',
    programId: 'small-crew',
    since: 2020,
    featured: false,
    quote: 'Cheaper than 1:1 and I still get corrected on every set.',
  },
];

const URL_SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Validate testimonials, program references, quote lengths and featured count. */
export function validateTestimonials(
  list: readonly Testimonial[],
  programList: readonly Program[],
  currentYear = new Date().getFullYear(),
): void {
  if (list.length === 0) throw new Error('testimonials: at least one testimonial is required');
  const programIds = new Set(programList.map(p => p.id));
  const seen = new Set<string>();
  let featuredCount = 0;

  for (const item of list) {
    const label = `testimonial "${item.id || '(missing id)'}"`;
    if (!URL_SAFE_ID.test(item.id)) throw new Error(`${label}: id must be lowercase URL-safe kebab-case`);
    if (seen.has(item.id)) throw new Error(`${label}: duplicate id`);
    seen.add(item.id);
    if (!item.name.trim()) throw new Error(`${label}: name is required`);
    if (!programIds.has(item.programId)) {
      throw new Error(`${label}: programId "${item.programId}" does not match any program`);
    }
    if (!Number.isInteger(item.since) || item.since < 2019 || item.since > currentYear) {
      throw new Error(`${label}: since (${item.since}) must be an integer between 2019 and ${currentYear}`);
    }
    if (!item.quote.trim()) throw new Error(`${label}: quote is required`);
    if (item.quote.length > 220) {
      throw new Error(`${label}: quote is ${item.quote.length} characters (maximum 220)`);
    }
    if (item.featured) featuredCount += 1;
  }

  if (featuredCount !== 3) {
    throw new Error(`testimonials: expected exactly 3 featured testimonials for Home, found ${featuredCount}`);
  }
}
