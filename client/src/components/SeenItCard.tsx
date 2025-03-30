import React from "react";
import "../styles/MatchCard.css";
// import chicken from "../assets/strangerthings.jpg"

interface SeenItCardProps {
    title: string;
    year: number;
    cover: string;
    mediaId: number;
    onRemove: (mediaId: number) => void;
}

const SeenItCard: React.FC<SeenItCardProps> = ({
    title,
    year,
    cover,
    mediaId,
    onRemove,
}) => {
    return (
      <div className="card">
        <img src={cover} alt={title} />
        <div className="card-container">
          <b className="card-title">{title}</b>
          <i className="card-year">{year}</i>
          <button onClick={() => onRemove(mediaId)}>Remove</button>
        </div>
      </div>
    );
};
  
export default SeenItCard;