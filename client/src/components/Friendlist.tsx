import user from "../assets/user.svg"
import "../styles/Friendlist.css"
import { deleteFriend, fetchFriends } from "../api/friendAPI";
import { useEffect, useState } from "react";
import { UserData } from "../interfaces/UserData";
import Actionmodal from "./Actionmodal";
// import { retrieveUser } from "../api/userAPI";


export default function Friendlist() {
 const [friends, setFriends] = useState<UserData[]>([])
 const [loading, setLoading] = useState(false);
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [selectedFriend, setSelectedFriend] = useState<UserData | null>(null);
 const [userId, setUserId] = useState(0)


 useEffect(() => {
    async function fetchData() {
        const id = localStorage.getItem('user_Id')
        ? JSON.parse(localStorage.getItem('user_Id') as string)
        : null

        if (id) {
            try {
              const fetchedList = await fetchFriends(id);
              setFriends(fetchedList); 
              await setUserId(parseInt(id))
            } catch (error) {
              console.error("Error fetching friends:", error);
            }
          } else {
            console.error('No user ID found in localStorage.')
          }
          setLoading(false)
    }

    fetchData();
 }, []);

const handleDeleteClick = (friend: UserData) => {
    setSelectedFriend(friend);
    setIsModalOpen(true)
};

const confirmDelete = async () => {
    if (selectedFriend) {
        setFriends(friends.filter((f) => f.id !== selectedFriend.id));
        setSelectedFriend(null);
        deleteFriend(userId, selectedFriend.id )
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
