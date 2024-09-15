import { FC, FormEvent, useState } from "react";
import ExportButton from "../components/ExportButton";
import TierList from "../components/TierList";
import { fetchCompletedAnime } from "../services/anilistService";
import { Anime } from "../types/anime";

const HomePage: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchAnime = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await fetchCompletedAnime(username);
      if (data.length === 0) {
        setError("Aucun anime trouvé");
      } else {
        setAnimeList(data);
      }
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la récupération des animes");
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Anime Tierlist</h1>

      <form
        onSubmit={handleFetchAnime}
        className="flex flex-col items-center mb-6"
      >
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Entrez votre nom d'utilisateur sur Anilist"
          className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-72"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          disabled={loading}
        >
          {loading ? "Chargement..." : "Récupérer les animes"}
        </button>
      </form>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {animeList.length > 0 && (
        <div>
          <div id="tierlist">
            <TierList animeList={animeList} />
          </div>
          <ExportButton elementId="tierlist" />
        </div>
      )}
    </div>
  );
};

export default HomePage;
