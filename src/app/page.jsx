"use client";
import Separateur from "@/components/elements/Separateur";
import { useAuth } from "@/context/AuthProvider";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { getStocks } from "@/services/stock";
import { getCategories } from "@/services/category";
import Footer from "@/components/Footer";
import MessageCarouselMobile from "@/components/elements/MessageCarouselMobile";
import MessageCarouselDesktop from "@/components/elements/MessageCarouselDesktop";

export default function HomePage() {
  const [stocks, setStocks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryStockCount, setCategoryStockCount] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.ID_store) {
        const stocksData = await getStocks(user.ID_store);
        const categoriesData = await getCategories(user.ID_store);

        setStocks(stocksData);
        setCategories(categoriesData);
        const stockCount = regrouperStockParCategorie(
          stocksData,
          categoriesData
        );
        setCategoryStockCount(stockCount);
      }
    };

    fetchData();
  }, [user]);

  function regrouperStockParCategorie(stocks, categories) {
    const result = [];
    let totalBoites = 0;
    let cumulativePercentage = 0; // 🔥 Pour stocker la position de la catégorie suivante

    // Calcul du total de boîtes
    stocks.forEach((stock) => {
      totalBoites += stock.Nmb_boxes;
    });

    // Regrouper les boîtes par catégorie et calculer le pourcentage
    categories.forEach((category) => {
      const totalBoitesCategorie = stocks
        .filter(
          (stock) => stock.product.ID_category === category.category.ID_category
        )
        .reduce((sum, stock) => sum + stock.Nmb_boxes, 0);

      if (totalBoitesCategorie > 0) {
        const pourcentage = (totalBoitesCategorie / totalBoites) * 100;
        cumulativePercentage += pourcentage;
        result.push({
          categorie: category.category.Label,
          totalBoites: totalBoitesCategorie,
          startPercentage: cumulativePercentage,
        });
      }
    });

    return result;
  }

  const isMobile = useMediaQuery("(max-width: 768px)");
  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9C27B0"];

  return (
    <div className="flex flex-col gap-[5vh] items-center justify-center relative z-10 text-white w-[100%] p-5">
      {isMobile ? (
        <MessageCarouselMobile storeId={user?.ID_store} />
      ) : (
        <MessageCarouselDesktop storeId={user?.ID_store} />
      )}
      {isMobile ? (
        <div className="flex flex-col items-start justify-start w-[100%]">
          <h2 className="C-text-black font-bold text-2xl mb-6">Navigation</h2>
          <div className="flex flex-col gap-5 items-start justify-start w-[100%]">
            <Link
              href="/stocks"
              className="flex items-center justify-around w-[100%] h-[12vh] C-bg-red-var2 rounded-[20px] p-4 overflow-hidden relative"
            >
              <i
                className="fa-solid fa-boxes-stacked C-text-red-var1 text-5xl"
                aria-hidden="true"
              ></i>
              <p className="C-text-black font-bold text-2xl">Stocks</p>
              <div className="flex items-end h-[100%] relative z-20">
                <i
                  className="fa-solid fa-arrow-right-long C-text-black text-3xl"
                  aria-hidden="true"
                ></i>
              </div>
              <img
                src="/images/elements/cercle_var2.svg"
                className="absolute right-0 bottom-0 z-10"
              />
            </Link>
            <Link
              href="/listes"
              className="flex items-center justify-around w-[100%] h-[12vh] C-bg-red-var2 rounded-[20px] p-4 overflow-hidden relative"
            >
              <i
                className="fa-solid fa-clipboard-list C-text-red-var1 text-5xl"
                aria-hidden="true"
              ></i>
              <p className="C-text-black font-bold text-2xl">Listes</p>
              <div className="flex items-end h-[100%] relative z-20">
                <i
                  className="fa-solid fa-arrow-right-long C-text-black text-3xl"
                  aria-hidden="true"
                ></i>
              </div>
              <img
                src="/images/elements/vague_var2.svg"
                className="absolute w-[15vw] right-0 top-0 z-10"
              />
            </Link>
            <Link
              href="/configuration"
              className="flex items-center justify-around w-[100%] h-[12vh] C-bg-red-var2 rounded-[20px] p-4 overflow-hidden relative"
            >
              <i
                className="fa-solid fa-gears C-text-red-var1 text-5xl"
                aria-hidden="true"
              ></i>
              <p className="C-text-black font-bold text-2xl">Configuration</p>
              <div className="flex items-end h-[100%] relative z-20">
                <i
                  className="fa-solid fa-arrow-right-long C-text-black text-3xl"
                  aria-hidden="true"
                ></i>
              </div>
              <img
                src="/images/elements/barcode_var2.svg"
                className="absolute w-[25vw] right-[20vw] bottom-0 z-10"
              />
            </Link>
            <Link
              href="/a-propos"
              className="flex items-center justify-around w-[100%] h-[12vh] C-bg-red-var2 rounded-[20px] p-4 overflow-hidden relative"
            >
              <i
                className="fa-solid fa-store C-text-red-var1 text-5xl"
                aria-hidden="true"
              ></i>
              <p className="C-text-black font-bold text-2xl">A propos</p>
              <div className="flex items-end h-[100%] relative z-20">
                <i
                  className="fa-solid fa-arrow-right-long C-text-black text-3xl"
                  aria-hidden="true"
                ></i>
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
          <div className="relative w-[100%] sm:w-[70%] h-[25px] bg-gray-300 rounded-full overflow-hidden">
            {categoryStockCount.map((item, index) => (
              <div
                key={index}
                className="absolute top-0 h-full rounded-r-[20px]"
                style={{
                  width: `${item.startPercentage}%`,
                  backgroundColor: colors[index % colors.length],
                  zIndex: categoryStockCount.length - index,
                }}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            {categoryStockCount.map((item, index) => (
              <div
                key={index}
                className="p-4 rounded-[20px] shadow-md bg-white flex flex-col gap-5 items-center justify-center border-t-[5px] w-[45vw] sm:w-[20vw] h-[12vh]"
                style={{ borderColor: colors[index % colors.length] }}
              >
                <p className="text-xl font-bold C-text-black">
                  {item.categorie}
                </p>
                <p
                  className="text-2xl font-bold"
                  style={{ color: colors[index % colors.length] }}
                >
                  {item.totalBoites}{" "}
                  <span className="text-xl C-text-black">boites</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
