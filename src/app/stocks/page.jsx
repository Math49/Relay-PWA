"use client";
import BackButton from "@/components/BackButton";
import React, { useState, useEffect } from "react";
import { getStocks } from "@/services/stock";
import { getCategories } from "@/services/category";
import { useAuth } from "@/context/AuthProvider";

export default function HomePage() {

    const [stocks, setStocks] = useState([]);
    const [categories, setCategories] = useState([]);

    const { user } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
          if (user && user.ID_store) {
            
            const stocksData = await getStocks(user.ID_store);
            const categoriesData = await getCategories();
    
            setStocks(stocksData);
            setCategories(categoriesData);
          }
        };
    
        fetchData();
      }, [user]);

    
    const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9C27B0"];

    return (
        <div className="flex flex-col gap-[5vh] items-center justify-center relative z-10 text-white w-[100%] p-5">
            <div className="w-[100%]">
                <BackButton path="/" />
            </div>
            <div className="flex items-center justify-start gap-5 w-[100%] p-4 overflow-x-scroll">
                {categories.map((category, index) => (
                    <div
                    key={index}
                    className="p-4 rounded-[20px] shadow-md bg-white flex flex-col cursor-pointer gap-5 items-center justify-center border-t-[5px]"
                    style={{ borderColor: colors[index % colors.length] }}
                  >
                    <p className="text-xl font-bold C-text-black">
                      {category.Label}
                    </p>
                  </div>
                ))}
            </div>
        </div>
    )
}