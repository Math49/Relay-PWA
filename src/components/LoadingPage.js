"use client"; // Important pour Next.js 13+
import { useEffect, useState } from "react";

export default function LoadingPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simule un chargement de 2 secondes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null; // Cache la page après le chargement

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-3xl">Chargement...</h1>
    </div>
  );
}
