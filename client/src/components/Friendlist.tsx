import user from "../assets/user.svg"
import "../styles/Friendlist.css"
import { deleteFriend, fetchFriends } from "../api/friendAPI";
import { useEffect, useState } from "react";
import { UserData } from "../interfaces/UserData";
import { MatchList } from "../interfaces/FlickpickInterface";
import Actionmodal from "./Actionmodal";
import { initiateFlickPickMatching, getFlickPickListMatchingSessions } from "../api/flickPicksAPI";
// import { retrieveUser } from "../api/userAPI";

export default function Friendlist() {
 const [friends, setFriends] = useState<UserData[]>([])
 const [loading, setLoading] = useState(false);
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [selectedFriend, setSelectedFriend] = useState<UserData | null>(null);
 const [userId, setUserId] = useState(0);
 const [isFlickListOpen, setFlickListOpen] = useState(false)
 const [selectedList, setSelectedList] = useState<number | null>(null)
 const [matchListsCompleted, setMatchListsCompleted] = useState<MatchList[] | null>(null);

 useEffect(() => {
    async function fetchData() {
        const id = localStorage.getItem('user_Id')
        ? JSON.parse(localStorage.getItem('user_Id') as string)
        : null

        if (id) {
            try {
              const fetchedList = await fetchFriends(id);
              setFriends(fetchedList); 
              setUserId(parseInt(id))
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

const cancel = () => {
    setSelectedFriend(null);
    setIsModalOpen(false);
    setFlickListOpen(false)
}

const handleMatchClick = async (friend: UserData) => {
  setSelectedFriend(friend)
  // console.log("Friend: " + friend.id);
  setFlickListOpen(true)
}

// Populates list of available match genres
useEffect(() => {
    const getMatchingLists = async (userId: number) => {
        try {
            const response = await getFlickPickListMatchingSessions(userId);
            setMatchListsCompleted(response);
        } catch (error) {
            console.error("Error fetching match lists:", error);
        }
    };
    getMatchingLists(userId)
}, [userId])

useEffect(() => {
  console.log("my match lists: " + matchListsCompleted);
}, [matchListsCompleted])

const handleFlickClick = async (selection: number) => {
  setSelectedList(selection)
}

const matchLists = async () => {
  if (!selectedFriend || selectedList === null) {
    console.error("Error: Friend or list selection is missing.");
    return;
  }
  if (!selectedFriend.id) {
    console.error("Error: Friend id is missing.");
    return;
  }
  alert(`Matching ${selectedFriend.username!}...`)
  try {
    await initiateFlickPickMatching(userId!, selectedFriend.id, selectedList);
    console.log("FlickPick match created");
  } catch (error) {
    console.error("Error creating match list");
  }
  setSelectedFriend(null);
  setSelectedList(null);
  setFlickListOpen(false)
}

 if (loading) {
    return <div>Loading...</div>
 }

  return (
    <div className="friendlist">
        {friends.map((friend, index) => (
            <div className="friend" key={index}>
            <img src={user} alt="users-avatar" />
            <p className="poppins">{friend.username}</p>
            <div className="buttons">
            <button className="btn-fill" onClick={() => handleMatchClick(friend)}>Match</button>
            <button className="btn-lined" onClick={() => handleDeleteClick(friend)}>Delete</button>
            </div>
        </div>
        ))}
        { isModalOpen && (
            <Actionmodal cancel={cancel} confirm={confirmDelete}>
            <p>Are you sure you want to delete {selectedFriend?.username}?</p>
        </Actionmodal>
        )
        }
        {
          isFlickListOpen && (
            <Actionmodal cancel={cancel} confirm={matchLists}>
              <p>Which list would you like to compare?</p>
              <ul className="flicklist">
              {matchListsCompleted ? 
              matchListsCompleted.map((item: MatchList) => (
                <button className="flicklist-item" onClick={() => {handleFlickClick(item.flickPickListId)}}>{item.flickPickListName}</button>   
              )
              ) : (<li>You don't have any completed flickpicks.</li> )}             
              </ul>
            </Actionmodal>
          )
        }
        
    </div>
  )
}
