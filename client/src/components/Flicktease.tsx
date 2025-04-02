import "../styles/Flicktease.css"
import chicken from "../assets/chicken.jpg"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import FlickpickQuiz from "../components/FlickpickQuiz";
import { getFlickPicksList } from "../api/flickPicksAPI";
import { Flickpick } from "../interfaces/FlickpickInterface";

export default function Flicktease() {
    const [currentQuiz, setCurrentQuiz] = useState<number | null>(null);
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
    {currentQuiz === null ? (
      <div className="tease-row">
        {flickpickList === null ? (
          <p className="error">Error, no flickpick lists available</p>
        ) : (
        flickpickList.slice(0, 4).map((flickpick) => (
          <div key={flickpick.id} className="flick-card" onClick={() => setCurrentQuiz(flickpick.id)}>
              <img src={chicken} alt={flickpick.name} />
              <h4 className="card-title">{flickpick.name}</h4>
          </div>
          
        ))
        )}  
        <div className="explore">
          <Link to="/flickpicks" className="explore-text">Explore more...</Link>
        </div>
        </div>
) : (
    <FlickpickQuiz quizId={currentQuiz} onBack={() => setCurrentQuiz(null)} />
  )}
      
      </>
  );
}