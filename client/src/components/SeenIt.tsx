import { useEffect, useState } from "react";
import { fetchSeenIt, removeMediaFromSeenIt } from "../api/seenItAPI";
import Media from "../interfaces/Media.tsx";
import auth from '../utils/auth';
import SeenItCard from "./SeenItCard.tsx";
import DetailsModal from "../components/DetailsModal";
// import "../styles/SeenIt.css";

export default function SeenItList() {
    const [seenList, setSeenList] = useState<Media[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedMediaId, setSelectedMediaId] = useState<number | null>(null); 
    const userId: number | null = auth.getUserId();    
  
    useEffect(() => {  
      if (userId === null) {
        return;
      }
  
      const fetchData = async () => {
        try {
          const data = await fetchSeenIt(userId);
          if (data) {
            setSeenList(data);
          } 
        } catch (error) {
          console.log("An error occurred while fetching seen it data.");
        }
      };
      fetchData();
    }, [userId]);

    const handleRemove = async (mediaId: number) => {
      try {
          await removeMediaFromSeenIt(userId!, mediaId);
          setSeenList((prevItems) => prevItems.filter((item) => item.mediaId !== mediaId));
      } catch (error) {
          console.error("Error removing item:", error);
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
            {seenList.length > 0 ? (
              seenList.map((item) => (
                <SeenItCard
                key={item.id}
                detailsModal={openModal}
                title={item.media.title || item.name || "Unknown"}
                year={item.media.year}
                cover={`https://image.tmdb.org/t/p/w500${item.media.cover}`}
                mediaId={item.mediaId}
                onRemove={handleRemove}
              />
              ))
            ) : (
              <p>Nothing seen yet.</p>
            )}
            {showModal && <DetailsModal mediaId={selectedMediaId!} onClose={closeModal} />}
      </div>
    );
  }