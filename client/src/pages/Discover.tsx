import { useEffect, useState } from "react";
import "../App.css";
import "../styles/Discover.css";

import DetailsModal from "../components/DetailsModal";
import MovieCard from "../components/SeenItCard";
import auth from "../utils/auth";
import { discoverMedia, discoverMediaByGenre, discoverRecentlyReleased, keywordSearch,} from "../api/mediaAPI";
import Media from "../interfaces/Media";
import { addMediaToWatch } from "../api/toWatchAPI";
import { addMediaToSeenIt, fetchSeenIt } from "../api/seenItAPI";

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
      try {
        const favoriteGenre = 10402; //await fetchFavoriteGenre(userId);
        const favoriteMovies = await discoverMediaByGenre(favoriteGenre);
        setForYou(favoriteMovies);
      } catch (error) {
        console.error("error", error);
      }
    };
    fetchForYou();
  }, []);

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
    if (query.trim() === '') {
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
