import { retrieveUser } from "../api/userAPI";
import { fetchPendingFriends, acceptFriendRequest, rejectFriendRequest } from "../api/friendAPI";
import { UserData } from "../interfaces/UserData";
import { PendingData } from "../interfaces/PendingData";
import { useEffect, useState } from "react";
import user from "../assets/user.svg"

export default function RenderedPendingList() {
    const [pendingList, setPendingList] =  useState<PendingData[]>([]);
    const [pendingFriends, setPendingFriends] = useState<UserData[]>([])
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState(0)
    

    useEffect(() => {
        async function fetchData() {
            const id = localStorage.getItem('user_Id')
            ? JSON.parse(localStorage.getItem('user_Id') as string)
            : null
    
            if (id) {
                try {
                const fetchedList = await fetchPendingFriends(id);
                setPendingList(fetchedList);
                setUserId(parseInt(id));
                } catch (error) {
                console.error("Error fetching friends:", error);
                }
            }
            setLoading(false)

        }
    
        fetchData();
    }, []);
    console.log(userId)
    console.log('Pending friends:', pendingList)
    useEffect(() => {
        async function fetchPendingUsers() {
            const pending = await Promise.all(
                pendingList.map(async (p) => {
                    const user = await retrieveUser(p.requesterId);
                    console.log('user: ',user)
                    return user;
                })
            );
            setPendingFriends(pending);
        }

        if (pendingList.length > 0) {
            fetchPendingUsers();
        }
    }, [pendingList]);

    const handleAccept = async (requesterId: number | null) => {
        try {
            await acceptFriendRequest(userId, requesterId)
            setPendingFriends(pendingFriends.filter((friend) => friend.id !== requesterId));
            setPendingList(pendingList.filter((p) => p.requesterId !== requesterId));
            alert('Friend request accepted!')
        } catch (error) {
            console.error('Error accepting friend request:', error);
            alert('Failed to accept the friend request.')
        }
    };

    const handleReject = async (requesterId: number | null) => {
        try {
            await rejectFriendRequest(userId, requesterId); // Call the API to reject the friend request
            setPendingFriends(pendingFriends.filter((friend) => friend.id !== requesterId)); // Remove the rejected friend from the list
            setPendingList(pendingList.filter((p) => p.requesterId !== requesterId)); // Update the pending list
            alert("Friend request rejected!");
          } catch (error) {
            console.error("Error rejecting friend request:", error);
            alert("Failed to reject the friend request. Please try again.");
          }
    };

    if (loading) {
    return <div>Loading...</div>
    }

    if (pendingFriends.length <= 0) {
        return <div>No pending friend requests...</div>
    }

  return (
    <ul className="pending-list">
        {
            pendingFriends.map((p, i) => (
            <li className="pending-friend" key={i}>
            <img src={user} alt="users-avatar" />
            <p>{p.username}</p>
            <div className="action-buttons">
            <button onClick={() => handleAccept(p.id)}>&#x2713;</button>
            <button onClick={() => handleReject(p.id)}>X</button>
            </div>
            </li>
            ))
        }
    </ul>)     
     
      
  
}
