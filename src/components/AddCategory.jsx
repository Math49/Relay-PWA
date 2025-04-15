'use client';
import React, { useEffect, useState } from 'react';
import {
  getAllCategories,
  getCategories,
  createCategoryEnable
} from '@/services/category';
import { useAuth } from '@/context/AuthProvider';

export default function AddCategory({ setCreateCategory, closeModal }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryEnable, setCategoryEnable] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCategories = async () => {
      const allCategories = await getAllCategories();
      const enabledCategories = await getCategories(user.ID_store);
    
      setCategoryEnable(enabledCategories);
      const filtered = allCategories.filter(
        (category) =>
          !enabledCategories.some(
            (enabled) => enabled.ID_category === category.ID_category
          )
      );

      setCategories(filtered);
    };

    fetchCategories();
  }, [user]);

  const handleSubmit = async () => {
    const categoryPosition = categoryEnable.length + 1;
    await createCategoryEnable(user.ID_store, selectedCategory, categoryPosition);
    closeModal();
    window.location.reload();
  };

  return (
    <div className="C-text-black flex flex-col w-[100vw] h-[70%] sm:w-[30vw] justify-center items-center sm:justify-between z-50">
      <div
        className="p-4 absolute top-2 left-2 cursor-pointer"
        onClick={closeModal}
      >
        <i
          className="fa-solid fa-arrow-left-long text-3xl C-text-black"
          aria-hidden="true"
        ></i>
      </div>
      <div className="w-[100%] flex justify-center items-center mt-[3vh]">
        <h2 className="C-text-black font-bold text-2xl mb-6">
          Création produit
        </h2>
      </div>

      <div
        className="bg-white rounded-2xl flex flex-col justify-center items-center gap-5 p-6 w-[90%] max-w-md"
      >
      {/* Select */}
      <div className="w-full">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full text-black text-lg p-3 rounded-full border border-rose-200 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
        >
          <option value="">Catégorie</option>
          {categories.map((cat) => (
            <option key={cat.ID_category} value={parseInt(cat.ID_category)}>
              {cat.Label}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <p className="text-sm text-black cursor-pointer"
        onClick={setCreateCategory}
      >
        La catégorie n’existe pas ?
      </p>

      {/* Ajouter Button */}
      <button
      onClick={handleSubmit}
        className="C-text-white font-bold w-full text-xl cursor-pointer C-bg-red rounded-full px-10 py-2"
      >
        Ajouter
      </button>
        </div>

    </div>
  );
}
