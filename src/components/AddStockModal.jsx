"use client";
import React, { useState, useEffect } from "react";
import SelectProduct from "./SelectProduct";
import NewProductForm from "./NewProductForm";
import Image from "next/image";

export default function AddStockModal({ products, onClose, onSubmit, createProduct }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [boxCount, setBoxCount] = useState(0);
  const [pendingProducts, setPendingProducts] = useState([]);

  const handleAddToPending = (product, isNew = false) => {
    const existing = pendingProducts.find(p => p.ID_product === product.ID_product);
    if (existing) {
      existing.Nmb_boxes += boxCount;
      existing.Quantity += product.Box_quantity * boxCount;
      setPendingProducts([...pendingProducts]);
    } else {
      setPendingProducts([
        ...pendingProducts,
        {
          ...product,
          Nmb_boxes: boxCount,
          Quantity: product.Box_quantity * boxCount,
          ID_product: product.ID_product,
        },
      ]);
    }
    setSelectedProduct(null);
    setBoxCount(0);
    setShowNewProductForm(false);
  };

  const handleCreateProduct = async (newProduct) => {
    const createdProduct = await createProduct(newProduct);
    handleAddToPending(createdProduct, true);
  };

  const handleFinish = () => {
    onSubmit(pendingProducts);
    setPendingProducts([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-4 w-[90%] max-w-md">
        <h2 className="text-center text-lg font-bold mb-2">Ajout au stock</h2>
        {!showNewProductForm ? (
          <>
            <SelectProduct
              products={products}
              selected={selectedProduct}
              setSelected={setSelectedProduct}
              onCreateNew={() => setShowNewProductForm(true)}
            />

            <div className="text-center my-2">
              <label className="block text-sm font-medium text-gray-700">
                Nombre de boîtes
              </label>
              <input
                type="number"
                min={0}
                value={boxCount}
                onChange={(e) => setBoxCount(Number(e.target.value))}
                className="border border-gray-300 rounded px-3 py-1 text-center"
              />
            </div>

            <button
              onClick={() => selectedProduct && handleAddToPending(selectedProduct)}
              disabled={!selectedProduct || boxCount <= 0}
              className="w-full py-2 mt-2 C-bg-red text-white font-bold rounded"
            >
              Ajouter
            </button>
          </>
        ) : (
          <NewProductForm onBack={() => setShowNewProductForm(false)} onCreate={handleCreateProduct} />
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
