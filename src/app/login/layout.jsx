"use client";
import "@/styles/globals.css";
import Background from "@/components/background";
import HeadLayout from "@/layouts/HeadLayout";

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <HeadLayout title="Relay - Login">

      </HeadLayout>
      
      <body className="C-bg-red C-text-black h-[100vh] w-[100vw] overflow-hidden">
          <Background />
          <main className="relative z-50 top-0 left-0">{children}</main>
      </body>
    </html>
  );
}
