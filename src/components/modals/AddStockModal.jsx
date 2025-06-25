"use client";
import React, { useState, useEffect } from "react";
import { getProducts } from "@/services/product";
import { getCategories } from "@/services/category";
import { useAuth } from "@/context/AuthProvider";
import Separateur from "../elements/Separateur";
import Cookies from "js-cookie";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function AddStockModal({ onClose, onSubmit, createProduct }) {
  const initialPendingProducts = (() => {
    try {
      const raw = Cookies.get("pendingProducts");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  })();

  const [pendingProducts, setPendingProducts] = useState(
    initialPendingProducts
  );
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

  const isMobile = useMediaQuery("(max-width: 768px)");

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
    <div className="flex flex-col bg-white rounded-[40px] items-center justify-between py-5 max-h-[90vh] C-text-black h-full w-full">
      <div className="h-[10%]">
        <h2 className="text-center text-lg font-bold mb-2">Ajout au stock</h2>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-[90%] px-5 h-full sm:h-[90%]">
        <div className="flex flex-col items-center justify-center gap-4 w-full h-[60%] sm:h-full">
          <div className="w-full flex justify-center">
            {selectedProduct ? (
              <div
                key={selectedProduct.ID_product}
                className="bg-white w-[90%] rounded-[10px] border-[2px] C-border-red overflow-hidden transition-all duration-300"
              >
                <div className="flex cursor-pointer items-center h-[5vh] min-h-min">
                  <div className="flex items-center justify-center h-full gap-3 w-[15%]">
                    <img
                      src={
                        selectedProduct.Image ||
                        "/images/elements/default-product.jpg"
                      }
                      alt={selectedProduct?.Label}
                      className="w-full h-auto rounded-[10px] object-cover"
                    />
                  </div>
                  <div className="flex justify-between items-center border-l-black border-l-[1px] min-h-min w-[85%] h-full py-3 px-2 pr-4">
                    <div className="w-[60%]">
                      <p className="C-text-black font-semibold text-lg">
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
                          className="bg-white w-[100%] rounded-[10px] border-[2px] C-border-red overflow-hidden transition-all duration-300"
                          onClick={() => setSelectedProduct(p)}
                        >
                          <div className="flex cursor-pointer items-center h-[6vh] min-h-min">
                            <div className="flex items-center justify-center h-full gap-3 w-[15%]">
                              <img
                                src={
                                  p.Image ||
                                  "/images/elements/default-product.jpg"
                                }
                                alt={p?.Label}
                                className="w-full h-auto object-cover"
                              />
                            </div>
                            <div className="flex justify-between items-center min-h-min border-l-black border-l-[1px] w-[85%] h-full py-3 px-2 pr-4">
                              <div className="w-[60%]">
                                <p className="C-text-black font-semibold text-lg">
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

          <div className="flex justify-center w-[90%] sm:w-full max-h-min">
            <Separateur />
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
              disabled={!selectedProduct || Quantity <= 0}
            >
              Ajouter
            </button>
          </div>
        </div>
        {isMobile ? (
          <div className="flex justify-center w-[90%] sm:w-full max-h-min">
            <Separateur />
          </div>
        ) : (
          <div className="flex justify-center h-[90%] sm:h-full">
            <div className="w-[1px] h-full C-bg-red-var2"></div>
          </div>
        )}
        <div className=" overflow-y-scroll w-full px-5 h-[40%] sm:w-full sm:h-full">
          <div className="flex flex-col items-center w-full">
            {pendingProducts.map((p) => (
              <div
                key={p.ID_product}
                className="bg-white w-[100%] rounded-[10px] border-[2px] C-border-red mb-2 overflow-hidden transition-all duration-300 min-h-[5vh]"
              >
                <div className="flex items-center justify-center min-h-min h-[8vh]">
                  <div className="flex items-center  justify-center h-full gap-3 w-[15%]">
                    <img
                      src={p.Image || "/images/elements/default-product.jpg"}
                      alt={p?.Label}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="flex justify-between border-black min-h-min border-l-[1px] sm:border-0 items-center w-[85%] h-full py-3 px-2 pr-4">
                    <div className="w-[30%]">
                      <p className="C-text-black font-semibold text-lg">
                        {p?.Label}
                      </p>
                      <p className="C-text-black font-normal text-sm">
                        {p?.Barcode}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-3 text-lg justify-center w-[70%]">
                      <div className="flex items-center gap-3 text-lg justify-between">
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
                      <div className="flex items-center gap-1 ">
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
                className="w-full mt-4 py-2 C-bg-red-var2 C-text-red font-bold rounded-full text-xl cursor-pointer mb-[3vh]"
                onClick={handleFinish}
              >
                Terminé
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
