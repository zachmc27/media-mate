import "../styles/DetailsModal.css";
import { useEffect, useState } from "react";
import Media from "../interfaces/Media.tsx";
import { mediaInfo } from "../api/mediaAPI.tsx";
import { addMediaToWatch } from "../api/toWatchAPI";
import auth from '../utils/auth';

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



  const handleAddToList = () => {
    if (!userId || !mediaItem) {
      console.error("User ID or Media Item is missing");
      return;
    }
    addMediaToWatch(userId, mediaItem.mediaId);
  };


  return (
    <div className="backdrop">
      {mediaItem ? ( 
        <div className="details">
          <img src={`https://image.tmdb.org/t/p/w500${mediaItem.poster_path}`} alt="coming soon" />
          <p className="exit" onClick={onClose}>X</p>  {/* need something to close model */}
          <div>
            <h1>{mediaItem.title}</h1>
            <p className="description">{mediaItem.overview}</p>
          </div>
          <div className="footer">
          {/* <div className="directorAndActors">
              <p>Director, Actor, Actor</p>
              </div> */}
            <button className="addButton" onClick={handleAddToList}>Add to List</button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DetailsModal;
