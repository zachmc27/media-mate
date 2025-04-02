import { useEffect, useState } from "react";
import { getCollabLists } from "../api/flickPicksAPI.tsx";
import Media from "../interfaces/Media.tsx";
import auth from '../utils/auth.ts';
import CollabListCard from "./CollabListCard";
import DetailsModal from "./DetailsModal.tsx";
// import "../styles/ToWatch.css";

export default function CollabsList() {
    const [collabsList, setCollabsList] = useState<Media[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedMediaId, setSelectedMediaId] = useState<number | null>(null); 
  const userId: number | null = auth.getUserId();

  useEffect(() => {
    if (userId === null) {
      console.log("User ID is null. Skipping fetch.");
      return;
    }

    const fetchData = async () => {
      try {
        const data = await getCollabLists(userId);
        if (data) {
          setCollabsList(data);
        } else {
          console.log("Failed to fetch data.");
        }
      } catch (error) {
        console.log("An error occurred while fetching to watch data.");
      }
    };

    fetchData();
  }, [userId]);
    

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
            {collabsList.length > 0 ? (
              collabsList.map((item) => (
                <CollabListCard
                  key={item.id}
                  detailsModal={openModal}
                  title={item.media.title || item.name || "Unknown"}
                  year={item.media.year}
                  cover={`https://image.tmdb.org/t/p/w500${item.media.cover}`}
                  mediaId={item.mediaId}
                />
              ))
            ) : (
              <p>Nothing to watch yet.</p>
            )}
          {showModal && <DetailsModal mediaId={selectedMediaId!} onClose={closeModal} />}
      </div>
    );
  }