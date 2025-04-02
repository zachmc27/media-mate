import "../styles/Discovertease.css"

import DetailsModal from "../components/DetailsModal";
import { useEffect, useState } from "react";
import { discoverMediaByGenre } from "../api/mediaAPI.tsx";
import Media from "../interfaces/Media.tsx";
import { Link } from "react-router-dom";

export default function Discovertease() {

   const [mediaList, setMediaList] = useState<Media[]>([]);
   
  
      // Details Model UseStates
      const [showModal, setShowModal] = useState<boolean>(false);
      const [selectedMediaId, setSelectedMediaId] = useState<number | null>(null); 
  
      useEffect(() => {
          const fetchMedia = async () => {
            try {
              const data = await discoverMediaByGenre(28);
              setMediaList(data); // Set fetched data in state
            } catch (error) {
              console.error("Error fetching media:", error);
            }
          };
          fetchMedia();
        }, []);
  
      useEffect(() => {
          if (mediaList) {
              console.log("Fetched media item: ", mediaList);
          }
      }, [mediaList]);
  
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
    <div className="cover-row">
   {mediaList.slice(0, 8).map((item) => (
            <div className="cover" key={item.id} onClick={() => openModal(item.id)}>
              <img src={`https://image.tmdb.org/t/p/w500${item.cover}`} alt={item.title} />
              <p className="cover-title">{item.title}</p>
            </div>
          ))} 
    <div className="explore">
       <Link to="/discover" className="explore-text">Explore more...</Link>
    </div>
    {showModal && <DetailsModal mediaId={selectedMediaId!} onClose={closeModal} />}
  </div>
  )
}
