import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { FC, useCallback, useState } from "react";
import { AnimeList } from "./components/AnimeList";
import { UserSearch } from "./components/UserSearch";
import "./styles/index.css";
import { ThemeProvider } from "./ThemeProvider";
import { ThemeToggle } from "./components/ThemeToggle";

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
      <ThemeProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-200">
          <div className="container mx-auto p-4 py-8 max-w-6xl">
            <header className="mb-8 flex justify-between items-center">
              <h1 className="text-4xl font-bold text-center">
                Anime Tierlist Maker
              </h1>
              <ThemeToggle />
            </header>

            <main>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                  Start by searching for an AniList user
                </h2>
                <UserSearch onSearch={handleSearch} />
              </div>

              {username && <AnimeList key={username} username={username} />}
            </main>

            <footer className="mt-12 text-center text-gray-600 dark:text-gray-400">
              <p>&copy; 2024 Anime Tierlist Maker. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
