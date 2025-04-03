import "../styles/Listtease.css"
// import chicken from "../assets/strangerthings.jpg"
import { useEffect, useState } from "react";
import { discoverMediaByGenre } from "../api/mediaAPI.tsx";
import Media from "../interfaces/Media.tsx";
import DetailsModal from "../components/DetailsModal";
import { Link } from "react-router-dom";

export default function Listtease() {
    const [mediaList, setMediaList] = useState<Media[]>([]);
    // const userId: number | null = auth.getUserId();  

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
    <div className="list-section">
        <div className="list-title p-light poppins">Brett & Misha</div>   
        <div className="list-1">
            {mediaList.slice(0, 3).map((item) => (
            <div className="cover" key={item.id} onClick={() => openModal(item.id)}>
              <img src={`https://image.tmdb.org/t/p/w500${item.cover}`} alt={item.title} />
              <p className="card-title work-sans">{item.title}</p>
            </div>
          ))} 
        </div>
    </div>

    <div className="vert-rule"></div>

    <div className="list-section">
        <div className="list-title p-light poppins">Watch Later</div>   
        <div className="list-2">
        {mediaList.slice(4, 6).map((item) => (
            <div className="cover" key={item.id} onClick={() => openModal(item.id)}>
              <img src={`https://image.tmdb.org/t/p/w500${item.cover}`} alt={item.title} />
              <p className="card-title work-sans">{item.title}</p>
            </div>
          ))}
        </div>
    </div>
    <div className="explore">
       <Link to="/profile" className="explore-text links poppins">Explore more...</Link>
    </div>
    {showModal && <DetailsModal mediaId={selectedMediaId!} onClose={closeModal} />}
  </div>
  )
}
