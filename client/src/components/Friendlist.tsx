import user from "../assets/user.svg"
import "../styles/Friendlist.css"
import { fetchFriends } from "../api/friendAPI";
import { useEffect, useState } from "react";
import { UserData } from "../interfaces/UserData";
import Actionmodal from "./Actionmodal";

export default function Friendlist() {
 const [friends, setFriends] = useState<UserData[]>([])
 const [loading, setLoading] = useState(false);
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [selectedFriend, setSelectedFriend] = useState<UserData | null>(null)

 useEffect(() => {
    async function fetchData() {
        const userId = localStorage.getItem('user_Id')
        ? JSON.parse(localStorage.getItem('user_Id') as string)
        : null

        if (userId) {
            try {
              const fetchedList = await fetchFriends(userId);
              setFriends(fetchedList); 
            } catch (error) {
              console.error("Error fetching friends:", error);
            }
          }
          setLoading(false)
    }

    fetchData();
 }, []);

const handleDeleteClick = (friend: UserData) => {
    setSelectedFriend(friend);
    setIsModalOpen(true)
};

const confirmDelete = () => {
    if (selectedFriend) {
        setFriends(friends.filter((f) => f.id !== selectedFriend.id));
        setSelectedFriend(null);
        //modify the code above later to remove the friend from the users database object
        setIsModalOpen(false);
    }
};

const cancelDelete = () => {
    setSelectedFriend(null);
    setIsModalOpen(false);
}

 if (loading) {
    return <div>Loading...</div>
 }


  return (
    <div className="friendlist">
        {friends.map((friend, index) => (
            <div className="friend" key={index}>
            <img src={user} alt="users-avatar" />
            <p>{friend.username}</p>
            <div className="buttons">
            <button>Match</button>
            <button onClick={() => handleDeleteClick(friend)}>Delete</button>
            </div>
        </div>
        ))}
        { isModalOpen && (
            <Actionmodal cancel={cancelDelete} confirm={confirmDelete}>
            <p>Are you sure you want to delete {selectedFriend?.username}?</p>
        </Actionmodal>
        )

        }
        
    </div>
  )
}
