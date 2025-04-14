"use client";
import React, { useEffect, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
  defaultAnimateLayoutChanges,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { Trash2 } from "lucide-react";

import { useAuth } from "@/context/AuthProvider";
import {
  getCategories,
  deleteCategory,
  updateCategories,
} from "@/services/category";
import BackButton from "@/components/BackButton";

function DraggableCategory({ item, index, onDelete, color }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.ID_category_enable.toString(),
    animateLayoutChanges: (args) =>
      defaultAnimateLayoutChanges({ ...args, wasDragging: true }),
    handle: true,
  });
  

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    borderColor: color,
  };

  return (
    <div
  ref={setNodeRef}
  style={style}
  {...attributes}
  className="relative p-4 rounded-[20px] shadow-md bg-white flex justify-between items-center border-t-[5px] w-[80%] mx-auto"
>
  {/* Drag handle à gauche */}
  <div
    {...listeners}
    className="cursor-grab text-gray-400 active:cursor-grabbing"
  >
    &#x2630; {/* Ou remplace par une icône drag genre <GripVertical /> si tu veux */}
  </div>

  <p className="text-xl font-bold text-black flex-1 text-center">
    {item.category.Label}
  </p>

  {/* Supprimer */}
  <button
    onClick={(e) => {
      e.stopPropagation();
      onDelete(item);
    }}
    className="text-red-500"
  >
    <Trash2 size={20} />
  </button>
</div>

  );
}

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
    console.log("Deleting category:", item);
    await deleteCategory(user.ID_store, item.ID_category);
    setCategories((prev) =>
      prev.filter((cat) => cat.ID_category_enable !== item.ID_category_enable)
    );
  };

  const handleDragEnd = async ({ active, over }) => {
    console.log("Drag ended:", active, over);
    if (!over || active.id === over.id) return;

    const oldIndex = categories.findIndex(
      (cat) => cat.ID_category_enable.toString() === active.id
    );
    const newIndex = categories.findIndex(
      (cat) => cat.ID_category_enable.toString() === over.id
    );

    const newList = arrayMove(categories, oldIndex, newIndex);
    setCategories(newList);
    await updateCategories(user.ID_store, newList);
  };

  return (
    <div className="flex flex-col gap-[5vh] items-center justify-center relative z-10 text-white w-full p-5">
      <BackButton path="/configuration" />
      <h1 className="text-2xl font-bold text-white">Catégories</h1>

      <DndContext
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
