"use client";
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { getStocks } from "@/services/stock";
import { getCategories } from "@/services/category";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";

export default function HomePage() {

  
  return (
    <div className="flex flex-col gap-[5vh] items-center justify-center relative z-10 text-white w-[100%] p-5">
        <div className="w-[100%]">
                <BackButton path="/" />
              </div>
        <div className="flex flex-col items-start justify-start w-[100%]">
          <h2 className="C-text-black font-bold text-2xl mb-6">Navigation</h2>
          <div className="flex flex-col gap-5 items-start justify-start sm:items-center w-[100%]">
            <div
              className="flex items-center cursor-pointer justify-around w-[100%] sm:w-[50%] h-[12vh] C-bg-red-var2 rounded-[20px] p-4 overflow-hidden relative"
            >
              <i className="fa-solid fa-boxes-stacked C-text-red-var1 text-5xl" aria-hidden="true"></i>
              <p className="C-text-black font-bold text-2xl">Création produits</p>
              <div className="flex items-end h-[100%] relative z-20">
                <i className="fa-solid fa-arrow-right-long C-text-black text-3xl" aria-hidden="true"></i>
              </div>
              <img
                src="/images/elements/barcode_var2.svg"
                className="absolute w-[25vw] right-[20vw] sm:w-[8vw] bottom-0 z-10"
              />
            </div>
            <Link
              href="/categories"
              className="flex items-center justify-around w-[100%] sm:w-[50%] h-[12vh] C-bg-red-var2 rounded-[20px] p-4 overflow-hidden relative"
            >
              <i className="fa-solid fa-clipboard-list C-text-red-var1 text-5xl" aria-hidden="true"></i>
              <p className="C-text-black font-bold text-2xl">Catégories</p>
              <div className="flex items-end h-[100%] relative z-20">
                <i className="fa-solid fa-arrow-right-long C-text-black text-3xl" aria-hidden="true"></i>
              </div>
              <img
                src="/images/elements/vague_var2.svg"
                className="absolute w-[15vw] sm:w-[5vw] right-0 top-0 z-10"
              />
            </Link>
            <Link
              href="/messages"
              className="flex items-center justify-around w-[100%] sm:w-[50%] h-[12vh] C-bg-red-var2 rounded-[20px] p-4 overflow-hidden relative"
            >
              <i className="fa-solid fa-message C-text-red-var1 text-5xl" aria-hidden="true"></i>
              <p className="C-text-black font-bold text-2xl">Messages</p>
              <div className="flex items-end h-[100%] relative z-20">
                <i className="fa-solid fa-arrow-right-long C-text-black text-3xl" aria-hidden="true"></i>
              </div>
              <img
                src="/images/elements/cercle_var2.svg"
                className="absolute right-0 bottom-0 z-10"
              />
            </Link>
          </div>
        </div>
      <Footer />
    </div>
  );
}
