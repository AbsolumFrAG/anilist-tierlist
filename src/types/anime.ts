export interface Anime {
    id: number;
    title: { romaji: string };
    coverImage: { large: string };
    genres: string[];
}

interface MediaListEntry {
    media: Anime;
}

export interface MediaListCollection {
    lists: {
        entries: MediaListEntry[];
    }[];
}