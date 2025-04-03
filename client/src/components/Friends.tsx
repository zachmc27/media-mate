import "../styles/Friends.css"
import Friendlist from "./Friendlist"
import PendingFriends from "./PendingFriends"
import { sendFriendRequest } from "../api/friendAPI";
import { useEffect, useState } from "react";
import sendIcon from "../assets/send-horizontal.svg"
import { retrieveOneUser } from "../api/userAPI";
import {  motion } from "framer-motion";

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
  const user = await retrieveOneUser(userId)

  console.log('current user data: ', user)
  if(typeof friendCode !== "number") {
    setFriendCode(0)
    alert('Please enter a valid friend code.')
    return;
  }
  if (user.friends.includes(friendCode)) {
    
    setFriendCode(0)
    alert('User is already your friend.');
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
      setFriendCode(0)
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
    <motion.div className="list-box"
    initial= {{
      opacity: "0%",
      x: "100%"
    }}
    animate= {{
      opacity: "100%",
      x: 0
    }}
    exit= {{
      opacity: 0,
      x: "100%"
    }}
    transition={{
      duration: .5,
      ease: "easeIn"
    }}>
        <div className="add-friend">
          <input 
          className="poppins add-input"
          type="text" 
          placeholder="Friend code ..."
          value={friendCode > 0 ? friendCode : ''}
          onChange={(e) => setFriendCode(parseInt(e.target.value))}/>
          <button className="btn-fill submit" type="submit" onClick={handleSendRequest}>
            <img src={sendIcon} alt="send message icon" className='send-icon'/>
          </button>
        </div>
        <PendingFriends />
        <Friendlist />
    </motion.div>
  )
}
