"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function AddStockModal({ products, onClose, onSubmit, createProduct }) {
  const [pendingProducts, setPendingProducts] = useState([]);

  const handleFinish = () => {
    onSubmit(pendingProducts);
    setPendingProducts([]);
    onClose();
  };

  return (
    <div className="flex flex-col items-center justify-between C-text-black h-full w-full">
      <div className="bg-white rounded-lg p-4 w-full">
        <h2 className="text-center text-lg font-bold mb-2">Ajout au stock</h2>
        {!showNewProductForm ? (
          <>
            {/* Liste des produits rangé par catégories (comme view des listes) avec barre de recherche */}
          </>
        ) : (
          <>
            {/* Formulaire de création d'un produit */}
          </>
        )}

        <div className="mt-4">
          {pendingProducts.map((p, idx) => (
            <div key={idx} className="border-b py-2 flex items-center gap-2">
              <Image
                src={p.Image || "/images/elements/default-product.jpg"}
                alt={p.Label}
                width={40}
                height={40}
                className="rounded"
              />
              <div className="flex-grow">
                <p className="font-semibold">{p.Label}</p>
                <p className="text-sm text-gray-500">{p.Barcode}</p>
              </div>
              <div className="font-bold">{p.Quantity}</div>
            </div>
          ))}
        </div>

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
