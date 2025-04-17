"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BackButton from "@/components/elements/BackButton";
import CreateProductModal from "@/components/modals/CreateProductModal";
import { motion, AnimatePresence } from "framer-motion";
import { Modal, ModalContent } from "@heroui/react";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <div className="flex flex-col gap-[5vh] items-center justify-center relative z-10 text-white w-[100%] p-5">
        <div className="w-[100%]">
          <BackButton path="/" />
        </div>
        <div className="flex flex-col items-start justify-start w-[100%]">
          <h2 className="C-text-black font-bold text-2xl mb-6">Navigation</h2>
          <div className="flex flex-col gap-5 items-start justify-start sm:items-center w-[100%]">
            <div
              onClick={() => openModal(true)}
              className="flex items-center cursor-pointer justify-around w-[100%] sm:w-[50%] h-[12vh] C-bg-red-var2 rounded-[20px] p-4 overflow-hidden relative"
            >
              <i
                className="fa-solid fa-boxes-stacked C-text-red-var1 text-5xl"
                aria-hidden="true"
              ></i>
              <p className="C-text-black font-bold text-2xl">
                Création produits
              </p>
              <div className="flex items-end h-[100%] relative z-20">
                <i
                  className="fa-solid fa-arrow-right-long C-text-black text-3xl"
                  aria-hidden="true"
                ></i>
              </div>
              <img
                src="/images/elements/barcode_var2.svg"
                className="absolute w-[25vw] right-[20vw] sm:w-[8vw] bottom-0 z-10"
              />
            </div>
            <Link
              href="/configuration/categories"
              className="flex items-center justify-around w-[100%] sm:w-[50%] h-[12vh] C-bg-red-var2 rounded-[20px] p-4 overflow-hidden relative"
            >
              <i
                className="fa-solid fa-clipboard-list C-text-red-var1 text-5xl"
                aria-hidden="true"
              ></i>
              <p className="C-text-black font-bold text-2xl">Catégories</p>
              <div className="flex items-end h-[100%] relative z-20">
                <i
                  className="fa-solid fa-arrow-right-long C-text-black text-3xl"
                  aria-hidden="true"
                ></i>
              </div>
              <img
                src="/images/elements/vague_var2.svg"
                className="absolute w-[15vw] sm:w-[5vw] right-0 top-0 z-10"
              />
            </Link>
            <Link
              href="/configuration/messages"
              className="flex items-center justify-around w-[100%] sm:w-[50%] h-[12vh] C-bg-red-var2 rounded-[20px] p-4 overflow-hidden relative"
            >
              <i
                className="fa-solid fa-message C-text-red-var1 text-5xl"
                aria-hidden="true"
              ></i>
              <p className="C-text-black font-bold text-2xl">Messages</p>
              <div className="flex items-end h-[100%] relative z-20">
                <i
                  className="fa-solid fa-arrow-right-long C-text-black text-3xl"
                  aria-hidden="true"
                ></i>
              </div>
              <img
                src="/images/elements/cercle_var2.svg"
                className="absolute right-0 bottom-0 z-10"
              />
            </Link>
          </div>
        </div>
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
              className="bg-white fixed rounded-t-[40px] bottom-0 left-0 sm:right-0 sm:left-auto min-w-min h-[70vh] sm:h-[100vh] pt-[2vh]"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <CreateProductModal closeModal={closeModal} />
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
