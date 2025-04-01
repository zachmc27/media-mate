import Auth from '../utils/auth';

export const fetchFriends = async (userId: number) => {
    try {
        const response = await fetch(`/api/friends/${userId}`, {
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
      const response = await fetch('/api/friends/send', {
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
        const response = await fetch(`/api/friends/pending/${userId}`, {
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

export const acceptFriendRequest = async (userId: number | null, requesterId: number | null) => {
    try {
      const response = await fetch('/api/friends/accept', {
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

export const rejectFriendRequest = async (userId: number | null, requesterId: number | null) => {
    try {
      const response = await fetch('/api/friends/reject', {
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
  
export const deleteFriend = async (userId: number | null, friendId: number | null) => {
  try {
    const response = await fetch(`/api/friends/${userId}/${friendId}`, {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify({userId, friendId}),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Friend deleted.', data)
  } catch (error) {
    console.error('An error occured while deleting friend.')
  }
}
export default { fetchFriends, sendFriendRequest, fetchPendingFriends, acceptFriendRequest, rejectFriendRequest, deleteFriend };