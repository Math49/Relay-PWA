"use client";
import { useEffect, useRef, useState } from "react";
import { getCategories } from "@/services/category";
import { useAuth } from "@/context/AuthProvider";
import imageCompression from "browser-image-compression";
import { createProduct } from "@/services/product";

export default function CreateProductModal({ closeModal }) {
  const { user } = useAuth();
  const [preview, setPreview] = useState(null);

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    Label: "",
    Barcode: "",
    Box_quantity: 0,
    Packing: false,
    ID_category: 0,
    Image: null,
  });

  const fileInputRef = useRef();

  useEffect(() => {
    const fetchCategories = async () => {
      if (user && user.ID_store) {
        const categoriesData = await getCategories(user.ID_store);
        setCategories(categoriesData);
      }
    };

    fetchCategories();
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 640,
        useWebWorker: true,
      });

      setForm((prev) => ({ ...prev, image: compressed }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(compressed);
    } catch (err) {
      console.error("Erreur compression image:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let base64Image = null;
  
    if (form.image) {
      base64Image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(form.image);
      });
    }
  
    const { image, ...cleanForm } = form;

    const payload = {
      ...cleanForm,
      Image: base64Image,
      ID_category: parseInt(cleanForm.ID_category),
      Box_quantity: parseInt(cleanForm.Box_quantity),
    };
  
    console.log("Envoi du produit:", payload);
  
    await createProduct(payload);
  
    closeModal();
    setForm({
      Label: "",
      Barcode: "",
      Box_quantity: 0,
      Packing: false,
      ID_category: 0,
      Image: null,
    });
    setPreview(null);
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

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl flex flex-col justify-center items-center gap-5 p-6 w-[90%] max-w-md"
      >
        <div className="w-full">
          <input
            type="text"
            placeholder="Label"
            className="w-full border C-shadow-red-var2 C-border-red rounded-full p-2 mb-2"
            value={form.Label}
            onChange={(e) => setForm({ ...form, Label: e.target.value })}
            required
          />
        </div>
        <div className="flex justify-around items-center gap-5 w-full">
          <div className="flex flex-col gap-2 w-[50%] items-center justify-center">
            <div className="w-full">
              <input
                type="text"
                placeholder="Code barre"
                className="w-full border C-shadow-red-var2 C-border-red rounded-full p-2 mb-2"
                value={form.Barcode}
                onChange={(e) => setForm({ ...form, Barcode: e.target.value })}
                minLength={13}
                maxLength={13}
                required
              />
            </div>
            <div className="w-full flex justify-between items-center gap-2">
              <label htmlFor="boxQty">Nombre par carton</label>

              <input
                type="number"
                id="boxQty"
                placeholder="0"
                className="border C-shadow-red-var2 C-border-red rounded-xl p-2 w-[50%]"
                value={form.Box_quantity}
                onChange={(e) =>
                  setForm({ ...form, Box_quantity: parseInt(e.target.value) })

                }
                min={0}
                required
              />
            </div>
            <div className="w-full flex items-center gap-3">
              <label htmlFor="vrac" className="font-semibold">
                Vrac ?
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="vrac"
                  checked={form.Packing}
                  onChange={(e) =>
                    setForm({ ...form, Packing: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div
                  className={`w-[4vh] h-[4vh] rounded-xl border-2 flex items-center justify-center transition-all duration-200 ${
                    form.Packing ? "C-bg-red C-border-red" : "C-border-red"
                  }`}
                >
                  {form.Packing && (
                    <div className="w-3 h-3 rounded-full bg-white" />
                  )}
                </div>
              </label>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-[50%] h-full items-center justify-center">
            <div className="border C-border-red w-full C-shadow-red-var2 flex justify-center items-center rounded-xl text-center text-sm text-gray-600 h-[20vh] cursor-pointer overflow-hidden relative">
              <label
                htmlFor="file-upload"
                className="absolute inset-0 z-10 cursor-pointer"
              />
              {preview ? (
                <img
                  src={preview}
                  alt="Aperçu"
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <span className="z-0">Photo</span>
              )}
            </div>

            <input
              id="file-upload"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              required
            />
          </div>
        </div>
        <div className="w-full flex justify-center items-center gap-2">
          <select
            value={form.ID_category}
            onChange={(e) => setForm({ ...form, ID_category: e.target.value })}
            className="w-full border C-shadow-red-var2 C-border-red rounded-full p-2 mb-4"
            required
          >
            <option value="">Catégorie</option>
            {categories.map((cat) => (
              <option key={cat.ID_category} value={cat.ID_category}>
                {cat.category?.Label || "Sans nom"}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full flex justify-center items-center gap-2">
          <button
            type="submit"
            className="w-full C-bg-red text-xl cursor-pointer text-white py-3 rounded-[20px] font-bold"
          >
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
}
