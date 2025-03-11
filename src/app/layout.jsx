"use client";

import Link from "next/link";
import '@/styles/globals.css';
import { useEffect } from 'react';

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <title>Next.js avec PWA</title>
      </head>
      <body className="C-bg-red C-text-black">
        <header>
          <nav>
            <Link href="/" className="">
              Accueil
            </Link>
            <Link href="/about" className="">
              À propos
            </Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}