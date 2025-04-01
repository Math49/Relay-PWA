"use client";
import "@/styles/globals.css";
import HeadLayout from "@/layouts/HeadLayout";
import MobileLayout from "@/layouts/MobileLayout";
import DesktopLayout from "@/layouts/DesktopLayout";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/context/AuthProvider";
import { HeroUIProvider } from "@heroui/react";
import React from "react";

export default function RootLayout({ children }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const pathname = usePathname();

  let title = "";

  switch (pathname) {
    case "/":
      title = "Accueil";
      break;

    case "/stocks":
      title = "Stocks";
      break;
    
    case "/listes":
      title = "Listes";
      break;

    case "/listes/create":
      title = "Créer une liste";
      break;
  
    default:
      break;
  }

  // 🔥 Si on est sur "/login", ne pas appliquer de layout
  if (pathname.startsWith("/login")) {
    return <>{children}</>;
  }

  return (
    <html lang="fr">
      <HeadLayout title={title} />

      <body className="C-bg-red C-text-black min-h-screen w-[100vw] overflow-x-hidden">
        <HeroUIProvider>
          <AuthProvider>
            {isMobile ? (
              <MobileLayout title={title}>{children}</MobileLayout>
            ) : (
              <DesktopLayout title={title}>{children}</DesktopLayout>
            )}
          </AuthProvider>
        </HeroUIProvider>
      </body>
    </html>
  );
}
