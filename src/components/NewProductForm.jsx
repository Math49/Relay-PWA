"use client";
import React, { useState } from "react";
import useImageCompressor from "@/hooks/useImageCompressor";

export default function NewProductForm({ onBack, onCreate }) {
  const [label, setLabel] = useState("");
  const [barcode, setBarcode] = useState("");
  const [boxQty, setBoxQty] = useState(0);
  const [packing, setPacking] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const { compressImage } = useImageCompressor();

  const handleSubmit = async () => {
    const imagePath = await compressImage(imageFile, label);

    onCreate({
      Label: label,
      Barcode: barcode,
      Box_quantity: boxQty,
      Packing: packing ? 1 : 0,
      Image: imagePath,
    });
  };

  return (
    <div className="space-y-2">
      <button className="text-sm underline" onClick={onBack}>
        Retour
      </button>
      <input
        type="text"
        placeholder="Label"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        className="border w-full px-3 py-1 rounded"
      />
      <input
        type="text"
        placeholder="Code barre"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        className="border w-full px-3 py-1 rounded"
      />
      <input
        type="number"
        placeholder="Nombre par carton"
        value={boxQty}
        onChange={(e) => setBoxQty(Number(e.target.value))}
        className="border w-full px-3 py-1 rounded"
      />
      <div className="flex items-center gap-2">
        <label>Vrac ?</label>
        <input
          type="checkbox"
          checked={packing}
          onChange={(e) => setPacking(e.target.checked)}
        />
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
      />
      <button
        className="w-full mt-2 py-2 C-bg-red text-white rounded font-bold"
        onClick={handleSubmit}
        disabled={!label || !barcode || boxQty <= 0}
      >
        Créer le produit
      </button>
    </div>
  );
}
