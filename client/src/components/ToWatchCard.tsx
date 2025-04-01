import React from "react";
import "../styles/MatchCard.css";

interface ToWatchCardProps {
    title: string;
    year: number;
    cover: string;
    mediaId: number;
    detailsModal: (mediaId: number) => void;
    seenIt: (mediaId: number) => void;
    onRemove: (mediaId: number) => void;
}

const ToWatchCard: React.FC<ToWatchCardProps> = ({
    title,
    year,
    cover,
    mediaId,
    detailsModal,
    seenIt,
    onRemove,
}) => {
    return (
      <div className="card">
        <img src={cover} alt={title} onClick={() => detailsModal(mediaId)}/>
        <div className="card-container">
          <b className="card-title">{title}</b>
          <i className="card-year">{year}</i>
          <button onClick={() => seenIt(mediaId)}>Seen</button>
          <button onClick={() => onRemove(mediaId)}>Remove</button>
        </div>
      </div>
    );
};
  
export default ToWatchCard;