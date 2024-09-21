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
}

export const TierRow: FC<TierRowProps> = ({
  tier,
  animes,
  onColorChange,
  onNameChange,
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
      className="flex items-stretch mb-4 bg-gray-100 rounded-lg overflow-hidden"
      style={{ backgroundColor: tier.color }}
    >
      <div className="w-20 flex items-center justify-center font-bold text-lg relative">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editedName}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            onKeyDown={handleKeyDown}
            className="w-full text-center bg-transparent border-none focus:outline-none"
          />
        ) : (
          <span onClick={handleNameClick} className="cursor-pointer">
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
        className="flex-1 p-2 flex flex-wrap bg-white bg-opacity-50"
      >
        {animes.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </div>
  );
};
