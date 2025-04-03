import "../styles/Listtease.css"
import { useEffect, useState } from "react";
import { fetchToWatch } from "../api/toWatchAPI";
import { getCollabLists } from "../api/flickPicksAPI.tsx";
import CollabList from "../interfaces/CollabInterface";
import Media from "../interfaces/Media.tsx";
import DetailsModal from "../components/DetailsModal";
import { Link } from "react-router-dom";
import CollabListCard from "./CollabListCard";

export default function Listtease() {

    const [mediaList, _setMediaList] = useState<Media[]>([]);
     const [width, setWidth] = useState(window.innerWidth);
    // const userId: number | null = auth.getUserId();  

    // Details Model UseStates
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedMediaId, setSelectedMediaId] = useState<number | null>(null); 
    const [userId, setUserId] = useState<number | null>(null);
    const [toWatchList, setToWatchList] = useState<Media[]>([]);
    const [collabsList, setCollabsList] = useState<CollabList[]>([]);

    useEffect(() => {
      async function fetchData() {
          const fetchedId = localStorage.getItem('user_Id')
          ? JSON.parse(localStorage.getItem('user_Id') as string)
          : null
          if (fetchedId) {
                try {
              setUserId(fetchedId)
             
              } catch (error) {
                console.error("Error fetching id:", error);
              }
            }
      }
      fetchData();
    }, []);


    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
  
      window.addEventListener("resize", handleResize);
      
      return () => window.removeEventListener("resize", handleResize);
    }, []);


    useEffect(() => {
        if (userId === null) {
          console.log("User ID is null. Skipping fetch.");
          return;
        }
    
        const fetchCollabData = async () => {
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
          
        fetchCollabData();
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
    <div className="cover-row">

    

    

      <div className="list-section">
        {/* Check if collabsList is empty or null */}
        {collabsList.length === 0 ? (
          <p className="error work-sans">No matching collabs available. Check your friends list to make some.</p>
        ) : (
          collabsList.slice(0, 1).map((collabInstance) => (
            <>
            <div key={collabInstance.name} className="list-title p-light poppins">{collabInstance.name}</div>
            <div className="list-1">
              {/* Check if mediaDetails exists and has items */}
                {collabInstance.mediaDetails?.length > 0 ? (
                  collabInstance.mediaDetails.slice(0, 3).map((mediaItems) => (
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
              <p className="error work-sans">No items in this collab list.</p>
          )}
      </div>
      </>
      ))
    )}
  </div>

  {
      width > 1175 && <div className="vert-rule"></div>
    }

  <div className="list-section">
        <div className="list-title p-light poppins">Watch Later</div>   
        <div className="list-2">
        {toWatchList.length > 0 ? (
              toWatchList.slice(0, 3).map((item) => (
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
              <p className="work-sans error">Nothing to watch yet.</p>
            )}

        </div>
    </div>
    <div className="explore">
       <Link to="/profile" className="explore-text links poppins">Explore more...</Link>
    </div>
    {showModal && <DetailsModal mediaId={selectedMediaId!} onClose={closeModal} />}
  </div>
  )
}
