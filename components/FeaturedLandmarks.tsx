'use client';
// components/FeaturedLandmarks.tsx
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import styles from '../styles/FeaturedLandmarks.module.css';

// dynamically import KrpanoTour (client-only) to avoid SSR issues
const KrpanoTour = dynamic(() => import('./KrpanoTour'), { ssr: false });

interface Landmark {
  id: number;
  name: string;
  description: string;
  status?: string;
  image: string;
  xml?: string;
}

const landmarks: Landmark[] = [
  {
    id: 1,
    name: 'معبد أبو سمبل',
    description: 'معبد تاريخي منحوت في الصخر',
    image: '/assets/images/gallery4.png',
    xml: '/krpano/viewer/examples/depthmap/abu-simbel-tempel-tour/tour.xml',
  },
  {
    id: 2,
    name: 'المتحف المصرى الكبير',
    description: 'أكبر متحف أثري في العالم يعرض تاريخ مصر الفرعوني',
    image: '/assets/images/grand-egyptian-museum.png',
    // xml: '/krpano/viewer/examples_landmarks/landmark-1/demotour-apartment/tour.xml',
    status: 'coming-soon',
  },
  {
    id: 3,
    name: 'أبو الهول',
    description: 'الحارس الصامت للأهرامات',
    image: '/assets/images/sphinx.png',
    // xml: '/krpano/viewer/examples_landmarks/landmark-2/control-mode/example.xml',
    status: 'coming-soon',
  },
];

const FeaturedLandmarks: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Landmark | null>(null);
  const [xmlStatus, setXmlStatus] = useState<'idle' | 'loading' | 'available' | 'missing'>('idle');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const openTour = (landmark: Landmark) => {
    // Open modal for any landmark and set selected so we can pass its xml
    setSelected(landmark);
    setOpen(true);
    // start checking xml availability
    if (!landmark.xml) {
      setXmlStatus('missing');
    } else {
      setXmlStatus('loading');
      // attempt to fetch the xml to ensure it exists and is reachable
      fetch(landmark.xml, { method: 'GET' })
        .then((res) => {
          if (res.ok) setXmlStatus('available');
          else setXmlStatus('missing');
        })
        .catch(() => setXmlStatus('missing'));
    }
  };

  const closeTour = () => {
    setOpen(false);
    setSelected(null);
    setXmlStatus('idle');
  };

  return (
    <section id='landmarks' className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">المعالم المميزة</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {landmarks.map((landmark) => (
            <div key={landmark.id} className={`${styles.card} bg-gray-100`}>
              <img src={landmark.image} alt={landmark.name} className={styles.cardImage} />
              <div className={`${styles.cardBody}`}>
                <h3 className="text-xl font-semibold mb-2">{landmark.name}</h3>
                <p className="text-gray-600">{landmark.description}</p>
              </div>
              <button onClick={() => openTour(landmark)} className="button">اكتشف جولة افتراضية</button>
            </div>
          ))}
        </div>

        {open && (
          <div className={`${styles.modalContainer}`}>
            <div className={`${styles.modalBackdrop}`} onClick={closeTour} />
            <div className={`${styles.modalContent}`}>
              <div className={`${styles.modalHeader}`}>
                <button onClick={closeTour} aria-label="Close" className={`${styles.closeButton}`}>✕</button>
              </div>
              <div className="p-0">
                {/* Show Krpano if xml is available; otherwise show a coming-soon placeholder */}
                {xmlStatus === 'loading' && <div className="p-6 text-center">جاري التحميل...</div>}
                {xmlStatus === 'missing' && (
                  <div className="p-6 text-center">
                    <h3 className="text-2xl font-bold">cooming-soon</h3>
                    <p className="text-gray-600">الجولة غير متوفرة حالياً.</p>
                  </div>
                )}
                {xmlStatus === 'available' && <KrpanoTour xml={selected?.xml} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedLandmarks;