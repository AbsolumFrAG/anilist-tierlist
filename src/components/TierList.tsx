import { FC } from "react";
import { Anime, Tier } from "../types";
import { TierRow } from "./TierRow";

interface TierListProps {
  tiers: Tier[];
  animes: Anime[];
  onColorChange: (tierId: string, newColor: string) => void;
  onNameChange: (tierId: string, newName: string) => void;
}

export const TierList: FC<TierListProps> = ({ tiers, animes, onColorChange, onNameChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Anime Tierlist</h2>
      {tiers.map((tier) => (
        <TierRow
          key={tier.id}
          tier={tier}
          animes={animes.filter((anime) => anime.tierId === tier.id)}
          onColorChange={onColorChange}
          onNameChange={onNameChange}
        />
      ))}
    </div>
  );
};
