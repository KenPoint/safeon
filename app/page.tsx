'use client';

import { useState } from 'react';
import Image from 'next/image';
import BannerCarousel from '../components/BannerCarousel';
import QuoteCalculator from '../components/QuoteCalculator';
import EquipmentCards from '../components/EquipmentCards';
import FaqAccordion from '../components/FaqAccordion';

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="bg-white text-dark" style={{ paddingTop: '64px' }}>
      {/* Fixed Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top shadow"
        style={{ height: '64px', zIndex: 1050 }}
      >
        <div className="container-fluid d-flex justify-content-between align-items-center px-3">
          <button
            className="btn btn-primary fs-3 border-0"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
          <Image src="/logo.png" alt="Safeon Logo" width={120} height={30} />
        </div>
      </nav>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1040 }}
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Slide-In Menu */}
      <div
        className="position-fixed top-0 start-0 bg-primary text-white h-100 px-4 pt-5 shadow"
        style={{
          width: '240px',
          zIndex: 1041,
          transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease-in-out',
        }}
      >
        <div className="mt-5">
          <a href="#faq" className="d-block mb-3 text-white fw-bold">FAQ</a>
          <a href="#about" className="d-block mb-3 text-white fw-bold">About</a>
          <a href="#book" className="d-block mb-3 text-white fw-bold">Book Appointment</a>
        </div>
      </div>

      {/* Hero Carousel */}
      <section className="mt-0">
        <BannerCarousel />
      </section>
      <EquipmentCards />
      {/* Quote Calculator */}
      <section id="book">
        <QuoteCalculator />
      </section>

      {/* FAQ Section */}
      <section id="faq" className="container py-5">
      <FaqAccordion />
      </section>

      {/* Footer */}
      <footer className="text-center text-muted py-4 border-top mt-5">
        &copy; {new Date().getFullYear()} Safeon. All rights reserved.
      </footer>
    </main>
  );
}
