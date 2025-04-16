"use client";
import React, { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import { motion, AnimatePresence } from "framer-motion";
import { Modal, ModalContent } from "@heroui/react";
import { useAuth } from "@/context/AuthProvider";
import { getMessages, createMessage, deleteMessage } from "@/services/message";

export default function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [messages, setMessages] = useState([]);

  const toggle = (id) => setExpanded((prev) => (prev === id ? null : id));

  const { user } = useAuth();

  useEffect(() => {
    const fetch = async () => {
      if (!user) return;
      const allmessages = await getMessages(user.ID_store);

      setMessages(allmessages);
    };
    fetch();
  }, [user]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleCreateMessage = async (message, dateEnd) => {
    if (!user) return;
    const newMessage = await createMessage(user.ID_store, message, dateEnd);
    setMessages((prev) => [...prev, newMessage]);
  }

  const handleDeleteMessage = async (id) => {
    await deleteMessage(id);
    setMessages((prev) => prev.filter((message) => message.ID_message !== id));
  }

  return (
    <>
      <div className="flex flex-col gap-[5vh] items-center justify-center relative z-10 text-white w-[100%] p-5">
        <div className="w-[100%]">
          <BackButton path="/configuration" />
        </div>
        <div className="w-full">
          <div className="w-full flex items-center justify-end px-5 py-3">
            <div
              onClick={openModal}
              className=" C-text-white font-bold text-xl cursor-pointer C-bg-red rounded-full px-10 py-2"
            >
              Ajouter un message
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start w-[100%]">
          {messages.map((message) => {
            const isExpanded = expanded === message.ID_message;

            return (
              <motion.div
                key={message.ID_message}
                layout
                initial={false}
                animate={{ borderRadius: "10px" }}
                transition={{ duration: 0.3 }}
                className="bg-white w-full flex flex-col items-center rounded-[10px] border-[2px] overflow-hidden mb-5"
              >
                {/* Contenu rouge */}
                <div
                  className="flex flex-col gap-[3vh] items-center w-[90%] cursor-pointer C-bg-red rounded-[20px] p-5"
                  onClick={() => toggle(message.ID_message)}
                >
                  <p className="text-white text-center">{message.Message}</p>
                  <div className="flex items-center gap-2 justify-around w-full">
                    <p className="text-white">{message.Creation_date}</p>
                    <p className="text-white">{message.Deletion_date}</p>
                    
                  </div>
                </div>

                {/* Partie rose animée */}
                <motion.div
                  layout
                  initial={false}
                  animate={{
                    height: isExpanded ? "70px" : "10px",
                  }}
                  transition={{ duration: 0.3 }}
                  className="C-bg-red-var2 w-[80%] flex flex-col items-center justify-end overflow-hidden rounded-b-[20px]"
                >
                  <div
                    className={`transition-opacity duration-300 h-full w-full flex justify-center items-center ${
                      isExpanded
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <button className="my-4 cursor-pointer"
                    onClick={() => handleDeleteMessage(message.ID_message)}
                    >
                      <i className="fa-solid fa-trash-can text-3xl"></i>
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
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
            ></ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
