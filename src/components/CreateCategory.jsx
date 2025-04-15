"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthProvider";
import { createCategoryEnable, createCategory, getCategories } from "@/services/category";

export default function CreateCategory({ setCreateCategory, closeModal }) {
  const [label, setLabel] = useState("");
    const [categoryEnable, setCategoryEnable] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCategories = async () => {
      const enabledCategories = await getCategories(user.ID_store);
      setCategoryEnable(enabledCategories);

    };

    fetchCategories();
  }, [user]);

  const handleSubmit = async () => {

    if (!label) return;
    const newCat = await createCategory(label);

    const categoryPosition = categoryEnable.length + 1;
    await createCategoryEnable(
      user.ID_store,
      newCat.ID_category,
      categoryPosition
    );
    closeModal();
    window.location.reload();
  };

  return (
    <div className="bg-white rounded-2xl flex flex-col justify-center items-center gap-5 p-6 w-[90%] max-w-md">
      {/* input */}
      <div className="w-full">
        <input
          type="text"
          placeholder="Label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="border text-lg C-border-red-var2 w-full p-3 rounded-full"
        />
      </div>

      {/* Message */}
      <div className="flex flex-col items-end w-full gap-2">
        <p
          className="C-text-black cursor-pointer"
          onClick={() => setCreateCategory(false)}
        >
          Retour
        </p>
      </div>

      {/* Ajouter Button */}
      <button
        onClick={handleSubmit}
        className="C-text-white font-bold w-full text-xl cursor-pointer C-bg-red rounded-full px-10 py-2"
      >
        Ajouter
      </button>
    </div>
  );
}
