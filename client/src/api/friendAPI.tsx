import Auth from '../utils/auth';

export const fetchFriends = async (userId: number) => {
    try {
        const response = await fetch(`/friends/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Auth.getToken()}`
                }
            });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }

        const data = await response.json();
        // console.log(data.message);
        return (data);
    } catch (error) {
        console.error('An error occurred while fetching friend data');       
    }
}

export const sendFriendRequest = async (senderId: number, receiverId: number) => {
    try {
      const response = await fetch('/friends/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        },
        body: JSON.stringify({ senderId, receiverId }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Friend request sent: " + data.message);
    } catch (error) {
      console.error('An error occurred while sending a friend request');
    }
  };

export const fetchPendingFriends = async (userId: number) => {
    try {
        const response = await fetch(`/friends/pending/${userId}`, {
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Auth.getToken()}`
          }
      });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }

        const data = await response.json();
        // console.log(data.message);
        return (data);
    } catch (error) {
        console.error('An error occurred while fetching pending friend data');       
    }    
}

export const acceptFriendRequest = async (userId: number, requesterId: number) => {
    try {
      const response = await fetch('/friends/accept', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        },
        body: JSON.stringify({ userId, requesterId }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Friend request accepted: " + data.message);
    } catch (error) {
      console.error('An error occurred while accepting a friend request');
    }
  };

export const rejectFriendRequest = async (userId: number, requesterId: number) => {
    try {
      const response = await fetch('/friends/reject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        },
        body: JSON.stringify({ userId, requesterId }),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Friend request rejected: " + data.message);
    } catch (error) {
      console.error('An error occurred while rejecting a friend request');
    }
  };
  
export default { fetchFriends, sendFriendRequest, fetchPendingFriends, acceptFriendRequest, rejectFriendRequest };