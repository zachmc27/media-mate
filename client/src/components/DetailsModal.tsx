import "../styles/DetailsModal.css";
import { useEffect, useState } from "react";
import Media from "../interfaces/Media.tsx";
import { mediaInfo } from "../api/mediaAPI.tsx";
import { addMediaToWatch, fetchToWatch, removeMediaToWatch, seenToWatch } from "../api/toWatchAPI";
import { addMediaToSeenIt, fetchSeenIt, removeMediaFromSeenIt } from "../api/seenItAPI";
import auth from '../utils/auth';
import ReactPlayer from "react-player"

interface DetailsModalProps {
  mediaId: number;
  onClose: () => void; // Function to close modal
}

const DetailsModal = ({ mediaId, onClose }: DetailsModalProps) => {
  const [mediaItem, setMediaItem] = useState<Media>();
  const [userId, setUserId] = useState<number | null>(null);
  const [seenIt, setSeenIt] = useState<boolean>(false);
  const [toWatch, setToWatch] = useState<boolean>(false);
  const [toWatchList, setToWatchList] = useState<Media[]>([]);
  const [seenList, setSeenList] = useState<Media[]>([]);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  useEffect(() => {
    const id = auth.getUserId();
    setUserId(id);
    const fetchOneMedia = async (id: number) => {
      try {
          const data = await mediaInfo(id, "movie");
          setMediaItem(data);
      } catch (error) {
          console.error("Error fetching media:", error);
      }
    }
      fetchOneMedia(mediaId);
    }, [mediaId]);

    useEffect(() => {
      const fetchSeenData = async () => {
        try {
          if (userId === null) return;
          const data = await fetchSeenIt(userId);
            if (data) {
              setSeenList(data);
              const isSeen = data.some((media: Media) => media.mediaId === mediaId)
              setSeenIt(isSeen);
            } 
          } catch (error) {
            console.log("An error occurred while fetching seen it data.");
          }
        };
        const fetchToWatchData = async () => {
          try {
            if (userId === null) return;
            const data = await fetchToWatch(userId);
            if (data) {
              setToWatchList(data);
              const isWatched = data.some((media: Media) => media.mediaId === mediaId)
              setToWatch(isWatched);
            }
          } catch (error) {
            console.log("An error occurred while fetching to watch data.");
          }
        };
        fetchSeenData();
        fetchToWatchData();
    }, [userId, mediaId, updateTrigger])

  const triggerUpdate = () => setUpdateTrigger((prev) => prev + 1);

  useEffect(() => {
    if (mediaItem) {
        console.log("An error occurred retrieving the mediaItem data")
        console.log(toWatchList);
        console.log(seenList);
    }
  }, [mediaItem]);


  const handleAddToWatchList = async () => {
    if (!userId || !mediaItem) {
      console.error("User ID or Media Item is missing");
      return;
    }
    console.log(`Added ${userId}, ${mediaId} to watch list`)
    await addMediaToWatch(userId, mediaId);
    triggerUpdate();
  };
  const handleAddToSeenList = async () => {
    if (!userId || !mediaItem) {
      console.error("User ID or Media Item is missing");
      return;
    }
    console.log(`Added ${userId}, ${mediaId} to seen list`)
    await addMediaToSeenIt(userId, mediaId);
    triggerUpdate();
  };
  const handleRemoveToWatch = async (mediaId: number) => {
    try {
          await removeMediaToWatch(userId!, mediaId);
          // **Update the state after removing an item**
          setToWatchList((prevItems) => prevItems.filter((item) => item.mediaId !== mediaId));
          triggerUpdate();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };
  const handleRemoveSeenIt = async (mediaId: number) => {
      try {
          await removeMediaFromSeenIt(userId!, mediaId);
          setSeenList((prevItems) => prevItems.filter((item) => item.mediaId !== mediaId));
          triggerUpdate();
      } catch (error) {
          console.error("Error removing item:", error);
      }
  };
  const handleMoveToSeenIt = async (mediaId: number) => {
      try {
        await seenToWatch(userId!, mediaId);
      
        // Remove item from To Watch list after moving it
        setToWatchList((prevItems) => prevItems.filter((item) => item.mediaId !== mediaId));
        triggerUpdate();
        console.log(`Media item ${mediaId} moved to Seen It list`);
        } catch (error) {
          console.error("Error moving item to Seen It list:", error);
        }
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
          <p className="exit" onClick={onClose}>X</p>
          <div>
            <h1>{mediaItem.title}</h1>
            <h2>{mediaItem.year}</h2>
            <p className="description">{mediaItem.overview}</p>
          </div>
          <div className="footer">
          {/* <div className="directorAndActors">
              <p>Director, Actor, Actor</p>
              </div> */}

            {/* Buttons for if movie is not in Seen or Watch list */}
            {(!seenIt && !toWatch) ? (
              <>
                <button className="addButton" onClick={handleAddToWatchList}>Add to Watch List</button>
                <button className="addButton" onClick={handleAddToSeenList}>Add to Seen List</button>
              </>          
            ) : (!seenIt && toWatch) ? (
              <>
                <button className="removeButton" onClick={() => handleRemoveToWatch(mediaId)}>Remove from to Watch List</button>
                <button className="addButton" onClick={() => handleMoveToSeenIt(mediaId)}>Add to Seen List</button>
              </>
            ) : (
              <button className="removeButton" onClick={() => handleRemoveSeenIt(mediaId)}>Remove from Seen List</button>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DetailsModal;
