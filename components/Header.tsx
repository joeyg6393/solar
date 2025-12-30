'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900">
            <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2L2 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-8-5z" />
            </svg>
            <span>Solar Solutions</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/#services" className="text-gray-700 hover:text-orange-600 transition-colors">
              Services
            </Link>
            <Link href="/#benefits" className="text-gray-700 hover:text-orange-600 transition-colors">
              Why Solar
            </Link>
            <Link href="/#process" className="text-gray-700 hover:text-orange-600 transition-colors">
              Our Process
            </Link>
            <Link href="/#testimonials" className="text-gray-700 hover:text-orange-600 transition-colors">
              Reviews
            </Link>
            <Link href="/#areas" className="text-gray-700 hover:text-orange-600 transition-colors">
              Service Areas
            </Link>
            <Link href="/#contact" className="text-gray-700 hover:text-orange-600 transition-colors">
              Contact
            </Link>
          </div>

          {/* Phone & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:4135550100"
              className="flex items-center gap-2 text-gray-900 hover:text-orange-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="font-semibold">(413) 555-0100</span>
            </a>
            <Link href="/#contact" className="btn btn--primary btn--small">
              Get Free Quote
            </Link>
          </div>

          {/* Mobile Phone Button - Always visible */}
          <a
            href="tel:4135550100"
            className="md:hidden flex items-center justify-center w-10 h-10 bg-orange-600 text-white rounded-full"
            aria-label="Call us"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col gap-4 mt-4">
              <Link href="/#services" className="text-gray-700 hover:text-orange-600" onClick={() => setMobileMenuOpen(false)}>
                Services
              </Link>
              <Link href="/#benefits" className="text-gray-700 hover:text-orange-600" onClick={() => setMobileMenuOpen(false)}>
                Why Solar
              </Link>
              <Link href="/#process" className="text-gray-700 hover:text-orange-600" onClick={() => setMobileMenuOpen(false)}>
                Our Process
              </Link>
              <Link href="/#testimonials" className="text-gray-700 hover:text-orange-600" onClick={() => setMobileMenuOpen(false)}>
                Reviews
              </Link>
              <Link href="/#areas" className="text-gray-700 hover:text-orange-600" onClick={() => setMobileMenuOpen(false)}>
                Service Areas
              </Link>
              <Link href="/#contact" className="text-gray-700 hover:text-orange-600" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
              <a href="tel:4135550100" className="btn btn--outline btn--small">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (413) 555-0100
              </a>
              <Link href="/#contact" className="btn btn--primary btn--small" onClick={() => setMobileMenuOpen(false)}>
                Get Free Quote
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
