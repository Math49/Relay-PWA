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
  const [message, setMessage] = useState("");
  const [dateEnd, setDateEnd] = useState(new Date());

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
    setMessage("");
    closeModal();
  };

  const handleDeleteMessage = async (id) => {
    await deleteMessage(id);
    setMessages((prev) => prev.filter((message) => message.ID_message !== id));
  };

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
        <div className="flex flex-col items-center sm:flex-row sm:flex-wrap sm:justify-center justify-start w-[100%]">
          {messages.map((message) => {
            const isExpanded = expanded === message.ID_message;

            return (
              <motion.div
                key={message.ID_message}
                layout
                initial={false}
                animate={{ borderRadius: "10px" }}
                transition={{ duration: 0.3 }}
                className="bg-white w-full sm:w-[30%] flex flex-col items-center rounded-[10px] border-[2px] overflow-hidden mb-5"
              >
                <div
                  className="flex flex-col gap-[3vh] items-center w-[90%] cursor-pointer C-bg-red rounded-[20px] p-5"
                  onClick={() => toggle(message.ID_message)}
                >
                  <p className="text-white text-center">{message.Message}</p>
                  <div className="flex items-center gap-2 justify-end w-full">
                    <p className="text-white text-sm">
                      {new Date(message.Deletion_date).toLocaleDateString(
                        "fr-FR"
                      )}
                    </p>
                  </div>
                </div>

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
                    <button
                      className="my-4 cursor-pointer"
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
            >
              <div className="C-text-black flex flex-col w-[100vw] h-[70%] sm:w-[30vw] justify-center items-center sm:justify-start sm:gap-[20vh] z-50">
                <div
                  className="p-4 absolute top-2 left-2 cursor-pointer"
                  onClick={closeModal}
                >
                  <i
                    className="fa-solid fa-arrow-left-long text-3xl C-text-black"
                    aria-hidden="true"
                  ></i>
                </div>
                <div className="w-[100%] flex justify-center items-center mt-[3vh]">
                  <h2 className="C-text-black font-bold text-2xl mb-6">
                    Création message
                  </h2>
                </div>
                <div className="bg-white rounded-2xl flex flex-col justify-center items-center gap-5 p-6 w-[90%] max-w-md">
                  <div className="w-full">
                    <textarea
                      name="message"
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="border text-lg C-border-red-var2 w-full p-3 rounded-[20px] h-[20vh] resize-none"
                      placeholder="Écrivez votre message ici..."
                    ></textarea>
                  </div>
                  <div className="w-full">
                    <label>Date de fin</label>
                    <input
                      type="date"
                      value={dateEnd.toISOString().split("T")[0]}
                      onChange={(e) => setDateEnd(new Date(e.target.value))}
                      className="border text-lg C-border-red-var2 w-full p-3 rounded-full"
                    />
                  </div>
                  <button
                    onClick={() => handleCreateMessage(message, dateEnd)}
                    className="C-text-white font-bold w-full text-xl cursor-pointer C-bg-red rounded-full px-10 py-2"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
}
