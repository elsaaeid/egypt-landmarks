import type { Metadata } from "next";
import './globals.css';
import { Geist, Geist_Mono } from "next/font/google";
import ScrollToTop from "../components/ScrollToTop";
import CookieBanner from "../components/CookieBanner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "معالم مصر",
  description: "اكتشف جمال وتاريخ مصر من خلال جولات افتراضية ومعالم مميزة.",
  icons: {
    icon: '/assets/images/logo.png',
    shortcut: '/assets/images/logo.png',
    apple: '/assets/images/logo.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/assets/images/logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CookieBanner />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
