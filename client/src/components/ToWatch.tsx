import { useEffect, useState } from "react";
import { fetchToWatch } from "../api/toWatchAPI";
import Media from "../interfaces/Media.tsx";
import auth from '../utils/auth';
import ToWatchCard from "./ToWatchCard.tsx";
import DetailsModal from "../components/DetailsModal";

export default function ToWatchList() {
    const [toWatchList, setToWatchList] = useState<Media[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedMediaId, setSelectedMediaId] = useState<number | null>(null); 
    const [updateTrigger, setUpdateTrigger] = useState(0);
    const userId: number | null = auth.getUserId();
   
    useEffect(() => {
      if (userId === null) {
        return;
      }
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
    }, [userId, updateTrigger]);

    const triggerUpdate = () => setUpdateTrigger((prev) => prev + 1);

    // Details Modal Functionality
    const openModal = (mediaId: number) => {
      setSelectedMediaId(mediaId);
      setShowModal(true);
    };
    const closeModal = () => {
      setShowModal(false);
      setSelectedMediaId(null);
      triggerUpdate();
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
                />
              ))
            ) : (

              <p className="p-md-light poppins">Nothing to watch yet.</p>

            )}
          {showModal && <DetailsModal mediaId={selectedMediaId!} onClose={closeModal} />}
      </div>
    );
  }