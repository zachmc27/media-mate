import React from "react";
import "../styles/MatchCard.css";

interface ToWatchCardProps {
    title: string;
    year: number;
    cover: string;
    mediaId: number;
    detailsModal: (mediaId: number) => void;
}

const ToWatchCard: React.FC<ToWatchCardProps> = ({
    title,
    year,
    cover,
    mediaId,
    detailsModal,
}) => {
    return (
      <div className="card">
        <img src={cover} alt={title} onClick={() => detailsModal(mediaId)}/>
        <div className="card-container">
          <b className="card-title">{title}</b>
          <i className="card-year">{year}</i>
        </div>
      </div>
    );
};
  
export default ToWatchCard;