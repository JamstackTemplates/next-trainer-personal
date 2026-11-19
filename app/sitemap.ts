import type { MetadataRoute } from 'next';
import { absoluteUrl } from '../lib/paths';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/programs/', '/results/', '/coaching/', '/contact/'].flatMap(path => {
    const url = absoluteUrl(path);
    return url ? [{ url }] : [];
  });
}
