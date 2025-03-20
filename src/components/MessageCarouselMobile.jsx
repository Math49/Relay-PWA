"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getMessages } from "@/services/message";

export default function MessageCarouselMobile({ storeId }) {
  const [messages, setMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await getMessages(storeId);
      setMessages(data);
    };
    fetchMessages();
  }, [storeId]);

  const nextMessage = () => {
    setCurrentIndex((prev) => (prev + 1) % messages.length);
  };

  const prevMessage = () => {
    setCurrentIndex((prev) => (prev - 1 + messages.length) % messages.length);
  };

  return (
      <div className="relative flex flex-col items-center w-[90vw] max-w-lg mx-auto p-4 C-bg-red rounded-[20px]">
        <div className="absolute rounded-[30px] C-bg-red-var2 w-[85vw] h-[10vh] bottom-[-1vh] z-[-1]"></div>
      <div className="text-white w-full rounded-3xl p-6 relative flex items-start">
        <AnimatePresence mode="wait">
          {messages.length > 0 && (
            <motion.p
              key={messages[currentIndex].ID_message}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="text-lg text-center text-wrap w-full break-words"
            >
              {messages[currentIndex].Message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      {/* Indicateurs */}
      <div className="flex justify-center relative w-full h-[1px] mt-6 space-x-2">
        <div className="flex justify-center absolute bottom-[2vh] left-[5vw] mt-4 space-x-2">
            {messages.map((_, index) => (
            <span
                key={index}
                className={`h-3 w-3 rounded-full border-white border-[2px] ${
                index === currentIndex ? "bg-white" : "C-bg-red"
                } transition-all duration-300`}
            ></span>
            ))}
        </div>
      </div>
      {/* Boutons de navigation */}
      <button
        className="absolute right-[15vw] bottom-0 transform -translate-y-1/2 text-white text-3xl"
        onClick={prevMessage}
      >
        <i className="fa-solid fa-chevron-left" aria-hidden="true"></i>
      </button>
      <button
        className="absolute right-[5vw] bottom-0 transform -translate-y-1/2 text-white text-3xl"
        onClick={nextMessage}
      >
                <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>

      </button>
    </div>
  );
}
