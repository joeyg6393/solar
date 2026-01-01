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
            <Link href="/#areas" className="text-gray-700 hover:text-orange-600 transition-colors">
              Service Areas
            </Link>
            <Link href="/#contact" className="text-gray-700 hover:text-orange-600 transition-colors">
              Contact
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/#contact"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-orange-600 border border-gray-300 rounded-lg hover:border-orange-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-medium">Schedule a Call</span>
            </Link>
            <Link href="/#contact" className="btn btn--primary btn--small">
              Get Free Quote
            </Link>
          </div>

          {/* Mobile Schedule Button */}
          <Link
            href="/#contact"
            className="md:hidden flex items-center justify-center w-10 h-10 bg-orange-600 text-white rounded-full"
            aria-label="Schedule a call"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </Link>

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
              <Link href="/#areas" className="text-gray-700 hover:text-orange-600" onClick={() => setMobileMenuOpen(false)}>
                Service Areas
              </Link>
              <Link href="/#contact" className="text-gray-700 hover:text-orange-600" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
              <Link href="/#contact" className="btn btn--outline btn--small" onClick={() => setMobileMenuOpen(false)}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Schedule a Call
              </Link>
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
