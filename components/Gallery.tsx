'use client';

// components/Gallery.tsx
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/Gallery.module.css';

const landmarks: { image: string; title?: string; description?: string }[] = [
  { image: '/assets/images/gallery1.png', title: 'أهرامات الجيزة العظيمة وأبو الهول', description: 'مشهد الأهرامات الشهيرة وأبو الهول قربها.' },
  { image: '/assets/images/gallery2.png', title: 'مجمع معبد الكرنك', description: 'مجمع معابد تاريخي في طيبة القديمة.' },
  { image: '/assets/images/gallery3.png', title: 'وادي الملوك', description: 'مقابر ملوك الفراعنة ونقوش أثرية رائعة.' },
  { image: '/assets/images/gallery4.png', title: 'معبد أبو سمبل', description: 'معبد منقوش في الصخر بأبو سمبل.' },
];

const Gallery: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const openModal = (idx: number) => { setSelected(idx); setOpen(true); };
  const closeModal = () => { setOpen(false); setSelected(null); };

  return (
    <section id='gallery' className={`py-12 bg-gray-100 ${styles.gallerySection}`}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">معرض الصور</h2>
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${styles.galleryGrid}`}>
          {landmarks.map((landmark, index) => (
            <div key={index} className={`${styles.item}`}>
              <div className={`${styles.imageWrapper}`}>
                <Image
                  src={landmark.image}
                  alt={landmark.title || `معلم ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {landmark.title && (
                  <div className={`${styles.overlay}`}>
                    <div className={`${styles.overlayInner}`}>
                        <p className={`${styles.title}`}>{landmark.title}</p>
                        <button onClick={() => openModal(index)} className={styles.button}>عرض التفاصيل</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {open && selected !== null && (
        <div className={styles.modalContainer}>
          <div className={styles.modalBackdrop} onClick={closeModal} />
          <div className={styles.modalContent} role="dialog" aria-modal="true">
            <div className={styles.modalHeader}>
              <button className={styles.modalClose} onClick={closeModal} aria-label="Close">✕</button>
            </div>
            <img src={landmarks[selected].image} alt={landmarks[selected].title || `معلم ${selected + 1}`} className={styles.modalImage} />
            <div className={styles.modalBody}>
              <h3 className={styles.modalTitle}>{landmarks[selected].title}</h3>
              <p className={styles.modalDesc}>{landmarks[selected].description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;