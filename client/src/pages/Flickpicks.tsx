import "../styles/Flickpicks.css"
import chicken from "../assets/chicken.jpg"
import { useState } from "react";
import FlickpickQuiz from "../components/FlickpickQuiz";

export default function Flickpicks() {
        const [currentQuiz, setCurrentQuiz] = useState<number | null>(null);
    
        const flickpicks = [
            { id: 1, name: "Action", description: "Amazing action flicks" },
            { id: 2, name: "Animation", description: "Incredible Animation Movies" },
        ];

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
                        {flickpicks.map((flickpick) => (
                            <div key={flickpick.id} className="card" onClick={() => setCurrentQuiz(flickpick.id)}>
                                <img src={chicken} alt={flickpick.name} />
                                <h4 className="card-title">{flickpick.name}</h4>
                                <p className="card-description">{flickpick.description}</p>
                            </div>
                        ))}
                </div>
            </div>
        ) : (
            <FlickpickQuiz quizId={currentQuiz} onBack={() => setCurrentQuiz(null)} />
        )}
    </div>
  );
}