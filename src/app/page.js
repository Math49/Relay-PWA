"use client";
import InstallButton from "@/components/InstallButton";
import { Suspense } from "react";
import Loading from "@/components/LoadingPage";

export default function HomePage() {
  return (
    <Suspense fallback={<Loading />}>
      <MainContent />
    </Suspense>
  );
}

function MainContent() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-red text-white">
      <h1 className="text-4xl font-bold">Bienvenue sur ma PWA</h1>
      <InstallButton />
    </div>
  );
}

