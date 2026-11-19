import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import {
  DAYS,
  openingLabel,
  studioOpeningStatus,
  validateHours,
  type OpeningHours,
} from '../lib/hours.ts';

const sampleHours: OpeningHours[] = DAYS.map(day =>
  day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' },
);
const atSample = (date: string, zone = 'America/New_York') =>
  openingLabel(sampleHours, zone, new Date(date));
const atStudio = (date: string, zone = 'America/New_York') =>
  studioOpeningStatus(business.hours, zone, new Date(date));

test('Forge studio hours: Monday boundaries, Saturday close, Sunday closed all day', () => {
  assert.doesNotThrow(() => validateHours(business.hours));

  // Monday 2026-11-16 (EST = UTC-5)
  assert.deepEqual(atStudio('2026-11-16T10:59:00Z'), {
    state: 'closed',
    label: 'Studio closed · opens today 6am',
  });
  assert.deepEqual(atStudio('2026-11-16T11:00:00Z'), {
    state: 'open',
    label: 'Studio open now · until 8pm',
  });
  assert.deepEqual(atStudio('2026-11-17T00:59:00Z'), {
    state: 'open',
    label: 'Studio open now · until 8pm',
  });
  assert.deepEqual(atStudio('2026-11-17T01:00:00Z'), {
    state: 'closed',
    label: 'Studio closed · opens Tue 6am',
  });

  // Saturday 2026-11-21 (EST = UTC-5): 07:00–13:00
  assert.deepEqual(atStudio('2026-11-21T17:59:00Z'), {
    state: 'open',
    label: 'Studio open now · until 1pm',
  });
  assert.deepEqual(atStudio('2026-11-21T18:00:00Z'), {
    state: 'closed',
    label: 'Studio closed · opens Mon 6am',
  });

  // Sunday 2026-11-22 (EST = UTC-5): closed all day
  for (const utc of ['2026-11-22T05:00:00Z', '2026-11-22T15:00:00Z', '2026-11-23T04:59:00Z']) {
    assert.deepEqual(
      atStudio(utc),
      { state: 'closed', label: 'Studio closed · opens Mon 6am' },
      `Sunday at ${utc}`,
    );
  }
});

test('Forge studio hours preserve local times across both 2026 DST changes in America/New_York', () => {
  // Spring forward: Sunday 2026-03-08 at 02:00 EST -> 03:00 EDT (UTC-4)
  // Saturday 2026-03-07 (still EST = UTC-5): 07:00 local = 12:00Z
  assert.equal(atStudio('2026-03-07T11:59:00Z').state, 'closed');
  assert.equal(atStudio('2026-03-07T12:00:00Z').state, 'open');
  // Monday 2026-03-09 (now EDT = UTC-4): 06:00 local = 10:00Z, 20:00 local = 00:00Z next day
  assert.deepEqual(atStudio('2026-03-09T09:59:00Z'), {
    state: 'closed',
    label: 'Studio closed · opens today 6am',
  });
  assert.deepEqual(atStudio('2026-03-09T10:00:00Z'), {
    state: 'open',
    label: 'Studio open now · until 8pm',
  });
  assert.equal(atStudio('2026-03-09T23:59:00Z').state, 'open');
  assert.equal(atStudio('2026-03-10T00:00:00Z').state, 'closed');

  // Fall back: Sunday 2026-11-01 at 02:00 EDT -> 01:00 EST (UTC-5)
  // Saturday 2026-10-31 (still EDT = UTC-4): 07:00 local = 11:00Z, 13:00 local = 17:00Z
  assert.equal(atStudio('2026-10-31T10:59:00Z').state, 'closed');
  assert.equal(atStudio('2026-10-31T11:00:00Z').state, 'open');
  assert.equal(atStudio('2026-10-31T17:00:00Z').state, 'closed');
  // Monday 2026-11-02 (now EST = UTC-5): 06:00 local = 11:00Z
  assert.deepEqual(atStudio('2026-11-02T10:59:00Z'), {
    state: 'closed',
    label: 'Studio closed · opens today 6am',
  });
  assert.deepEqual(atStudio('2026-11-02T11:00:00Z'), {
    state: 'open',
    label: 'Studio open now · until 8pm',
  });
});

test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(atSample('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(atSample('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(atSample('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(atSample('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});

test('missing/invalid zones stay neutral and invalid/overnight intervals name the weekday', () => {
  assert.equal(atStudio('2026-11-16T15:00:00Z', '').state, 'unknown');
  assert.equal(atStudio('2026-11-16T15:00:00Z', 'Mars/Base').state, 'unknown');
  for (const opens of ['24:00', '9:00', '18:00']) {
    assert.throws(
      () => validateHours(sampleHours.map(x => (x.day === 'Tuesday' ? { ...x, opens } : x))),
      /Tuesday/,
    );
  }
  assert.throws(() => validateHours(sampleHours.slice(1)), /Monday/);
  assert.throws(
    () => validateHours(sampleHours.map(x => (x.day === 'Tuesday' ? { ...x, closes: undefined } : x))),
    /Tuesday/,
  );
});
