"use client";
import "@/styles/globals.css";
import Background from "@/components/background";
import HeadLayout from "@/layouts/HeadLayout";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MobileLayout from "@/layouts/MobileLayout";
import DesktopLayout from "@/layouts/DesktopLayout";
import { AuthProvider } from "@/context/AuthProvider";

export default function RootLayout({ children }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <html lang="fr">
      <HeadLayout title="Relay - Accueil">

      </HeadLayout>
      
      <body className="C-bg-red C-text-black h-[100vh] w-[100vw] overflow-hidden">
        <AuthProvider>
          {isMobile ? <MobileLayout>{children}</MobileLayout> : <DesktopLayout>{children}</DesktopLayout>}
        </AuthProvider>
      </body>
    </html>
  );
}
