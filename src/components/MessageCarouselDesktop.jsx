"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getMessages } from "@/services/message"; // Service pour récupérer les messages

export default function MessageCarouselDesktop({ storeId }) {
  const [messages, setMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const messagesPerSlide = 3; // Nombre de messages affichés par slide

  useEffect(() => {
    const fetchMessages = async () => {
      if (storeId) {
        const data = await getMessages(storeId);
        setMessages(data);
      }
    };
    fetchMessages();
  }, [storeId]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + messagesPerSlide) % messages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - messagesPerSlide < 0
        ? messages.length - messagesPerSlide
        : prev - messagesPerSlide
    );
  };

  return (
    <div className="relative w-full flex justify-center items-center mt-5">
      {/* 🔥 Flèche gauche */}
      <button
        onClick={prevSlide}
        className="absolute left-0 z-10 bg-red-600 text-white p-3 rounded-full shadow-md hover:bg-red-700 transition"
      >
        ❮
      </button>

      {/* 🔥 Zone des messages */}
      <div className="overflow-hidden w-[80%]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="flex gap-5"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            {messages.slice(currentIndex, currentIndex + messagesPerSlide).map((message, index) => (
              <div
                key={index}
                className="bg-red-600 text-white p-5 rounded-[20px] shadow-md w-[30%]"
              >
                <p className="text-lg">{message.Message}</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 🔥 Flèche droite */}
      <button
        onClick={nextSlide}
        className="absolute right-0 z-10 bg-red-600 text-white p-3 rounded-full shadow-md hover:bg-red-700 transition"
      >
        ❯
      </button>
    </div>
  );
}
