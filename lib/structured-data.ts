import { business } from '../content/business.ts';
import { programs, type ProgramAvailability } from '../content/programs.ts';
import { absoluteUrl } from './paths.ts';

function schemaAvailability(availability: ProgramAvailability): string {
  switch (availability) {
    case 'open':
      return 'https://schema.org/InStock';
    case 'waitlist':
      return 'https://schema.org/LimitedAvailability';
    case 'full':
      return 'https://schema.org/SoldOut';
  }
}

/** ExerciseGym structured data derived directly from content/business.ts and content/programs.ts. */
export function businessStructuredData() {
  const url = absoluteUrl('/');
  const programsUrl = absoluteUrl('/programs/');
  const openingHoursSpecification = business.hours
    .filter(entry => entry.opens && entry.closes)
    .map(entry => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${entry.day}`,
      opens: entry.opens,
      closes: entry.closes,
    }));

  const makesOffer = programs.map(program => ({
    '@type': 'Offer',
    name: program.name,
    description: program.summary,
    price: program.priceUsd,
    priceCurrency: 'USD',
    availability: schemaAvailability(program.availability),
    ...(programsUrl ? { url: `${programsUrl}#${program.id}` } : {}),
    itemOffered: {
      '@type': 'Service',
      name: program.name,
      description: program.summary,
    },
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'ExerciseGym',
    name: business.name,
    description: business.introduction,
    email: business.email,
    telephone: business.phone,
    ...(url ? { url } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    openingHoursSpecification,
    makesOffer,
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
