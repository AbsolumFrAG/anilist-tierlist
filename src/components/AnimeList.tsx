import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import { useAnilistData } from "../hooks/useAnilistData";
import { usePreloadImages } from "../hooks/usePreloadImages";
import { useTierList } from "../hooks/useTierList";
import { Anime } from "../types";
import { AnimeCard } from "./AnimeCard";
import { ExportButton } from "./ExportButton";
import { FilterControls } from "./FilterControls";
import { TierList } from "./TierList";
import { TierManager } from "./TierManager";

interface AnimeListProps {
  username: string;
}

export const AnimeList: FC<AnimeListProps> = ({ username }) => {
  const { loading, error, animes: fetchedAnimes } = useAnilistData(username);
  const [includeAdult, setIncludeAdult] = useState(false);

  const filteredAnimes = useMemo(() => {
    return includeAdult
      ? fetchedAnimes
      : fetchedAnimes.filter((anime: Anime) => !anime.isAdult);
  }, [fetchedAnimes, includeAdult]);

  const {
    tiers,
    animes,
    addTier,
    deleteTier,
    updateAnimePosition,
    updateTierColor,
    updateTierName,
  } = useTierList(filteredAnimes);
  const [activeAnime, setActiveAnime] = useState<Anime | null>(null);
  const tierListRef = useRef<HTMLDivElement>(null);
  const imagesLoaded = usePreloadImages(animes);

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const { active } = event;
      const draggedAnime = animes.find(
        (anime) => anime.id === Number(active.id)
      );
      if (draggedAnime) {
        setActiveAnime(draggedAnime);
      }
    },
    [animes]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (over) {
        const activeAnimeId = Number(active.id);
        const overTierId = String(over.id);
        updateAnimePosition(activeAnimeId, overTierId);
      }

      setActiveAnime(null);
    },
    [updateAnimePosition]
  );

  const handleIncludeAdultChange = useCallback((include: boolean) => {
    setIncludeAdult(include);
  }, []);

  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (error)
    return (
      <p className="text-center py-4 text-red-500">Error: {error.message}</p>
    );

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 dark:text-white">Tierlist Settings</h2>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <FilterControls
            includeAdult={includeAdult}
            onIncludeAdultChange={handleIncludeAdultChange}
          />
          <ExportButton targetRef={tierListRef} imagesLoaded={imagesLoaded} />
        </div>
      </div>

      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
      >
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/4">
            <TierManager onAddTier={addTier} />
          </div>
          <div className="lg:w-3/4" ref={tierListRef}>
            <TierList
              tiers={tiers}
              animes={animes}
              onColorChange={updateTierColor}
              onNameChange={updateTierName}
              onDeleteTier={deleteTier}
            />
          </div>
        </div>
        <DragOverlay>
          {activeAnime ? <AnimeCard anime={activeAnime} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};
