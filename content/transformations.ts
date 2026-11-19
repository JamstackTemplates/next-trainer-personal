import type { Program } from './programs.ts';

export type AgeBand = '20s' | '30s' | '40s' | '50s' | '60s';
export type MetricUnit = 'lb' | 'reps' | 'min';

export interface LogbookMetric {
  /** Lift or benchmark name. */
  label: string;
  /** Measurement unit ('min' means minutes held, e.g. timed carry). Higher is always better. */
  unit: MetricUnit;
  /** Starting figure (non-negative). */
  before: number;
  /** Ending figure (must be strictly greater than before). */
  after: number;
}

export interface Transformation {
  /** URL-safe unique logbook ID. */
  id: string;
  /** First name + initial (fictitious sample client). */
  client: string;
  /** Client age band. */
  ageBand: AgeBand;
  /** Must reference an existing program in content/programs.ts. */
  programId: string;
  /** Number of weeks logged (1–104). */
  weeks: number;
  /** Concise stated goal. */
  goal: string;
  /** 2–3 sentence coaching story. */
  story: string;
  /** 2–4 tracked higher-is-better benchmarks. */
  metrics: LogbookMetric[];
  /** One-sentence client quote. */
  quote: string;
}

export const transformations: Transformation[] = [
  {
    id: 'dana-r',
    client: 'Dana R.',
    ageBand: '40s',
    programId: 'iron-foundations',
    weeks: 24,
    goal: 'Lift without back pain',
    story:
      "Dana came in after a year of on-and-off back pain and a gym membership she'd stopped using. We spent six weeks grooving the hip hinge and bracing before the barbell ever went near the floor. By month six she was pulling two plates cleanly on Tuesday mornings before work.",
    metrics: [
      { label: 'Deadlift', unit: 'lb', before: 95, after: 215 },
      { label: 'Goblet squat', unit: 'lb', before: 25, after: 70 },
      { label: 'Push-ups', unit: 'reps', before: 0, after: 12 },
    ],
    quote: 'I pick up my bike, my kid and the dog food without thinking about it.',
  },
  {
    id: 'marcus-t',
    client: 'Marcus T.',
    ageBand: '30s',
    programId: 'barbell-strength',
    weeks: 12,
    goal: 'Break a two-year plateau',
    story:
      'Marcus had lifted on his own since college, bouncing between spreadsheets whenever his squat felt stale. Twelve weeks of paused squats, honest RPE caps and weekly load adjustments added 120 pounds across his three lifts without beating up his shoulders.',
    metrics: [
      { label: 'Squat', unit: 'lb', before: 275, after: 325 },
      { label: 'Bench', unit: 'lb', before: 205, after: 230 },
      { label: 'Deadlift', unit: 'lb', before: 365, after: 410 },
    ],
    quote: 'Twelve weeks of writing everything down beat two years of guessing on my own.',
  },
  {
    id: 'priya-s',
    client: 'Priya S.',
    ageBand: '30s',
    programId: 'return-to-lifting',
    weeks: 20,
    goal: 'Train again after her second baby',
    story:
      'Cleared by her pelvic-floor physio at 14 weeks postpartum, Priya wanted steady strength without chasing soreness. We coordinated notes with her clinician, rebuilt core pressure management first, and climbed from light carries back to heavy trap-bar pulls.',
    metrics: [
      { label: 'Trap-bar deadlift', unit: 'lb', before: 65, after: 175 },
      { label: 'Split squat', unit: 'lb', before: 0, after: 40 },
      { label: 'Carry', unit: 'min', before: 2, after: 6 },
    ],
    quote: 'Having a coach who actually read my physio notes took all the guesswork out of coming back.',
  },
  {
    id: 'walt-h',
    client: 'Walt H.',
    ageBand: '60s',
    programId: 'small-crew',
    weeks: 36,
    goal: 'Keep up with his grandkids',
    story:
      'Walt walked into the 6am Small Crew thinking barbells were for twenty-somethings. Training twice a week alongside the same three neighbours kept him showing up through a Pittsburgh winter, and his balance, grip and leg strength transformed.',
    metrics: [
      { label: 'Deadlift', unit: 'lb', before: 135, after: 245 },
      { label: 'Sit-to-stand', unit: 'reps', before: 9, after: 18 },
      { label: 'Farmer carry', unit: 'lb', before: 50, after: 120 },
    ],
    quote: 'Two mornings a week with the same crew kept me stronger at 64 than I was at 50.',
  },
  {
    id: 'ana-l',
    client: 'Ana L.',
    ageBand: '20s',
    programId: 'meet-prep',
    weeks: 16,
    goal: 'First powerlifting meet',
    story:
      'Ana signed up for a local USAPL meet in western Pennsylvania wanting to go nine for nine on the platform. Sixteen weeks of competition-command practice, attempt selection and meet-day handling turned nerves into a 95-pound jump in her total.',
    metrics: [
      { label: 'Total', unit: 'lb', before: 545, after: 640 },
      { label: 'Squat', unit: 'lb', before: 205, after: 240 },
      { label: 'Deadlift', unit: 'lb', before: 245, after: 290 },
    ],
    quote: 'Walking onto the platform knowing my openers were locked in made meet day pure fun.',
  },
];

const URL_SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const VALID_AGES = new Set<AgeBand>(['20s', '30s', '40s', '50s', '60s']);
const VALID_UNITS = new Set<MetricUnit>(['lb', 'reps', 'min']);

/** Validate transformation logbook entries and cross-check programId references. */
export function validateTransformations(
  list: readonly Transformation[],
  programList: readonly Program[],
): void {
  if (list.length === 0) throw new Error('transformations: at least one entry is required');
  const programIds = new Set(programList.map(p => p.id));
  const seen = new Set<string>();
  for (const item of list) {
    const label = `transformation "${item.id || '(missing id)'}"`;
    if (!URL_SAFE_ID.test(item.id)) throw new Error(`${label}: id must be lowercase URL-safe kebab-case`);
    if (seen.has(item.id)) throw new Error(`${label}: duplicate id`);
    seen.add(item.id);
    if (!item.client.trim()) throw new Error(`${label}: client is required`);
    if (!VALID_AGES.has(item.ageBand)) throw new Error(`${label}: invalid ageBand "${item.ageBand}"`);
    if (!programIds.has(item.programId)) {
      throw new Error(`${label}: programId "${item.programId}" does not match any program`);
    }
    if (!Number.isInteger(item.weeks) || item.weeks < 1 || item.weeks > 104) {
      throw new Error(`${label}: weeks must be an integer between 1 and 104`);
    }
    if (!item.goal.trim()) throw new Error(`${label}: goal is required`);
    if (!item.story.trim()) throw new Error(`${label}: story is required`);
    if (!item.quote.trim()) throw new Error(`${label}: quote is required`);
    if (item.metrics.length < 2 || item.metrics.length > 4) {
      throw new Error(`${label}: must include 2–4 metrics`);
    }
    for (const metric of item.metrics) {
      const mLabel = `${label} metric "${metric.label || '(missing)'}"`;
      if (!metric.label.trim()) throw new Error(`${mLabel}: label is required`);
      if (!VALID_UNITS.has(metric.unit)) throw new Error(`${mLabel}: unit must be lb, reps or min`);
      if (typeof metric.before !== 'number' || typeof metric.after !== 'number') {
        throw new Error(`${mLabel}: before and after must be numbers`);
      }
      if (metric.before < 0 || metric.after < 0) {
        throw new Error(`${mLabel}: values must be non-negative`);
      }
      if (!(metric.after > metric.before)) {
        throw new Error(`${mLabel}: after (${metric.after}) must be greater than before (${metric.before})`);
      }
    }
  }
}
