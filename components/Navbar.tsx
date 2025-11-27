// components/Navbar.tsx

'use client'
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX } from 'react-icons/fi';
import styles from '../styles/Navbar.module.css'; // Import the CSS module
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [hash, setHash] = useState('');

  useEffect(() => {
    // set initial hash and listen for changes so we can mark anchor links active
    const update = () => setHash(window.location.hash || '');
    update();
    window.addEventListener('hashchange', update);
    return () => window.removeEventListener('hashchange', update);
  }, []);

  const handleNavClick = (href: string) => {
    // close mobile menu
    setOpen(false);
    // immediately update hash state so active styling updates without reload
    if (href.includes('#')) {
      const anchor = '#' + href.split('#').pop();
      setHash(anchor);
      // attempt to scroll to target even if we're already on the same URL
      // delay slightly to allow any client navigation to finish
      try {
        setTimeout(() => {
          const id = anchor.replace(/^#/, '');
          const el = document.getElementById(id);
          if (el) {
            try { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); } catch (e) { el.scrollIntoView(); }
          } else {
            // if element not present and we're on a different pathname, navigate to href
            if (typeof window !== 'undefined' && window.location.pathname !== '/') {
              window.location.href = href;
            }
          }
        }, 50);
      } catch (e) {}
    } else {
      setHash('');
      try {
        // if clicking home, attempt to scroll to top even when already at '/'
        setTimeout(() => {
          if (typeof window !== 'undefined') {
            if (window.location.pathname === '/') {
              try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) { window.scrollTo(0, 0); }
            } else {
              // navigate to root
              window.location.href = '/';
            }
          }
        }, 50);
      } catch (e) {}
    }
  };

  // expose the handler on window for other components (client-only)
  React.useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (typeof window !== 'undefined') window.__handleNavClick = handleNavClick;
    } catch (e) {}
    return () => {
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (typeof window !== 'undefined') delete (window as any).__handleNavClick;
      } catch (e) {}
    };
  }, [handleNavClick]);

  const isActive = (href: string) => {
    if (!href) return false;
    // Use the `hash` state (initialized on mount) so server and client render match during hydration
    // If the link contains a hash (anchor), prefer matching the stored hash
    if (href.includes('#')) {
      const anchor = '#' + href.split('#').pop();
      return anchor === (hash || '');
    }
    // If the current location has a hash, don't mark the root '/' as active
    if (href === '/' && hash) return false;
    // otherwise compare pathnames (exact match)
    return pathname === href;
  };

  return (
    <>
    <nav className={styles.nav}>
      <div className={styles.container}>
          <Link href="/">
            <img src="/assets/images/logo.png" alt="معالم مصر" className={styles.logo} />
          </Link>
        {/* Mobile hamburger */}
        <button
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen((v) => !v)}
          className={styles.hamburger}
        >
          {open ? (
            <FiX size={22} color="#1f4f43" />
          ) : (
            <FiMenu size={22} color="#1f4f43" />
          )}
        </button>

        {/* Right Side - Navigation Links */}
        <ul className={`${styles.navList} ${open ? styles.open : ''}`}>
          <li>
            <Link href="/" onClick={() => handleNavClick('/')} className={`${styles.navItem} ${isActive('/') ? styles.active : ''}`}>الرئيسية</Link>
          </li>
          <li>
            <Link href="/#about" onClick={() => handleNavClick('/#about')} className={`${styles.navItem} ${isActive('/#about') ? styles.active : ''}`}>عن مصر</Link>
          </li>
          <li>
            <Link href="/#landmarks" onClick={() => handleNavClick('/#landmarks')} className={`${styles.navItem} ${isActive('/#landmarks') ? styles.active : ''}`}>المعالم</Link>
          </li>
          <li>
            <Link href="/#gallery" onClick={() => handleNavClick('/#gallery')} className={`${styles.navItem} ${isActive('/#gallery') ? styles.active : ''}`}>معرض الصور</Link>
          </li>
        </ul>
      </div>
    </nav>
    {/* spacer to prevent page content jumping under the fixed navbar */}
    <div className={styles.spacer} />
    </>
  );
};

export default Navbar;