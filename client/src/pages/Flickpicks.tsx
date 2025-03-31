import "../styles/Flickpicks.css"
import chicken from "../assets/chicken.jpg"
import { useEffect, useState } from "react";
import FlickpickQuiz from "../components/FlickpickQuiz";
import { getFlickPicksList } from "../api/flickPicksAPI";
import { Flickpick } from "../interfaces/FlickpickInterface";

export default function Flickpicks() {
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
    <div>
        {/* Conditionally render based on currentList state */}
        {currentQuiz === null ? (
            <div className="flickpicks">
                <p className="info-blurb">Flickpicks are short surveys that give you a list of movies and shows
                    that you decide whether or not you want to watch. Swipe up for yes and down for no. 
                    After completing a flickpick, compare it with a friends flickpick to get a matched list of 
                    shared answers! 
                </p>
                <div className="cards-row">
                        {flickpickList === null ? (
                            <p className="error">Error, no flickpick lists available</p>
                        ) : (
                            flickpickList.map((flickpick) => (
                                <div key={flickpick.id} className="card" onClick={() => setCurrentQuiz(flickpick.id)}>
                                    <img src={chicken} alt={flickpick.name} />
                                    <h4 className="card-title">{flickpick.name}</h4>
                                    <p className="card-description">{flickpick.description}</p>
                                </div>
                            ))
                        )}  
                </div>
            </div>
        ) : (
            <FlickpickQuiz quizId={currentQuiz} onBack={() => setCurrentQuiz(null)} />
        )}
    </div>
  );
}