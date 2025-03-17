"use client";
import Separateur from "@/components/Separateur";
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import React from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function HomePage() {
  const { user } = useAuth();
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="flex flex-col gap-[5vh] items-center justify-center relative z-10 text-white w-[100%] p-5">
      <div>
        <h2 className="text-black">messages</h2>
      </div>
      {isMobile ? (
        <div className="flex flex-col items-start justify-start w-[100%]">
          <h2 className="C-text-black font-bold text-2xl mb-6">Navigation</h2>
          <div className="flex flex-col gap-5 items-start justify-start w-[100%]">
            <Link
              href="/stocks"
              className="flex items-center justify-around w-[100%] h-[12vh] C-bg-red-var2 rounded-[20px] p-4 overflow-hidden relative"
            >
              <i className="fa-solid fa-boxes-stacked C-text-red-var1 text-5xl"></i>
              <p className="C-text-black font-bold text-2xl">Stocks</p>
              <div className="flex items-end h-[100%] relative z-20">
                <i className="fa-solid fa-arrow-right-long C-text-black text-3xl"></i>
              </div>
              <img
                src="/images/elements/cercle_var2.svg"
                className="absolute right-0 bottom-0 z-10"
              />
            </Link>
            <Link
              href="/stocks"
              className="flex items-center justify-around w-[100%] h-[12vh] C-bg-red-var2 rounded-[20px] p-4 overflow-hidden relative"
            >
              <i className="fa-solid fa-clipboard-list C-text-red-var1 text-5xl"></i>
              <p className="C-text-black font-bold text-2xl">Listes</p>
              <div className="flex items-end h-[100%] relative z-20">
                <i className="fa-solid fa-arrow-right-long C-text-black text-3xl"></i>
              </div>
              <img
                src="/images/elements/vague_var2.svg"
                className="absolute w-[15vw] right-0 top-0 z-10"
              />
            </Link>
            <Link
              href="/stocks"
              className="flex items-center justify-around w-[100%] h-[12vh] C-bg-red-var2 rounded-[20px] p-4 overflow-hidden relative"
            >
              <i className="fa-solid fa-gears C-text-red-var1 text-5xl"></i>
              <p className="C-text-black font-bold text-2xl">Configuration</p>
              <div className="flex items-end h-[100%] relative z-20">
                <i className="fa-solid fa-arrow-right-long C-text-black text-3xl"></i>
              </div>
              <img
                src="/images/elements/barcode_var2.svg"
                className="absolute w-[25vw] right-[20vw] bottom-0 z-10"
              />
            </Link>
            <Link
              href="/stocks"
              className="flex items-center justify-around w-[100%] h-[12vh] C-bg-red-var2 rounded-[20px] p-4 overflow-hidden relative"
            >
              <i className="fa-solid fa-store C-text-red-var1 text-5xl"></i>
              <p className="C-text-black font-bold text-2xl">A propos</p>
              <div className="flex items-end h-[100%] relative z-20">
                <i className="fa-solid fa-arrow-right-long C-text-black text-3xl"></i>
              </div>
              <img
                src="/images/elements/rond_var2.svg"
                className="absolute right-[50vw] top-0 z-10"
              />
            </Link>
          </div>
        </div>
      ) : (
        <></>
      )}
      <Separateur />
      <div className="flex flex-col items-start justify-start w-[100%]">
        <h2 className="C-text-black font-bold text-2xl mb-6">Etat du stock</h2>
      </div>
    </div>
  );
}
