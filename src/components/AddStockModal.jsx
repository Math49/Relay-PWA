"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getProducts } from "@/services/product";
import { getCategories } from "@/services/category";
import { useAuth } from "@/context/AuthProvider";
import Separateur from "./Separateur";
import Cookies from "js-cookie";

export default function AddStockModal({ onClose, onSubmit, createProduct }) {
  const initialPendingProducts = (() => {
    try {
      const raw = Cookies.get("pendingProducts");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  })();
  
  const [pendingProducts, setPendingProducts] = useState(initialPendingProducts);
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [Quantity, setQuantity] = useState(0);

  const { user } = useAuth();  

  const toggle = (id) => {
    setExpandedCategory((prev) => (prev === id ? null : id));
  };

  // 🔍 Filtrage global
  const filteredProducts = products.filter(
    (p) =>
      p.Label.toLowerCase().includes(search.toLowerCase()) ||
      p.Barcode.startsWith(search)
  );

  // 🔁 On filtre les catégories à afficher en fonction des produits filtrés
  const validCategories = categories.filter((cat) =>
    filteredProducts.some((p) => p.ID_category === cat.ID_category)
  );

  const handleAddProduct = () => {
    const product = {
      ...selectedProduct,
      Quantity: Quantity,
    };
  
    const newList = [...pendingProducts, product];
    setPendingProducts(newList);
    Cookies.set("pendingProducts", JSON.stringify(newList));
  
    setSelectedProduct(null);
    setQuantity(0);
  };
  

  const handleFinish = () => {
    onSubmit(pendingProducts);
    setPendingProducts([]);
    Cookies.set("pendingProducts", []);
    onClose();
  };

  useEffect(() => {
    getProducts().then((res) => {
      if (res) {
        setProducts(res);
      }
    });
    const fetchData = async () => {
      if (user && user.ID_store) {
        const categoriesData = await getCategories(user.ID_store);

        setCategories(categoriesData);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col bg-white rounded-[40px] items-center justify-between py-5 max-h-[80vh] C-text-black h-full w-full">
      <div className="h-[10%]">
        <h2 className="text-center text-lg font-bold mb-2">Ajout au stock</h2>
      </div>
      <div className="flex flex-col items-center justify-center gap-4 w-full px-5 h-[40%]">
        {!showNewProductForm ? (
          <>
            <div className="w-full flex justify-center">
              {selectedProduct ? (
                <div
                  key={selectedProduct.ID_product}
                  className="bg-white w-[90%] rounded-[10px] border-[2px] C-border-red overflow-hidden transition-all duration-300"
                >
                  <div className="flex cursor-pointer h-[5vh]">
                    <div className="flex items-center justify-center h-full gap-3 border-r-black border-r-[1px] w-[15%]">
                      <img
                        src={
                          !selectedProduct.Image ||
                          "/images/elements/default-product.jpg"
                        }
                        alt={selectedProduct?.Label}
                        className="w-auto h-full rounded-[10px] object-cover"
                      />
                    </div>
                    <div className="flex justify-between items-center w-[85%] h-full py-3 px-2 pr-4">
                      <div className="w-[60%]">
                        <p className="C-text-black font-semibold text-xl">
                          {selectedProduct?.Label}
                        </p>
                        <p className="C-text-black font-normal text-sm">
                          {selectedProduct?.Barcode}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 text-lg justify-between w-[40%]">
                        <div className="flex items-center gap-1">
                          <i
                            className="fa-solid fa-boxes-stacked C-text-red text-2xl"
                            aria-hidden="true"
                          ></i>
                          <p className="C-text-black font-bold ">
                            {selectedProduct.Box_quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <i
                            className="fa-solid fa-box text-2xl C-text-red"
                            aria-hidden="true"
                          ></i>
                          <input
                            type="checkbox"
                            className="w-5 h-5"
                            disabled
                            checked={selectedProduct.Packing === 1}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white w-[90%] h-[5vh] rounded-[10px] border-[2px] C-border-red overflow-hidden transition-all duration-300"></div>
              )}
            </div>
            <div className="w-full h-full overflow-y-scroll">
              {/* 🔎 Barre de recherche */}
              <div className="mb-4 relative flex justify-end w-full">
                <input
                  type="text"
                  placeholder="Rechercher"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-[40%] px-4 py-2 border rounded-full text-black text-sm shadow-md"
                />
                <i className="fas fa-search absolute right-4 top-3 C-text-red" />
              </div>
              <div className="flex items-center justify-end w-full">
                <p className="C-text-black text-sm">Produit non trouvé ?</p>
              </div>
              {/* 📂 Accordéons par catégorie */}
              {validCategories.map((cat) => {
                const categoryProducts = filteredProducts.filter(
                  (p) => p.ID_category === cat.ID_category
                );

                return (
                  <div
                    key={cat.ID_category}
                    className="mb-4 rounded overflow-hidden"
                  >
                    <button
                      onClick={() => toggle(cat.ID_category)}
                      className="w-full text-left px-4 py-3 C-bg-white cursor-pointer C-text-red C-border-red border-b-[2px] text-white font-bold flex justify-between items-center"
                    >
                      <span>{cat.category.Label}</span>
                      <i
                        className={`fas transition-transform ${
                          expandedCategory === cat.ID_category
                            ? "fa-chevron-up"
                            : "fa-chevron-down"
                        }`}
                      />
                    </button>

                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        expandedCategory === cat.ID_category
                          ? "max-h-[1000px] opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="p-4 bg-white text-black w-full gap-2 flex flex-col items-center">
                        {categoryProducts.map((p) => (
                          <div
                            key={p.ID_product}
                            className="bg-white w-[90%] rounded-[10px] border-[2px] C-border-red overflow-hidden transition-all duration-300"
                            onClick={() => setSelectedProduct(p)}
                          >
                            <div className="flex cursor-pointer h-[5vh]">
                              <div className="flex items-center justify-center h-full gap-3 border-r-black border-r-[1px] w-[15%]">
                                <img
                                  src={
                                    !p.Image ||
                                    "/images/elements/default-product.jpg"
                                  }
                                  alt={p?.Label}
                                  className="w-auto h-full rounded-[10px] object-cover"
                                />
                              </div>
                              <div className="flex justify-between items-center w-[85%] h-full py-3 px-2 pr-4">
                                <div className="w-[60%]">
                                  <p className="C-text-black font-semibold text-xl">
                                    {p?.Label}
                                  </p>
                                  <p className="C-text-black font-normal text-sm">
                                    {p?.Barcode}
                                  </p>
                                </div>
                                <div className="flex items-center gap-3 text-lg justify-between w-[40%]">
                                  <div className="flex items-center gap-1">
                                    <i
                                      className="fa-solid fa-boxes-stacked C-text-red text-2xl"
                                      aria-hidden="true"
                                    ></i>
                                    <p className="C-text-black font-bold ">
                                      {p.Box_quantity}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <i
                                      className="fa-solid fa-box text-2xl C-text-red"
                                      aria-hidden="true"
                                    ></i>
                                    <input
                                      type="checkbox"
                                      className="w-5 h-5"
                                      disabled
                                      checked={p.Packing === 1}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-around w-full">
              <div className="flex items-center gap-2">
                <p>Nombre de boites</p>
                <input
                  type="number"
                  value={Quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-[50px] text-center border-[2px] C-border-red-var2 rounded C-text-black font-bold"
                />
              </div>
              <button
                className=" C-text-white font-bold text-xl cursor-pointer C-bg-red rounded-full px-10 py-2"
                onClick={handleAddProduct}
              >
                Ajouter
              </button>
            </div>
          </>
        ) : (
          <>{/* Formulaire de création d'un produit */}</>
        )}
      </div>
      <div className="flex justify-center w-[90%]">
        <Separateur />
      </div>
      <div className=" overflow-y-scroll flex flex-col items-center w-full px-5 h-[40%]">
        {pendingProducts.map((p) => (
          <div
            key={p.ID_product}
            className="bg-white w-[90%] rounded-[10px] border-[2px] C-border-red mb-2 overflow-hidden transition-all duration-300"
          >
            <div className="flex h-[5vh]">
              <div className="flex items-center justify-center h-full gap-3 border-r-black border-r-[1px] w-[15%]">
                <img
                  src={!p.Image || "/images/elements/default-product.jpg"}
                  alt={p?.Label}
                  className="w-auto h-full rounded-[10px] object-cover"
                />
              </div>
              <div className="flex justify-between items-center w-[85%] h-full py-3 px-2 pr-4">
                <div className="w-[40%]">
                  <p className="C-text-black font-semibold text-xl">
                    {p?.Label}
                  </p>
                  <p className="C-text-black font-normal text-sm">
                    {p?.Barcode}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-lg justify-between w-[60%]">
                  <div className="flex items-center gap-1">
                    <i
                      className="fa-solid fa-boxes-stacked C-text-red text-2xl"
                      aria-hidden="true"
                    ></i>
                    <p className="C-text-black font-bold ">{p.Box_quantity}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <i
                      className="fa-solid fa-box text-2xl C-text-red"
                      aria-hidden="true"
                    ></i>
                    <input
                      type="checkbox"
                      className="w-5 h-5"
                      disabled
                      checked={p.Packing === 1}
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <i
                      className="fa-solid fa-dolly C-text-red text-2xl"
                      aria-hidden="true"
                    ></i>
                    <p className="C-text-black font-bold ">{p.Quantity}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {pendingProducts.length > 0 && (
          <button
            className="w-full mt-4 py-2 bg-green-600 text-white font-bold rounded"
            onClick={handleFinish}
          >
            Terminé
          </button>
        )}
      </div>
    </div>
  );
}
