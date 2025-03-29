import Auth from '../utils/auth';

export const fetchSeenIt = async (userId: number) => {
    try {
        const response = await fetch(`/seen/${userId}`, {
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
        console.error('An error occurred while fetching seen data');       
    }
}

// this call is meant to add a media to the toWatch list through either the matched or discovery pages
export const addMediaToSeenIt = async (userID: number, mediaID: number, mediaTitle: string) => {
    const response = await fetch(`/seen/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Auth.getToken()}`
        },
        body: JSON.stringify({ userId: userID, mediaId: mediaID, mediaTitle: mediaTitle }),
    });
    // console.log("Sending request with data:", { userId: userID, mediaId: mediaID, mediaTitle: mediaTitle });
    const responseData = await response.json();
    return responseData;
};

// this call is meant to remove a media from the toWatch list and added to the seenList
export const removeMediaFromSeenIt = async (userId: number, mediaId: number) => {
    const response = await fetch(`/seen/remove`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Auth.getToken()}`
        },
        body: JSON.stringify({ userId: userId, mediaId: mediaId }),
    });
    console.log( userId, mediaId );
    return response.json();
};

export default { fetchSeenIt, addMediaToSeenIt, removeMediaFromSeenIt }