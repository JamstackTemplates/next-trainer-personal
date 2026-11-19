import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { coaches, validateCoaches } from '../content/coaches.ts';
import {
  programAvailabilityStamp,
  programCtaLabel,
  programs,
  validatePrograms,
} from '../content/programs.ts';
import { testimonials, validateTestimonials } from '../content/testimonials.ts';
import { transformations, validateTransformations } from '../content/transformations.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

test('business content has actionable required fields', () => {
  for (const key of ['name', 'tagline', 'introduction', 'email', 'phone'] as const) {
    assert.ok(business[key].trim(), `business.${key}: required`);
  }
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.ok(business.address.formatted.includes('2214 Penn Avenue'));
  assert.ok(business.enquiries.title.trim(), 'business.enquiries.title: required');
  assert.ok(business.enquiries.introduction.trim(), 'business.enquiries.introduction: required');
  assert.ok(business.enquiries.usefulToInclude.length >= 3, 'business.enquiries.usefulToInclude: include message guidance');
  for (const tip of business.enquiries.usefulToInclude) {
    assert.ok(tip.trim(), 'business.enquiries.usefulToInclude: empty tip');
  }
  assert.equal(business.methodPhases.length, 4, 'business.methodPhases: expected 4 temper phases');
  assert.equal(business.faq.length, 5, 'business.faq: expected 5 FAQ entries');
});

test('programs collection passes validation and rejects invalid owner edits with item-specific errors', () => {
  assert.doesNotThrow(() => validatePrograms(programs));
  assert.equal(programs.length, 6);

  // Duplicate ID names the item
  assert.throws(
    () => validatePrograms([...programs, { ...programs[0] }]),
    /iron-foundations.*duplicate/i,
  );

  // Non-integer or non-positive price
  assert.throws(
    () => validatePrograms(programs.map(p => (p.id === 'small-crew' ? { ...p, priceUsd: 210.5 } : p))),
    /small-crew.*priceUsd/i,
  );
  assert.throws(
    () => validatePrograms(programs.map(p => (p.id === 'small-crew' ? { ...p, priceUsd: 0 } : p))),
    /small-crew.*priceUsd/i,
  );

  // spotsLeft required (1–8) only when open
  assert.throws(
    () => validatePrograms(programs.map(p => (p.id === 'iron-foundations' ? { ...p, spotsLeft: undefined } : p))),
    /iron-foundations.*spotsLeft/i,
  );
  assert.throws(
    () => validatePrograms(programs.map(p => (p.id === 'iron-foundations' ? { ...p, spotsLeft: 9 } : p))),
    /iron-foundations.*spotsLeft/i,
  );
  assert.throws(
    () => validatePrograms(programs.map(p => (p.id === 'barbell-strength' ? { ...p, spotsLeft: 2 } : p))),
    /barbell-strength.*spotsLeft/i,
  );

  // plateLabel <= 3 characters
  assert.throws(
    () => validatePrograms(programs.map(p => (p.id === 'meet-prep' ? { ...p, plateLabel: 'MEET' } : p))),
    /meet-prep.*plateLabel/i,
  );

  // sessionsPerWeek 0 only for remote
  assert.throws(
    () => validatePrograms(programs.map(p => (p.id === 'forge-remote' ? { ...p, sessionsPerWeek: 2 } : p))),
    /forge-remote.*sessionsPerWeek/i,
  );
  assert.throws(
    () => validatePrograms(programs.map(p => (p.id === 'iron-foundations' ? { ...p, sessionsPerWeek: 0 } : p))),
    /iron-foundations.*sessionsPerWeek/i,
  );
});

test('transformations collection passes validation and enforces program references and after > before', () => {
  assert.doesNotThrow(() => validateTransformations(transformations, programs));
  assert.equal(transformations.length, 5);

  assert.throws(
    () =>
      validateTransformations(
        transformations.map(t => (t.id === 'dana-r' ? { ...t, programId: 'no-such-program' } : t)),
        programs,
      ),
    /dana-r.*no-such-program/i,
  );

  assert.throws(
    () =>
      validateTransformations(
        transformations.map(t =>
          t.id === 'marcus-t'
            ? { ...t, metrics: [{ label: 'Squat', unit: 'lb', before: 300, after: 300 }, ...t.metrics.slice(1)] }
            : t,
        ),
        programs,
      ),
    /marcus-t.*Squat.*greater/i,
  );
});

test('testimonials collection passes validation and enforces 3 featured quotes <= 220 chars', () => {
  assert.doesNotThrow(() => validateTestimonials(testimonials, programs, 2026));
  assert.equal(testimonials.length, 8);
  assert.equal(testimonials.filter(t => t.featured).length, 3);

  assert.throws(
    () =>
      validateTestimonials(
        testimonials.map(t => (t.id === 'sam-p' ? { ...t, featured: true } : t)),
        programs,
        2026,
      ),
    /exactly 3 featured/i,
  );

  assert.throws(
    () =>
      validateTestimonials(
        testimonials.map(t => (t.id === 'beth-o' ? { ...t, quote: 'a'.repeat(221) } : t)),
        programs,
        2026,
      ),
    /beth-o.*220/i,
  );

  assert.throws(
    () =>
      validateTestimonials(
        testimonials.map(t => (t.id === 'kenji-m' ? { ...t, programId: 'ghost-program' } : t)),
        programs,
        2026,
      ),
    /kenji-m.*ghost-program/i,
  );
});

test('coaches collection passes validation', () => {
  assert.doesNotThrow(() => validateCoaches(coaches));
  assert.equal(coaches.length, 2);
});

test('wording rules: enquiries never say booked, reserved or confirmed; disclaimers present', () => {
  const forbidden = /\b(booked|reserved|confirmed)\b/i;

  assert.doesNotMatch(business.enquiries.title, forbidden, 'enquiries.title');
  assert.doesNotMatch(business.enquiries.introduction, forbidden, 'enquiries.introduction');
  for (const tip of business.enquiries.usefulToInclude) {
    assert.doesNotMatch(tip, forbidden, 'enquiries.usefulToInclude');
  }

  for (const program of programs) {
    assert.doesNotMatch(programCtaLabel(program), forbidden, `program CTA for ${program.id}`);
    assert.doesNotMatch(programAvailabilityStamp(program), forbidden, `stamp for ${program.id}`);
  }

  const contactSource = readFileSync(new URL('../app/contact/page.tsx', import.meta.url), 'utf8');
  assert.doesNotMatch(contactSource, forbidden, 'app/contact/page.tsx must not claim bookings are confirmed');

  const resultsSource = readFileSync(new URL('../app/results/page.tsx', import.meta.url), 'utf8');
  assert.match(resultsSource, /disclaimers\.results/, 'Results page must render the results disclaimer');
  assert.match(business.disclaimers.results, /individual clients/i);
  assert.match(business.disclaimers.pricingAndClearance, /nothing is charged on this website/i);
  assert.match(
    business.faq.find(f => f.id === 'how-payments-work')?.answer ?? '',
    /nothing is charged through this website/i,
  );
});

test('structured data is ExerciseGym with USD offers derived from programs and escaped JSON-LD', () => {
  const schema = businessStructuredData();
  assert.equal(schema['@type'], 'ExerciseGym');
  assert.equal(schema.name, business.name);
  assert.equal(schema.email, business.email);
  assert.equal(schema.telephone, business.phone);
  assert.equal(schema.address['@type'], 'PostalAddress');
  assert.equal(schema.address.streetAddress, business.address.street);
  assert.equal(schema.openingHoursSpecification.length, 6, 'Mon–Sat open, Sunday omitted');
  assert.equal(schema.makesOffer.length, programs.length);

  for (const program of programs) {
    const offer = schema.makesOffer.find(o => o.name === program.name);
    assert.ok(offer, `missing schema offer for ${program.id}`);
    assert.equal(offer.price, program.priceUsd);
    assert.equal(offer.priceCurrency, 'USD');
    const expectedAvail =
      program.availability === 'open'
        ? 'https://schema.org/InStock'
        : program.availability === 'waitlist'
          ? 'https://schema.org/LimitedAvailability'
          : 'https://schema.org/SoldOut';
    assert.equal(offer.availability, expectedAvail);
  }

  const dangerous = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(dangerous);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), dangerous);
});
