"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import { getSpecificList } from "@/services/listes";
import { getCategories } from "@/services/category";
import BackButton from "@/components/BackButton";
import Separateur from "@/components/Separateur";

export default function HomePage() {
  const [liste, setListe] = useState(null);
  const [categories, setCategories] = useState([]);
  const { user } = useAuth();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchData = async () => {
      if (user?.ID_store) {
        const listData = await getSpecificList(user.ID_store, id);
        const categoriesData = await getCategories(user.ID_store);
        setListe(listData);
        setCategories(categoriesData);
      }
    };
    fetchData();
  }, [user]);

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
    <div className="flex flex-col gap-[3vh] items-center justify-start relative z-10 w-[100%] h-[100%] p-5">
          <div className="w-[100%]">
            <BackButton path="/listes" />
          </div>
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
            <Separateur/>
            <div className="pl-4 flex flex-col gap-2 justify-start items-center w-full">
              {produits.map((p) => (
                <div key={p.ID_product} className="mb-1 flex w-[80%] justify-between">
                    <div className="w-[20%]">
                        <input type="checkbox" name="" id="" />
                    </div>
                    <div className="w-[80%] flex justify-between items-center">
                        <span>{p.product?.Label}</span>
                        <span className="font-bold">{p.Quantity}</span>
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
