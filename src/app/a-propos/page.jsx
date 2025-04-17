"use client";
import React, { use, useEffect, useState } from "react";
import Footer from "@/components/Footer";
import BackButton from "@/components/elements/BackButton";
import { useAuth } from "@/context/AuthProvider";
import { getStore } from "@/services/store";

export default function HomePage() {
  const [store, setStore] = useState([]);
  const { user } = useAuth();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const installPWA = () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choice) => {
      
      setDeferredPrompt(null);
      setShowButton(false);
    });
  };


  useEffect(() => {
    const fetchData = async () => {
          if (user && user.ID_store) {
            const storeData = await getStore(user.ID_store);
    
            setStore(storeData);
          }
        };
    
        fetchData();

  }, [user]);

  return (
    <div className="flex flex-col gap-[5vh] items-center justify-center sm:justify-between relative z-10 text-white w-[100%] h-[100%] p-5">
      <div className="w-[100%]">
        <BackButton path="/" />
      </div>
      <div className="flex flex-col sm:flex-row gap-[5vh] items-center justify-center w-[100%]">
        <div className="sm:w-[50%] w-full flex justify-center">
          <div className="w-[80%] C-bg-red gap-[7vh] flex flex-col justify-center sm:items-center items-start rounded-[40px] px-[8vw] sm:px-8 py-[8vh]">
            <div className="flex flex-col sm:flex-row items-start justify-center gap-7">
              <div className="flex items-center justify-around gap-3">
                <i className="fa-solid fa-location-dot text-4xl"></i>
                <p className="text-xl">{store.Address}</p>
              </div>
              <div className="flex items-center justify-around gap-3">
                <i className="fa-solid fa-phone text-4xl"></i>
                <p className="text-xl">{store.Phone}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start justify-center gap-7">
              <div className="flex items-center justify-around gap-3">
                <i className="fa-solid fa-user-tie text-4xl"></i>
                <p className="text-xl">{store.Manager_name}</p>
              </div>
              <div className="flex items-center justify-around gap-3">
                <i className="fa-solid fa-phone text-4xl"></i>
                <p className="text-xl">{store.Manager_phone}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:w-[50%] flex justify-center">
          <button
            onClick={installPWA}
            className="C-bg-red-var2 C-text-black font-bold cursor-pointer px-[20vw] sm:px-[5vw] py-4 rounded-full text-2xl"
          >
            Télécharger
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
