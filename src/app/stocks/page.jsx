"use client";
import BackButton from "@/components/BackButton";
import React, { useState } from "react";
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

    return (
        <div className="flex flex-col gap-[5vh] items-center justify-center relative z-10 text-white w-[100%] p-5">
            <div className="w-[100%]">
                <BackButton path="/" />
            </div>
        </div>
    )
}