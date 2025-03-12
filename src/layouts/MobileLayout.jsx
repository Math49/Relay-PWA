"use client";
import { useAuth } from "@/context/AuthProvider";

export default function MobileLayout({ children, title }) {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center C-bg-red w-[100vw] h-[100vh] overflow-hidden">
      <img src="/images/elements/cercle.svg" className="absolute top-0 left-0 z-10 w-auto h-[15vh]" />
      <div className="flex items-end justify-between w-[100vw] h-[10%] pb-[2vh] relative z-20 px-[5vw]">
        <img src="/images/elements/Nav menu.svg" className="w-[10vw] h-auto" />
        <h1 className="C-text-white text-4xl font-extrabold">{title}</h1>
        <div className="w-[10vw]"></div>
      </div>
      <div className="flex flex-col items-center justify-center w-[100vw] h-[90%] C-bg-white rounded-t-[40px] relative z-20">

      </div>
    </div>
  );
}
