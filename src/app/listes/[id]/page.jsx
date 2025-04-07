"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { getSpecificList, deleteList } from "@/services/listes";
import { getCategories } from "@/services/category";
import { getStocks, putStocks, createStock } from "@/services/stock";
import { createList } from "@/services/listes";
import BackButton from "@/components/BackButton";
import Separateur from "@/components/Separateur";
import FloatingButtonList from "@/components/FloatingButtonList";

export default function HomePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [liste, setListe] = useState(null);
  const [categories, setCategories] = useState([]);
  const [checkedStates, setCheckedStates] = useState([]);
  const [editedQuantities, setEditedQuantities] = useState({});
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  useEffect(() => {
    const fetchData = async () => {
      if (user?.ID_store) {
        const listData = await getSpecificList(user.ID_store, id);
        const categoriesData = await getCategories(user.ID_store);
        setListe(listData);
        setCategories(categoriesData);
        setCheckedStates(Array(listData.product_lists.length).fill(false));

        // Initialiser les quantités éditées
        const initialQuantities = {};
        listData.product_lists.forEach((p) => {
          initialQuantities[p.ID_product] = p.Quantity;
        });
        setEditedQuantities(initialQuantities);
      }
    };
    fetchData();
  }, [user]);

  const toggleCheckbox = (productId) => {
    setCheckedStates((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleChange = (ID_product, value) => {
    setEditedQuantities((prev) => ({
      ...prev,
      [ID_product]: parseInt(value),
    }));
  };

  const handleEdit = async () => {
    if (isEditing) {
      const payload = Object.entries(editedQuantities).map(([id, qty]) => ({
        ID_product: parseInt(id),
        Quantity: qty,
      }));
      console.log(payload);
    }
    setIsEditing(!isEditing);
  };

  const handleValidate = async () => {
    const currentStocks = await getStocks(user.ID_store);
    const updateStocks = [];
    const newStocks = [];

    for (const p of liste.product_lists) {
      const Quantity = editedQuantities[p.ID_product] ?? p.Quantity;
      const existing = currentStocks.find((s) => s.ID_product === p.ID_product);

      if (existing) {
        updateStocks.push({
          ID_product: p.ID_product,
          Quantity: existing.Quantity - Quantity,
          Nmb_boxes: existing.Nmb_boxes,
          Nmb_on_shelves: existing.Nmb_on_shelves,
        });
      } else {
        newStocks.push({
          ID_product: p.ID_product,
          Quantity: -Quantity,
          Nmb_boxes: 0,
          Nmb_on_shelves: 0,
        });
      }
    }

    if (updateStocks.length > 0) await putStocks(user.ID_store, updateStocks);
    if (newStocks.length > 0) await createStock(user.ID_store, newStocks);

    await deleteList(liste.ID_list);
    router.push("/listes");
  };

  const handleSupp = async () => {
    await deleteList(liste.ID_list);
    router.push("/listes");
  };

  const handlePrint = async () => {
    window.print();
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hour = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `Liste du ${day}/${month}/${year} à ${hour}h${minutes}`;
  };

  if (!liste || !categories) return null;

  return (
    <div className="flex flex-col gap-3 items-center justify-start relative z-10 w-[100%] h-[100%] p-5">
      <div className="w-[100%]">
        <BackButton path="/listes" />
      </div>
      <FloatingButtonList
        onSupp={handleSupp}
        onEdit={handleEdit}
        isEditing={isEditing}
        isValidated={handleValidate}
        onPrint={handlePrint}
      />
      <h2 className="text-center text-xl font-bold mb-4">
        {formatDate(liste.created_at)}
      </h2>

      {categories.map((cat) => {
        const produits = liste.product_lists.filter(
          (p) => p.product?.ID_category === cat.ID_category
        );
        if (produits.length === 0) return null;

        return (
          <div key={cat.ID_category} className="mb-6 w-full">
            <h3 className="text-xl mb-2">{cat.category?.Label}</h3>
            <Separateur />
            <div className="pl-4 flex flex-col gap-2 justify-start items-center w-full mt-3">
              {produits.map((p) => (
                <div
                  key={p.ID_product}
                  className="mb-1 flex w-[90%] gap-5 rounded justify-around items-center"
                >
                  <div className="w-[10%]">
                    <label className="relative inline-flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checkedStates[p.ID_product] || false}
                        onChange={() => toggleCheckbox(p.ID_product)}
                        className="sr-only"
                      />
                      <div
                        className={`w-[8vw] h-[8vw] rounded-xl border-2 flex items-center justify-center transition-all duration-200 ${
                          checkedStates[p.ID_product]
                            ? "C-bg-red C-border-red"
                            : "C-border-red"
                        }`}
                      >
                        {checkedStates[p.ID_product] && (
                          <div className="w-3 h-3 rounded-full bg-white" />
                        )}
                      </div>
                    </label>
                  </div>
                  <div className="w-[90%] flex justify-between items-center">
                    <div
                      className={`bg-white flex h-[7vh] w-full rounded-[10px] border-[2px] C-border-red mb-2 overflow-hidden transition-all duration-300 ${
                        checkedStates[p.ID_product]
                          ? "line-through opacity-60"
                          : ""
                      }`}
                    >
                      <div className="flex w-[60%]">
                        <div className="flex items-center justify-center h-full gap-3 border-r-black border-r-[1px] w-[30%]">
                          <img
                            src={
                              !p.product.Image ||
                              "/images/elements/default-product.jpg"
                            }
                            alt={p.product?.Label}
                            className="w-auto h-full rounded-[10px] object-cover"
                          />
                        </div>
                        <div className="flex justify-between items-center w-[70%] h-full py-3 px-2 pr-4">
                          <div className="w-[30%]">
                            <p className="C-text-black font-semibold text-xl">
                              {p.product?.Label}
                            </p>
                            <p className="C-text-black font-normal text-sm">
                              {p.product?.Barcode}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-lg pr-4 justify-between w-[40%]">
                        <div className="flex items-center gap-1">
                          <i className="fa-solid fa-box C-text-red text-2xl" />
                          {isEditing ? (
                              <input
                                type="number"
                                value={
                                  Math.floor(editedQuantities[p.ID_product] / p.product.Box_quantity) ?? Math.floor(p.Quantity / p.product.Box_quantity)
                                }
                                onChange={(e) =>
                                  handleChange(p.ID_product, e.target.value * p.product.Box_quantity)
                                }
                                className="w-[50px] text-center border border-gray-300 rounded C-text-black font-bold"
                              />
                            ) : (
                              <p className="C-text-black font-bold ">
                            {Math.floor(
                              editedQuantities[p.ID_product] /
                                p.product.Box_quantity
                            )}
                          </p>
                            )}
                        </div>
                        <div className="flex items-center gap-1">
                          <i className="fa-solid fa-dolly C-text-red text-2xl" />
                          {p.product.Packing === 0 ? (
                            isEditing ? (
                              <input
                                type="number"
                                value={
                                  editedQuantities[p.ID_product] ?? p.Quantity
                                }
                                onChange={(e) =>
                                  handleChange(p.ID_product, e.target.value)
                                }
                                className="w-[50px] text-center border border-gray-300 rounded C-text-black font-bold"
                              />
                            ) : (
                              <span className="C-text-black font-bold">
                                {Math.round(
                                  (editedQuantities[p.ID_product] ??
                                    p.Quantity) % p.product.Box_quantity
                                )}
                              </span>
                            )
                          ) : (
                            <div className="w-[6vw] h-[6vw] rounded-lg border-2 flex items-center justify-center transition-all duration-200 C-bg-red C-border-red">
                              <div className="w-3 h-3 rounded-full bg-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
