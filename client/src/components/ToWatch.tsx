import { useEffect, useState } from "react";
import { fetchToWatch, removeMediaToWatch, seenToWatch } from "../api/toWatchAPI";
import Media from "../interfaces/Media.tsx";
import auth from '../utils/auth';
import ToWatchCard from "./ToWatchCard.tsx";
// import "../styles/ToWatch.css";

export default function ToWatchList() {
    const [toWatchList, setToWatchList] = useState<Media[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const userId: number | null = auth.getUserId();    
    if (userId === null) {
        setError("You must be logged in to access this page.");
        setLoading(false);
        return;
      }

    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await fetchToWatch(userId);
          if (data) {
            setToWatchList(data);
          } else {
            setError("Failed to fetch data.");
          }
        } catch (error) {
          setError("An error occurred while fetching to watch data.");
        } finally {
          setLoading(false);
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

    if (loading) return <p>Loading your To Watch list...</p>;
    if (error) return <p className="error">{error}</p>;
  
    return (
      <div className="movies-container">
            {toWatchList.length > 0 ? (
              toWatchList.map((item) => (
                <ToWatchCard
                  key={item.id}
                  title={item.media.title || item.name || "Unknown"}
                  year={item.media.year}
                  cover={`https://image.tmdb.org/t/p/w500${item.media.cover}`}
                  mediaId={item.mediaId}
                  onRemove={handleRemove}
                  onMoveToSeenIt={handleMoveToSeenIt}
                />
              ))
            ) : (
              <p>Nothing to watch yet.</p>
            )}
      </div>
    );
  }