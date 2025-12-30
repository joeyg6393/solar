import fs from 'fs';
import path from 'path';

export interface PageData {
  id: string;
  service: string;
  serviceSlug: string;
  location: string;
  locationSlug: string;
  serviceNiche: string;
  pageTitle: string;
  metaDescription: string;
  h1: string;
  heroHeadline: string;
  heroSubheadline: string;
  serviceDescription: string;
  shortDescription: string;
  benefits: string[];
  process: Array<{
    step: number;
    title: string;
    description: string;
  }>;
  features: string[];
  pricingInfo: string;
  serviceArea: string;
  availability: string;
  responseTime: string;
  qualifications: string[];
  yearsExperience: string;
  projectsCompleted: string;
  guarantees: string[];
  emergencyAvailable: boolean;
  images: {
    heroImage: {
      url: string;
      alt: string;
      caption: string;
      credit?: {
        photographer: string;
        unsplashUrl: string;
      };
    };
    gallery: Array<{
      url: string;
      alt: string;
      caption: string;
      credit?: {
        photographer: string;
        unsplashUrl: string;
      };
    }>;
  };
  h2Headings: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
  keywords: string[];
  localKeywords: string[];
  ctaPhone: string;
  ctaText: string;
  ctaSecondary: string;
  ctaUrgency: string;
}

export interface Location {
  id: string;
  name: string;
  type: string;
  isMainCity: boolean;
  distanceFromMain: {
    value: number;
    unit: string;
  };
  county: string;
  population: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface Service {
  name: string;
  slug: string;
  category: string;
  description: string;
  keywords: string[];
  localKeywords: string[];
}

// Get all page data files
export function getAllPageData(): PageData[] {
  const pagesDir = path.join(process.cwd(), '..', 'pages');

  if (!fs.existsSync(pagesDir)) {
    return [];
  }

  const files = fs.readdirSync(pagesDir);
  const jsonFiles = files.filter(file => file.endsWith('.json'));

  return jsonFiles.map(file => {
    const filePath = path.join(pagesDir, file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  });
}

// Get page data by slug
export function getPageDataBySlug(slug: string): PageData | null {
  const pagesDir = path.join(process.cwd(), '..', 'pages');
  const filePath = path.join(pagesDir, `${slug}.json`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

// Get all locations
export function getAllLocations(): Location[] {
  const locationsPath = path.join(process.cwd(), '..', 'locations.json');

  if (!fs.existsSync(locationsPath)) {
    return [];
  }

  const fileContents = fs.readFileSync(locationsPath, 'utf8');
  const data = JSON.parse(fileContents);
  return data.locations || [];
}

// Get location by slug
export function getLocationBySlug(slug: string): Location | null {
  const locations = getAllLocations();
  return locations.find(loc => loc.id === slug) || null;
}

// Get all services
export function getAllServices(): Service[] {
  const schemaPath = path.join(process.cwd(), '..', 'service-schema-template.json');

  if (!fs.existsSync(schemaPath)) {
    return [];
  }

  const fileContents = fs.readFileSync(schemaPath, 'utf8');
  const data = JSON.parse(fileContents);
  return data.services || [];
}

// Get service by slug
export function getServiceBySlug(slug: string): Service | null {
  const services = getAllServices();
  return services.find(service => service.slug === slug) || null;
}

// Get all pages for a specific service
export function getPagesByService(serviceSlug: string): PageData[] {
  const allPages = getAllPageData();
  return allPages.filter(page => page.serviceSlug === serviceSlug);
}

// Get all pages for a specific location
export function getPagesByLocation(locationSlug: string): PageData[] {
  const allPages = getAllPageData();
  return allPages.filter(page => page.locationSlug === locationSlug);
}

// Get unique service slugs
export function getUniqueServiceSlugs(): string[] {
  const services = getAllServices();
  return services.map(s => s.slug);
}

// Get unique location slugs
export function getUniqueLocationSlugs(): string[] {
  const locations = getAllLocations();
  return locations.map(l => l.id);
}

// Get all service+location page slugs
export function getAllPageSlugs(): string[] {
  const allPages = getAllPageData();
  return allPages.map(page => page.id);
}
