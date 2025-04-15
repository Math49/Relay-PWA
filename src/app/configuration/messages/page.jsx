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
        <div className="flex flex-col items-start justify-start w-[100%]">
          {messages.map((message) => (
            <div
              key={message.ID_message}
              className="bg-white w-[90%] rounded-[10px] border-[2px] C-border-red mb-2 overflow-hidden transition-all duration-300"
            >
              <div
                className="flex items-center justify-between cursor-pointer bg-[#cc0931] rounded-[20px] p-4"
                onClick={() => toggle(message.ID_message)}
              >
                <p className="text-white font-semibold">{message.Message}</p>
              </div>

              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  expanded === message.ID_message
                    ? "max-h-[200px] opacity-100 mt-2"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="bg-rose-100 rounded-[20px] p-4 flex justify-center items-center">
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M10 3h4a1 1 0 011 1v2H9V4a1 1 0 011-1z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
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
