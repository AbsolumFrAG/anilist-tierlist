import { useCallback, useEffect, useState } from "react";
import { Anime, Tier } from "../types";

export const useTierList = (initialAnimes: Anime[]) => {
  const [tiers, setTiers] = useState<Tier[]>([
    { id: "S", name: "S", color: "#FF7F7F" },
    { id: "A", name: "A", color: "#FFBF7F" },
    { id: "B", name: "B", color: "#FFDF7F" },
    { id: "C", name: "C", color: "#FFFF7F" },
    { id: "D", name: "D", color: "#BFFF7F" },
    { id: "unranked", name: "Unranked", color: "#FFFFFF" },
  ]);
  const [animes, setAnimes] = useState<Anime[]>([]);

  useEffect(() => {
    setAnimes(initialAnimes.map((anime) => ({ ...anime, tierId: "unranked" })));
  }, [initialAnimes]);

  const addTier = useCallback((name: string) => {
    const newTier: Tier = { id: Date.now().toString(), name, color: "#000" };
    setTiers((prevTiers) => [...prevTiers, newTier]);
  }, []);

  const editTier = useCallback((id: string, name: string) => {
    setTiers((prevTiers) =>
      prevTiers.map((tier) => (tier.id === id ? { ...tier, name } : tier))
    );
  }, []);

  const deleteTier = useCallback((id: string) => {
    setTiers((prevTiers) => prevTiers.filter((tier) => tier.id !== id));
    setAnimes((prevAnimes) =>
      prevAnimes.map((anime) =>
        anime.tierId === id ? { ...anime, tierId: undefined } : anime
      )
    );
  }, []);

  const updateAnimePosition = useCallback(
    (animeId: number, newTierId: string) => {
      setAnimes((prevAnimes) => {
        const updatedAnimes = prevAnimes.map((anime) =>
          anime.id === animeId ? { ...anime, tierId: newTierId } : anime
        );
        return updatedAnimes;
      });
    },
    []
  );

  const reorderAnime = useCallback(
    (tierId: string, oldIndex: number, newIndex: number) => {
      setAnimes((prevAnimes) => {
        const tierAnimes = prevAnimes.filter(
          (anime) => anime.tierId === tierId
        );
        const reorderedAnimes = Array.from(tierAnimes);
        const [movedAnime] = reorderedAnimes.splice(oldIndex, 1);
        reorderedAnimes.splice(newIndex, 0, movedAnime);

        return prevAnimes.map((anime) =>
          anime.tierId === tierId
            ? reorderedAnimes[
                reorderedAnimes.findIndex((a) => a.id === anime.id)
              ]
            : anime
        );
      });
    },
    []
  );

  const updateTierColor = useCallback((tierId: string, newColor: string) => {
    setTiers((prevTiers) =>
      prevTiers.map((tier) =>
        tier.id === tierId ? { ...tier, color: newColor } : tier
      )
    );
  }, []);

  const updateTierName = useCallback((tierId: string, newName: string) => {
    setTiers(prevTiers =>
      prevTiers.map(tier =>
        tier.id === tierId ? { ...tier, name: newName } : tier
      )
    );
  }, []);

  return {
    tiers,
    animes,
    addTier,
    editTier,
    deleteTier,
    updateAnimePosition,
    reorderAnime,
    updateTierColor,
    updateTierName,
  };
};
