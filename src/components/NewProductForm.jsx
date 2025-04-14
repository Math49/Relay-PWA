"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
import { getCategories } from "@/services/category";


export default function NewProductForm({ data }) {
  const [label, setLabel] = useState("");
  const [barcode, setBarcode] = useState("");
  const [boxQty, setBoxQty] = useState(0);
  const [category, setCategory] = useState(0);
  const [categories, setCategories] = useState([]);
  const [packing, setPacking] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const { user } = useAuth();

  
  useEffect(() => {

    const fetchData = async () => {
          if (user && user.ID_store) {
            const categoriesData = await getCategories(user.ID_store);
            setCategories(categoriesData);
    
          }
        }
    fetchData();

    data = {
      Label: label,
      Barcode: barcode,
      Box_quantity: boxQty,
      ID_category: category,
      Packing: packing ? 1 : 0,
      Image: imageFile,
    }
  }, []);


  return (
    <div className="flex flex-col gap-2 p-4">
      <div>
        <input
          type="text"
          placeholder="Label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="border C-border-red-var2 w-full px-3 py-1 rounded-full"
        />
      </div>
      <div className="flex items-center gap-2 w-full">
        <div className="flex flex-col w-[60%]">
          <input
            type="number"
            placeholder="Code barre"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            className="border C-border-red-var2 w-full px-3 py-1 rounded-full"
          />
        </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="border C-border-red-var2 w-[40%] px-3 py-1 rounded-full"
            />
      </div>
      <input
        type="number"
        placeholder="Nombre par carton"
        value={boxQty}
        onChange={(e) => setBoxQty(Number(e.target.value))}
        className="border C-border-red-var2 w-full px-3 py-1 rounded-full"
      />
      <div className="flex items-center gap-2">
        <label>Vrac ?</label>
        <input
          type="checkbox"
          checked={packing}
          onChange={(e) => setPacking(e.target.checked)}
          className="border C-border-red-var2 w-full px-3 py-1 rounded-full"
        />
      </div>
    </div>
  );
}
