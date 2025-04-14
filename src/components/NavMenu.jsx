"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { usePathname } from 'next/navigation'

export default function NavMenu( closeModal ) {

  const { logout } = useAuth();


  const router = useRouter();

  if (usePathname() === "/login") {
    return null;
  }
  return (
    <div className="flex flex-col items-center justify-between C-text-black h-full w-full">
      <div className="flex flex-col items-center C-text-black w-full">
        <div className="flex flex-col">
          <p className="text-2xl font-bold text-center">Relay Réassort</p>
          <div className="C-bg-red h-[5px] w-full"></div>
        </div>
        <div className="flex flex-col items-center justify-center w-full mt-10 gap-8">
          <div className="flex items-center justify-start w-full gap-10 navLink">
            <div className={`h-[3vh] w-[5px] ${usePathname() === "/stocks" ? "C-bg-red" : ""} `} ></div>
            <Link href="/stocks" className="font-bold text-xl">
              Stocks
            </Link>
          </div>
          <div className="flex items-center justify-start w-full gap-10 navLink">
            <div className={`h-[3vh] w-[5px] ${usePathname() === "/listes" ? "C-bg-red" : ""} `}></div>
            <Link href="/listes" className="font-bold text-xl">
              Listes
            </Link>
          </div>
          <div className="flex items-center justify-start w-full gap-10 navLink">
            <div className={`h-[3vh] w-[5px] ${usePathname() === "/configuration" ? "C-bg-red" : ""} `}></div>
            <Link href="/configuration" className="font-bold text-xl">
              Configuration
            </Link>
          </div>
          <div className="flex items-center justify-start w-full gap-10 navLink">
            <div className={`h-[3vh] w-[5px] ${usePathname() === "/a-propos" ? "C-bg-red" : ""} `}></div>
            <Link href="/a-propos" className="font-bold text-xl">
              A propos
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col pb-5">
        <p className="font-bold text-center cursor-pointer" onClick={logout}>Déconnexion</p>
      </div>
    </div>
  );
}
