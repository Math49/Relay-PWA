"use client";
import NavMenu from "@/components/NavMenu";
import { useAuth } from "@/context/AuthProvider";
import "@/styles/globals.css";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Modal,
  ModalContent,
} from "@heroui/react"; // ✅ Vérification des bons imports

export default function MobileLayout({ children, title }) {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="flex flex-col items-center justify-center C-bg-red w-[100vw] h-[100vh] overflow-hidden">
      <img
        src="/images/elements/cercle.svg"
        className="absolute top-0 left-0 z-10 w-auto h-[15vh]"
      />
      <div className="flex items-end justify-between w-[100vw] h-[10%] pb-[2vh] relative z-20 px-[5vw]">
        {/* ✅ Bouton d'ouverture */}
        <button onClick={openModal}>
          <img src="/images/elements/Nav menu.svg" className="w-auto h-[5vh]" />
        </button>

        {/* ✅ Modal avec fermeture en cliquant en dehors */}
        <Modal isOpen={isOpen} onClose={closeModal} hideCloseButton={true} backdrop="opaque">
          <ModalContent
            as={motion.div} // ✅ Utilisation correcte de Framer Motion
            className="bg-white fixed top-0 left-0 w-[70%] h-full shadow-lg"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* ✅ Contenu du menu burger */}
            <nav className="p-4">
              <ul>
                <li><a href="#" className="block py-2 text-lg">Accueil</a></li>
                <li><a href="#" className="block py-2 text-lg">Profil</a></li>
                <li><a href="#" className="block py-2 text-lg">Paramètres</a></li>
                <li><a href="#" className="block py-2 text-lg">Déconnexion</a></li>
              </ul>
            </nav>
          </ModalContent>
        </Modal>

        <h1 className="C-text-white text-4xl font-extrabold">{title}</h1>
        <div className="w-[10vw]"></div>
      </div>

      <div className="flex flex-col items-center justify-center w-[100vw] h-[90%] C-bg-white rounded-t-[40px] relative z-20">
        {children}
      </div>
    </div>
  );
}
