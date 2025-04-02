import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useDrag } from "react-use-gesture";
import { FlickpickSession } from "../interfaces/FlickpickInterface";
import { mediaInfo } from "../api/mediaAPI";
import { createFlickPickMatchingList, submitMatchListResponses } from "../api/flickPicksAPI";
import auth from '../utils/auth';
import { addMediaToWatch } from "../api/toWatchAPI";
import DetailsModal from "../components/DetailsModal";

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
    const [flickpickAnswers, setFlickpickAnswers] = useState<number[]>([]); 
    const [flickpickMediaList, setFlickpickMediaList] = useState<FlickpickSession | null>(null);
    const [flickpickId, setFlickpickId] = useState<number | null>(null);
    const controls = useAnimation();
    const decisionMadeRef = useRef(false);
    const [dragDirection, setDragDirection] = useState<"none" | "up" | "down">("none");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedMediaId, setSelectedMediaId] = useState<number | null>(null); 

    // get userId and store it in a constant
    useEffect(() => {
        const id = auth.getUserId();
        setUserId(id);
    }, []);

    // Create and fetch the flickpick match session
    useEffect(() => {
        if (!userId) return;
        const fetchFlickPickList = async () => {
            try {
                const data = await createFlickPickMatchingList(userId!, quizId);
                if (data!) {
                    setFlickpickMediaList(data);
                    setFlickpickId(data.id);
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

    // Console log the latest fetch media item
    // useEffect(() => {
    //     if (flickpickMediaList) {
    //         console.log("Fetched media item: ", flickpickMediaList);
    //     }
    // }, [flickpickMediaList]);

    // Allow for iteration through the movies in the flickpick session, and get details.
    useEffect(() => {
        if (flickpickMediaList) {
            const mediaId = flickpickMediaList.listOfChoices?.[currentChoice];
            if (mediaId !== undefined) {
                getDetails(mediaId, 'movie');
            }
        }
    }, [currentChoice, flickpickMediaList]);

    //Reset decision made so that the next choice works again.
    useEffect(() => {
        decisionMadeRef.current = false; // Reset for the next choice
    }, [currentChoice]);

    // Modal Functionality
    const openModal = (mediaId: number) => {
        setSelectedMediaId(mediaId);
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
        setSelectedMediaId(null);
    };

    // Making a get details API call for each movie as they are displayed.
    const getDetails = async (mediaId: number, type: string) => {
        try {
            const response = await mediaInfo(mediaId, type);
            setMediaDetails(response);
        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    };

    // // Console logging choices
    // useEffect(() => {
    //     console.log("Updated mediaDetails: ", mediaDetails);
    //     console.log("Updated Selected list: ", flickpickAnswers)
    //     console.log(flickpickMediaList);
    //     console.log(flickpickId);
    // }, [mediaDetails]);    

    // This is the motion functionality on the quiz
    const bind = useDrag(({ movement: [, my], down }) => {
        const dragThreshold = 200;  // How far you need to drag the image

        if (!down) {
            if (my < -dragThreshold && !decisionMadeRef.current) {
                console.log("True");
                const mediaId: number | undefined = flickpickMediaList!.listOfChoices?.[currentChoice];
                if (typeof mediaId === 'number') {
                addMediaToWatch(userId!, mediaId );
                setFlickpickAnswers(prevAnswers => [...prevAnswers, mediaId]);
            }
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
         // Make the API call to submit the answers
            try {
                console.log("Submitting answers:", flickpickAnswers);
                await submitMatchListResponses(flickpickId!, flickpickAnswers, userId!);
            } catch (error) {
                console.error("Error pushing Flickpick answers");
                setError("An error occurred while pushing Flickpick answers.");
            }
            alert("Answers submitted!");
            setFlickpickAnswers([]);
            setFlickpickId(null);
            onBack();
    };
    if (loading) return <p>Loading your To Watch list...</p>;
    if (error) return <p className="error">{error}</p>;
    const isQuizNotFound = !flickpickMediaList || !flickpickMediaList.listOfChoices;
    return (
        <div className="flickpicks card-info-container">
        {isQuizNotFound ? (
            <p className="Error">Quiz not found.</p>
        ) : (
            <>
                <motion.div {...bind()} className="physics" animate={controls}>
                    {mediaDetails && currentChoice < flickpickMediaList!.listOfChoices!.length - 1 ? (
                        <div className="flickpicksCard">
                            <img src={`https://image.tmdb.org/t/p/w500${mediaDetails.poster_path}`} alt={mediaDetails.title} draggable={false}/>
                            <div className="card-info-container">
                                <b className="title-md-light card-title">{mediaDetails.title}</b>
                                <i className="card-year">{mediaDetails.year}</i>
                            </div>

                            <div className="marks">
                    {dragDirection === "up" && <span className="green-check">✅</span>}
                    {dragDirection === "down" && <span className="red-cross">❌</span>}
                </div>

                <div className="btn-container">
                    <button className="detailsButton btn-fill" onClick={() => openModal(mediaDetails!.id)}>Details</button>
                    <button className="backButton btn-lined" onClick={onBack}>Back</button>
                </div>
                        </div>
                    ) : (
                        <button className="submitButton" onClick={submitAnswers}>Submit Answers</button>
                    )}
                </motion.div>

                
            </>
        )}
              {showModal && <DetailsModal mediaId={selectedMediaId!} onClose={closeModal} />}
    </div>
    );
}