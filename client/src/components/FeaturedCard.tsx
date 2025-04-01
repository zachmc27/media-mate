import "../styles/FeaturedCard.css"
import ReactPlayer from "react-player"
import { useEffect, useState } from "react";
import Media from "../interfaces/Media.tsx";
//import auth from '../utils/auth';
import { mediaInfo, discoverMedia } from "../api/mediaAPI.tsx";

export default function FeaturedCard() {
    const [mediaArray, setMediaArray] = useState<Media[]>([]);  
    const [mediaItem, setMediaItem] = useState<Media>();
    const [trailerURL, setTrailerURL] = useState<string>('');

    useEffect(() => {
        const fetchArray = async () => {
          try {
            const arrayData = await discoverMedia();
            setMediaArray(arrayData);
          } catch (error) {
            console.error("Error fetching media array:", error);
          }
        }
        fetchArray();
      }, []);

      const fetchOneMedia = async (mediaId: number) => {
        try {
            const data = await mediaInfo(mediaId, "movie");
            if (data?.trailerKey) {
                setMediaItem(data);
            } else {
                console.warn("No trailer found, picking another movie...");
                pickRandomMovie(); // Try another random movie
            }
        } catch (error) {
            console.error("Error fetching media:", error);
        }
    };

    const pickRandomMovie = () => {
      if (mediaArray.length === 0) return;

      const randomIndex = Math.floor(Math.random() * mediaArray.length);
      const randomMedia = mediaArray[randomIndex];

      fetchOneMedia(randomMedia.id);
    };

    useEffect(() => {
      if (mediaArray.length > 0) {
          pickRandomMovie();
      }
    }, [mediaArray]);

    useEffect(() => {
        if (mediaItem) {
            console.log("Fetched media item: ", mediaItem);
            setTrailerURL(`https://www.youtube.com/watch?v=${mediaItem.trailerKey}`);
        }
    }, [mediaItem]);      


  return (
    <div className="featured-box">
      <div className="label-box">
      <h1 className="label">Featured</h1>
      </div>
      <div className="video">
        <ReactPlayer 
         url={trailerURL}
         playing
         muted
         controls={true}
         width="100%"
         height="100%"
 
         ></ReactPlayer>
      </div>
      <div className="info">
        <h2>{mediaItem?.title}</h2>
        <p>{mediaItem?.year}</p>
        <p>{mediaItem?.overview}</p>
        <p>{mediaItem?.cast}</p>
      </div>
    </div>
  )
}
