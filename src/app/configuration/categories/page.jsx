"use client";
import React, { useEffect, useState } from "react";
import { DndContext, closestCenter, useSensors, useSensor, MouseSensor, TouchSensor } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import DraggableCategory from "@/components/DraggableCategory";
import { useAuth } from "@/context/AuthProvider";
import { getCategories, deleteCategory, updateCategoriesPositions } from "@/services/category";
import BackButton from "@/components/BackButton";


export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const { user } = useAuth();
  const colors = ["#4CAF50", "#9C27B0", "#36A2EB", "#FFCE56", "#FF5722"];

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
      <BackButton path="/configuration" />
      <h1 className="text-2xl font-bold text-white">Catégories</h1>

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
          <div className="flex flex-col gap-5 w-full mt-4">
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
    </div>
  );
}
