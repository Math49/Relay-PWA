"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import imageCompression from "browser-image-compression";
import { createProduct, getAllProducts } from "@/services/product"; // 🔁 à adapter selon ton API
import { addStock } from "@/services/stock"; // 🔁 idem

export default function AddStockModal({ onClose, storeId }) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [customProduct, setCustomProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    Label: "",
    Barcode: "",
    Box_quantity: 0,
    Packing: false,
    Image: null,
  });

  const [tempList, setTempList] = useState([]);
  const [boxCount, setBoxCount] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts(); // 🔁
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 480,
      useWebWorker: true,
    };

    try {
      const compressed = await imageCompression(file, options);
      const blobUrl = URL.createObjectURL(compressed);
      setNewProduct((prev) => ({ ...prev, Image: blobUrl }));
    } catch (err) {
      console.error("Erreur de compression :", err);
    }
  };

  const handleAddToTempList = async () => {
    if (!selectedProduct && !customProduct) return;

    let productToAdd = selectedProduct;
    if (customProduct) {
      const created = await createProduct(newProduct); // 🔁
      productToAdd = created;
    }

    setTempList((prev) => [
      ...prev,
      {
        product: productToAdd,
        Nmb_boxes: parseInt(boxCount),
        Quantity: productToAdd.Box_quantity * boxCount,
      },
    ]);

    setSelectedProduct(null);
    setCustomProduct(false);
    setBoxCount(0);
  };

  const handleFinish = async () => {
    await addStock(storeId, tempList); // 🔁 gère les doublons côté backend
    setTempList([]);
    onClose();
  };

  const filteredProducts = products.filter(
    (p) =>
      p.Label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.Barcode.includes(searchTerm)
  );

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-3 right-3 text-xl">
          ❌
        </button>

        <h2 className="text-xl font-bold text-center mb-4">Ajout au stock</h2>

        {/* 🔻 Sélection produit */}
        {!customProduct ? (
          <>
            <div className="flex flex-col gap-2 mb-2">
              <input
                type="text"
                className="border rounded p-2"
                placeholder="Recherche produit"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="border rounded max-h-[150px] overflow-y-auto">
                {filteredProducts.map((p) => (
                  <div
                    key={p.ID_product}
                    className={`p-2 cursor-pointer hover:bg-gray-100 ${
                      selectedProduct?.ID_product === p.ID_product
                        ? "bg-red-100"
                        : ""
                    }`}
                    onClick={() => setSelectedProduct(p)}
                  >
                    {p.Label} - {p.Barcode}
                  </div>
                ))}
              </div>
              <button
                className="text-sm underline text-right mt-1"
                onClick={() => setCustomProduct(true)}
              >
                Produit non trouvé ?
              </button>
            </div>

            <input
              type="number"
              className="border rounded p-2 w-full text-center"
              placeholder="Nombre de boîtes"
              value={boxCount}
              onChange={(e) => setBoxCount(e.target.value)}
            />

            <button
              onClick={handleAddToTempList}
              className="w-full bg-red-500 text-white rounded p-2 mt-2"
            >
              Ajouter
            </button>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-2 mb-2">
              <input
                type="text"
                placeholder="Label"
                className="border rounded p-2"
                value={newProduct.Label}
                onChange={(e) =>
                  setNewProduct((prev) => ({ ...prev, Label: e.target.value }))
                }
              />
              <input
                type="text"
                placeholder="Code barre"
                className="border rounded p-2"
                value={newProduct.Barcode}
                onChange={(e) =>
                  setNewProduct((prev) => ({ ...prev, Barcode: e.target.value }))
                }
              />
              <input
                type="number"
                placeholder="Nombre par carton"
                className="border rounded p-2"
                value={newProduct.Box_quantity}
                onChange={(e) =>
                  setNewProduct((prev) => ({
                    ...prev,
                    Box_quantity: parseInt(e.target.value),
                  }))
                }
              />
              <div className="flex items-center gap-2">
                <label>Vrac ?</label>
                <input
                  type="checkbox"
                  checked={newProduct.Packing}
                  onChange={(e) =>
                    setNewProduct((prev) => ({
                      ...prev,
                      Packing: e.target.checked,
                    }))
                  }
                />
              </div>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {newProduct.Image && (
                <Image
                  src={newProduct.Image}
                  alt="preview"
                  width={100}
                  height={100}
                  className="rounded"
                />
              )}
            </div>
            <button
              onClick={() => setCustomProduct(false)}
              className="text-sm text-gray-600 underline mb-2"
            >
              Retour
            </button>
            <button
              onClick={handleAddToTempList}
              className="w-full bg-red-500 text-white rounded p-2"
            >
              Créer et ajouter
            </button>
          </>
        )}

        {/* 📝 Liste des produits ajoutés */}
        <div className="mt-6">
          <h3 className="font-bold mb-2">Produits ajoutés :</h3>
          <div className="flex flex-col gap-2 max-h-[150px] overflow-y-auto">
            {tempList.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center border rounded px-3 py-2"
              >
                <span>{item.product.Label}</span>
                <span>{item.Nmb_boxes} boîtes</span>
              </div>
            ))}
          </div>

          {tempList.length > 0 && (
            <button
              onClick={handleFinish}
              className="w-full bg-green-500 text-white rounded p-2 mt-4"
            >
              Terminé
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
