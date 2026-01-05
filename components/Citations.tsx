'use client';

import { useState } from 'react';

export interface Citation {
  id: number;
  text: string;
  source: string;
  url: string;
  year: string;
}

export const citations: Citation[] = [
  {
    id: 1,
    text: 'Up to 70% electricity bill savings',
    source: 'EnergySage',
    url: 'https://www.energysage.com/solar/much-solar-panels-save/',
    year: '2024',
  },
  {
    id: 2,
    text: 'Average $1,500+ annual savings',
    source: 'EnergySage',
    url: 'https://www.energysage.com/solar/much-solar-panels-save/',
    year: '2024',
  },
  {
    id: 3,
    text: 'Homes sell for 4%+ more with solar',
    source: 'Zillow Research',
    url: 'https://www.zillow.com/research/solar-panels-house-price-premium-background-26498/',
    year: '2019',
  },
  {
    id: 4,
    text: '$15,000-$25,000 home value increase',
    source: 'U.S. Department of Energy',
    url: 'https://www.energy.gov/eere/solar/homeowners-guide-going-solar',
    year: '2024',
  },
  {
    id: 5,
    text: '30% Federal Solar Tax Credit',
    source: 'IRS Residential Clean Energy Credit',
    url: 'https://www.irs.gov/credits-deductions/residential-clean-energy-credit',
    year: '2024',
  },
  {
    id: 6,
    text: 'Massachusetts solar incentives and SMART program',
    source: 'Mass.gov SMART Program',
    url: 'https://www.mass.gov/solar-massachusetts-renewable-target-smart',
    year: '2024',
  },
  {
    id: 7,
    text: 'Massachusetts electricity rates (3rd highest in US)',
    source: 'U.S. Energy Information Administration',
    url: 'https://www.eia.gov/state/?sid=MA',
    year: '2024',
  },
];

export function CitationRef({ id }: { id: number }) {
  return (
    <sup className="text-orange-600 cursor-help ml-0.5">
      <a href="#sources" className="hover:underline">[{id}]</a>
    </sup>
  );
}

export function SourcesSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="bg-gray-100 border-t border-gray-200" id="sources">
      <div className="container py-8">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors font-medium"
        >
          <svg
            className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          Sources & Citations
        </button>

        {isExpanded && (
          <div className="mt-4 space-y-3">
            <p className="text-sm text-gray-600 mb-4">
              All statistics on this website are based on industry research and government data.
              Individual results may vary based on location, system size, and energy usage.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
              {citations.map((citation) => (
                <li key={citation.id} className="pl-2">
                  <span className="font-medium text-gray-800">{citation.text}</span>
                  {' — '}
                  <a
                    href={citation.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-600 hover:underline"
                  >
                    {citation.source}
                  </a>
                  {' '}({citation.year})
                </li>
              ))}
            </ol>
            <p className="text-xs text-gray-500 mt-4 pt-4 border-t border-gray-200">
              <strong>Disclaimer:</strong> Savings estimates are based on national and state averages.
              Actual savings depend on factors including roof orientation, shading, local utility rates,
              system size, and available incentives. Contact us for a personalized assessment.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
