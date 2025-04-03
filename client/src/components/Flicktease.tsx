import "../styles/Flicktease.css"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFlickPicksList } from "../api/flickPicksAPI";
import { Flickpick } from "../interfaces/FlickpickInterface";

import drama from "../assets/DramaListIcon.png";
import horror from "../assets/HORROR.png";
import comedy from "../assets/COMEDY.png";
import action from "../assets/ACTION.png";
import romance from "../assets/ROMANCE.png";
import thriller from "../assets/THRILLER.png";
import fantasy from "../assets/FANTASY.png";
import scifi from "../assets/SCIFI.png";

export default function Flicktease() {
    const [flickpickList, setFlickpickList] = useState<Flickpick[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

   useEffect(() => {
          const fetchFlickPickList = async () => {
              try {
                  const data = await getFlickPicksList();
                  if (data) {
                      setFlickpickList(data);
                  } else {
                      setError("Failed to fetch data.");
                  }
              } catch (error) {
                  setError("An error occurred while fetching flickpick data.");
              } finally {
                  setLoading(false);
              }
          };
          fetchFlickPickList();
      }, []); 

      if (loading) return <p>Loading your To Watch list...</p>;
      if (error) return <p className="error">{error}</p>;
      
  return (
      <>
      <div className="tease-row">
        {flickpickList === null ? (
          <p className="error work-sans">Error, no flickpick lists available.</p>
        ) : (
        flickpickList.slice(0, 4).map((flickpick) => (

          <div key={flickpick.id} className="flick-card">
            
            <img src={
                flickpick.name === "Drama Movies" ? drama :
                flickpick.name === "Horror Movies" ? horror :
                flickpick.name === "Comedy Movies" ? comedy :
                flickpick.name === "Action Movies" ? action :
                flickpick.name === "Romance Movies" ? romance :
                flickpick.name === "Thriller Movies" ? thriller :
                flickpick.name === "Sci-Fi Movies" ? scifi :
                flickpick.name === "Fantasy Movies" ? fantasy :""} alt={flickpick.name} />
              <h4 className="card-title work-sans">{flickpick.name}</h4>
          </div>
          
        ))
        )}  

        <div className="flick-explore">
          <Link to="/flickpicks" className="explore-text poppins">Explore more...</Link>

        </div>
        </div>
      </>
  );
}
