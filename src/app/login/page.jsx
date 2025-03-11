"use client";
import { Suspense } from "react";
import Loading from "@/components/LoadingPage";
import { useEffect, useState } from "react";
import { getAuthToken } from "@/services/auth";
import { useRouter } from "next/navigation";

export default function HomePage() {

  return (
    <Suspense fallback={<Loading />}>
      <MainContent />
    </Suspense>
  );
}

function MainContent() {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] w-[100vw] py-[5vh]">
      <div className="flex items-center justify-center w-[80%] h-[30%] C-text-white">
        <div className="flex flex-col items-center justify-center w-[100%] h-[90%] gap-3">
            <img src="/images/elements/logo-relay.svg" className="w-auto h-[10vh]" />
            <h1 className="font-extrabold text-4xl">Relay - Réassort</h1>
        </div>
      </div>
      <div className="flex items-center justify-center w-[80%] h-[70%]">
        <div className="flex flex-col items-center justify-center w-[100%] h-[100%] C-bg-white C-text-black rounded-[40px]">

        </div>
      </div>
    </div>
  );
}

