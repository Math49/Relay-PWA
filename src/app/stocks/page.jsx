"use client";
import BackButton from "@/components/BackButton";
import React, { useState, useEffect } from "react";
import { getStocks } from "@/services/stock";
import { getCategories } from "@/services/category";
import { useAuth } from "@/context/AuthProvider";

export default function HomePage() {
  const [stocks, setStocks] = useState([]);
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [validCategories, setValidCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortByName, setSortByName] = useState(0);
  const [sortByQuantity, setSortByQuantity] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

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
      filtered = filtered.filter((stock) =>
        stock.product?.Barcode.includes(searchTerm) ||
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

  return (
    <div className="flex flex-col gap-[3vh] items-center justify-center relative z-10 text-white w-[100%] p-5">
      <div className="w-[100%]">
        <BackButton path="/" />
      </div>

      {/* 🏷 Catégories */}
      <div className="flex items-center justify-start gap-3 w-[100%] px-4 overflow-x-auto scrollbar-hide">
        {categories.map((category) => (
          <button
            key={category.ID_category}
            onClick={() => setSelectedCategory(category.ID_category)}
            className={`px-5 py-2 text-lg font-bold rounded-full border-[3px] transition-all ${
              selectedCategory === category.ID_category
                ? "border-red-500 text-red-500 bg-white"
                : "border-gray-300 text-gray-500 bg-white"
            }`}
          >
            {category.category.Label}
          </button>
        ))}
      </div>

      {/* 🎯 Filtres */}
      <div className="flex items-center gap-4 w-full px-4">
        {/* 📌 Filtre par nom */}
        <button
          onClick={() => setSortByName((prev) => (prev === 1 ? -1 : prev === -1 ? 0 : 1))}
          className="flex items-center gap-2 bg-white text-black px-3 py-2 rounded-md shadow-md"
        >
          <i className="fas fa-sort" aria-hidden="true"></i> Par nom
        </button>

        {/* 📌 Filtre par quantité */}
        <button
          onClick={() =>
            setSortByQuantity((prev) => (prev === 1 ? -1 : prev === -1 ? 0 : 1))
          }
          className="flex items-center gap-2 bg-white text-black px-3 py-2 rounded-md shadow-md"
        >
          <i className="fas fa-sort" aria-hidden="true"></i> Par quantité
        </button>

        {/* 🔍 Recherche par code-barre */}
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Code barre"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-md text-black shadow-md"
          />
          <i className="fas fa-search absolute right-3 top-3 text-red-500" aria-hidden="true"></i>
        </div>
      </div>

      {/* 📦 Produits en stock */}
      <div className="w-full mt-2">
        {filteredStocks.length === 0 ? (
          <p className="text-white text-center">Aucun produit trouvé.</p>
        ) : (
          filteredStocks.map((stock) => (
            <div
              key={stock.ID_stock}
              className="flex justify-between items-center p-3 bg-white rounded-xl shadow-md border-[2px] border-red-500 mb-2"
            >
              {/* 📸 Image produit */}
              <div className="flex items-center gap-3">
                <img
                  src={stock.product?.Image}
                  alt={stock.product?.Label}
                  className="w-12 h-12 rounded-md object-cover"
                />
                <div>
                  <p className="text-black font-bold">{stock.product?.Label}</p>
                  <p className="text-gray-500 text-sm">
                    {stock.product?.Barcode}
                  </p>
                </div>
              </div>

              {/* 📦 Stock et chariot */}
              <div className="flex items-center gap-3 text-red-500 text-lg">
                <div className="flex items-center gap-1">
                  <i className="fas fa-box"></i>
                  {stock.Nmb_boxes}
                </div>
                <div className="flex items-center gap-1">
                  <i className="fas fa-shopping-cart"></i>
                  {stock.Quantity}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
