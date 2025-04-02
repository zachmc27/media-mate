import { useEffect, useState } from "react";
import "../App.css";
import "../styles/Discover.css";

import auth from "../utils/auth";
import { discoverMedia, discoverMediaByGenre, keywordSearch, discoverRecentlyReleased} from "../api/mediaAPI";
import Media from "../interfaces/Media";
import DetailsModal from "../components/DetailsModal";
import { addMediaToWatch } from "../api/toWatchAPI";
import {addMediaToSeenIt, fetchSeenIt, getUserGenrePreferences,} from "../api/seenItAPI";


export default function Discover() {
  const [popularMovies, setPopularMovies] = useState<Media[]>([]);
  const [selectedMediaId, setSelectedMediaId] = useState<number | null>(null); 
  const [forYou, setForYou] = useState<Media[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
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
        if (typeof favoriteGenre === "number") {
          const favoriteMovies = await discoverMediaByGenre(favoriteGenre);
          setForYou(favoriteMovies);
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
  }, [forYou]);

  // Modal Functionality
  const openModal = (mediaId: number) => {
    setSelectedMediaId(mediaId);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setSelectedMediaId(null);
  };
  // useEffect(() => {
  //   if (popularMovies) {
  //     console.log("fetched media item", popularMovies);
  //   }
  // }, [popularMovies]);
  
  const handleSearch = async () => {
    if (query.trim() === "") {
      setSearchResults([]); // Clear search results if query is empty
      return;
    }

    setLoading(true);
    try {
      const results: Media[] = await keywordSearch(query); // API call to search for movies
      const filteredResults = results.filter(
      (movie) => movie.cover && typeof movie.cover === "string"); // Ensures that the movie must have artwork to be shown 
      setSearchResults(filteredResults);
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
              <div className="card" key={item.id} onClick={() => openModal(item.id)}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.cover}`}
                  alt={item.title}
                />
                <p className="card-title">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="list-container">
        <p>Popular Now</p>
        <div className="movies-container">
          {popularMovies.slice(0, 9).map((item) => (
            <div className="card" key={item.id}  onClick={() => openModal(item.id)}>
              <img
                src={`https://image.tmdb.org/t/p/w500${item.cover}`}
                alt={item.title}
              />
              <p className="card-title">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="list-container">
        <p>For You</p>
        <div className="movies-container">
          {forYou.slice(0, 9).map((item) => (
            <div className="card" key={item.id} onClick={() => openModal(item.id)}>
              <div className="image-container">
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.cover}`}
                  alt={item.title}
                ></img>
              </div>
              <p className="card-title">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      {showModal && <DetailsModal mediaId={selectedMediaId!} onClose={closeModal} />}

      {/* Loading Indicator */}
      {loading && <p>Loading...</p>}
    </div>
  );
}
