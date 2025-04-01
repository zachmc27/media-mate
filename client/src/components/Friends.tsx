import "../styles/Friends.css"
import Friendlist from "./Friendlist"
import PendingFriends from "./PendingFriends"
import { sendFriendRequest } from "../api/friendAPI";
import { useEffect, useState } from "react";
import sendIcon from "../assets/send-horizontal.svg"

export default function Friends() {
const [userId, setUserId] = useState<number>(0)
const [friendCode, setFriendCode] = useState<number>(0);

 useEffect(() => {
    async function fetchData() {
        const fetchedId = await localStorage.getItem('user_Id')
        ? JSON.parse(localStorage.getItem('user_Id') as string)
        : null

        if (fetchedId) {
            try {
             await setUserId(fetchedId)
           
            } catch (error) {
              console.error("Error fetching id:", error);
            }
          }
    }
    fetchData();
 }, []);

 async function handleSendRequest() {
  if(typeof friendCode !== "number") {
    alert('Please enter a valid friend code.')
    return;
  }

  try {
    console.log('friend', friendCode);
    console.log('user', userId);
    if (friendCode !== userId) {
       await sendFriendRequest(userId, friendCode);
    alert(`Friend request sent to ${friendCode}!`)
    setFriendCode(0);
    } else if (friendCode === userId) {
      alert('Cannot send friend request to yourself.')
    } else {
      alert('Error sending friend request.')
    }
   
  } catch (error) {
    console.error('Error sending friend request', error);
    alert('Failed to send request. Please try again.')
  }
 }
 
  return (
    <div className="list-box">
        <div className="add-friend">
          <input 
          type="text" 
          placeholder="Friend code ..."
          onChange={(e) => setFriendCode(parseInt(e.target.value))}/>
          <button type="submit" onClick={handleSendRequest}>
            <img src={sendIcon} alt="" className='send-icon'/>
          </button>
        </div>
        <PendingFriends />
        <Friendlist />
        
    </div>
  )
}
