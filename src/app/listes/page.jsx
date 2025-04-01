"use client";
import BackButton from "@/components/BackButton";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
import { getListes } from "@/services/listes";

export default function HomePage() {
  const { user } = useAuth();
  const [listes, setListes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.ID_store) {
        const listesData = await getListes(user.ID_store);

        listesData.forEach(liste => {
          liste.Creation_date = new Date(liste.Creation_date).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
          liste.Creation_date = liste.Creation_date.replace(/\//g, "/");
        });

        setListes(listesData);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="flex flex-col gap-[3vh] items-center justify-start relative z-10 text-white w-[100%] h-[100%] p-5">
      <div className="w-[100%]">
        <BackButton path="/" />
      </div>
      <div className="w-full">
        <div className="w-full flex items-center justify-end px-5 py-3">
        <button
              className=" C-text-white font-bold text-xl cursor-pointer C-bg-red rounded-full px-10 py-2"
            >
              Créer une liste
            </button>
        </div>
        <div className="flex flex-col sm:flex-row items-center sm:flex-wrap gap-4 justify-start p-5 w-full">
          {/* Listes */}
          {listes.map((liste, index) => (
            <div
            className="flex items-center sm:flex-col cursor-pointer sm:justify-center justify-between w-[100%] sm:w-[24%] sm:h-[24vh] h-[12vh] C-bg-red-var2 rounded-[20px] px-6 py-3 overflow-hidden relative"
          >
            <p className="C-text-black font-bold text-2xl">Liste N°{index+1}</p>
            <div className="h-full sm:h-auto flex items-end">
              <p className="C-text-black ">{liste.Creation_date}</p>
            </div>
            <img
              src="/images/elements/barcode_var2.svg"
              className="absolute w-[25vw] right-[40vw] sm:right-[2vw] sm:w-[10vw] bottom-0 z-10"
            />
          </div>
          ))}
        </div>
      </div>
    </div>
  );
}
