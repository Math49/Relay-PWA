"use client";
import React, { useState, useEffect } from "react";

export default function StockCreateListMobile({ stocks, list, setList }) {
  const [expanded, setExpanded] = useState(null);
  const toggle = (id) => setExpanded((prev) => (prev === id ? null : id));

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
    <div className="w-full flex flex-col justify-start items-center mt-2">
      {stocks.map((stock, index) => {
        const id = stock.ID_product;
        const boxQty = getBoxQty(id);
        const boxCount = list[id]?.boxes || 0;
        const itemCount = list[id]?.items || 0;

        return (
          <div
            key={stock.ID_stock}
            className="bg-white w-[90%] rounded-[10px] border-[2px] C-border-red mb-2 overflow-hidden transition-all duration-300"
          >
            <div
              className="flex cursor-pointer h-[8vh] min-h-max"
              onClick={() => {
                toggle(stock.ID_stock);
              }}
            >
              <div className="flex items-center justify-center h-full gap-3 w-[15%]">
                <img
                  src={
                    stock.product.Image || "/images/elements/default-product.jpg"
                  }
                  alt={stock.product?.Label}
                  className="w-auto h-auto rounded-[10px] object-cover"
                />
              </div>
              <div className="flex justify-between border-black border-l-[1px] items-center w-[85%] h-full py-3 px-2 pr-4">
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
                        <i className="fa-solid fa-cash-register text-2xl C-text-red"></i>
                        <span className="C-text-black font-bold">
                          {stock.Nmb_on_shelves}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-box-open text-2xl C-text-red"></i>
                        <input
                          type="checkbox"
                          className="w-5 h-5"
                          disabled
                          checked={stock.product.Packing === 1}
                        />
                      </div>
                    )}
                    <div className="flex items-center justify-between gap-1">
                      <i className="fa-solid fa-boxes-stacked C-text-red text-2xl"></i>
                      <p className="C-text-black font-bold ">
                        {boxQty}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 w-full justify-between">
                    <div className="flex items-center gap-2">
                      <i className="fa-solid fa-box text-2xl C-text-red"></i>
                      <span className="C-text-black font-bold">
                        {stock.Nmb_boxes}
                        {stock.product.Packing === 0 &&
                          stock.Nmb_boxes * stock.product.Box_quantity !==
                            stock.Quantity && <span className="ml-1">(1)</span>}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <i className="fa-solid fa-dolly text-2xl C-text-red"></i>
                      <span className="C-text-black font-bold">
                        {stock.Quantity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Zone étendue */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden C-border-red-var2 border-t-[1px] ${
                expanded === stock.ID_stock
                  ? "max-h-[200px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="flex justify-around items-center px-2 py-3 border-t C-border-light">
                <div className="flex items-center justify-center gap-4">
                  {/* Boîtes */}
                  <i className="fa-solid fa-box text-2xl C-text-red"></i>
                  <div className="flex items-center gap-2">
                    <button
                        onClick={() => updateQuantity(id, "boxes", -1)}
                      className="C-bg-red w-[8vw] h-[8vw] text-white px-2 py-1 rounded-xl"
                    >
                      -1
                    </button>
                    <input
                      type="number"
                      className="text-center text-xl font-bold C-text-black border w-[10vw] h-[10vw] C-border-red rounded-xl"
                      value={boxCount}
                      onChange={(e) =>
                        updateQuantity(id, "boxes", e.target.value - boxCount)
                      }
                    />
                    <button
                      onClick={() => updateQuantity(id, "boxes", 1)}
                      className="C-bg-red w-[8vw] h-[8vw] text-white px-2 py-1 rounded-xl"
                    >
                      +1
                    </button>
                  </div>

                  {/* Articles */}
                  <i className="fa-solid fa-dolly text-2xl C-text-red"></i>
                  {stock.product.Packing === 0 ? (
                    <>
                      <button
                        onClick={() => updateQuantity(id, "items", -1)}
                        className="C-bg-red w-[8vw] h-[8vw] text-white px-2 py-1 rounded-xl"
                      >
                        -1
                      </button>
                      <input
                        type="number"
                        className="text-center text-xl font-bold C-text-black border w-[10vw] h-[10vw] C-border-red rounded-xl"
                        value={itemCount}
                        onChange={(e) =>
                          updateQuantity(id, "items", e.target.value - itemCount)
                        }
                      />
                      <button
                        onClick={() => updateQuantity(id, "items", 1)}
                        className="C-bg-red w-[8vw] h-[8vw] text-white px-2 py-1 rounded-xl"
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
        );
      })}
    </div>
  );
}
