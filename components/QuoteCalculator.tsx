'use client';

import { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import GAEvents, { gaEvent } from "@/components/GAEvents";

export default function QuoteCalculator() {
  const [step, setStep] = useState(1);
  const [numCameras, setNumCameras] = useState('');
  const [homeSize, setHomeSize] = useState('normal');
  const [roofMount, setRoofMount] = useState(false);
  const [longCable, setLongCable] = useState(false);
  const [extraWarranty, setExtraWarranty] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [emailOnly, setEmailOnly] = useState(false);

  const cameraPrice = 95;
  const nvrPrice = 270;

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    const match = digits.match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    if (!match) return '';
    let formatted = '';
    if (match[1]) formatted = `(${match[1]}`;
    if (match[2]) formatted += `) ${match[2]}`;
    if (match[3]) formatted += `-${match[3]}`;
    return formatted;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  const calculateCosts = () => {
    const num = parseInt(numCameras) || 0;
    const materials = num ? nvrPrice + cameraPrice * num : 0;
    let labor = num ? 250 + num * 150 : 0;
    if (homeSize === 'medium') labor += 100;
    if (homeSize === 'large') labor += 300;
    if (roofMount) labor += 100;
    if (longCable) labor += 100;
    const service = extraWarranty ? 150 : 0;
    const total = labor + materials + service;
    return { labor, materials, service, total };
  };

  const { labor, materials, service, total } = calculateCosts();

  const generateNext7Days = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const timeSlots = ['11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'];

  const cleanedPhone = phone.replace(/\D/g, '');
  const isPhoneValid = /^\d{10}$/.test(cleanedPhone);
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isContactMethodValid = emailOnly || (preferredDate && preferredTime);
  const isFormValid = name && isPhoneValid && isEmailValid && isContactMethodValid;

  // === GA4: события ===

  // Отправим событие при первом входе в калькулятор
  useEffect(() => {
    gaEvent('quote_start', { step: 1 });
    gaEvent('quote_step_view', { step: 1 });
  }, []);

  // Отслеживаем просмотр шага при каждом изменении step
  useEffect(() => {
    if (step > 1) {
      gaEvent('quote_step_view', { step });
    }
  }, [step]);

  // Трекеры переходов
  const goNext = () => {
    gaEvent('quote_next_click', { from_step: step });
    setStep((s) => Math.min(6, s + 1));
  };

  const goPrev = () => {
    gaEvent('quote_prev_click', { from_step: step });
    setStep((s) => Math.max(1, s - 1));
  };

  // Изменение ключевых параметров калькулятора
  useEffect(() => {
    // Логируем факт изменения параметров
    gaEvent('quote_parameters_change', {
      step,
      cameras: numCameras || 0,
      home_size: homeSize,
      roof_mount: roofMount,
      long_cable: longCable,
      extra_warranty: extraWarranty,
    });

    // Если выбрано количество камер — показываем текущую смету
    if (numCameras) {
      gaEvent('quote_estimate_shown', {
        step,
        cameras: parseInt(numCameras) || 0,
        home_size: homeSize,
        roof_mount: roofMount,
        long_cable: longCable,
        extra_warranty: extraWarranty,
        labor,
        materials,
        service,
        total,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numCameras, homeSize, roofMount, longCable, extraWarranty, labor, materials, service, total]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // GA: попытка отправки лида
    gaEvent('lead_submit', {
      source: 'quote_calculator',
      cameras: parseInt(numCameras) || 0,
      home_size: homeSize,
      roof_mount: roofMount,
      long_cable: longCable,
      extra_warranty: extraWarranty,
      labor,
      materials,
      service,
      total,
    });

    setStep(6);

    const message = `
📸 *New SafeOn Quote Request*

👤 Name: ${name}
📞 Phone: ${phone}
✉️ Email: ${email}
📅 Date: ${preferredDate || '-'}
⏰ Time: ${preferredTime || '-'}
📧 Email only: ${emailOnly ? 'Yes' : 'No'}

🔢 Cameras: ${numCameras}
🏠 Home Size: ${homeSize}
⬆️ Roof Mount: ${roofMount ? 'Yes' : 'No'}
🔌 Long Cable: ${longCable ? 'Yes' : 'No'}
🛡 Extra Warranty: ${extraWarranty ? 'Yes' : 'No'}

💵 Installation: $${labor}
🧰 Materials: $${materials}
🔧 Service: $${service}
💰 Total: $${total}
`;

    const token = process.env.NEXT_PUBLIC_TELEGRAM_TOKEN;
    const chatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID;

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });
  };

  return (
    <div className="container py-5">
      {/* Можно опционально зажигать событие на маунте через компонент */}
      <GAEvents onMountEventName="quote_start" onMountParams={{ step: 1 }} />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="text-primary mb-0">
          Estimated Total: {numCameras ? `$${total}` : '--'} <small className="text-muted">*</small>
        </h4>
        <div className="d-flex align-items-center gap-3">
          <button
            className="btn btn-outline-primary"
            disabled={step === 1}
            onClick={goPrev}
          >
            Previous
          </button>
          <button
            className="btn btn-primary"
            disabled={step === 5 || (step === 1 && !numCameras)}
            onClick={goNext}
          >
            Next
          </button>
        </div>
      </div>

      <div className="p-4 border rounded shadow-sm bg-light">
        {step === 1 && (
          <>
            <h5>Step {step}/5. How many cameras do you need?</h5>
            <select
              className="form-select"
              value={numCameras}
              onChange={(e) => {
                setNumCameras(e.target.value);
                gaEvent('quote_cameras_select', { value: e.target.value || 0 });
              }}
            >
              <option value="">Not selected</option>
              {[2, 3, 4, 5, 6, 7, 8].map(n => (
                <option key={n} value={n}>{n} cameras</option>
              ))}
            </select>
          </>
        )}

        {step === 2 && (
          <>
            <h5>Step {step}/5. What size is your home?</h5>
            <select
              className="form-select"
              value={homeSize}
              onChange={(e) => {
                setHomeSize(e.target.value);
                gaEvent('quote_home_size_select', { value: e.target.value });
              }}
            >
              <option value="normal">Normal</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
            <small className="text-muted d-block mt-2">
              Normal: up to 2 bedrooms or under 1500 sq ft<br />
              Medium: 3–4 bedrooms or 1500–2500 sq ft<br />
              Large: over 2500 sq ft or custom layout
            </small>
          </>
        )}

        {step === 3 && (
          <>
            <h5>Step {step}/5. Installation Options</h5>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={roofMount}
                onChange={(e) => { setRoofMount(e.target.checked); gaEvent('quote_roof_mount_toggle', { value: e.target.checked }); }}
                id="roofMount"
              />
              <label className="form-check-label" htmlFor="roofMount">Installation above 10ft height</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={longCable}
                onChange={(e) => { setLongCable(e.target.checked); gaEvent('quote_long_cable_toggle', { value: e.target.checked }); }}
                id="longCable"
              />
              <label className="form-check-label" htmlFor="longCable">Long cable run (&gt;20m)</label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={extraWarranty}
                onChange={(e) => { setExtraWarranty(e.target.checked); gaEvent('quote_extra_warranty_toggle', { value: e.target.checked }); }}
                id="extraWarranty"
              />
              <label className="form-check-label" htmlFor="extraWarranty">Add 1 extra year of warranty</label>
            </div>
            <small className="text-muted d-block mt-2">Included: 1-year standard warranty</small>
          </>
        )}

        {step === 4 && (
          <>
            <h5>Step {step}/5. Quote Summary {numCameras ? `$${total}` : '--'}</h5>
            <ul className="list-group mb-3">
              <li className="list-group-item">Installation: ${labor}</li>
              <li className="list-group-item">Devices & Parts: ${materials}</li>
              {extraWarranty && <li className="list-group-item">Extra Warranty: ${service}</li>}
              <li className="list-group-item text-muted">1-year standard warranty included</li>
            </ul>
          </>
        )}

        {step === 5 && (
          <form onSubmit={handleSubmit}>
            <h5>Step {step}/5. Contact Info</h5>
            <input className="form-control mb-2" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input className={`form-control mb-2 ${phone && !isPhoneValid ? 'is-invalid' : ''}`} placeholder="Phone Number" value={phone} onChange={handlePhoneChange} required />
            <input className={`form-control mb-2 ${email && !isEmailValid ? 'is-invalid' : ''}`} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            {!emailOnly && (
              <div className="row mb-2">
                <div className="col">
                  <select className="form-select" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)}>
                    <option value="">Select Date</option>
                    {generateNext7Days().map(date => (
                      <option key={date} value={date}>{new Date(date).toLocaleDateString()}</option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <select className="form-select" value={preferredTime} onChange={(e) => setPreferredTime(e.target.value)}>
                    <option value="">Select Time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" checked={emailOnly} onChange={(e) => setEmailOnly(e.target.checked)} id="emailOnly" />
              <label className="form-check-label" htmlFor="emailOnly">I prefer to be contacted by email</label>
            </div>

            <button className="btn btn-success w-100" type="submit" disabled={!isFormValid}>Book Consultation</button>
          </form>
        )}

        {step === 6 && (
          <div className="text-center">
            <h4 className="text-success">Thank you!</h4>
            <p>Your consultation request has been submitted.</p>
          </div>
        )}
      </div>

      <p><em>*Included: Installation fee; Devices, Parts & Materials. Without Taxes</em></p>
    </div>
  );
}
