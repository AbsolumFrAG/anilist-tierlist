import { useQuery } from "@apollo/client";
import { useMemo } from "react";
import { GET_USER_ANIME_LIST } from "../utils/anilistQueries";

export const useAnilistData = (username: string) => {
  const { loading, error, data } = useQuery(GET_USER_ANIME_LIST, {
    variables: { username },
    skip: !username,
  });

  const animes = useMemo(() => {
    return (
      data?.MediaListCollection?.lists?.[0]?.entries?.map(
        (entry: any) => entry.media
      ) || []
    );
  }, [data]);

  return { loading, error, animes };
};
