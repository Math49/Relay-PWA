"use client";
import React from "react";

export default function StockListDesktop({ stocks, isEditing, setStocks }) {
  const handleChange = (id, field, value) => {
    setStocks((prevStocks) =>
      prevStocks.map((stock) =>
        stock.ID_stock === id
          ? { ...stock, [field]: parseInt(value) || 0 }
          : stock
      )
    );
  };

  if (!stocks || stocks.length === 0) {
    return <p className="text-white text-center">Aucun produit trouvé.</p>;
  }

  return (
    <div className="w-full flex flex-col items-center mt-2">
      <div className="w-[70%] text-black font-bold text-sm flex justify-end gap-[30px] mb-2 px-3">
        <span className="col-span-2">Produit</span>
        <span className="text-center">Par boîte</span>
        <span className="text-center">En rayon</span>
        <span className="text-center">Boîtes</span>
        <span className="text-center">Quantité</span>
        <span className="text-center">En vrac ?</span>
      </div>
      <div className="w-[90%] flex flex-col items-center gap-2">
        {stocks.map((stock) => (
          <div
            key={stock.ID_stock}
            className="bg-white w-[90%] rounded-[10px] border-[2px] C-border-red mb-2 overflow-hidden transition-all duration-300"
          >
            <div className="flex h-[5vh]">
              <div className="flex items-center justify-center h-full gap-3 border-r-black border-r-[1px] w-[10%]">
                <img
                  src={
                    stock.product.Image || "/images/elements/default-product.jpg"
                  }
                  alt={stock.product?.Label}
                  className="w-auto h-full rounded-[10px] object-cover"
                />
              </div>
              <div className="flex justify-between items-center w-[85%] h-full py-3 px-2 pr-4">
                <div className="w-[30%]">
                  <p className="C-text-black font-semibold text-xl">
                    {stock.product?.Label}
                  </p>
                  <p className="C-text-black font-normal text-sm">
                    {stock.product?.Barcode}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-lg justify-between w-[70%]">
                  {/* Box_quantity (non modifiable) */}
                  <div className="flex items-center gap-1">
                    <i className="fa-solid fa-boxes-stacked C-text-red text-2xl" aria-hidden="true"></i>
                    <p className="C-text-black font-bold ">
                      {stock.product.Box_quantity}
                    </p>
                  </div>

                  {/* Nmb_on_shelves */}
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-cash-register text-2xl C-text-red" aria-hidden="true"></i>
                    {stock.product.Packing === 0 ? (
                      isEditing ? (
                        <input
                          type="number"
                          value={stock.Nmb_on_shelves}
                          onChange={(e) =>
                            handleChange(
                              stock.ID_stock,
                              "Nmb_on_shelves",
                              e.target.value
                            )
                          }
                          className="w-[50px] text-center border border-gray-300 rounded C-text-black font-bold"
                        />
                      ) : (
                        <span className="C-text-black font-bold">
                          {stock.Nmb_on_shelves}
                        </span>
                      )
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </div>

                  {/* Nmb_boxes */}
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-box-open text-2xl C-text-red" aria-hidden="true"></i>
                    {isEditing ? (
                      <input
                        type="number"
                        value={stock.Nmb_boxes}
                        onChange={(e) =>
                          handleChange(
                            stock.ID_stock,
                            "Nmb_boxes",
                            e.target.value
                          )
                        }
                        className="w-[50px] text-center border border-gray-300 rounded C-text-black font-bold"
                      />
                    ) : (
                      <span className="C-text-black font-bold">
                        {stock.Nmb_boxes}
                        {stock.product.Packing === 0 &&
                          stock.Nmb_boxes * stock.product.Box_quantity !==
                            stock.Quantity && <span className="ml-1">(1)</span>}
                      </span>
                    )}
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-1">
                    <i className="fa-solid fa-dolly C-text-red text-2xl" aria-hidden="true"></i>
                    {isEditing ? (
                      <input
                        type="number"
                        value={stock.Quantity}
                        onChange={(e) =>
                          handleChange(
                            stock.ID_stock,
                            "Quantity",
                            e.target.value
                          )
                        }
                        className="w-[50px] text-center border border-gray-300 rounded C-text-black font-bold"
                      />
                    ) : (
                      <p className="C-C-text-black font-bold">
                        {stock.Quantity}
                      </p>
                    )}
                  </div>

                  {/* Packing (readonly) */}
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-box text-2xl C-text-red" aria-hidden="true"></i>
                    <input
                      type="checkbox"
                      className="w-5 h-5"
                      disabled
                      checked={stock.product.Packing === 1}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
