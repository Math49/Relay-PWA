"use client";
import React, { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";
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
          <BackButton path="/configuration" />
        </div>
        <div className="flex flex-col items-start justify-start w-[100%]">
          
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
              
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
