import { useDroppable } from "@dnd-kit/core";
import {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Anime, Tier } from "../types";
import { AnimeCard } from "./AnimeCard";
import { ColorPicker } from "./ColorPicker";

interface TierRowProps {
  tier: Tier;
  animes: Anime[];
  onColorChange: (tierId: string, newColor: string) => void;
  onNameChange: (tierId: string, newName: string) => void;
  onDelete: (tierId: string) => void;
}

export const TierRow: FC<TierRowProps> = ({
  tier,
  animes,
  onColorChange,
  onNameChange,
  onDelete,
}) => {
  const { setNodeRef } = useDroppable({ id: tier.id });
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(tier.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleNameClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handleNameBlur = () => {
    setIsEditing(false);
    if (editedName.trim() !== "") {
      onNameChange(tier.id, editedName.trim());
    } else {
      setEditedName(tier.name);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleNameBlur();
    }
  };

  return (
    <div
      className="flex items-stretch mb-4 rounded-lg overflow-hidden w-full"
      style={{ backgroundColor: tier.color }}
    >
      <div className="w-24 flex-shrink-0 flex items-center justify-center font-bold text-lg relative">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editedName}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            onKeyDown={handleKeyDown}
            className="w-full text-center bg-transparent border-none focus:outline-none dark:text-gray-800"
          />
        ) : (
          <span onClick={handleNameClick} className="cursor-pointer dark:text-gray-800">
            {tier.name}
          </span>
        )}
        <div className="absolute top-1 right-1">
          <ColorPicker
            color={tier.color}
            onChange={(newColor) => onColorChange(tier.id, newColor)}
          />
        </div>
      </div>
      <div
        ref={setNodeRef}
        className="flex-grow p-2 min-h-[100px] bg-white dark:bg-gray-700 bg-opacity-50 dark:bg-opacity-50 flex flex-wrap"
      >
        {animes.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
      <div className="w-12 flex-shrink-0 flex items-center justify-center bg-white dark:bg-gray-700 bg-opacity-50 dark:bg-opacity-50">
        <button
          onClick={() => onDelete(tier.id)}
          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-600 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
