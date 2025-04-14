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
    <div className="relative w-[90%] flex justify-center items-center mt-5">
      {/* 🔥 Flèche gauche */}
      <button
        onClick={prevSlide}
        className="absolute cursor-pointer left-0 z-10 C-bg-red text-white w-[40px] h-[40px] p-3 rounded-full flex justify-center items-center shadow-md transition"
      >
        <i className="fa-solid fa-chevron-left text-2xl" aria-hidden="true"></i>
      </button>

      {/* 🔥 Zone des messages */}
      <div className="overflow-hidden py-5 w-[80%]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="flex gap-5"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            {messages
              .slice(currentIndex, currentIndex + messagesPerSlide)
              .map((message, index) => (
                <div
                  key={index}
                  className="C-bg-red text-white flex flex-col items-center p-5 rounded-[20px] w-[30%] relative"
                >
                  <div className="absolute rounded-[30px] C-bg-red-var2 w-[90%] h-[5vh] bottom-[-1vh] z-[-1]"></div>

                  <p className="text-lg">{message.Message}</p>
                </div>
              ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 🔥 Flèche droite */}
      <button
        onClick={nextSlide}
        className="absolute cursor-pointer right-0 z-10 C-bg-red text-white w-[40px] h-[40px] p-3 rounded-full flex justify-center items-center shadow-md transition"
      >
        <i className="fa-solid fa-chevron-right text-2xl" aria-hidden="true"></i>
      </button>
    </div>
  );
}
