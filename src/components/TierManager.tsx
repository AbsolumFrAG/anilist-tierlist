import { FC, KeyboardEvent, useState } from "react";

interface TierManagerProps {
  onAddTier: (name: string) => void;
}

export const TierManager: FC<TierManagerProps> = ({ onAddTier }) => {
  const [newTierName, setNewTierName] = useState("");

  const handleAddTier = () => {
    if (newTierName.trim()) {
      onAddTier(newTierName.trim());
      setNewTierName("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTier();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        Manage Tiers
      </h2>
      <div className="flex flex-col space-y-2">
        <input
          type="text"
          value={newTierName}
          onChange={(e) => setNewTierName(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="New Tier Name"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     placeholder-gray-500 dark:placeholder-gray-400"
        />
        <button
          onClick={handleAddTier}
          className="w-full bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 
                     text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          Add Tier
        </button>
      </div>
    </div>
  );
};
