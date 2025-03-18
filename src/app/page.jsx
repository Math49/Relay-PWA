"use client";
import Separateur from "@/components/Separateur";
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { getStocks } from "@/services/stock";
import { getCategories } from "@/services/category";

export default function HomePage() {
  const [stocks, setStocks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryStockCount, setCategoryStockCount] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.ID_store) { 
        const stocksData = await getStocks(user.ID_store);
        const categoriesData = await getCategories();
        
        setStocks(stocksData);
        setCategories(categoriesData);

        const stockCount = regrouperStockParCategorie(stocksData, categoriesData);
        setCategoryStockCount(stockCount);
      }
    };

    fetchData();
  }, [user]);

  
  function regrouperStockParCategorie(stocks, categories) {
    const result = {};
    let totalBoites = 0;

    // Regrouper les boîtes par catégorie
    stocks.forEach(stock => {
      const categoryId = stock.product.ID_category;
      const category = categories.find(cat => cat.ID_category === categoryId);

      if (category) {
        if (!result[category.Label]) {
          result[category.Label] = 0;
        }
        result[category.Label] += stock.Nmb_boxes;
        totalBoites += stock.Nmb_boxes; // 🔥 Calcul du total des boîtes
      }
    });

    // Convertir en tableau avec pourcentage
    return Object.entries(result).map(([categorie, totalBoitesCategorie]) => ({
      categorie,
      totalBoites: totalBoitesCategorie,
      pourcentage: totalBoites ? ((totalBoitesCategorie / totalBoites) * 100).toFixed(2) : 0, // 🔥 Calcul %
    }));
  }

  console.log(categoryStockCount);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9C27B0"];

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
        <div className="w-[100%] h-[100%] flex flex-col items-center justify-center gap-5">
        <div className="w-[100%] h-[25px] bg-gray-300 rounded-full flex overflow-hidden">
          {categoryStockCount.map((item, index) => (
            <div 
              key={index} 
              className="h-full rounded-r-[20px]"
              style={{
                width: `${item.pourcentage}%`,
                backgroundColor: colors[index % colors.length],
                transition: "width 0.5s ease-in-out"
              }}
            />
          ))}
        </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
        {categoryStockCount.map((item, index) => (
          <div 
            key={index} 
            className="p-4 rounded-lg shadow-md bg-white flex flex-col items-center justify-center border-t-[5px] w-[150px] h-[100px]"
            style={{ borderColor: colors[index % colors.length] }}
          >
            <p className="text-lg font-bold C-text-black">{item.categorie}</p>
            <p className="text-xl font-bold" style={{ color: colors[index % colors.length] }}>
              {item.totalBoites} <span className="text-sm font-normal">boites</span>
            </p>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
