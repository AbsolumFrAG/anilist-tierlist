export interface Anime {
  id: number;
  title: {
    userPreferred: string;
  };
  coverImage: {
    medium: string;
  };
  tierId?: string;
  isAdult: boolean;
}

export interface Tier {
  id: string;
  name: string;
  color: string;
}
