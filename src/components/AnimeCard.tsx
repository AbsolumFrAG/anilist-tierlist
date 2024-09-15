import { FC } from "react";
import { Anime } from "../types/anime";

interface AnimeCardProps {
  anime: Anime;
}

const AnimeCard: FC<AnimeCardProps> = ({ anime }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-60">
      <img
        src={anime.coverImage.large}
        alt={anime.title.romaji}
        className="w-full h-80 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold">{anime.title.romaji}</h3>
        {anime.genres && (
          <div className="mt-2">
            <h4 className="text-sm font-semibold text-gray-500">Genres :</h4>
            <ul className="flex flex-wrap mt-1">
              {anime.genres.map((genre, index) => (
                <li
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
                >
                  {genre}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimeCard;
