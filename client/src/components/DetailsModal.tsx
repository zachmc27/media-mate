import "../styles/DetailsModal.css";
import { useEffect, useState } from "react";
import Media from "../interfaces/Media.tsx";
import { mediaInfo } from "../api/mediaAPI.tsx";
import { addMediaToWatch } from "../api/toWatchAPI";
import { addMediaToSeenIt } from "../api/seenItAPI";
import auth from '../utils/auth';
import ReactPlayer from "react-player"

interface DetailsModalProps {
  mediaId: number;
  onClose: () => void; // Function to close modal
}

const DetailsModal = ({ mediaId, onClose }: DetailsModalProps) => {
  const [mediaItem, setMediaItem] = useState<Media>();
  const [userId, setUserId] = useState<number | null>(null);
  

  useEffect(() => {
    const id = auth.getUserId();
    setUserId(id);
    const fetchOneMedia = async (id: number) => {
      try {
          const data = await mediaInfo(id, "movie");
          setMediaItem(data);
      } catch (error) {
          console.error("Error fetching media:", error);
      };
    }
      fetchOneMedia(mediaId);
    }, []);

  useEffect(() => {
    if (mediaItem) {
        console.log("Fetched media item: ", mediaItem);
    }
    if (mediaItem) {
        console.log("An error occurred retrieving the mediaItem data")
    }
  }, [mediaItem]);



  const handleAddToWatchList = () => {
    if (!userId || !mediaItem) {
      console.error("User ID or Media Item is missing");
      return;
    }
    console.log(`Added ${userId}, ${mediaId} to watch list`)
    addMediaToWatch(userId, mediaId);
  };
  const handleAddToSeenList = () => {
    if (!userId || !mediaItem) {
      console.error("User ID or Media Item is missing");
      return;
    }
    console.log(`Added ${userId}, ${mediaId} to seen list`)
    addMediaToSeenIt(userId, mediaId);
  };

  return (
    <div className="backdrop">
      {mediaItem ? ( 
        <div className="details">
          {/* If there is a trailer, return a trailer. If there is no trailer, return the cover */}
          {mediaItem.trailerKey === '' ? ( <img src={`https://image.tmdb.org/t/p/w500${mediaItem.poster_path}`} alt={mediaItem.title} /> ) : (
                <div className="video">
                  <ReactPlayer 
                   url={`https://www.youtube.com/watch?v=${mediaItem.trailerKey}`}
                   playing
                   muted
                   controls={true}
                   width="100%"
                   height="100%"
           
                   ></ReactPlayer>
                </div>)}
          <p className="exit" onClick={onClose}>X</p>  {/* need something to close model */}
          <div>
            <h1>{mediaItem.title}</h1>
            <p className="description">{mediaItem.overview}</p>
          </div>
          <div className="footer">
          {/* <div className="directorAndActors">
              <p>Director, Actor, Actor</p>
              </div> */}
            <button className="addButton" onClick={handleAddToWatchList}>Add to Watch List</button>
            <button className="addButton" onClick={handleAddToSeenList}>Add to Seen List</button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DetailsModal;
