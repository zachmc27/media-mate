import "../styles/Listtease.css"
// import chicken from "../assets/strangerthings.jpg"
import { useEffect, useState } from "react";
import { discoverMediaByGenre } from "../api/mediaAPI.tsx";
import { addMediaToWatch } from "../api/toWatchAPI";
import { addMediaToSeenIt } from "../api/seenItAPI";
import Media from "../interfaces/Media.tsx";
import auth from '../utils/auth';

export default function Listtease() {
    const [mediaList, setMediaList] = useState<Media[]>([]);
    const userId: number | null = auth.getUserId();  

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

  return (
    <div className="cover-row">
    <div className="list-section">
        <div className="list-title">Brett & Misha</div>   
        <div className="list-1">
            {mediaList.slice(0, 3).map((item) => (
            <div className="card" key={item.id}>
              <img src={`https://image.tmdb.org/t/p/w500${item.cover}`} alt={item.title} />
              <p className="card-title">{item.title}</p>
              <button onClick={() => addMediaToWatch(userId!, item.id, item.title)}>To Watch</button>              
              <button onClick={() => addMediaToSeenIt(userId!, item.id )}>Seen</button>
            </div>
          ))} 
        </div>
    </div>

    <div className="vert-rule"></div>

    <div className="list-section">
        <div className="list-title">Watch Later</div>   
        <div className="list-2">
        {mediaList.slice(3, 6).map((item) => (
            <div className="card" key={item.id}>
              <img src={`https://image.tmdb.org/t/p/w500${item.cover}`} alt={item.title} />
              <p className="card-title">{item.title}</p>
            </div>
          ))}
        </div>
    </div>
    <div className="explore">
      <h3>Explore more...</h3>
    </div>
  </div>
  )
}
