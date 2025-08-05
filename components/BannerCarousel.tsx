'use client';

import Image from 'next/image';
import { useEffect } from 'react';
const handleScrollToCalculator = () => {
    const calculatorSection = document.getElementById('book');
    if (calculatorSection) {
      calculatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

const slides = [
  {
    image: '/banners/house1.jpg',
    title: 'Professional Installation',
    subtitle: 'Installed by experienced specialists. No messy wires, no guesswork — just results.',
  },
  {
    image: '/banners/house2.jpg',
    title: 'Wired for Reliability',
    subtitle: 'Wired cameras never drop signal — unlike Wi-Fi cameras that fail when you need them most.',
  },
  {
    image: '/banners/house3.jpg',
    title: 'No Monthly Fees',
    subtitle: 'Pay once. Own it forever. Full functionality with no subscriptions.',
  },
  {
    image: '/banners/house4.jpg',
    title: 'Full Remote Access',
    subtitle: 'View your home 24/7 from anywhere, with secure mobile access.',
  },
  {
    image: '/banners/house5.jpg',
    title: 'Local Recording with Peace of Mind',
    subtitle: 'All footage is safely stored on-site. No cloud needed, no hidden charges.',
  },
];

export default function BannerCarousel() {
  useEffect(() => {
    import('bootstrap');
  }, []);

  return (
    <div id="bannerCarousel" className="carousel slide position-relative" data-bs-ride="carousel">
      {/* Индикаторы (точки) */}
      <div className="carousel-indicators">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            data-bs-target="#bannerCarousel"
            data-bs-slide-to={i}
            className={i === 0 ? 'active' : ''}
            aria-current={i === 0 ? 'true' : undefined}
            aria-label={`Slide ${i + 1}`}
          ></button>
        ))}
      </div>

      {/* Слайды */}
      <div className="carousel-inner" style={{ height: '600px' }}>
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`carousel-item ${i === 0 ? 'active' : ''}`}
            style={{ position: 'relative', height: '100%' }}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              layout="fill"
              objectFit="cover"
              priority={i === 0}
              className="d-block w-100"
              style={{ filter: 'brightness(65%)' }}
            />

            {/* Надписи */}
            <div className="carousel-caption">
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
              <button className="btn btn-primary mt-3" onClick={handleScrollToCalculator}>
                  Get Estimate
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Кнопки навигации */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#bannerCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#bannerCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
