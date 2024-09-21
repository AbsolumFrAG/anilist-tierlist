import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { FC, useCallback, useState } from "react";
import { AnimeList } from "./components/AnimeList";
import { UserSearch } from "./components/UserSearch";
import "./styles/index.css";

const client = new ApolloClient({
  uri: "https://graphql.anilist.co",
  cache: new InMemoryCache(),
});

const App: FC = () => {
  const [username, setUsername] = useState("");

  const handleSearch = useCallback((newUsername: string) => {
    setUsername(newUsername);
  }, []);

  return (
    <ApolloProvider client={client}>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Anime Tierlist Maker</h1>
        <UserSearch onSearch={handleSearch} />
        {username && <AnimeList key={username} username={username} />}
      </div>
    </ApolloProvider>
  );
};

export default App;
