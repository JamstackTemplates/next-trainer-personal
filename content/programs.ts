import type { TemperColour } from './business.ts';

export type ProgramFormat = 'one-to-one' | 'small-crew' | 'remote';
export type ProgramAvailability = 'open' | 'waitlist' | 'full';
export type PlateWeightLb = 10 | 25 | 35 | 45;

export interface Program {
  /** URL-safe, unique identifier used for anchor links (#id) and cross-collection references. */
  id: string;
  /** Public program name. */
  name: string;
  /** Short 1–3 character code stamped on the iron barbell plate. */
  plateLabel: string;
  /** Decorative plate size (10 / 25 / 35 / 45 lb) that determines the plate diameter on the barbell. */
  plateWeightLb: PlateWeightLb;
  /** Temper oxide accent colour token name. */
  plateColour: TemperColour;
  /** Delivery format used for the Programs format filter. */
  format: ProgramFormat;
  /** One-sentence summary. */
  summary: string;
  /** 2–4 concise audience profiles. */
  goodFor: string[];
  /** 3–5 concrete inclusions. */
  includes: string[];
  /** In-studio coached sessions per week (1–5; must be 0 for remote). */
  sessionsPerWeek: number;
  /** Typical training block length in weeks (4–24). */
  blockWeeks: number;
  /** Monthly price in whole US dollars (integer). Owner edits this often. */
  priceUsd: number;
  /** Billing period unit. */
  priceUnit: 'month';
  /** Current intake status. Owner edits this and spotsLeft most often. */
  availability: ProgramAvailability;
  /** Remaining open spots (integer 1–8). Required when availability is 'open', omitted otherwise. */
  spotsLeft?: number;
  /** Optional clinician clearance callout shown on the spec sheet. */
  clearanceNote?: string;
}

export const programs: Program[] = [
  {
    id: 'iron-foundations',
    name: 'Iron Foundations',
    plateLabel: 'IF',
    plateWeightLb: 25,
    plateColour: 'straw',
    format: 'one-to-one',
    summary: 'Learn the squat, bench, deadlift and press properly, at your pace.',
    goodFor: [
      'First-time lifters',
      'People who’ve only used machines',
      'Anyone who wants a coach watching every rep',
    ],
    includes: [
      'Movement screen',
      'Two 60-minute 1:1 sessions a week',
      'Written program and app log',
      'A form review video every fortnight',
    ],
    sessionsPerWeek: 2,
    blockWeeks: 12,
    priceUsd: 340,
    priceUnit: 'month',
    availability: 'open',
    spotsLeft: 4,
  },
  {
    id: 'barbell-strength',
    name: 'Barbell Strength Block',
    plateLabel: 'BS',
    plateWeightLb: 45,
    plateColour: 'purple',
    format: 'one-to-one',
    summary: 'A 12-week block for lifters who know the basics and want bigger numbers.',
    goodFor: ['1+ year of lifting', 'Stalled progress'],
    includes: [
      'Three 60-minute 1:1 sessions a week',
      'Weekly load adjustments',
      'A test day in week 12 with a coach-written report',
    ],
    sessionsPerWeek: 3,
    blockWeeks: 12,
    priceUsd: 480,
    priceUnit: 'month',
    availability: 'waitlist',
  },
  {
    id: 'small-crew',
    name: 'Small Crew Strength',
    plateLabel: 'SC',
    plateWeightLb: 35,
    plateColour: 'bronze',
    format: 'small-crew',
    summary: 'Coached barbell sessions with three or four people on two racks.',
    goodFor: ['People who train better with company', 'A lower monthly cost'],
    includes: [
      'Two 75-minute coached sessions a week',
      'The same program written for each person’s numbers',
      'A monthly 1:1 check-in',
    ],
    sessionsPerWeek: 2,
    blockWeeks: 8,
    priceUsd: 210,
    priceUnit: 'month',
    availability: 'open',
    spotsLeft: 2,
  },
  {
    id: 'return-to-lifting',
    name: 'Return to Lifting',
    plateLabel: 'RL',
    plateWeightLb: 25,
    plateColour: 'straw',
    format: 'one-to-one',
    summary: 'A careful way back after pregnancy, injury or a long break.',
    goodFor: [
      'Postnatal clients',
      'People discharged from physiotherapy',
      'Anyone who’s been away for a year or more',
    ],
    includes: [
      'Intake call before your first session',
      'Two 60-minute 1:1 sessions a week',
      'Liaison notes you can share with your clinician',
    ],
    sessionsPerWeek: 2,
    blockWeeks: 10,
    priceUsd: 360,
    priceUnit: 'month',
    availability: 'open',
    spotsLeft: 3,
    clearanceNote: 'Requires clearance from a clinician where relevant.',
  },
  {
    id: 'meet-prep',
    name: 'Meet Prep',
    plateLabel: 'MP',
    plateWeightLb: 45,
    plateColour: 'blue',
    format: 'one-to-one',
    summary: 'Sixteen weeks to your first or next powerlifting meet.',
    goodFor: ['Registered or planned meet entrants', 'Recreational powerlifters chasing a total'],
    includes: [
      'Three 60-minute 1:1 sessions a week on a periodised block',
      'Attempt selection and peaking plan',
      'A coach handling you on meet day (travel within 100 miles of Pittsburgh)',
    ],
    sessionsPerWeek: 3,
    blockWeeks: 16,
    priceUsd: 520,
    priceUnit: 'month',
    availability: 'full',
  },
  {
    id: 'forge-remote',
    name: 'Forge Remote',
    plateLabel: 'FR',
    plateWeightLb: 10,
    plateColour: 'blue',
    format: 'remote',
    summary: 'Our programming in your gym, with a coach checking your lifts every week.',
    goodFor: ['Clients outside Pittsburgh', 'Experienced lifters who train alone'],
    includes: [
      'Four-week custom program in the app',
      'Weekly video review with written cues',
      'Message support on weekdays',
    ],
    sessionsPerWeek: 0,
    blockWeeks: 4,
    priceUsd: 160,
    priceUnit: 'month',
    availability: 'open',
    spotsLeft: 8,
  },
];

export const PROGRAM_FORMATS: ReadonlyArray<{ id: 'all' | ProgramFormat; label: string }> = [
  { id: 'all', label: 'All' },
  { id: 'one-to-one', label: '1:1' },
  { id: 'small-crew', label: 'Small crew' },
  { id: 'remote', label: 'Remote' },
];

export function formatProgramFormat(format: ProgramFormat): string {
  switch (format) {
    case 'one-to-one':
      return '1:1 Coaching';
    case 'small-crew':
      return 'Small Crew';
    case 'remote':
      return 'Remote';
  }
}

export function programAvailabilityStamp(program: Program): string {
  if (program.availability === 'open') {
    const spots = program.spotsLeft ?? 0;
    return `OPEN · ${spots} ${spots === 1 ? 'SPOT' : 'SPOTS'}`;
  }
  if (program.availability === 'waitlist') return 'WAITLIST';
  return 'FULL';
}

export function programCtaLabel(program: Program): string {
  if (program.availability === 'waitlist') return 'Ask to join the waitlist';
  if (program.availability === 'full') return 'Ask about the next intake';
  return `Ask about ${program.name}`;
}

export function programById(id: string): Program | undefined {
  return programs.find(program => program.id === id);
}

const URL_SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const VALID_WEIGHTS = new Set<PlateWeightLb>([10, 25, 35, 45]);
const VALID_COLOURS = new Set<TemperColour>(['straw', 'bronze', 'purple', 'blue']);
const VALID_FORMATS = new Set<ProgramFormat>(['one-to-one', 'small-crew', 'remote']);
const VALID_AVAILABILITY = new Set<ProgramAvailability>(['open', 'waitlist', 'full']);

/** Validate every program entry with item-specific error messages. */
export function validatePrograms(list: readonly Program[]): void {
  if (list.length === 0) throw new Error('programs: at least one program is required');
  const seen = new Set<string>();
  for (const item of list) {
    const label = `program "${item.id || '(missing id)'}"`;
    if (!URL_SAFE_ID.test(item.id)) throw new Error(`${label}: id must be lowercase URL-safe kebab-case`);
    if (seen.has(item.id)) throw new Error(`${label}: duplicate id`);
    seen.add(item.id);
    if (!item.name.trim()) throw new Error(`${label}: name is required`);
    if (!item.plateLabel.trim() || item.plateLabel.trim().length > 3) {
      throw new Error(`${label}: plateLabel must be 1–3 characters`);
    }
    if (!VALID_WEIGHTS.has(item.plateWeightLb)) {
      throw new Error(`${label}: plateWeightLb must be 10, 25, 35 or 45`);
    }
    if (!VALID_COLOURS.has(item.plateColour)) {
      throw new Error(`${label}: invalid plateColour "${item.plateColour}"`);
    }
    if (!VALID_FORMATS.has(item.format)) {
      throw new Error(`${label}: invalid format "${item.format}"`);
    }
    if (!item.summary.trim()) throw new Error(`${label}: summary is required`);
    if (item.goodFor.length < 2 || item.goodFor.length > 4 || item.goodFor.some(x => !x.trim())) {
      throw new Error(`${label}: goodFor must have 2–4 non-empty entries`);
    }
    if (item.includes.length < 3 || item.includes.length > 5 || item.includes.some(x => !x.trim())) {
      throw new Error(`${label}: includes must have 3–5 non-empty entries`);
    }
    if (!Number.isInteger(item.sessionsPerWeek)) {
      throw new Error(`${label}: sessionsPerWeek must be an integer`);
    }
    if (item.format === 'remote' && item.sessionsPerWeek !== 0) {
      throw new Error(`${label}: remote program must have sessionsPerWeek = 0`);
    }
    if (item.format !== 'remote' && (item.sessionsPerWeek < 1 || item.sessionsPerWeek > 5)) {
      throw new Error(`${label}: in-studio program must have sessionsPerWeek between 1 and 5`);
    }
    if (!Number.isInteger(item.blockWeeks) || item.blockWeeks < 4 || item.blockWeeks > 24) {
      throw new Error(`${label}: blockWeeks must be an integer between 4 and 24`);
    }
    if (!Number.isInteger(item.priceUsd) || item.priceUsd <= 0) {
      throw new Error(`${label}: priceUsd must be a positive whole-dollar integer`);
    }
    if (item.priceUnit !== 'month') throw new Error(`${label}: priceUnit must be "month"`);
    if (!VALID_AVAILABILITY.has(item.availability)) {
      throw new Error(`${label}: invalid availability "${item.availability}"`);
    }
    if (item.availability === 'open') {
      if (!Number.isInteger(item.spotsLeft) || (item.spotsLeft as number) < 1 || (item.spotsLeft as number) > 8) {
        throw new Error(`${label}: open programs require integer spotsLeft between 1 and 8`);
      }
    } else if (item.spotsLeft !== undefined) {
      throw new Error(`${label}: spotsLeft must only be set when availability is "open"`);
    }
  }
}
