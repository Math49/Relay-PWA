"use client";
import BackButton from "@/components/BackButton";
import React, { useState, useEffect } from "react";
import { getStocks } from "@/services/stock";
import { getCategories } from "@/services/category";
import { useAuth } from "@/context/AuthProvider";
import Separateur from "@/components/Separateur";

export default function HomePage() {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortByName, setSortByName] = useState(0);
  const [sortByQuantity, setSortByQuantity] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedStockId, setExpandedStockId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedStockId((prev) => (prev === id ? null : id));
  };

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
  console.log(filteredStocks);

  return (
    <div className="flex flex-col gap-[3vh] items-center justify-center relative z-10 text-white w-[100%] h-[100%] p-5">
      <div className="w-[100%]">
        <BackButton path="/" />
      </div>

      {/* 🏷 Catégories */}
      <div className="flex items-center justify-start gap-3 w-[100%] px-4 overflow-x-auto scrollbar-hide">
        {categories.map((category, index) => (
          <button
            key={category.ID_category}
            onClick={() => setSelectedCategory(category.ID_category)}
            className={`p-4 text-xl rounded-[20px] border-b-[5px] transition-all bg-white ${
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
      <div className="flex items-center justify-around w-full">
        <div className="flex items-center justify-start w-[60%] gap-2">
          {/* 📌 Filtre par nom */}
          <button
            onClick={() =>
              setSortByName((prev) => (prev === 1 ? -1 : prev === -1 ? 0 : 1))
            }
            className="flex items-center gap-2  text-black px-3 py-2"
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
              setSortByQuantity((prev) => (prev === 1 ? -1 : prev === -1 ? 0 : 1))
            }
            className="flex items-center gap-2 text-black px-3 py-2"
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
        <div className="relative w-[40%] flex items-center ">
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
      <div className="w-full h-full flex flex-col items-center mt-2">
        {filteredStocks.length === 0 ? (
          <p className="text-white text-center">Aucun produit trouvé.</p>
        ) : (
          filteredStocks.map((stock) => (
            <div
              key={stock.ID_stock}
              className="bg-white w-[90%] rounded-[10px] shadow-md border-[2px] C-border-red mb-2 overflow-hidden transition-all duration-300"
            >
              {/* Partie cliquable */}
              <div
                className="flex cursor-pointer h-[5vh]"
                onClick={() => toggleExpand(stock.ID_stock)}
              >
                {/* 📸 Image produit */}
                <div className="flex items-center h-full gap-3 border-r-black border-r-[1px] w-[15%]">
                  <img
                    src={
                      !stock.product.Image ||
                      "images/elements/default-product.jpg"
                    }
                    alt={stock.product?.Label}
                    className="w-auto h-full rounded-[10px] object-cover"
                  />
                </div>
                {/* Infos produit */}
                <div className="flex justify-between items-center w-[85%] h-full py-3 px-2 pr-4">
                  <div className="w-[60%]">
                    <p className="C-text-black font-semibold text-xl">
                      {stock.product?.Label}
                    </p>
                    <p className="C-text-black font-normal text-sm">
                      {stock.product?.Barcode}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-lg justify-between w-[40%]">
                    <div className="flex items-center gap-1">
                      <i className="fa-solid fa-boxes-stacked C-text-red text-2xl"></i>
                      <p className="C-text-black font-bold">
                        {stock.product.Box_quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <i className="fa-solid fa-dolly C-text-red text-2xl"></i>
                      <p className="C-text-black font-bold">
                        {stock.Quantity}
                      
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Partie étendue */}
              <div
                className={`transition-all duration-500 ease-in-out ${
                  expandedStockId === stock.ID_stock
                    ? "max-h-[200px] opacity-100"
                    : "max-h-0 opacity-0"
                } overflow-hidden C-border-red-var2 border-t-[1px]`}
              >
                <div className="flex justify-around items-center px-6 py-3 border-t C-border-light">
                {stock.product.Packing === 0 ?
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-cash-register text-2xl C-text-red"></i>
                    <span className="text-black font-bold">
                      {stock.Nmb_on_shelves}
                    </span>
                  </div>
                  : ''}
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-box-open text-2xl C-text-red"></i>
                    <span className="text-black font-bold">
                      {stock.Nmb_boxes} {stock.product.Packing === 0 ? stock.Nmb_boxes * stock.product.Box_quantity == stock.Quantity ? '' : '(1)' : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-box text-2xl C-text-red"></i>
                    <input
                      type="checkbox"
                      className="w-5 h-5"
                      disabled
                      checked={stock.product.Packing === 1 ? true : false}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
