import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ContactForm from '@/components/ContactForm';
import {
  getAllPageSlugs,
  getPageDataBySlug,
  getLocationBySlug,
  getServiceBySlug,
  getPagesByService,
  getPagesByLocation,
  getAllServices,
  getAllLocations,
} from '@/lib/data';
import { generateLocalBusinessSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo';

export async function generateStaticParams() {
  const pageSlugs = getAllPageSlugs();
  const serviceSlugs = getAllServices().map(s => s.slug);
  const locationSlugs = getAllLocations().map(l => l.id);

  return [
    ...pageSlugs.map(slug => ({ slug })),
    ...serviceSlugs.map(slug => ({ slug })),
    ...locationSlugs.map(slug => ({ slug })),
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const pageData = getPageDataBySlug(slug);

  if (pageData) {
    return {
      title: pageData.pageTitle,
      description: pageData.metaDescription,
      keywords: [...pageData.keywords, ...pageData.localKeywords].join(', '),
      alternates: {
        canonical: `https://solarsolutions.com/${slug}`,
      },
      openGraph: {
        title: pageData.pageTitle,
        description: pageData.metaDescription,
        images: [pageData.images.heroImage.url],
        type: 'website',
      },
    };
  }

  const service = getServiceBySlug(slug);
  if (service) {
    return {
      title: `${service.name} - Professional Service in Springfield, MA`,
      description: `${service.description} - Serving all of Springfield and surrounding areas. Get a free quote today!`,
      keywords: [...service.keywords, ...service.localKeywords].join(', '),
      alternates: {
        canonical: `https://solarsolutions.com/${slug}`,
      },
    };
  }

  const location = getLocationBySlug(slug);
  if (location) {
    return {
      title: `Solar Installation Services in ${location.name}, MA | Free Quote`,
      description: `Professional solar panel installation in ${location.name}, Massachusetts. Quality workmanship, 25-year warranties. Request your free quote today!`,
      keywords: `solar panels ${location.name}, solar installation ${location.name} MA`,
      alternates: {
        canonical: `https://solarsolutions.com/${slug}`,
      },
    };
  }

  return {
    title: 'Page Not Found',
    description: 'The page you are looking for could not be found.',
  };
}

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pageData = getPageDataBySlug(slug);

  // Handle service+location page
  if (pageData) {
    const location = getLocationBySlug(pageData.locationSlug);

    if (!location) {
      notFound();
    }

    const schemaMarkup = [
      generateLocalBusinessSchema(pageData, location),
      generateFAQSchema(pageData.faq),
      generateBreadcrumbSchema([
        { name: 'Home', url: 'https://solarsolutions.com/' },
        { name: pageData.service, url: `https://solarsolutions.com/${pageData.serviceSlug}` },
        { name: pageData.location, url: `https://solarsolutions.com/${pageData.locationSlug}` },
        { name: `${pageData.service} in ${pageData.location}`, url: `https://solarsolutions.com/${pageData.id}` },
      ]),
    ];

    return (
      <>
        {/* Schema.org markup */}
        {schemaMarkup.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}

        {/* Breadcrumbs */}
        <div className="bg-gray-50 border-b">
          <div className="container py-4">
            <nav className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-orange-600">Home</Link>
              <span>/</span>
              <Link href={`/${pageData.serviceSlug}`} className="hover:text-orange-600">{pageData.service}</Link>
              <span>/</span>
              <Link href={`/${pageData.locationSlug}`} className="hover:text-orange-600">{pageData.location}</Link>
              <span>/</span>
              <span className="text-gray-900">{pageData.service} in {pageData.location}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <Image
              src={pageData.images.heroImage.url}
              alt={pageData.images.heroImage.alt}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="container relative py-16 md:py-24">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-orange-600/20 text-orange-400 px-4 py-2 rounded-full mb-6">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Serving {pageData.location}, {location.county}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">{pageData.h1}</h1>
              <p className="text-xl md:text-2xl text-orange-400 mb-4">{pageData.heroHeadline}</p>
              <p className="text-lg text-gray-300 mb-8">{pageData.heroSubheadline}</p>

              {/* CTA with urgency */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <a href="#contact" className="btn btn--primary btn--large">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  {pageData.ctaText}
                </a>
                <a href="#contact" className="btn btn--outline-white btn--large">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Schedule a Call
                </a>
              </div>

              {pageData.ctaUrgency && (
                <p className="text-orange-400 font-semibold flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {pageData.ctaUrgency}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Service Description */}
        <section className="section">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="prose prose-lg max-w-none">
                  {pageData.serviceDescription.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-600 mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Quick Facts Sidebar */}
              <div>
                <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6 sticky top-24">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Facts</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <div className="font-semibold text-gray-900">Response Time</div>
                        <div className="text-gray-600">{pageData.responseTime}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <div className="font-semibold text-gray-900">Experience</div>
                        <div className="text-gray-600">{pageData.yearsExperience}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <div className="font-semibold text-gray-900">Projects Completed</div>
                        <div className="text-gray-600">{pageData.projectsCompleted}</div>
                      </div>
                    </div>
                  </div>
                  <hr className="my-4 border-orange-200" />
                  <a href="#contact" className="btn btn--primary btn--full mb-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Schedule a Call
                  </a>
                  <a href="#contact" className="btn btn--outline btn--full">Get Free Quote</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="section section--gray">
          <div className="container">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Us for {pageData.service} in {pageData.location}?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pageData.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="section">
          <div className="container">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Process</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              {pageData.process.map((step) => (
                <div key={step.step} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        {pageData.features && pageData.features.length > 0 && (
          <section className="section section--gray">
            <div className="container">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Features & Equipment</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pageData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white rounded-lg p-4">
                    <svg className="w-5 h-5 text-orange-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Gallery */}
        {pageData.images.gallery && pageData.images.gallery.length > 0 && (
          <section className="section">
            <div className="container">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Project Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {pageData.images.gallery.map((image, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <p className="text-white text-sm">{image.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {pageData.faq && pageData.faq.length > 0 && (
          <section className="section section--gray">
            <div className="container">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
              <div className="max-w-3xl mx-auto space-y-4">
                {pageData.faq.map((item, index) => (
                  <details key={index} className="bg-white rounded-lg shadow-md group">
                    <summary className="cursor-pointer p-6 font-semibold text-gray-900 flex items-center justify-between">
                      {item.question}
                      <svg className="w-5 h-5 text-orange-600 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-6 pb-6 text-gray-600">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Pricing Info */}
        {pageData.pricingInfo && (
          <section className="section">
            <div className="container">
              <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-8 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Pricing & Investment</h2>
                <p className="text-gray-700">{pageData.pricingInfo}</p>
              </div>
            </div>
          </section>
        )}

        {/* Contact Section */}
        <section className="section section--gray" id="contact">
          <div className="container max-w-4xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
              <p className="text-lg text-gray-600">Request your free quote for {pageData.service} in {pageData.location} today!</p>
            </div>
            <ContactForm />
          </div>
        </section>
      </>
    );
  }

  // Handle service page (list all locations for this service)
  const service = getServiceBySlug(slug);
  if (service) {
    const pages = getPagesByService(service.slug);
    const locations = getAllLocations();

    return (
      <>
        <div className="bg-gray-50 border-b">
          <div className="container py-4">
            <nav className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-orange-600">Home</Link>
              <span>/</span>
              <span className="text-gray-900">{service.name}</span>
            </nav>
          </div>
        </div>

        <section className="section">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">{service.name}</h1>
              <p className="text-xl text-gray-600 mb-8">{service.description}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#contact" className="btn btn--primary btn--large">Get Free Quote</a>
                <a href="#contact" className="btn btn--outline btn--large">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Schedule a Call
                </a>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Available in These Locations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {locations.map((location) => {
                const pageExists = pages.find(p => p.locationSlug === location.id);
                const linkHref = pageExists ? `/${pageExists.id}` : `/${location.id}`;

                return (
                  <Link
                    key={location.id}
                    href={linkHref}
                    className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow group"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">{location.name}</div>
                        <div className="text-sm text-gray-500">{location.distanceFromMain.value} {location.distanceFromMain.unit} from Springfield</div>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section section--gray" id="contact">
          <div className="container max-w-4xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Your Free Quote</h2>
              <p className="text-lg text-gray-600">Request a free consultation for {service.name}</p>
            </div>
            <ContactForm />
          </div>
        </section>
      </>
    );
  }

  // Handle location page (list all services for this location)
  const location = getLocationBySlug(slug);
  if (location) {
    const pages = getPagesByLocation(location.id);
    const services = getAllServices();

    return (
      <>
        <div className="bg-gray-50 border-b">
          <div className="container py-4">
            <nav className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-orange-600">Home</Link>
              <span>/</span>
              <span className="text-gray-900">{location.name}</span>
            </nav>
          </div>
        </div>

        <section className="section">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">Solar Installation Services in {location.name}, MA</h1>
              <p className="text-xl text-gray-600 mb-4">Professional solar panel installation serving {location.name} and {location.county}</p>
              <p className="text-gray-500 mb-8">
                <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {location.distanceFromMain.value} {location.distanceFromMain.unit} from Springfield | Population: {location.population.toLocaleString()}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#contact" className="btn btn--primary btn--large">Get Free Quote</a>
                <a href="#contact" className="btn btn--outline btn--large">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Schedule a Call
                </a>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Services in {location.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service) => {
                const pageExists = pages.find(p => p.serviceSlug === service.slug);
                const linkHref = pageExists ? `/${pageExists.id}` : `/${service.slug}`;

                return (
                  <Link
                    key={service.slug}
                    href={linkHref}
                    className="flex items-start gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow group"
                  >
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-orange-600 transition-colors">
                      <svg className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors mb-1">{service.name}</h3>
                      <p className="text-sm text-gray-600">{service.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section section--gray" id="contact">
          <div className="container max-w-4xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Request Service in {location.name}</h2>
              <p className="text-lg text-gray-600">Get your free solar consultation today</p>
            </div>
            <ContactForm />
          </div>
        </section>
      </>
    );
  }

  notFound();
}
