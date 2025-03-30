import "../App.css";
import "../styles/Profile.css";
import chicken from "../assets/chicken.jpg"
import SeenItList from "../components/SeenIt";
import ToWatchList from "../components/ToWatch";
import { useState } from "react";

export default function Profile() {
    const [currentList, setCurrentList] = useState<string>('collab');
    const handleCollabClick = () => {
        setCurrentList('collab');
      };
    
      const handleWatchLaterClick = () => {
        setCurrentList('watchLater');
      };
    
      const handleSeenItClick = () => {
        setCurrentList('seenIt');
      };

  return (
    <div className="profile-container">
        <div className="profile-user">
            <img src={chicken} alt="Chicken" />
            <b>First Last</b> 
            <p>username</p>
            <ul>
                <li><a href="#" onClick={handleCollabClick}>Collab List</a></li>
                <li><a href="#" onClick={handleWatchLaterClick}>Watch Later</a></li>
                <li><a href="#" onClick={handleSeenItClick}>Seen It</a></li>
            </ul>
            <button>Log Out</button>
        </div>
        <div className="profile-list-container">
            {/* Conditionally render based on currentList state */}
            {currentList === 'collab' && (
                <div className="list-container">
                    <p>Brett + Misha</p>
                    <div className="movies-container">
                        <p>Collab cards to appear here.</p>
                    </div>
                </div>
            )}
            {currentList === 'watchLater' && (
                <div className="list-container">
                    <ToWatchList />
                </div>
            )}
            {currentList === 'seenIt' && (
                <div className="list-container">
                    <SeenItList />
                </div>
            )}
        </div>
    </div>
  );
}