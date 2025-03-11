"use client";

import Link from "next/link";
import '@/styles/globals.css';
import { useEffect } from 'react';
import Background from "@/components/background";

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/images/elements/logo-relay.svg" />
        <link rel="manifest" href="/manifest.json" />
        <title>Relay - Réassort</title>
      </head>
      <body className="C-bg-red C-text-black h-[100vh] w-[100vw] overflow-hidden">
        <Background />
        <main className="relative z-50 top-0 left-0">{children}</main>
      </body>
    </html>
  );
}