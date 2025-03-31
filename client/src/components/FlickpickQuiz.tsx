import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useDrag } from "react-use-gesture";
import { FlickpickSession } from "../interfaces/FlickpickInterface";
import { mediaInfo } from "../api/mediaAPI";
import { createFlickPickListMatchingSession } from "../api/flickPicksAPI";
import auth from '../utils/auth';

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
    const [userId, setUserId] = useState<number | null>(null);
    const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>([]); 
    const [flickpickMediaList, setFlickpickMediaList] = useState<FlickpickSession | null>(null);
    const controls = useAnimation();
    const decisionMadeRef = useRef(false);
    const [dragDirection, setDragDirection] = useState<"none" | "up" | "down">("none");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const id = auth.getUserId();
        setUserId(id);
    }, []);

    useEffect(() => {
        if (!userId) return;
        const fetchFlickPickList = async () => {
            try {
                const data = await createFlickPickListMatchingSession(userId!, 2, quizId);
                if (data!) {
                    setFlickpickMediaList(data);
                } else {
                    setError("Failed to fetch data.");
                }
            } catch (error) {
                console.error("Error fetching Flickpick data:", error);
                setError("An error occurred while fetching flickpick data.");
            } finally {
                setLoading(false);
            }
        };
        fetchFlickPickList();
    }, [userId, quizId]); 
    
    useEffect(() => {
        if (flickpickMediaList) {
            console.log("Fetched media item: ", flickpickMediaList);
        }
    }, [flickpickMediaList]);

    useEffect(() => {
        if (flickpickMediaList) {
            const mediaId = flickpickMediaList.listOfChoices?.[currentChoice];
            if (mediaId !== undefined) {
                getDetails(mediaId, 'movie');
            }
        }
    }, [currentChoice, flickpickMediaList]);

    // Making an API call for each movie as they are displayed.
    const getDetails = async (mediaId: number, type: string) => {
        try {
            const response = await mediaInfo(mediaId, type);
            setMediaDetails(response);
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    };
    useEffect(() => {
        console.log("Updated mediaDetails: ", mediaDetails);
    }, [mediaDetails]);    

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
                setCurrentChoice((prev) => Math.min(prev + 1, flickpickMediaList!.listOfChoices!.length - 1));
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
            onBack();
        } catch (error) {
            console.error("Error submitting answers:", error);
        }
    };
    if (loading) return <p>Loading your To Watch list...</p>;
    if (error) return <p className="error">{error}</p>;
    const isQuizNotFound = !flickpickMediaList || !flickpickMediaList.listOfChoices;
    return (
        <div className="flickpicks">
        {isQuizNotFound ? (
            <p className="Error">Quiz not found.</p>
        ) : (
            <>
                <motion.div {...bind()} className="physics" animate={controls}>
                    {mediaDetails && currentChoice < flickpickMediaList!.listOfChoices!.length - 1 ? (
                        <div className="flickpicksCard">
                            <img src={mediaDetails.poster_path} alt={mediaDetails.title} draggable={false}/>
                            <div className="card-container">
                                <b className="card-title">{mediaDetails.title}</b>
                                <i className="card-year">{mediaDetails.year}</i>
                            </div>
                        </div>
                    ) : (
                        <button className="submitButton" onClick={submitAnswers}>Submit Answers</button>
                    )}
                </motion.div>

                <div className="marks">
                    {dragDirection === "up" && <span className="green-check">✅</span>}
                    {dragDirection === "down" && <span className="red-cross">❌</span>}
                </div>

                <div className="button">
                    <button className="backButton" onClick={onBack}>Back</button>
                </div>
            </>
        )}
    </div>
    );
}