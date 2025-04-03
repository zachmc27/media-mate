import React from "react";
import "../styles/MatchCard.css";

interface CollabListCardProps {
    title: string;
    year: number;
    cover: string;
    mediaId: number;
    detailsModal: (mediaId: number) => void;
}

const CollabListCard: React.FC<CollabListCardProps> = ({
    title,
    year,
    cover,
    mediaId,
    detailsModal,
}) => {
    return (
      <div className="cover">
        <img src={cover} alt={title} onClick={() => detailsModal(mediaId)}/>
        <div className="card-container">
          <b className="card-title">{title}</b>
          <i className="card-year">{year}</i>
        </div>
      </div>
    );
};
  
export default CollabListCard;