import { FC, useEffect, useState } from "react";
import { Anime } from "../types/anime";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import AnimeCard from "./AnimeCard";

interface TierListProps {
  animeList: Anime[];
}

type TierKey = "S" | "A" | "B" | "C" | "D" | "E";

interface TierListState {
  S: Anime[];
  A: Anime[];
  B: Anime[];
  C: Anime[];
  D: Anime[];
  E: Anime[];
}

const tiersInitialState: TierListState = {
  S: [],
  A: [],
  B: [],
  C: [],
  D: [],
  E: [],
};

const TierList: FC<TierListProps> = ({ animeList }) => {
  const [tiers, setTiers] = useState<TierListState>(tiersInitialState);

  // Fonction pour gérer la fin du drag
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Si aucune destination n'existe, on arrête
    if (!destination) return;

    // Si l'utilisateur relâche l'élément au même endroit
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    // Copier les éléments des tiers source et destination
    const sourceTier = Array.from(tiers[source.droppableId as TierKey]);
    const destinationTier = Array.from(
      tiers[destination.droppableId as TierKey]
    );

    // Déplacer l'élément de la liste source à la destination
    const [movedAnime] = sourceTier.splice(source.index, 1);

    // Ajout dans la nouvelle position dans la destination
    destinationTier.splice(destination.index, 0, movedAnime);

    // Mettre à jour les tiers avec les nouvelles données
    setTiers((prevState) => ({
      ...prevState,
      [source.droppableId as TierKey]: sourceTier, // Source mise à jour
      [destination.droppableId as TierKey]: destinationTier, // Destination mise à jour
    }));
  };

  // Remplir le tier "S" avec la liste d'animés reçue à l'initialisation
  useEffect(() => {
    setTiers((prevState) => ({
      ...prevState,
      S: animeList,
    }));
  }, [animeList]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col space-y-8">
        {Object.keys(tiers).map((tierKey) => (
          <div key={tierKey}>
            <h2 className="text-xl font-bold mb-4">Tier {tierKey}</h2>
            <Droppable droppableId={tierKey} key={tierKey}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="bg-gray-100 p-4 rounded-lg min-h-32"
                >
                  {tiers[tierKey as TierKey].map((anime, index) => (
                    <Draggable
                      key={anime.id}
                      draggableId={anime.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-4"
                        >
                          <AnimeCard anime={anime} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TierList;
