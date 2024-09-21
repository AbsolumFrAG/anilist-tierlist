import { useEffect, useState } from "react";
import { Anime } from "../types";

export const usePreloadImages = (animes: Anime[]) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const imagePromises = animes.map((anime) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve;
        img.onerror = reject;
        img.crossOrigin = "anonymous";
        img.src = anime.coverImage.medium;
      });
    });

    Promise.all(imagePromises)
      .then(() => setImagesLoaded(true))
      .catch((error) => console.error("Failed to load images:", error));
  }, [animes]);

  return imagesLoaded;
};
