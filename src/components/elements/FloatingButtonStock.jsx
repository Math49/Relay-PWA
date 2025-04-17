"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingButtonStock({ onAdd, onEdit, isEditing }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  const onAddHandeler = () => {
    setIsOpen(false);
    onAdd();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {/* Menu contextuel animé */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-3 mb-2"
          >
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onEdit}
              className="w-12 h-12 rounded-full C-bg-red C-text-white flex items-center justify-center shadow-lg"
            >
              <i className={`fas ${isEditing ? "fa-check" : "fa-pen"}`} aria-hidden="true"/>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onAddHandeler}
              className="w-12 h-12 rounded-full C-bg-red C-text-white flex items-center justify-center shadow-lg"
            >
              <i className="fas fa-plus" aria-hidden="true"/>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouton principal avec rotation */}
      <motion.button
        onClick={toggleMenu}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 135 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="w-16 h-16 rounded-full C-bg-red C-text-white text-3xl flex items-center justify-center shadow-xl"
      >
        <i className="fas fa-plus" aria-hidden="true"/>
      </motion.button>
    </div>
  );
}
