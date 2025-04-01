import { useEffect, useState } from "react";
import "../App.css";
import "../styles/Discover.css";
import MovieCard from "../components/SeenItCard";
import auth from "../utils/auth";
import { discoverMedia, discoverMediaByGenre, discoverRecentlyReleased, keywordSearch,} from "../api/mediaAPI";
import Media from "../interfaces/Media";
import { addMediaToWatch } from "../api/toWatchAPI";
import {addMediaToSeenIt, fetchSeenIt, getUserGenrePreferences,} from "../api/seenItAPI";

export default function Discover() {
  const [popularMovies, setPopularMovies] = useState<Media[]>([]);
  const [forYou, setForYou] = useState<Media[]>([]);
  const [query, setQuery] = useState<string>(""); // State for search query
  const [searchResults, setSearchResults] = useState<Media[]>([]); // State for search results
  const [loading, setLoading] = useState<boolean>(false); // State for loading
  const userId: number | null = auth.getUserId();

  useEffect(() => {
    const fetchDiscoverMovies = async () => {
      try {
        const media = await discoverMedia();
        setPopularMovies(media);
      } catch (error) {
        console.error("error", error);
      }
    };
    fetchDiscoverMovies();

    const fetchForYou = async () => {
      console.log("FETCHFORYOU");
      try {
        const favoriteGenre = await getUserGenrePreferences(userId!); //await fetchFavoriteGenre(userId);
        console.log("FAV GENRE =====", favoriteGenre);
        if (typeof favoriteGenre === "number") {
          const favoriteMovies = await discoverMediaByGenre(favoriteGenre);
          setForYou(favoriteMovies);
          console.log("THIS IS YOUR FAV", favoriteMovies);
        } else {
          const recentlyReleased = await discoverRecentlyReleased();
          setForYou(recentlyReleased);
        }
      } catch (error) {
        console.error("error", error);
      }
    };
    fetchForYou();
  }, []);
  useEffect(() => {
    console.log("the for your genres are" + forYou);
    console.log("User ID equals" + userId);
  }, [forYou]);

  // functionaility for the search bar
  const handleSearch = async () => {
    if (query.trim() === "") {
      setSearchResults([]); // Clear search results if query is empty
      return;
    }

    setLoading(true);
    try {
      const results = await keywordSearch(query); // API call to search for movies
      setSearchResults(results);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="discover-container">
      <div className="search-bar-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update query as user types
          className="search-bar"
          placeholder="Search for movies..."
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* Search Results Section */}
      {query && !loading && searchResults.length > 0 && (
        <div className="list-container">
          <p>Search Results</p>
          <div className="movies-container">
            {searchResults.slice(0, 9).map((item) => (
              <div className="card" key={item.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.cover}`}
                  alt={item.title}
                />
                <p className="card-title">{item.title}</p>
                <button
                  onClick={() => addMediaToWatch(userId!, item.id, item.title)}
                >
                  To Watch
                </button>
                <button onClick={() => addMediaToSeenIt(userId!, item.id)}>
                  Seen
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="list-container">
        <p>Popular Now</p>
        <div className="movies-container">
          {popularMovies.slice(0, 9).map((item) => (
            <div className="card" key={item.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${item.cover}`}
                alt={item.title}
              />
              <p className="card-title">{item.title}</p>
              <button
                onClick={() => addMediaToWatch(userId!, item.id, item.title)}
              >
                To Watch
              </button>
              <button onClick={() => addMediaToSeenIt(userId!, item.id)}>
                Seen
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="list-container">
        <p>For You</p>
        <div className="movies-container">
          {forYou.slice(0, 9).map((item) => (
            <div className="card" key={item.id}>
              <div className="image-container">
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.cover}`}
                  alt={item.title}
                ></img>
                <button
                  onClick={() => addMediaToWatch(userId!, item.id, item.title)}
                >
                  To Watch
                </button>
                <button onClick={() => addMediaToSeenIt(userId!, item.id)}>
                  Seen
                </button>
              </div>

              <p className="card-title">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Loading Indicator */}
      {loading && <p>Loading...</p>}
    </div>
  );
}
