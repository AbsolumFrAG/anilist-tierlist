import { useDraggable } from "@dnd-kit/core";
import { FC } from "react";
import { Anime } from "../types";

interface AnimeCardProps {
  anime: Anime;
}

export const AnimeCard: FC<AnimeCardProps> = ({ anime }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: anime.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative w-32 h-48 m-2 rounded-lg overflow-hidden shadow-md dark:shadow-gray-700 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl dark:hover:shadow-gray-600 cursor-move group"
    >
      <img
        src={anime.coverImage.medium}
        alt={anime.title.userPreferred}
        className="w-full h-full object-cover"
        crossOrigin="anonymous"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2">
        <span className="text-xs text-white font-semibold truncate">
          {anime.title.userPreferred}
        </span>
      </div>
      {anime.isAdult && (
        <div className="absolute top-0 right-0 bg-red-500 dark:bg-red-600 text-white text-xs font-bold px-2 py-1 m-1 rounded-full">
          18+
        </div>
      )}
    </div>
  );
};
