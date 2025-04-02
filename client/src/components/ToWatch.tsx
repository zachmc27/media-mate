import { useEffect, useState } from "react";
import { fetchToWatch, removeMediaToWatch, seenToWatch } from "../api/toWatchAPI";
import Media from "../interfaces/Media.tsx";
import auth from '../utils/auth';
import ToWatchCard from "./ToWatchCard.tsx";
import DetailsModal from "../components/DetailsModal";
// import "../styles/ToWatch.css";

export default function ToWatchList() {
    const [toWatchList, setToWatchList] = useState<Media[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedMediaId, setSelectedMediaId] = useState<number | null>(null); 
    const userId: number | null = auth.getUserId();
   
    if (userId === null) {
      return;
    }
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await fetchToWatch(userId);
          if (data) {
            setToWatchList(data);
          } else {
            console.log("Failed to fetch data.");
          }
        } catch (error) {
          console.log("An error occurred while fetching to watch data.");
        }
      };
  
      fetchData();
    }, [userId]);
    
    const handleRemove = async (mediaId: number) => {
        try {
            await removeMediaToWatch(userId, mediaId);
            
            // **Update the state after removing an item**
            setToWatchList((prevItems) => prevItems.filter((item) => item.mediaId !== mediaId));
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    const handleMoveToSeenIt = async (mediaId: number) => {
        try {
          await seenToWatch(userId!, mediaId);
      
          // Remove item from To Watch list after moving it
          setToWatchList((prevItems) => prevItems.filter((item) => item.mediaId !== mediaId));
      
          console.log(`Media item ${mediaId} moved to Seen It list`);
        } catch (error) {
          console.error("Error moving item to Seen It list:", error);
        }
    };

    // Details Modal Functionality
    const openModal = (mediaId: number) => {
      setSelectedMediaId(mediaId);
      setShowModal(true);
    };
    const closeModal = () => {
      setShowModal(false);
      setSelectedMediaId(null);
    };
  
    return (
      <div className="movies-container">
            {toWatchList.length > 0 ? (
              toWatchList.map((item) => (
                <ToWatchCard
                  key={item.id}
                  detailsModal={openModal}
                  title={item.media.title || item.name || "Unknown"}
                  year={item.media.year}
                  cover={`https://image.tmdb.org/t/p/w500${item.media.cover}`}
                  mediaId={item.mediaId}
                  seenIt={handleMoveToSeenIt}
                  onRemove={handleRemove}
                />
              ))
            ) : (
              <p>Nothing to watch yet.</p>
            )}
          {showModal && <DetailsModal mediaId={selectedMediaId!} onClose={closeModal} />}
      </div>
    );
  }