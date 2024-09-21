import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { FC, useCallback, useRef, useState } from "react";
import { useAnilistData } from "../hooks/useAnilistData";
import { usePreloadImages } from "../hooks/usePreloadImages";
import { useTierList } from "../hooks/useTierList";
import { Anime } from "../types";
import { AnimeCard } from "./AnimeCard";
import { ExportButton } from "./ExportButton";
import { TierList } from "./TierList";
import { TierManager } from "./TierManager";

interface AnimeListProps {
  username: string;
}

export const AnimeList: FC<AnimeListProps> = ({ username }) => {
  const { loading, error, animes: fetchedAnimes } = useAnilistData(username);
  const { tiers, animes, addTier, editTier, deleteTier, updateAnimePosition, updateTierColor, updateTierName } =
    useTierList(fetchedAnimes);
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

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      <TierManager
        tiers={tiers}
        onAddTier={addTier}
        onEditTier={editTier}
        onDeleteTier={deleteTier}
      />
      <div ref={tierListRef}>
        <TierList tiers={tiers} animes={animes} onColorChange={updateTierColor} onNameChange={updateTierName} />
      </div>
      <DragOverlay>
        {activeAnime ? <AnimeCard anime={activeAnime} /> : null}
      </DragOverlay>
      <ExportButton targetRef={tierListRef} imagesLoaded={imagesLoaded} />
    </DndContext>
  );
};
