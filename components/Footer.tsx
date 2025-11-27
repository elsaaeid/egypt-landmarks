// components/Footer.tsx
import React from "react";
import styles from '../styles/Footer.module.css'; // Import the CSS module
import { FaYoutube, FaWhatsapp, FaFacebookF, } from 'react-icons/fa';
import { FiMapPin, FiPhone, FiMail, FiClock } from 'react-icons/fi';
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Right column: Logo/Description and social icons */}
        <div className={styles.column}>
          <h3 className={styles.title}>
            معالم مصر
          </h3>
          <p className={styles.description}>
            اكتشف روائع الحضارة المصرية القديمة من خلال معالمها الأثرية الخالدة. انغمس في تاريخ مليء بالأساطير والإنجازات التي شكلت العالم كما نعرفه اليوم.
          </p>

          <div className={styles.socialIcons}>
            {/* Social media icons */}
            <a href="#" aria-label="YouTube" className={styles.socialLink}>
              <FaYoutube className={styles.icon} />
            </a>
            <a href="#" aria-label="WhatsApp" className={styles.socialLink}>
              <FaWhatsapp className={styles.icon} />
            </a>
            <a href="#" aria-label="Facebook" className={styles.socialLink}>
              <FaFacebookF className={styles.icon} />
            </a>
          </div>
        </div>

    </div>

      {/* Bottom */}
      <div className={styles.bottom}>
        <p className={styles.copyright}> جميع الحقوق محفوظة 2025 © لدى <Link className={styles.author} target="_blank" href="https://alsaaeid-ellithy.vercel.app">Alsaaeid Ellithy</Link></p>
        <div className={styles.bottomLinks}>
          <Link href="/policy" className={styles.bottomLink}>سياسة الخصوصية</Link>
          <Link href="/terms" className={styles.bottomLink}>الشروط والأحكام</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;