"use client";
import NavMenu from "@/components/elements/NavMenu";
import { useAuth } from "@/context/AuthProvider";
import "@/styles/globals.css";
import React, { useState, useEffect } from "react";
import { getStore } from "@/services/store";

export default function DesktopLayout({ children, title }) {
  const { user, logout } = useAuth();
  const [city, setCity] = useState("");

  useEffect(() => {
    const fetchStore = async () => {
      if (user && user.ID_store) {
        const storeData = await getStore(user.ID_store);
        setCity(storeData.Address);
      }
    };

    fetchStore();
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center C-bg-red w-[100vw] h-[100vh] overflow-hidden">
      <div className="w-[100vw] h-[100vh] C-bg-red absolute z-0 top-0 left-0">
        <img
          src="/images/elements/cercle.svg"
          className="absolute top-[-5vh] left-0 z-[11] w-auto h-[40vh]"
        />
        <img
          src="/images/elements/rond.svg"
          className="absolute z-10 w-auto h-[80vh] right-[60vw] top-[-33vh]"
        />
        <img
          src="/images/elements/barcode.svg"
          className="absolute w-[30vw] rotate-90 h-auto z-10 right-[5vw] top-[-15vh]"
        />
      </div>
      <div className="flex items-end justify-between w-[100vw] h-[10vh] pb-[2vh] relative z-20 px-[5vw]">
        <h1 className="C-text-white text-4xl font-extrabold">{title}</h1>
      </div>
      <div className="flex items-start justify-center w-[100vw] h-[90vh]">
        <div className="flex flex-col items-start justify-start w-[15vw] h-[100%] rounded-r-[40px] relative z-20">
          <div className="flex flex-col items-center justify-center w-[100%] h-[90%] C-bg-white rounded-l-[40px] relative z-20 pt-[5vh]">
            <NavMenu />
          </div>
          <div className="C-bg-white h-[10%] w-[100%]">
            <div className="flex items-center justify-center w-[100%] h-[100%] C-bg-red rounded-se-[40px] relative z-20 gap-6 overflow-hidden">
              <img
                src="/images/elements/vague.svg"
                className="absolute w-auto z-10 rotate-[100deg]"
              />
              <img
                src="/images/elements/logo-relay.svg"
                className="relative z-20"
              />
              <p className="C-text-white font-bold text-2xl relative z-20">
                Relay {city}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start w-[85vw] h-[100%] C-bg-white rounded-se-[40px] overflow-y-scroll overflow-x-hidden rounded-bl-[40px] relative z-20">
          {children}
        </div>
      </div>
    </div>
  );
}
