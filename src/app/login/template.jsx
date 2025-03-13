"use client";
import "@/styles/globals.css";
import Background from "@/components/background";
import HeadLayout from "@/layouts/HeadLayout";
import { AuthProvider } from "@/context/AuthProvider";
import {HeroUIProvider} from "@heroui/react";
export default function LoginTemplate({ children }) {
  return (
    <html lang="fr">
      <HeadLayout title="Relay - Login">

      </HeadLayout>
      
      <body className="C-bg-red C-text-black h-[100vh] w-[100vw] overflow-hidden">
        <HeroUIProvider>
        <AuthProvider>
          <Background />
          <main className="relative z-50 top-0 left-0">{children}</main>
        </AuthProvider>
        </HeroUIProvider>
      </body>
    </html>
  );
}
