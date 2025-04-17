"use client";
import React, { useState, useEffect } from "react";

export default function StockCreateListDesktop({ stocks, list, setList }) {
  const [checkedStates, setCheckedStates] = useState(
    Array(stocks.length).fill(false)
  );

  const toggleCheckbox = (index, stock) => {
    const updated = [...checkedStates];
    updated[index] = !updated[index];
    setCheckedStates(updated);

    // Si coché et pas assez pour une box complète → +1 item
    if (updated[index]) {
      const id = stock.ID_product;
      const current = list[id]?.items || 0;
      const toAdd = 1;
      setList((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          items: current + toAdd,
        },
      }));
    }
  };

  const updateQuantity = (id, type, amount) => {
    setList((prev) => {
      const current = prev[id] || { boxes: 0, items: 0 };
      let { boxes, items } = current;

      if (type === "boxes") {
        boxes = Math.max(0, boxes + amount);
        items = boxes * getBoxQty(id);
      } else {
        items = Math.max(0, items + amount);
        boxes = Math.floor(items / getBoxQty(id));
      }

      return {
        ...prev,
        [id]: { boxes, items },
      };
    });
  };

  const getBoxQty = (id) =>
    stocks.find((s) => s.ID_product === id)?.product.Box_quantity || 1;

  if (!stocks || stocks.length === 0) {
    return <p className="text-white text-center">Aucun produit trouvé.</p>;
  }

  return (
    <div className="w-full flex flex-col items-center mt-2">
      <div className="w-[90%] flex flex-col items-center gap-2">
        {stocks.map((stock, index) => {
          const id = stock.ID_product;
          const boxQty = getBoxQty(id);
          const boxCount = list[id]?.boxes || 0;
          const itemCount = list[id]?.items || 0;

          return (
            <div
              key={id}
              className="bg-white w-[90%] flex rounded-[10px] border-[2px] C-border-red mb-2 overflow-hidden transition-all duration-300"
            >
              <div className="w-[80%] flex gap-4">
                <div className="flex items-center h-full w-[50%]">
                  <div className="flex items-center justify-center h-full gap-3 border-black border-r-[1px] w-[30%]">
                    <img
                      src={
                        stock.product.Image ||
                        "/images/elements/default-product.jpg"
                      }
                      alt={stock.product?.Label}
                      className="w-full h-auto rounded-[10px] object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between items-start w-[85%] h-[70%] py-3 px-2 pr-4">
                    <p className="C-text-black font-semibold text-xl">
                      {stock.product?.Label}
                    </p>
                    <p className="C-text-black font-normal text-sm">
                      {stock.product?.Barcode}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 pl-5 text-lg justify-between w-[50%] p-4">
                  <div className="flex items-center gap-1 w-full justify-between">
                    {stock.product.Packing === 0 ? (
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-cash-register text-2xl C-text-red" />
                        <span className="C-text-black font-bold">
                          {stock.Nmb_on_shelves}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-box-open text-2xl C-text-red" />
                        <input
                          type="checkbox"
                          className="w-5 h-5"
                          disabled
                          checked={stock.product.Packing === 1}
                        />
                      </div>
                    )}
                    <div className="flex items-center justify-between gap-1">
                      <i className="fa-solid fa-boxes-stacked C-text-red text-2xl" />
                      <p className="C-text-black font-bold">
                        {boxQty}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-box text-2xl C-text-red" />
                      <span className="C-text-black font-bold">{stock.Nmb_boxes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <i className="fa-solid fa-dolly text-2xl C-text-red" />
                      <span className="C-text-black font-bold">
                        {stock.Quantity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="C-border-red-var2 border-l-[1px] p-4 w-[20%] min-w-max h-full">
                <div className="flex flex-col items-center justify-center gap-4">
                  {/* Boxes */}
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-box text-2xl C-text-red" />
                    <button
                      className="C-bg-red w-[4vh] h-[4vh] text-white rounded-xl"
                      onClick={() => updateQuantity(id, "boxes", -1)}
                    >
                      -1
                    </button>
                    <input
                      name="QuantityBoxes"
                      type="number"
                      className="text-center text-xl font-bold C-text-black border w-[5vh] h-[5vh] C-border-red rounded-xl"
                      value={boxCount}
                      onChange={(e) =>
                        updateQuantity(id, "boxes", e.target.value - boxCount)
                      }
                    />
                    <button
                      className="C-bg-red w-[4vh] h-[4vh] text-white rounded-xl"
                      onClick={() => updateQuantity(id, "boxes", 1)}
                    >
                      +1
                    </button>
                  </div>

                  {/* Items */}
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-dolly text-2xl C-text-red" />
                    {stock.product.Packing === 0 ? (
                      <>
                        <button
                          className="C-bg-red w-[4vh] h-[4vh] text-white rounded-xl"
                          onClick={() => updateQuantity(id, "items", -1)}
                        >
                          -1
                        </button>
                        <input
                          name="QuantityItems"
                          type="number"
                          onChange={(e) =>
                            updateQuantity(id, "items", e.target.value - itemCount)
                          }
                          className="text-center text-xl font-bold C-text-black border w-[5vh] h-[5vh] C-border-red rounded-xl"
                          value={itemCount}
                        />
                        <button
                          className="C-bg-red w-[4vh] h-[4vh] text-white rounded-xl"
                          onClick={() => updateQuantity(id, "items", 1)}
                        >
                          +1
                        </button>
                      </>
                    ) : (
                      <label className="relative inline-flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={checkedStates[index]}
                          onChange={() => toggleCheckbox(index, stock)}
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
          );
        })}
      </div>
    </div>
  );
}
