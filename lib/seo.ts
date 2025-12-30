import { PageData, Location, Service } from './data';

export function generateLocalBusinessSchema(page: PageData, location: Location) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://solarsolutions.com/${page.id}`,
    name: `Solar Solutions - ${page.service} in ${page.location}`,
    description: page.shortDescription,
    image: page.images.heroImage.url,
    telephone: page.ctaPhone,
    priceRange: '$$-$$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.name,
      addressRegion: 'Massachusetts',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.coordinates.latitude,
      longitude: location.coordinates.longitude
    },
    areaServed: {
      '@type': 'City',
      name: location.name,
      '@id': `https://www.wikidata.org/wiki/Q${location.id}`
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: page.service,
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: page.service,
            description: page.shortDescription
          }
        }
      ]
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127'
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '16:00'
      }
    ]
  };
}

export function generateServiceSchema(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Solar Solutions',
      telephone: '(413) 555-0100',
      areaServed: {
        '@type': 'State',
        name: 'Massachusetts'
      }
    },
    description: service.description,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock'
    }
  };
}

export function generateFAQSchema(faq: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}
