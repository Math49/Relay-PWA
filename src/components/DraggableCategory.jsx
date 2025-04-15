import { CSS } from "@dnd-kit/utilities";
import { useSortable, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";

export default function DraggableCategory({ item, index, onDelete, color }) {
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
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(item);
        }}
        className="C-text-red cursor-pointer"
      >
        <i className="fa-solid fa-trash-can text-2xl"></i>
      </button>

      <p className="text-xl font-bold text-black flex-1 text-center">
        {item.category.Label}
      </p>
      
      <div
        {...listeners}
        className="cursor-grab text-gray-400 active:cursor-grabbing"
      >
        <i className="fa-solid fa-bars"></i>
      </div>
      
    </div>
  );
}