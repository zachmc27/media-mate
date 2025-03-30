import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useDrag } from "react-use-gesture";
import { FlickpickArray } from "../interfaces/FlickpickInterface";
import { mediaInfo } from "../api/mediaAPI";

interface FlickpickQuizProps {
    quizId: number;
    onBack: () => void;
}

interface MediaDetails {
    id: number;
    title: string;
    year: number;
    poster_path: string;  // This matches the 'cover' field from your data
}

export default function FlickpickQuiz({ quizId, onBack }: FlickpickQuizProps) {
    const [currentChoice, setCurrentChoice] = useState(0);
    const [mediaDetails, setMediaDetails] = useState<MediaDetails | null>(null);
    const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>([]); 
    const controls = useAnimation();
    const decisionMadeRef = useRef(false);
    const [dragDirection, setDragDirection] = useState<"none" | "up" | "down">("none");

    // The flickpick array should come in through here, right now it's just a static array
    const flickpickQuizData: FlickpickArray = { 
        Flickpicks: [
            {
                id: 1,
                name: "Action",
                listOfChoices: [1125899, 1165067, 1373723, 822119, 1229730],
                description: "Amazing action flicks",
            },
            {
                id: 2,
                name: "Animation",
                listOfChoices: [762509, 1241982, 1297763, 1104845, 823219],
                description: "Incredible Animation Movies",
            },
        ]};

    // Determine which flickpick quiz has been selected
    const selectedQuiz = flickpickQuizData.Flickpicks.find((quiz) => quiz.id === quizId);
    if (!selectedQuiz) return <p className="Error">Quiz not found.</p>;

    // Iterate through the items in the flickpick quiz
    useEffect(() => {
        getDetails(selectedQuiz.listOfChoices[currentChoice], 'movie');
    }, [currentChoice]);

    // Making an API call for each movie as they are displayed.
    const getDetails = async (mediaId: number, type: string) => {
        console.log("getting details:" + mediaId + type);
        try {
            const response = await mediaInfo(mediaId, type);
            console.log("mediaInfo called, response: " + response);
            setMediaDetails(response);
            console.log(mediaDetails);
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    };    

    // This is the motion functionality on the quiz
    const bind = useDrag(({ movement: [, my], down }) => {
        const dragThreshold = 200;  // How far you need to drag the image

        if (!down) {
            if (my < -dragThreshold && !decisionMadeRef.current) {
                console.log("True");
                setDragDirection("up");
                decisionMadeRef.current = true; 
            }
            else if (my > dragThreshold && !decisionMadeRef.current) {
                console.log("False");
                setDragDirection("down");
                decisionMadeRef.current = true; 
            }
            if (decisionMadeRef.current) {
                setCurrentChoice((prev) => Math.min(prev + 1, selectedQuiz.listOfChoices.length - 1));
                controls.start({ y: 0, opacity: 1 });
            }
        } else {
          setDragDirection("none");
          controls.start({ y: down ? my : 0 });
        }
    });

    // Function to submit answers needs a submit API still
    const submitAnswers = async () => {
        try {
            // Make the API call to submit the answers
            console.log("Submitting answers:", selectedAnswers);
            // Replace with the API call to submit answers
            // const response = await submitAnswersToAPI(selectedAnswers);
            alert("Answers submitted!");
        } catch (error) {
            console.error("Error submitting answers:", error);
        }
    };

    return (
        <div className="flickpicks">
            <motion.div
                {...bind()}
                className="physics"
                animate={controls}
                initial={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
            {mediaDetails && currentChoice < selectedQuiz.listOfChoices.length - 1 ? (
                <div className="flickpicksCard">
                    <img src={mediaDetails.poster_path} alt={mediaDetails.title} draggable={false}/>
                    <div className="card-container">
                        <b className="card-title">{mediaDetails.title}</b>
                        <i className="card-year">{mediaDetails.year}</i>
                    </div>
                </div>
          ) : (
            <button className="submitButton" onClick={submitAnswers}>
            Submit Answers
            </button>
          )}
        </motion.div>

        {/* Attempt at making Check/ X marks based on drag direction */}


                    <div
                className="marks"
                style={{ transform: "translateY(-50%)" }}
            >
                {dragDirection === "up" && (
                    <span
                        style={{
                            color: "green",
                            fontSize: "2rem",
                            position: "absolute",
                            top: "30%",
                            left: "20px",
                        }}>
                            ✅
                    </span>
                )}
                {dragDirection === "down" && (
                    <span
                        style={{
                            color: "red",
                            fontSize: "2rem",
                            position: "absolute",
                            top: "30%",
                            right: "20px",
                        }}>
                            ❌
                    </span>
                )}
            </div>
        {/* Navigation Buttons */}

        <div className="button" style={{position: "absolute", bottom: "20px"}}>
          <button className="backButton" onClick={onBack}>
            Back
          </button>
        </div>
      </div>
    );
  }