"use client";
import React, { useState } from "react";

export default function StockCreateListMobile({ stocks, setStocks }) {
  const [expanded, setExpanded] = useState(null);

  const toggle = (id) => setExpanded((prev) => (prev === id ? null : id));

  const handleChange = (id, field, value) => {};

  const [checkedStates, setCheckedStates] = useState(
    Array(stocks.length).fill(false)
  );

  const toggleCheckbox = (index) => {
    const updated = [...checkedStates];
    updated[index] = !updated[index];
    setCheckedStates(updated);
  };
  if (!stocks || stocks.length === 0) {
    return <p className="text-white text-center">Aucun produit trouvé.</p>;
  }

  return (
    <div className="w-full flex flex-col items-center mt-2">
      {stocks.map((stock, index) => (
        <div
          key={stock.ID_stock}
          className="bg-white w-[90%] rounded-[10px] border-[2px] C-border-red mb-2 overflow-hidden transition-all duration-300"
        >
          <div
            className="flex cursor-pointer h-[6vh]"
            onClick={() => toggle(stock.ID_stock)}
          >
            <div className="flex items-center justify-center h-full gap-3 border-r-black border-r-[1px] w-[15%]">
              <img
                src={
                  !stock.product.Image || "/images/elements/default-product.jpg"
                }
                alt={stock.product?.Label}
                className="w-auto h-full rounded-[10px] object-cover"
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
              <div className="flex flex-col items-center gap-3 text-lg justify-between w-[50%]">
                <div className="flex items-center gap-1 w-full justify-between">
                  {stock.product.Packing === 0 ? (
                    <div className="flex items-center gap-2">
                      <i
                        className="fa-solid fa-cash-register text-2xl C-text-red"
                        aria-hidden="true"
                      ></i>
                      <span className="C-text-black font-bold">
                        {stock.Nmb_on_shelves}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <i
                        className="fa-solid fa-box-open text-2xl C-text-red"
                        aria-hidden="true"
                      ></i>
                      <input
                        type="checkbox"
                        className="w-5 h-5"
                        disabled
                        checked={stock.product.Packing === 1}
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between gap-1">
                    <i
                      className="fa-solid fa-boxes-stacked C-text-red text-2xl"
                      aria-hidden="true"
                    ></i>
                    <p className="C-text-black font-bold ">
                      {stock.product.Box_quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 w-full justify-between">
                  <div className="flex items-center gap-2">
                    <i
                      className="fa-solid fa-box text-2xl C-text-red"
                      aria-hidden="true"
                    ></i>
                    <span className="C-text-black font-bold">
                      {stock.Nmb_boxes}
                      {stock.product.Packing === 0 &&
                        stock.Nmb_boxes * stock.product.Box_quantity !==
                          stock.Quantity && <span className="ml-1">(1)</span>}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <i
                      className="fa-solid fa-dolly text-2xl C-text-red"
                      aria-hidden="true"
                    ></i>
                    <span className="C-text-black font-bold">
                      {stock.Quantity}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden C-border-red-var2 border-t-[1px] ${
              expanded === stock.ID_stock
                ? "max-h-[200px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex justify-around items-center px-2 py-3 border-t C-border-light">
              <div className="flex items-center justify-center gap-4">
                <i
                  className="fa-solid fa-box text-2xl C-text-red"
                  aria-hidden="true"
                ></i>
                <div className="flex items-center gap-2">
                  <button className="C-bg-red w-[8vw] h-[8vw] text-white px-2 py-1 rounded-xl">
                    -1
                  </button>
                  <input
                    type="number"
                    className="text-center text-xl font-bold C-text-black border w-[10vw] h-[10vw] C-border-red rounded-xl"
                    min={0}
                    defaultValue={0}
                  />
                  <button className="C-bg-red w-[8vw] h-[8vw] text-white px-2 py-1 rounded-xl">
                    +1
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <i
                    className="fa-solid fa-dolly text-2xl C-text-red"
                    aria-hidden="true"
                  ></i>
                  {stock.product.Packing === 0 ? (
                    <>
                      <button className="C-bg-red w-[8vw] h-[8vw] text-white px-2 py-1 rounded-xl">
                        -1
                      </button>
                      <input
                        type="number"
                        className="text-center text-xl font-bold C-text-black border w-[10vw] h-[10vw] C-border-red rounded-xl"
                        min={0}
                        defaultValue={0}
                      />
                      <button className="C-bg-red w-[8vw] h-[8vw] text-white px-2 py-1 rounded-xl">
                        +1
                      </button>
                    </>
                  ) : (
                    <label className="relative inline-flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checkedStates[index]}
                        onChange={() => toggleCheckbox(index)}
                        className="sr-only"
                      />
                      <div
                        className={`w-[8vw] h-[8vw] rounded-xl border-2 flex items-center justify-center transition-all duration-200 ${
                          checkedStates[index]
                            ? "C-bg-red C-border-red"
                            : "C-border-red"
                        }`}
                      >
                        {checkedStates[index] && (
                          <div className="w-3 h-3 rounded-full bg-white"></div>
                        )}
                      </div>
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
