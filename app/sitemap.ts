import { MetadataRoute } from 'next';
import { getAllPageData, getAllServices, getAllLocations } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://westernmasssolar.com';

  const pages = getAllPageData();
  const services = getAllServices();
  const locations = getAllLocations();

  const pageUrls = pages.map((page) => ({
    url: `${baseUrl}/${page.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const serviceUrls = services.map((service) => ({
    url: `${baseUrl}/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const locationUrls = locations.map((location) => ({
    url: `${baseUrl}/${location.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...pageUrls,
    ...serviceUrls,
    ...locationUrls,
  ];
}
