import { useEffect, useState } from "react";
import { fetchSeenIt, removeMediaFromSeenIt } from "../api/seenItAPI";
import Media from "../interfaces/Media.tsx";
import auth from '../utils/auth';
import SeenItCard from "./SeenItCard.tsx";
// import "../styles/SeenIt.css";

export default function SeenItList() {
    const [seenList, setSeenList] = useState<Media[]>([]);
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
          const data = await fetchSeenIt(userId);
          if (data) {
            setSeenList(data);
          } else {
            setError("Failed to fetch data.");
          }
        } catch (error) {
          setError("An error occurred while fetching seen it data.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [userId]);

    const handleRemove = async (mediaId: number) => {
      try {
          await removeMediaFromSeenIt(userId, mediaId);
          setSeenList((prevItems) => prevItems.filter((item) => item.mediaId !== mediaId));
      } catch (error) {
          console.error("Error removing item:", error);
      }
    };
  
    if (loading) return <p>Loading your Seen It list...</p>;
    if (error) return <p className="error">{error}</p>;
  
    return (
      <div className="movies-container">
            {seenList.length > 0 ? (
              seenList.map((item) => (
                <SeenItCard
                key={item.id}
                title={item.media.title || item.name || "Unknown"}
                year={item.media.year}
                cover={item.media.cover}
                mediaId={item.mediaId}
                onRemove={handleRemove}
              />
              ))
            ) : (
              <p>Nothing seen yet.</p>
            )}
      </div>
    );
  }