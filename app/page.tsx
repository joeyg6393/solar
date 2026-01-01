import Image from 'next/image';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import { getAllServices, getAllLocations } from '@/lib/data';

export default function HomePage() {
  const services = getAllServices();
  const locations = getAllLocations();

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80"
            alt="Solar panels background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container relative py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-600/20 text-orange-400 px-4 py-2 rounded-full mb-6">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">NABCEP Certified Installers</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
                Power Your Home with <span className="text-orange-500">Clean Solar Energy</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Save up to 70% on electricity bills with professional solar panel installation in Springfield, MA. Join 1,200+ happy homeowners who&apos;ve made the switch to renewable energy.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div>
                  <div className="text-3xl font-bold text-orange-500">1,200+</div>
                  <div className="text-sm text-gray-400">Installations</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-500">25 Years</div>
                  <div className="text-sm text-gray-400">Warranty</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-500">4.9/5</div>
                  <div className="text-sm text-gray-400">Rating</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href="#contact" className="btn btn--primary btn--large">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Get Free Solar Quote
                </a>
                <a href="#contact" className="btn btn--outline-white btn--large">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Schedule a Call
                </a>
              </div>

              {/* Trust Indicators */}
              <p className="text-sm text-gray-400 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                No obligation quote - Free consultation - Same-day response
              </p>
            </div>

            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80"
                alt="Solar panels on modern home"
                width={600}
                height={450}
                className="rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="bg-white/5 backdrop-blur-sm border-t border-white/10">
          <div className="container py-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {['NABCEP Certified', '25-Year Warranty', 'BBB A+ Rated', 'Licensed & Insured', 'Flexible Financing'].map((badge, i) => (
                <div key={i} className="flex items-center justify-center gap-2 text-sm text-gray-300">
                  <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section" id="services">
        <div className="container">
          <div className="section__header">
            <span className="section__subtitle">Our Services</span>
            <h2 className="section__title">Complete Solar Solutions for Every Need</h2>
            <p className="section__description">From residential rooftops to commercial installations, we provide comprehensive solar services tailored to your energy goals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((service, index) => (
              <Link
                key={service.slug}
                href={`/${service.slug}`}
                className={`bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 group ${index === 1 ? 'ring-2 ring-orange-500 relative' : ''}`}
              >
                {index === 1 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-600 transition-colors">
                  <svg className="w-7 h-7 text-orange-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex items-center text-orange-600 font-semibold group-hover:gap-2 transition-all">
                  Learn More
                  <svg className="w-5 h-5 ml-1 group-hover:ml-0 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section section--gray" id="benefits">
        <div className="container">
          <div className="section__header">
            <span className="section__subtitle">Why Go Solar</span>
            <h2 className="section__title">Transform Your Energy. Transform Your Future.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '💰', title: 'Save on Energy Bills', desc: 'Reduce your electricity costs by up to 70%. Most homeowners save $1,500+ annually with solar energy.' },
              { icon: '🏠', title: 'Increase Home Value', desc: 'Homes with solar panels sell for 4% more on average. It&apos;s an investment that pays for itself.' },
              { icon: '🌱', title: 'Reduce Carbon Footprint', desc: 'Offset 3-4 tons of CO2 annually. Make a positive environmental impact for future generations.' },
              { icon: '📋', title: 'Flexible Financing', desc: '$0 down payment options available. Low monthly payments that are often less than your current electric bill.' },
              { icon: '⚡', title: 'Energy Independence', desc: 'Protect yourself from rising utility costs. Generate your own clean, reliable power.' },
              { icon: '🛡️', title: '25-Year Warranty', desc: 'Industry-leading warranties on panels and workmanship. Your investment is protected for decades.' },
            ].map((benefit, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section" id="process">
        <div className="container">
          <div className="section__header">
            <span className="section__subtitle">How It Works</span>
            <h2 className="section__title">Your Solar Journey in 5 Simple Steps</h2>
            <p className="section__description">From initial consultation to flipping the switch, we handle everything. It&apos;s easier than you think.</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {[
              { title: 'Free Consultation', desc: 'We assess your property, review your energy bills, and design a custom solar system tailored to your needs.' },
              { title: 'Custom Proposal', desc: 'Receive a detailed proposal with system design, cost breakdown, savings estimates, and financing options.' },
              { title: 'Permits & Approvals', desc: 'We handle all paperwork, permits, and utility approvals. You don&apos;t lift a finger during this process.' },
              { title: 'Professional Installation', desc: 'Our certified team installs your solar system with precision and care. Most installations complete in 1-3 days.' },
              { title: 'Activation & Monitoring', desc: 'Final inspection, utility connection, and system activation. Start generating clean energy and tracking savings!' },
            ].map((step, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href="#contact" className="btn btn--primary btn--large">
              Start Your Solar Journey Today
            </a>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section" id="areas">
        <div className="container">
          <div className="section__header">
            <span className="section__subtitle">Service Coverage</span>
            <h2 className="section__title">Proudly Serving Springfield & Surrounding Areas</h2>
            <p className="section__description">Professional solar installation throughout Western Massachusetts and Northern Connecticut.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {locations.slice(0, 16).map((location) => (
              <Link
                key={location.id}
                href={`/${location.id}`}
                className="flex items-center gap-2 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow group"
              >
                <svg className="w-5 h-5 text-orange-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-900 group-hover:text-orange-600 transition-colors">{location.name}</span>
              </Link>
            ))}
          </div>

          {locations.length > 16 && (
            <p className="text-center text-gray-600 mt-8">
              <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Don&apos;t see your city? <a href="#contact" className="text-orange-600 hover:underline">Contact us</a> - we may still be able to help!
            </p>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="section section--gray" id="contact">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="section__header text-left mb-8">
                <span className="section__subtitle">Get Started Today</span>
                <h2 className="section__title text-left">Request Your Free Solar Quote</h2>
                <p className="section__description text-left">Take the first step toward energy independence. Get a custom solar proposal with no obligation.</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Schedule a Call</h4>
                    <p className="text-gray-600">Fill out the form and we&apos;ll call you</p>
                    <p className="text-gray-500 text-sm">Mon-Fri: 8am - 6pm EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Visit Us</h4>
                    <p className="text-gray-600">123 Solar Way<br />Springfield, MA 01101</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Ready to Start Saving with Solar?</h2>
          <p className="text-xl mb-8 text-orange-100">Join 1,200+ satisfied customers in Springfield who&apos;ve made the switch to clean energy</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="btn btn--white btn--large">Get Free Quote</a>
            <a href="#contact" className="btn btn--outline-white btn--large">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Schedule a Call
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
