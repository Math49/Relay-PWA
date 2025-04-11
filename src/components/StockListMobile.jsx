"use client";
import React, { useState } from "react";

export default function StockListMobile({ stocks, isEditing, setStocks }) {
  const [expanded, setExpanded] = useState(null);

  const toggle = (id) => setExpanded((prev) => (prev === id ? null : id));

  const handleChange = (id, field, value) => {
    setStocks((prevStocks) =>
      prevStocks.map((stock) =>
        stock.ID_stock === id ? { ...stock, [field]: parseInt(value) } : stock
      )
    );
  };

  if (!stocks || stocks.length === 0) {
    return <p className="text-white text-center">Aucun produit trouvé.</p>;
  }

  return (
    <div className="w-full flex flex-col items-center mt-2">
      {stocks.map((stock) => (
        <div
          key={stock.ID_stock}
          className="bg-white w-[90%] rounded-[10px] border-[2px] C-border-red mb-2 overflow-hidden transition-all duration-300"
        >
          <div
            className="flex cursor-pointer h-[5vh]"
            onClick={() => toggle(stock.ID_stock)}
          >
            <div className="flex items-center justify-center h-full gap-3 border-r-black border-r-[1px] w-[15%]">
              <img
                src={
                  stock.product.Image || "/images/elements/default-product.jpg"
                }
                alt={stock.product?.Label}
                className="w-auto h-full rounded-[5px] object-cover"
              />
            </div>
            <div className="flex justify-between items-center w-[85%] h-full py-3 px-2 pr-4">
              <div className="w-[60%]">
                <p className="C-text-black font-semibold text-xl">
                  {stock.product?.Label}
                </p>
                <p className="C-text-black font-normal text-sm">
                  {stock.product?.Barcode}
                </p>
              </div>
              <div className="flex items-center gap-3 text-lg justify-between w-[40%]">
                <div className="flex items-center gap-1">
                  <i className="fa-solid fa-boxes-stacked C-text-red text-2xl" aria-hidden="true"></i>
                  <p className="C-text-black font-bold ">
                    {stock.product.Box_quantity}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                <i className="fa-solid fa-dolly text-2xl C-text-red" aria-hidden="true"></i>
                {isEditing ? (
                  <input
                    type="number"
                    value={stock.Quantity}
                    onChange={(e) => handleChange(stock.ID_stock, "Quantity", e.target.value)}
                    className="w-[50px] text-center border border-gray-300 rounded C-text-black font-bold"
                  />
                ) : (
                  <span className="C-text-black font-bold">{stock.Quantity}</span>
                )}
              </div>
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden C-border-red-var2 border-t-[1px] ${
              expanded === stock.ID_stock ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex justify-around items-center px-6 py-3 border-t C-border-light">
              {stock.product.Packing === 0 && (
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-cash-register text-2xl C-text-red" aria-hidden="true"></i>
                  {isEditing ? (
                    <input
                      type="number"
                      value={stock.Nmb_on_shelves}
                      onChange={(e) => handleChange(stock.ID_stock, "Nmb_on_shelves", e.target.value)}
                      className="w-[50px] text-center border border-gray-300 rounded C-text-black font-bold"
                    />
                  ) : (
                    <span className="C-text-black font-bold">
                      {stock.Nmb_on_shelves}
                    </span>
                  )}
                </div>
              )}
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-box text-2xl C-text-red" aria-hidden="true"></i>
                {isEditing ? (
                  <input
                    type="number"
                    value={stock.Nmb_boxes}
                    onChange={(e) => handleChange(stock.ID_stock, "Nmb_boxes", e.target.value)}
                    className="w-[50px] text-center border border-gray-300 rounded C-text-black font-bold"
                  />
                ) : (
                  <span className="C-text-black font-bold">
                    {stock.Nmb_boxes}
                    {stock.product.Packing === 0 &&
                      stock.Nmb_boxes * stock.product.Box_quantity !== stock.Quantity && (
                        <span className="ml-1">(1)</span>
                      )}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-box-open text-2xl C-text-red" aria-hidden="true"></i>
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
      ))}
    </div>
  );
}
