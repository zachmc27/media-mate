import React from "react";
import "../styles/MatchCard.css";
// import chicken from "../assets/strangerthings.jpg"

interface ToWatchCardProps {
    title: string;
    year: number;
    cover: string;
    mediaId: number;
    onRemove: (mediaId: number) => void;
    onMoveToSeenIt: (mediaId: number) => void;
}

const ToWatchCard: React.FC<ToWatchCardProps> = ({
    title,
    year,
    cover,
    mediaId,
    onMoveToSeenIt,
}) => {
    return (
      <div className="card">
        <img src={cover} alt={title} />
        <div className="card-container">
          <b className="card-title">{title}</b>
          <i className="card-year">{year}</i>
          <button onClick={() => onMoveToSeenIt(mediaId)}>Seen</button>
        </div>
      </div>
    );
};
  
export default ToWatchCard;