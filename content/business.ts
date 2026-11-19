import type { OpeningHours } from '../lib/hours.ts';

export type TemperColour = 'straw' | 'bronze' | 'purple' | 'blue';

export interface MethodPhase {
  /** URL-safe stable phase identifier. */
  id: string;
  /** Display numeral stamped on the temper scale ("01"–"04"). */
  number: string;
  /** Temper colour token name mapping onto steel oxide scale. */
  temperColour: TemperColour;
  /** Real tempering temperature mark shown as a mono detail. */
  tempMark: string;
  /** Phase name. */
  title: string;
  /** Two-line summary for Home. */
  shortSummary: string;
  /** Full paragraph for the Coaching page. */
  description: string;
  /** Short mono deliverables list for Coaching. */
  deliverables: string[];
}

export interface FirstSessionStep {
  /** Ascending plate weight used to size the step badge. */
  plateWeightLb: 10 | 25 | 35 | 45;
  /** Step index ("01"–"04"). */
  step: string;
  /** Step title. */
  title: string;
  /** Duration in mono ("10 MIN"). */
  duration: string;
  /** Plain-English explanation of what happens. */
  detail: string;
}

export interface FaqEntry {
  /** URL-safe stable question identifier. */
  id: string;
  /** Question text rendered inside <summary>. */
  question: string;
  /** Answer copy. */
  answer: string;
}

export interface BusinessAddress {
  street: string;
  locality: string;
  region: string;
  postalCode: string;
  country: string;
  neighborhood: string;
  formatted: string;
  directions: string;
  parking: string;
  remoteCoverage: string;
}

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Wordmark primary word. */
  wordmark: string;
  /** Wordmark subline in mono. */
  wordmarkSub: string;
  /** Short headline for the home page. */
  tagline: string;
  /** Plain-text introduction used by Home and fallback metadata. */
  introduction: string;
  /** Public contact address, always visible on Contact and Footer. */
  email: string;
  /** Public phone number. */
  phone: string;
  /** Studio address and arrival notes. */
  address: BusinessAddress;
  /** Weekly studio hours (by appointment, same-day intervals only). */
  hours: OpeningHours[];
  /** Compact human-readable schedule summary for neutral static output. */
  hoursSummary: Array<{ label: string; time: string }>;
  /** Four-phase coaching method mapped onto the temper-steel scale. */
  methodPhases: MethodPhase[];
  /** Step-by-step first session sequence for Coaching. */
  firstSessionSteps: FirstSessionStep[];
  /** Equipment inventory in the Strip District studio. */
  equipment: string[];
  /** Coaching page FAQ entries rendered as static <details>. */
  faq: FaqEntry[];
  /** Contact copy; the hosted form supports name, email and message only. */
  enquiries: {
    title: string;
    /** Must frame submissions as enquiries; never claim a booking/reservation is confirmed. */
    introduction: string;
    usefulToInclude: string[];
  };
  /** Disclaimers shared with Results and Programs. */
  disclaimers: {
    results: string;
    pricingAndClearance: string;
  };
}

export const business: Business = {
  name: 'Forge Strength Coaching',
  wordmark: 'FORGE',
  wordmarkSub: 'STRENGTH COACHING',
  tagline: 'Get strong. Stay strong.',
  introduction:
    'Barbell coaching for real adults: two coaches, one Strip District studio, a plan built around your week.',
  email: 'coach@forgestrength.example',
  phone: '(412) 555-0147',
  address: {
    street: '2214 Penn Avenue',
    locality: 'Pittsburgh',
    region: 'PA',
    postalCode: '15222',
    country: 'US',
    neighborhood: 'Strip District',
    formatted: '2214 Penn Avenue, Pittsburgh, PA 15222',
    directions:
      'In Pittsburgh’s Strip District, a five-minute walk from the Senator John Heinz History Center.',
    parking: 'Street parking on Penn Avenue; bike rack right outside the door.',
    remoteCoverage: 'Remote programming serves clients anywhere in the US.',
  },
  hours: [
    { day: 'Monday', opens: '06:00', closes: '20:00' },
    { day: 'Tuesday', opens: '06:00', closes: '20:00' },
    { day: 'Wednesday', opens: '06:00', closes: '20:00' },
    { day: 'Thursday', opens: '06:00', closes: '20:00' },
    { day: 'Friday', opens: '06:00', closes: '20:00' },
    { day: 'Saturday', opens: '07:00', closes: '13:00' },
    { day: 'Sunday' },
  ],
  hoursSummary: [
    { label: 'Mon – Fri', time: '6:00am – 8:00pm' },
    { label: 'Saturday', time: '7:00am – 1:00pm' },
    { label: 'Sunday', time: 'Closed' },
  ],
  methodPhases: [
    {
      id: 'assess',
      number: '01',
      temperColour: 'straw',
      tempMark: '420°F · STRAW',
      title: 'Assess',
      shortSummary:
        'See how you hinge, squat, press and recover before a single heavy plate goes on the bar.',
      description:
        'Every block begins with an unhurried movement screen, your injury and training history, and an honest look at your week. We find the stance, grip and bar variation that fit your joints today—whether you are holding an empty bar or walking in with years of lifting behind you.',
      deliverables: ['Joint & movement screen', 'Starting weights set safely', 'Written 4-to-16 week plan'],
    },
    {
      id: 'build',
      number: '02',
      temperColour: 'bronze',
      tempMark: '480°F · BRONZE',
      title: 'Build',
      shortSummary:
        'Groove repeatable positions with moderate weight until every warm-up rep looks like the last.',
      description:
        'Strength is a practiced skill. In the Build phase we establish a steady rhythm: the same cues, controlled tempos, and enough volume to toughen connective tissue and build work capacity without leaving you wrecked for work or family life.',
      deliverables: ['Consistent technical cues', 'Paper & app logbook tracking', 'Fortnightly form check'],
    },
    {
      id: 'load',
      number: '03',
      temperColour: 'purple',
      tempMark: '540°F · PURPLE',
      title: 'Load',
      shortSummary:
        'Add five pounds when the bar speed earns it—tracked rep by rep, adjusted when life gets busy.',
      description:
        'Once your positions hold under fatigue, we push the numbers methodically. Every set goes in the logbook. Had a rough night of sleep or a week of travel? Your coach adjusts the day’s prescription on the floor so momentum never stalls.',
      deliverables: ['Weekly load progression', 'Live bar-speed & effort adjustments', 'Recovery-aware pacing'],
    },
    {
      id: 'test',
      number: '04',
      temperColour: 'blue',
      tempMark: '590°F · BLUE',
      title: 'Test',
      shortSummary:
        'Measure what changed—new working weights, rep milestones, or nine attempts on a meet platform.',
      description:
        'At the end of the block we put your training to work: a coached test day in the studio, a timed carry benchmark, or your first powerlifting meet. You leave with a written block review and the exact starting point for what comes next.',
      deliverables: ['Coached test day or meet handling', 'Before-and-after logbook report', 'Next block mapped out'],
    },
  ],
  firstSessionSteps: [
    {
      plateWeightLb: 10,
      step: '01',
      title: 'Arrive & settle in',
      duration: '10 MIN',
      detail:
        'No front desk sales pitch and no crowd. Park on Penn Avenue or lock your bike out front, grab water, and talk through your week, goals and any old aches with your coach.',
    },
    {
      plateWeightLb: 25,
      step: '02',
      title: 'Movement screen',
      duration: '15 MIN',
      detail:
        'We check how you hinge, squat, brace and reach overhead with bodyweight and light kettlebells—no pass/fail grades, just finding the cleanest starting positions.',
    },
    {
      plateWeightLb: 35,
      step: '03',
      title: 'First lifts on the bar',
      duration: '25 MIN',
      detail:
        'You touch the barbell (an empty 15 lb or 45 lb bar, or a trap bar) at comfortable weights while we dial in stance, grip and breathing—zero rushing, zero shouting.',
    },
    {
      plateWeightLb: 45,
      step: '04',
      title: 'Plan handed over',
      duration: '10 MIN',
      detail:
        'Before you walk out, your coach writes your starting numbers into your logbook, recommends the right block for your schedule, and answers every question on pacing and cost.',
    },
  ],
  equipment: [
    '2 commercial power racks with westside hole spacing',
    'Oak & vulcanized rubber deadlift platform',
    '45 lb power bars, 35 lb bars, 15 lb technique bar & open trap bar',
    'Calibrated iron & competition bumper plates (1.25 lb micro-plates up to 45 lb)',
    '40-foot turf sled lane with push prowler & harness',
    'Cast-iron kettlebells (8 kg to 40 kg) & adjustable dumbbells',
    'Chalk bowls at every station, zero mirrors, zero loud TVs',
  ],
  faq: [
    {
      id: 'fit-to-start',
      question: 'Do I need to be fit to start?',
      answer:
        'No. Iron Foundations starts with an empty bar—or a 15 lb technique bar or light kettlebell—and builds from wherever your strength and mobility are today.',
    },
    {
      id: 'consultation-call',
      question: 'What happens on the consultation call?',
      answer:
        'It is a free 30-minute conversation about your goals, schedule, training history and which program fits best. There is no sales pressure and no obligation.',
    },
    {
      id: 'supplements-meal-plans',
      question: 'Do you sell supplements or meal plans?',
      answer:
        'No. We share practical everyday habits around protein, sleep and recovery, and refer to a registered dietitian whenever specialized nutrition support is helpful.',
    },
    {
      id: 'train-injured',
      question: 'Can I train if I’m injured?',
      answer:
        'Often, yes—with clearance from your clinician or physiotherapist. Mention any injury, surgery or medical condition in your enquiry so we can plan safely from day one.',
    },
    {
      id: 'how-payments-work',
      question: 'How do payments work?',
      answer:
        'Monthly, arranged directly with your coach after your first session. Nothing is charged through this website.',
    },
  ],
  enquiries: {
    title: 'Book a free consultation call',
    introduction:
      "Send a short enquiry and a coach will reply within two working days to arrange a call. Sending this form doesn't reserve a call, a program place or a session; we confirm by email.",
    usefulToInclude: [
      'The program you’re curious about, or "not sure"',
      'Your training experience and any injuries or medical conditions we should know about',
      'Which days and times you could usually train',
      'A phone number and good times to call, if you’d rather talk by phone',
    ],
  },
  disclaimers: {
    results:
      'Results shown are from individual clients, shared with permission. Your progress will depend on your starting point, consistency, recovery and health.',
    pricingAndClearance:
      'Prices in USD per month. Payment is arranged directly with your coach; nothing is charged on this website. Return to Lifting and some other programs need clinician clearance.',
  },
};
