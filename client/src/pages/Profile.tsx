import "../App.css";
import "../styles/Profile.css";
import { retrieveOneUser } from "../api/userAPI";
import auth from "../utils/auth";
import chicken from "../assets/chicken.jpg";
import SeenItList from "../components/SeenIt";
import ToWatchList from "../components/ToWatch";
import CollabsList from "../components/Collab";
import Actionmodal from "../components/Actionmodal";
import { useState, useEffect } from "react";
import useAuthRedirect from "../utils/useAuthRedirect";

export default function Profile() {
    const [currentList, setCurrentList] = useState<string>('watchLater');
    const [userData, setUserData] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useAuthRedirect();
    //const iconImages = [blueIcon, orangeIcon];
    
    // Log out modal functions
    const openLogOutModal = () =>{
      setIsModalOpen(true)
    }

    const confirmLogOut = () => {
      auth.logout();
      setIsModalOpen(false);
  }

    const cancelLogOut = () => {
      setIsModalOpen(false);
  }
    
  // Nav routes
    const handleCollabClick = () => {
        setCurrentList('collab');
      };
    
      const handleWatchLaterClick = () => {
        setCurrentList('watchLater');
      };
    
      const handleSeenItClick = () => {
        setCurrentList('seenIt');
      };

      // populate user profile with user info
      useEffect(() => {
        const fetchUserData = async () => {
          const userId = auth.getUserId();
            if (!userId) {
              console.error("User ID is null. Cannot retrieve user data.");
              return;
            }
            try {
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
            <img src={userData?.icon || chicken} alt="avatar" />
            {/* <h1>Profile</h1> */}
            <b className="title-md-acc work-sans">{userData?.name || 'First Last'}</b> 
            <p className="p-dark poppins">{userData?.username || 'username'}</p>
            <p className="p-dark poppins">ID: {userData?.id || 'id'}</p>
            <ul>
                <li><a className="poppins" href="#" onClick={handleCollabClick}>Collab List</a></li>
                <li><a className="poppins" href="#" onClick={handleWatchLaterClick}>Watch Later</a></li>
                <li><a className="poppins" href="#" onClick={handleSeenItClick}>Seen It</a></li>
            </ul>
            
            {/* Log out modal */}
            { isModalOpen && (
                <Actionmodal cancel={cancelLogOut} confirm={confirmLogOut}>
                        <p>Are you sure you want to log out?</p>
                </Actionmodal>
                    )
            
            }
            <button className="btn-lined-drk poppins" onClick={openLogOutModal}>Log Out</button>
        </div>
        <div className="profile-list-container">
            {/* Conditionally render based on currentList state */}
            {currentList === 'collab' && (
                <div className="list-container">
                    <CollabsList />
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