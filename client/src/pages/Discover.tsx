import { useEffect, useState } from "react";
import "../App.css";
import "../styles/Discover.css";

import DetailsModal from "../components/DetailsModal";
import auth from "../utils/auth";
import { discoverMedia, discoverMediaByGenre, discoverRecentlyReleased } from "../api/mediaAPI";
import Media from "../interfaces/Media";
import { addMediaToWatch } from "../api/toWatchAPI";
import { addMediaToSeenIt, fetchSeenIt } from "../api/seenItAPI";

export default function Discover() {
  const [popularMovies, setPopularMovies] = useState<Media[]>([]);
  const [selectedMediaId, setSelectedMediaId] = useState<number | null>(null); 
  const [forYou, setForYou] = useState<Media[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

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
        const favoriteGenre = 10402; //await fetchFavoriteGenre(userId); //this should be updated to fetch fav. genre
        const favoriteMovies = await discoverMediaByGenre(favoriteGenre);
        setForYou(favoriteMovies);
        // await discoverRecentlyReleased();
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

  // useEffect(() => {
  //   if (forYou) {
  //     console.log("fetched favorite item", forYou);
  //   }
  // }, [forYou]);

  return (
    <div className="discover-container">
      <div className="search-bar-container">
        <input
          type="text"
          className="search-bar"
          placeholder="search for movies..."
        />
        <button className="search-button">Search</button>
      </div>
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
    </div>
  );
}

// const fetchPopularMovies = async () => {
//   try {
//     const res = await fetch("/discover/movie"); // api call for popular movies
//     console.log('============', res);
//     const data = await res.json();
//     const topTenMovies = data.slice(0, 10);
//     setPopularMovies(topTenMovies);
//   } catch (error) {
//     console.error('error fetching popular movies: ', error);
//   }
// };
// const fetchForYou = async () => {
//     try {
//       // getting users most popular genre
//       const res = await fetch(`/${auth.getUserId()}`); // api call for getting seen movies
//       const data = await res.json();

//       //   const res = await fetch("/api/discover"); // api call for top ten movies
//       //   const data = await res.json();
//       //   const topTenMovies = data.slice(0, 10);
//       //   setTopPicks(topTenMovies);
//     } catch (error) {
//         console.error('error fetching top picks: ', error);
//     }
// };

// fetchPopularMovies();
// fetchForYou();
