import type { TemperColour } from '../../content/business';

export const TEMPER_VAR: Record<TemperColour, string> = {
  straw: 'var(--temper-straw)',
  bronze: 'var(--temper-bronze)',
  purple: 'var(--temper-purple)',
  blue: 'var(--temper-blue)',
};

export const ON_TEMPER_VAR: Record<TemperColour, string> = {
  straw: 'var(--on-temper-straw)',
  bronze: 'var(--on-temper-bronze)',
  purple: 'var(--on-temper-purple)',
  blue: 'var(--on-temper-blue)',
};

export const TEMPER_BG_CLASS: Record<TemperColour, string> = {
  straw: 'bg-temper-straw text-on-temper-straw',
  bronze: 'bg-temper-bronze text-on-temper-bronze',
  purple: 'bg-temper-purple text-on-temper-purple',
  blue: 'bg-temper-blue text-on-temper-blue',
};

export const TEMPER_BORDER_CLASS: Record<TemperColour, string> = {
  straw: 'border-temper-straw',
  bronze: 'border-temper-bronze',
  purple: 'border-temper-purple',
  blue: 'border-temper-blue',
};
