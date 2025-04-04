"use client";
import BackButton from "@/components/BackButton";
import React, { useState, useEffect } from "react";
import { getStocks } from "@/services/stock";
import { getCategories } from "@/services/category";
import { useAuth } from "@/context/AuthProvider";
import Separateur from "@/components/Separateur";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import StockCreateListDesktop from "@/components/StockCreateListDesktop";
import StockCreateListMobile from "@/components/StockCreateListMobile";
import {createList} from "@/services/listes";

export default function HomePage() {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortByName, setSortByName] = useState(0);
  const [sortByQuantity, setSortByQuantity] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const [itemsList, setItemsList] = useState({});

  const isMobile = useMediaQuery("(max-width: 768px)");

  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.ID_store) {
        const stocksData = await getStocks(user.ID_store);
        const categoriesData = await getCategories(user.ID_store);

        setStocks(stocksData);
        setCategories(categoriesData);

        setSelectedCategory(categoriesData[0]?.ID_category);
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    applyFilters();
  }, [selectedCategory, sortByName, sortByQuantity, searchTerm, stocks]);

  const applyFilters = () => {
    if (!selectedCategory) return;

    let filtered = stocks.filter(
      (stock) => stock.product?.ID_category === selectedCategory
    );

    if (searchTerm) {
      filtered = filtered.filter(
        (stock) =>
          stock.product?.Barcode.startsWith(searchTerm) ||
          stock.product?.Label.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortByName !== 0) {
      filtered.sort((a, b) =>
        sortByName === 1
          ? a.product.Label.localeCompare(b.product.Label)
          : b.product.Label.localeCompare(a.product.Label)
      );
    }

    if (sortByQuantity !== 0) {
      filtered.sort((a, b) =>
        sortByQuantity === 1 ? a.Quantity - b.Quantity : b.Quantity - a.Quantity
      );
    }

    setFilteredStocks(filtered);
  };
  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9C27B0"];

  const handleCreateList = async () => {

    const res = await createList(user.ID_store, itemsList);

    if (res) {
      window.location.href = "/listes";
    }
  }

  return (
    <div className="flex flex-col gap-[3vh] items-center justify-start relative z-10 w-[100%] h-[100%] p-5">
      <div className="w-[100%]">
        <BackButton path="/listes" />
      </div>
      <div className="w-full flex items-center justify-end px-5 py-3">
        <div
          className=" C-text-red font-bold text-xl cursor-pointer C-bg-red-var2 rounded-full px-10 py-2"
          onClick={handleCreateList}
        >
          Créer
        </div>
      </div>

      {/* 🏷 Catégories */}
      <div className="flex items-center justify-start gap-3 w-[100%] px-4 overflow-x-auto h-[10vh] min-h-min scrollbar-hide">
        {categories.map((category, index) => (
          <button
            key={category.ID_category}
            onClick={() => setSelectedCategory(category.ID_category)}
            className={`p-4 text-xl rounded-[20px] border-b-[5px] cursor-pointer transition-all bg-white ${
              selectedCategory === category.ID_category
                ? "!border-red-500 text-red-500 "
                : "border-gray-300 C-text-black "
            }`}
            style={{ borderColor: colors[index % colors.length] }}
          >
            {category.category.Label}
          </button>
        ))}
      </div>

      {/* 🎯 Filtres */}
      <div className="flex items-center justify-around sm:justify-end sm:gap-8 w-full">
        <div className="flex items-center justify-start w-[60%] sm:w-auto gap-2">
          {/* 📌 Filtre par nom */}
          <button
            onClick={() =>
              setSortByName((prev) => (prev === 1 ? -1 : prev === -1 ? 0 : 1))
            }
            className="flex items-center gap-2 cursor-pointer text-black px-3 py-2"
          >
            {sortByName === 1 ? (
              <i className="fas fa-sort-up" aria-hidden="true"></i>
            ) : sortByName === -1 ? (
              <i className="fas fa-sort-down" aria-hidden="true"></i>
            ) : (
              <i className="fas fa-sort" aria-hidden="true"></i>
            )}
            Par nom
          </button>

          {/* 📌 Filtre par quantité */}
          <button
            onClick={() =>
              setSortByQuantity((prev) =>
                prev === 1 ? -1 : prev === -1 ? 0 : 1
              )
            }
            className="flex items-center gap-2 cursor-pointer text-black px-3 py-2"
          >
            {sortByQuantity === 1 ? (
              <i className="fas fa-sort-up" aria-hidden="true"></i>
            ) : sortByQuantity === -1 ? (
              <i className="fas fa-sort-down" aria-hidden="true"></i>
            ) : (
              <i className="fas fa-sort" aria-hidden="true"></i>
            )}
            Par quantité
          </button>
        </div>

        {/* 🔍 Recherche par code-barre */}
        <div className="relative w-[40%] sm:w-[20%] flex items-center ">
          <input
            type="text"
            placeholder="Recherche"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 C-border-red-var2 border-[1px] text-sm w-full rounded-full text-black shadow-md"
          />
          <i
            className="fas fa-search absolute right-3 top-3 C-text-red"
            aria-hidden="true"
          ></i>
        </div>
      </div>
      <Separateur />
      {/* 📦 Produits en stock */}
      <div className="w-full h-full flex flex-col justify-start items-center mt-2">
        {filteredStocks.length === 0 ? (
          <p className="text-white text-center">Aucun produit trouvé.</p>
        ) : isMobile ? (
          <StockCreateListMobile
            stocks={filteredStocks}
            list={itemsList}
            setList={setItemsList}
          />
        ) : (
          <StockCreateListDesktop
            stocks={filteredStocks}
            list={itemsList}
            setList={setItemsList}
          />
        )}
      </div>
    </div>
  );
}
