import { FC, useState } from "react";
import { Tier } from "../types";

interface TierManagerProps {
  tiers: Tier[];
  onAddTier: (name: string) => void;
  onEditTier: (id: string, name: string) => void;
  onDeleteTier: (id: string) => void;
}

export const TierManager: FC<TierManagerProps> = ({
  tiers,
  onAddTier,
  onDeleteTier,
}) => {
  const [newTierName, setNewTierName] = useState("");

  const handleAddTier = () => {
    if (newTierName.trim()) {
      onAddTier(newTierName.trim());
      setNewTierName("");
    }
  };

  return (
    <>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Tiers</h2>
        <div className="flex mb-2">
          <input
            type="text"
            value={newTierName}
            onChange={(e) => setNewTierName(e.target.value)}
            placeholder="New Tier Name"
            className="border p-2 mr-2"
          />
          <button
            onClick={handleAddTier}
            className="bg-green-500 text-white p-2 rounded"
          >
            Add Tier
          </button>
        </div>
      </div>
      <ul>
        {tiers.map((tier) => (
          <li key={tier.id} className="flex items-center mb-2">
            <span className="mr-2">{tier.name}</span>
            <button
              onClick={() => onDeleteTier(tier.id)}
              className="bg-red-500 text-white p-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
