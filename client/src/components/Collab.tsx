import { useEffect, useState } from "react";
import { getCollabLists } from "../api/flickPicksAPI.tsx";
import CollabList from "../interfaces/CollabInterface";
import auth from '../utils/auth.ts';
import CollabListCard from "./CollabListCard";
import DetailsModal from "./DetailsModal.tsx";

export default function CollabsList() {
    const [collabsList, setCollabsList] = useState<CollabList[]>([]);
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

    useEffect(() => {
      console.log(collabsList);
    }, [collabsList] )
  
    return (
      <div className="movies-container">
      {/* Check if collabsList is empty or null */}
      {collabsList.length === 0 ? (
          <p className="error">No matching collabs available. Check your friends list to make some.</p>
      ) : (
          collabsList.map((collabInstance) => (
              <div key={collabInstance.name}>
                  <h4 className="collabName">{collabInstance.name}</h4>
                  
                  {/* Check if mediaDetails exists and has items */}
                  {collabInstance.mediaDetails?.length > 0 ? (
                      collabInstance.mediaDetails.map((mediaItems) => (
                          <CollabListCard
                              key={mediaItems.id}
                              detailsModal={openModal}
                              title={mediaItems.title || "Unknown"}
                              year={mediaItems.year || 0}
                              cover={`https://image.tmdb.org/t/p/w500${mediaItems.poster_path}`}
                              mediaId={mediaItems.id}
                          />
                      ))
                  ) : (
                      <p className="error">No items in this collab list.</p>
                  )}
              </div>
          ))
      )}

      {showModal && <DetailsModal mediaId={selectedMediaId!} onClose={closeModal} />}
  </div>
    );
  }