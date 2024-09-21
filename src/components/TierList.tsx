import { FC } from "react";
import { Anime, Tier } from "../types";
import { AnimeCard } from "./AnimeCard";
import { TierRow } from "./TierRow";

interface TierListProps {
  tiers: Tier[];
  animes: Anime[];
  onColorChange: (tierId: string, newColor: string) => void;
  onNameChange: (tierId: string, newName: string) => void;
  onDeleteTier: (tierId: string) => void;
}

export const TierList: FC<TierListProps> = ({
  tiers,
  animes,
  onColorChange,
  onNameChange,
  onDeleteTier,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full">
      <div className="p-4 border-b dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">Anime Tierlist</h2>
      </div>
      <div className="p-4 space-y-4">
        {tiers.map((tier) => (
          <TierRow
            key={tier.id}
            tier={tier}
            animes={animes.filter((anime) => anime.tierId === tier.id)}
            onColorChange={onColorChange}
            onNameChange={onNameChange}
            onDelete={onDeleteTier}
          />
        ))}
      </div>
      {animes.filter((anime) => !anime.tierId).length > 0 && (
        <div className="p-4 border-t dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Unranked</h3>
          <div className="flex flex-wrap gap-2">
            {animes
              .filter((anime) => !anime.tierId)
              .map((anime) => (
                <div key={anime.id} className="w-24 h-36">
                  <AnimeCard anime={anime} />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
