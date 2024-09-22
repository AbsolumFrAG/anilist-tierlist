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
          <span
            onClick={handleNameClick}
            className="cursor-pointer dark:text-gray-800"
          >
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
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            stroke="currentColor"
          >
            <path
              d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
