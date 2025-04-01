"use client";
import React from "react";

export default function StockCreateListDesktop({ stocks, setStocks }) {
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
      <div className="w-[90%] flex flex-col items-center gap-2">
        {stocks.map((stock) => (
          <div
            key={stock.ID_stock}
            className="bg-white w-[90%] flex rounded-[10px] border-[2px] C-border-red mb-2 overflow-hidden transition-all duration-300"
          >
            <div className="w-[80%] flex flex-col gap-4">
              <div className="flex h-[5vh]">
                <div className="flex items-center justify-center h-full gap-3 border-black border-r-[1px] border-b-[1px] w-[10%]">
                  <img
                    src={
                      stock.product.Image ||
                      "/images/elements/default-product.jpg"
                    }
                    alt={stock.product?.Label}
                    className="w-auto h-full rounded-[10px] object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between items-start w-[85%] h-full py-3 px-2 pr-4">
                  <div className="w-[30%]">
                    <p className="C-text-black font-semibold text-xl">
                      {stock.product?.Label}
                    </p>
                    <p className="C-text-black font-normal text-sm">
                      {stock.product?.Barcode}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 pl-5 text-lg justify-between w-[50%]">
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
            <div className="C-border-red-var2 border-l-[1px] w-[20%] h-full">
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  <i
                    className="fa-solid fa-box text-2xl C-text-red"
                    aria-hidden="true"
                  ></i>
                  <button className="C-bg-red w-[3vh] h-[3vh] text-white px-2 py-1 rounded-xl">
                    -1
                  </button>
                  <input
                    type="number"
                    className="text-center text-xl font-bold C-text-black border w-[4vh] h-[4vh] C-border-red rounded-xl"
                    min={0}
                    defaultValue={0}
                  />
                  <button className="C-bg-red w-[3vh] h-[3vh] text-white px-2 py-1 rounded-xl">
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
                      <button className="C-bg-red w-[3vh] h-[3vh] text-white px-2 py-1 rounded-xl">
                        -1
                      </button>
                      <input
                        type="number"
                        className="text-center text-xl font-bold C-text-black border w-[4vh] h-[4vh] C-border-red rounded-xl"
                        min={0}
                        defaultValue={0}
                      />
                      <button className="C-bg-red w-[3vh] h-[3vh] text-white px-2 py-1 rounded-xl">
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
                        className={`w-[4vh] h-[4vh] rounded-xl border-2 flex items-center justify-center transition-all duration-200 ${
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
        ))}
      </div>
    </div>
  );
}
