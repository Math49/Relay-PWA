"use client";
import { Suspense } from "react";
import Loading from "@/components/LoadingPage";
import { useAuth } from "@/context/AuthProvider";


export default function HomePage() {

   const { user } = useAuth();

    return (
      <div className="flex items-center justify-center relative z-10 text-white">
        <h1 className="text-4xl font-bold">Bienvenue sur ma PWA - {user?.Name}</h1>
      </div>
    );
}