
'use client';
// components/HeroSection.tsx
import React from 'react';
import styles from '../styles/HeroSection.module.css';

const HeroSection: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
            <div className={styles.content}>
              <h1 className={styles.title}>اكتشف معالم مصر العظيمة</h1>
              <p className={styles.subtitle}>رحلة عبر التاريخ والحضارة المصرية القديمة</p>
              <a
                href="#landmarks"
                className={styles.button}
                onClick={(e) => {
                  // Prefer using the global handler exposed by Navbar so active nav updates immediately
                  try {
                    e.preventDefault();
                    const fn = (window as any).__handleNavClick;
                    if (typeof fn === 'function') {
                      fn('/#landmarks');
                      // navigate to anchor (in case we're on a different page)
                      window.location.href = '/#landmarks';
                    } else {
                      // fallback
                      window.location.href = '/#landmarks';
                    }
                  } catch (err) {
                    // fallback navigation
                    window.location.href = '/#landmarks';
                  }
                }}
              >ابدأ الاستكشاف</a>
            </div>
          </div>
    </section>
  );
};

export default HeroSection;
