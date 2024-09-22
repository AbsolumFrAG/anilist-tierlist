import { gql } from "@apollo/client";

export const GET_USER_ANIME_LIST = gql`
query GetUserAnimeList($username: String!) {
  MediaListCollection(userName: $username, type: ANIME, status: COMPLETED) {
    lists {
      entries {
        media {
          id
          title {
            userPreferred
          }
          coverImage {
            medium
          }
          isAdult
          format
        }
      }
    }
  }
}
`;
