"use client";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <title>Next.js avec PWA</title>
      </head>
      <body>
        <header>
          <nav>
            <Link href="/">
              Accueil
            </Link>
            <Link href="/about">
              À propos
            </Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
