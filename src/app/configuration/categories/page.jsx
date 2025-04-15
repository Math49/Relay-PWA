"use client";
import React, { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensors,
  useSensor,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import DraggableCategory from "@/components/DraggableCategory";
import { useAuth } from "@/context/AuthProvider";
import {
  getCategories,
  deleteCategory,
  updateCategoriesPositions,
} from "@/services/category";
import BackButton from "@/components/BackButton";
import { Modal, ModalContent } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import AddCategory from "@/components/AddCategory";
import CreateCategory from "@/components/CreateCategory";

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const { user } = useAuth();
  const colors = ["#4CAF50", "#9C27B0", "#36A2EB", "#FFCE56", "#FF5722"];
  const [isOpen, setIsOpen] = useState(false);
  const [createCategory, setCreateCategory] = useState(false);
  const openModal = () => {
    setIsOpen(true);
    setCreateCategory(false);
  };
  const closeModal = () => setIsOpen(false);
  useEffect(() => {
    if (user?.ID_store) {
      getCategories(user.ID_store).then(setCategories);
    }
  }, [user]);

  const handleDelete = async (item) => {
    await deleteCategory(user.ID_store, item.ID_category);
    setCategories((prev) =>
      prev.filter((cat) => cat.ID_category_enable !== item.ID_category_enable)
    );
  };

  const handleDragEnd = async ({ active, over }) => {
    if (!over || active.id === over.id) return;

    const oldIndex = categories.findIndex(
      (cat) => cat.ID_category_enable.toString() === active.id
    );
    const newIndex = categories.findIndex(
      (cat) => cat.ID_category_enable.toString() === over.id
    );

    const newList = arrayMove(categories, oldIndex, newIndex);
    setCategories(newList);

    await updateCategoriesPositions(user.ID_store, newList);
  };

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  return (
    <div className="flex flex-col gap-[5vh] items-center justify-center relative z-10 text-white w-full p-5">
      <div className="w-[100%]">
        <BackButton path="/configuration" />
      </div>
      <div className="w-full">
        <div className="w-full flex items-center justify-end px-5 py-3">
          <div
            onClick={openModal}
            className=" C-text-white font-bold text-xl cursor-pointer C-bg-red rounded-full px-10 py-2"
          >
            Ajouter une catégorie
          </div>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={categories.map((c) => c.ID_category_enable.toString())}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-5 w-full sm:w-[50%] mt-4">
            {categories.map((item, index) => (
              <DraggableCategory
                key={item.ID_category_enable}
                item={item}
                index={index}
                onDelete={handleDelete}
                color={colors[index % colors.length]}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
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
                    Création produit
                  </h2>
                </div>
                {!createCategory ? (
                    <AddCategory
                      setCreateCategory={() => setCreateCategory(true)}
                      closeModal={closeModal}
                    />
                ) : (
                  <CreateCategory
                    setCreateCategory={() => setCreateCategory(false)}
                    closeModal={closeModal}
                  />
                )}
              </div>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
