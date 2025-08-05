'use client';

import Image from 'next/image';

export default function EquipmentCards() {
  return (
    <section className="container my-5">
      <h2 className="text-center mb-4">Our Equipment</h2>
      <div className="row text-center">
        {/* Lorex NVR */}
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <Image
              src="/images/lorex-nvr.jpg"
              className="card-img-top"
              alt="Lorex NVR"
              width={600}
              height={400}
              style={{ objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title">Lorex NVR</h5>
              <p className="card-text">
                Reliable network video recorder with local storage. Supports multiple IP cameras, motion detection, and 24/7 recording.
              </p>
            </div>
          </div>
        </div>

        {/* Lorex Cameras */}
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <Image
              src="/images/lorex-cameras.jpg"
              className="card-img-top"
              alt="Lorex Cameras"
              width={600}
              height={400}
              style={{ objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title">Lorex Cameras</h5>
              <p className="card-text">
                Weatherproof 4K wired cameras with night vision and wide-angle lenses for clear video, day and night.
              </p>
            </div>
          </div>
        </div>

        {/* TP-Link Deco */}
        <div className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            <Image
              src="/images/tplink-deco.jpg"
              className="card-img-top"
              alt="TP-Link Deco"
              width={600}
              height={400}
              style={{ objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title">TP-Link Deco</h5>
              <p className="card-text">
                Mesh Wi-Fi system to ensure strong signal across your home — ideal for remote camera access and mobile monitoring.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
