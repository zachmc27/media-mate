import "../App.css";
import "../styles/Profile.css";
import { retrieveOneUser } from "../api/userAPI";
import auth from "../utils/auth";
import chicken from "../assets/chicken.jpg";
//import blueIcon from "../assets/profileIcon_01.png";
//import orangeIcon from "../assets/profileIcon_02.png";
import SeenItList from "../components/SeenIt";
import ToWatchList from "../components/ToWatch";
import { useState, useEffect } from "react";



export default function Profile() {
    const [currentList, setCurrentList] = useState<string>('watchLater');
    const [userData, setUserData] = useState<any>(null);
    //const iconImages = [blueIcon, orangeIcon];
    
    const handleCollabClick = () => {
        setCurrentList('collab');
      };
    
      const handleWatchLaterClick = () => {
        setCurrentList('watchLater');
      };
    
      const handleSeenItClick = () => {
        setCurrentList('seenIt');
      };

      useEffect(() => {
        const fetchUserData = async () => {
            try {
              const userId = auth.getUserId();
              if (userId === null) {
                console.error("User ID is null. Cannot retrieve user data.");
                return;
              }
              // Await the result of retrieveOneUser
              const data = await retrieveOneUser(userId);
              setUserData(data); // Set the resolved user data
              
            } catch (err) {
              console.error("Error fetching user data:", err);
            }
          };
        
          fetchUserData();
          
      }, []);
 

  return (
    <div className="profile-container">
        <div className="profile-user">
            <img src={userData?.icon || chicken} alt="Chicken" />
            {/* <h1>Profile</h1> */}
            <b>{userData?.name || 'First Last'}</b> 
            <p>{userData?.username || 'username'}</p>
            <p>ID: {userData?.id || 'id'}</p>
            <ul>
                <li><a href="#" onClick={handleCollabClick}>Collab List</a></li>
                <li><a href="#" onClick={handleWatchLaterClick}>Watch Later</a></li>
                <li><a href="#" onClick={handleSeenItClick}>Seen It</a></li>
            </ul>
            <button onClick={auth.logout}>Log Out</button>
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