'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import React from 'react'; //

interface FaqItem {
  question: string;
  answer: JSX.Element;
}

export default function FaqAccordion() {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  const faqItems: FaqItem[] = [
    {
      question: 'Who will install my system?',
      answer: (
        <div className="row align-items-center g-4">
          <div className="col-md-3 text-center">
            <Image
              src="/images/installer.jpg"
              alt="Nurken Abdirov"
              width={160}
              height={160}
              className="rounded shadow border"
            />
          </div>
          <div className="col-md-9">
            <h5 className="mb-3 fw-bold">Nurken Abdirov</h5>
            <ul className="mb-3 ps-3">
              <li>15+ years in IT & infrastructure</li>
              <li>More than 1,500 successful projects</li>
              <li>Certified system administrator (COMPTIA A+)</li>
              <li>Specialist in Bocsh, Axis, Lorex, Cisco, Hikvision, Assa Abloy, AiPhone</li>
              <li>Expert in secure home networking</li>
            </ul>
            <p className="mb-0">
              I provide clean, reliable, and secure video surveillance installation tailored to Canadian homes.
              My focus is simple — peace of mind through professional work you can trust.
            </p>
          </div>
        </div>
      ),
    },
    {
      question: 'How long does installation take?',
      answer: <p>Most standard installations are completed in one day.</p>,
    },
    {
      question: 'Can I add more cameras later?',
      answer: <p>Yes, our systems are scalable and allow for future expansion.</p>,
    },
    {
      question: 'Do I need Wi-Fi for the system to work?',
      answer: <p>No. Our wired systems operate independently from Wi-Fi and offer more reliability.</p>,
    },
    {
      question: 'Will I be able to view my cameras remotely?',
      answer: <p>Yes, you can securely access live video through a mobile app anytime, anywhere.</p>,
    },
    {
      question: 'Are there any monthly fees?',
      answer: <p>No. All features work fully without subscriptions or ongoing charges.</p>,
    },
    {
      question: 'Is there a warranty?',
      answer: <p>Yes, all installations include a one-year service warranty with optional extension.</p>,
    },
    {
      question: 'What areas do you serve?',
      answer: <p>We serve the Greater Toronto Area, including suburbs and nearby towns.</p>,
    },
    {
      question: 'Is this suitable for large houses?',
      answer: <p>Yes, we tailor installation to your home's size and layout, including multi-floor buildings.</p>,
    },
    {
      question: 'How do I get a quote?',
      answer: <p>Use our online calculator or contact us for a personalized consultation.</p>,
    },
  ];

  return (
    <div className="accordion" id="faqAccordion">
      {faqItems.map((item, index) => (
        <div className="accordion-item" key={index}>
          <h2 className="accordion-header" id={`heading-${index}`}>
            <button
              className="accordion-button collapsed px-4 py-3 fs-5 fw-semibold"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse-${index}`}
              aria-expanded="false"
              aria-controls={`collapse-${index}`}
            >
              {item.question}
            </button>
          </h2>
          <div
            id={`collapse-${index}`}
            className="accordion-collapse collapse"
            aria-labelledby={`heading-${index}`}
            data-bs-parent="#faqAccordion"
          >
            <div
              className="accordion-body !block !opacity-100 !visible text-dark bg-white"
              style={{
                padding: '2rem',
                fontSize: '1rem',
                transition: 'none',
              }}
            >
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
