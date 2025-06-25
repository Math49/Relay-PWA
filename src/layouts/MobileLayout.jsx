"use client";
import NavMenu from "@/components/elements/NavMenu";
import { useAuth } from "@/context/AuthProvider";
import "@/styles/globals.css";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Modal, ModalContent } from "@heroui/react";
import { getStore } from "@/services/store";
import { usePathname } from "next/navigation";

export default function MobileLayout({ children, title }) {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [city, setCity] = useState("");
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const pathname = usePathname();

  useEffect(() => {
    const fetchStore = async () => {
      if (user && user.ID_store) {
        const storeData = await getStore(user.ID_store);
        setCity(storeData.Address);
      }
    };

    fetchStore();
  
  }, [user]);

  useEffect(() => {
    closeModal();
  }, [pathname]);

  return (
    <div className="flex flex-col items-center C-bg-red w-full min-h-screen">
      <div className="flex items-end justify-between w-full h-[10vh] pb-[2vh] relative z-20 px-[5vw]">
        <button onClick={openModal} className="cursor-pointer">
          <img src="/images/elements/Nav menu.svg" className="w-auto h-[5vh]" />
        </button>

        <h1 className="C-text-white text-4xl font-extrabold">{title}</h1>
        <div className="w-[10vw]"></div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <Modal
            isOpen={isOpen}
            onClose={closeModal}
            hideCloseButton={true}
            backdrop="opaque"
            classNames={{
              wrapper: "bg-black/50",
            }}
          >
            <ModalContent
              as={motion.div}
              className="bg-white fixed rounded-r-[40px] top-0 left-0 w-[70%] h-full shadow-lg pt-[5vh] overflow-hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <NavMenu/>
              <div className=" flex items-center justify-center gap-5 px-[5vw] C-bg-red h-[10vh]">
                <img src="/images/elements/logo-relay.svg" />
                <p className="C-text-white font-bold text-2xl">Relay {city}</p>
              </div>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>

      <div className="flex flex-col w-full flex-1 C-bg-white rounded-t-[40px]">
        {children}
      </div>
    </div>
  );
}
