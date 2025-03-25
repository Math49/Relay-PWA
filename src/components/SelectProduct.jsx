"use client";
import React, { useState } from "react";

export default function SelectProduct({ products, selected, setSelected, onCreateNew }) {
  const [search, setSearch] = useState("");

  const filtered = products.filter(
    (p) =>
      p.Label.toLowerCase().includes(search.toLowerCase()) ||
      p.Barcode.includes(search)
  );

  return (
    <div className="mb-2">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-semibold">Sélectionnez un produit</label>
        <button className="text-sm underline" onClick={onCreateNew}>
          Produit non trouvé ?
        </button>
      </div>
      <input
        type="text"
        placeholder="Recherche..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border w-full px-3 py-1 rounded mb-2"
      />
      <div className="max-h-[150px] overflow-y-auto">
        {filtered.map((product) => (
          <div
            key={product.ID_product}
            onClick={() => setSelected(product)}
            className={`cursor-pointer p-2 border rounded mb-1 ${
              selected?.ID_product === product.ID_product ? "border-red-500" : "border-gray-300"
            }`}
          >
            <p className="font-semibold">{product.Label}</p>
            <p className="text-sm text-gray-500">{product.Barcode}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
