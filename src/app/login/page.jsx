"use client";
import { Suspense } from "react";
import Loading from "@/components/LoadingPage";
import { useEffect, useState } from "react";
import { getAuthToken } from "@/services/auth";
import { useRouter } from "next/navigation";

export default function HomePage() {

  // const router = useRouter();
  // const [isAuth, setIsAuth] = useState(false);

  // useEffect(() => {
  //   const token = getAuthToken();
  //   if (!token) {
  //     router.push("/login"); // 🔥 Redirige vers la page de connexion si pas de token
  //   } else {
  //     setIsAuth(true);
  //   }
  // }, []);

  // if (!isAuth) return null;

  return (
    <Suspense fallback={<Loading />}>
      <MainContent />
    </Suspense>
  );
}

function MainContent() {
  return (
    <div className="flex items-center justify-center min-h-screen C-bg-white text-black">
      <h1 className="text-4xl font-bold">Bienvenue sur ma PWA</h1>
    </div>
  );
}

