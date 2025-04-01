import Auth from '../utils/auth';

export const fetchToWatch = async (userId: number) => {
    try {
        const response = await fetch(`/api/towatch/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Auth.getToken()}`
                }
            });
        if (!response.ok) {
            if (response.status === 404) {
                console.log('No data found for this user');
                return [];
            }
            throw new Error(`Error: ${response.statusText}`);
          }

        const data = await response.json();
        console.log(data);

        return (data);
    } catch (error) {
        console.error('An error occurred while fetching to watch data');       
    }
}

// this call is meant to add a media to the toWatch list through either the matched or discovery pages
export const addMediaToWatch = async (userID: number, mediaID: number ) => {
    try {
        const response = await fetch(`/api/towatch/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`
            },
            body: JSON.stringify({ userId: userID, mediaId: mediaID }),
        });
        // console.log("Sending request with data:", { userId: userID, mediaId: mediaID, Title: Title });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('An error occurred while adding item to watch data');     
    }
};

// this call is meant to remove a media from the toWatch list
export const removeMediaToWatch = async (userId: number, mediaId: number) => {
    try {
        const response = await fetch(`/api/towatch/remove`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`
            },
            body: JSON.stringify({ userId: userId, mediaId: mediaId }),
        });
        console.log( userId, mediaId );
        return response.json();
    } catch (error) {
        console.error('An error occurred while remove item from to watch data');     
    }
};

// this call is meant to remove a media from the toWatch list and added to the seenList
export const seenToWatch = async (userId: number, mediaId: number) => {
    try {
        const response = await fetch(`/api/towatch/seen`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Auth.getToken()}`
            },
            body: JSON.stringify({ userId: userId, mediaId: mediaId }),
        });
        console.log( userId, mediaId );
        return response.json();
    } catch (error) {
        console.error('An error occurred while moving an item from to watch to seen it');     
    }
};

export default { fetchToWatch, addMediaToWatch, removeMediaToWatch, seenToWatch }