import "../styles/Flickpicks.css";
import { useEffect, useState } from "react";
import FlickpickQuiz from "../components/FlickpickQuiz";
import { getFlickPicksList } from "../api/flickPicksAPI";
import { Flickpick } from "../interfaces/FlickpickInterface";
import useAuthRedirect from "../utils/useAuthRedirect";
import drama from "../assets/DramaListIcon.png";
import horror from "../assets/HORROR.png";
import comedy from "../assets/COMEDY.png";
import action from "../assets/ACTION.png";
import romance from "../assets/ROMANCE.png";
import thriller from "../assets/THRILLER.png";
import fantasy from "../assets/FANTASY.png";
import scifi from "../assets/SCIFI.png";
import { motion } from "framer-motion";



export default function Flickpicks() {
        const [currentQuiz, setCurrentQuiz] = useState<number | null>(null);
        const [flickpickList, setFlickpickList] = useState<Flickpick[] | null>(null);
        const [error, setError] = useState<string | null>(null);
        const [loading, setLoading] = useState<boolean>(true);
        const [width, setWidth] = useState(window.innerWidth);
        useAuthRedirect();


        useEffect(() => {
            const handleResize = () => setWidth(window.innerWidth);
        
            window.addEventListener("resize", handleResize);
            
            return () => window.removeEventListener("resize", handleResize);
          }, []);

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
            <motion.div className="flickpicks"
            initial= {{
                y: "10%",
                opacity: 0
              }}
              animate={{
                y: "0%",
                opacity: 1
              }}
              transition={{
                duration: .5,
                type: "spring"
              }}>

                <p className={ width > 768 ? "title-xl-acc welc-txt work-sans" : "title-lg-acc welc-txt work-sans"}>WELCOME TO FLICKPICKS</p>
                <p className="info-blurb poppins">Flickpicks are short surveys that give you a list of movies and shows
                    that you decide whether or not you want to watch. Swipe up for yes and down for no. 
                    After completing a flickpick, compare it with a friends flickpick to get a matched list of 
                    shared answers! 
                </p>
                <div className="cards-row">
                        {flickpickList === null ? (
                            <p className="error poppins">Error, no flickpick lists available</p>
                        ) : (
                            flickpickList.map((flickpick) => (

                                <div key={flickpick.id} className="card" onClick={() => setCurrentQuiz(flickpick.id)}>

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
                                    <p className="card-description poppins">{flickpick.description}</p>

                                </div>
                            ))
                        )}  
                </div>
            </motion.div>
        ) : (
            <FlickpickQuiz quizId={currentQuiz} onBack={() => setCurrentQuiz(null)} />
        )}
    </div>
  );
}