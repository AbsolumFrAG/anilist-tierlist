import { Anime, MediaListCollection } from "../types/anime";
import { client } from "./graphqlClient";

const query = `
    query ($name: String) {
    MediaListCollection(userName: $name, type: ANIME, status: COMPLETED) {
      lists {
        entries {
          media {
            id
            title {
              romaji
            }
            coverImage {
              large
            }
            genres
          }
        }
      }
    }
  }
`;

export async function fetchCompletedAnime(username: string): Promise<Anime[]> {
  const variables = { name: username };

  try {
    const data: unknown = await client.request(query, variables);
    const mediaListCollection = data as {
      MediaListCollection: MediaListCollection;
    };
    
    return mediaListCollection.MediaListCollection.lists[0].entries.map((entry) => entry.media);
  } catch (error) {
    console.error("Erreur lors de la récupération des animes :", error);
    return [];
  }
}
