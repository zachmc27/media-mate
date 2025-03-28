import Auth from '../utils/auth';

//gets the media details for a specific media id
export const mediaInfo = async (id: number, type: string) => {
    const response = await fetch(`/api/media/details/${id}?type=${type}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Auth.getToken()}`
        }
    });
    return response.json();
};

// discoverMedia by most popular
export const discoverMedia = async () => {
    const response = await fetch(`/api/media/discover`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Auth.getToken()}`
        }
    });
    return response.json();
};

// gets a list of media based on a specific genre
export const discoverMediaByGenre = async (genre: number) => {
    const response = await fetch(`/api/media/discover?genre=${genre}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Auth.getToken()}`
        }
    });
    return response.json();
};

// gets a list of media based on a specific genre and by TV or Movie
export const discoverByTypeAndGenre = async (type: string, genre: number) => {
    const response = await fetch(`/api/media/discover?genre=${genre}&type=${type}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Auth.getToken()}`
        }
    });
    return response.json();
};

// gets a list of media based on a specific type (TV or Movie)
export const discoverMediaByType = async (type: string) => {
    const response = await fetch(`/api/media/discover/${type}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Auth.getToken()}`
        }
    });
    return response.json();
};

// gets a list of media based on a specific keyword searched (string)
export const keywordSearch = async (keyword: string) => {
    const response = await fetch(`/api/media/keyword?keyword=${keyword}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Auth.getToken()}`
        }
    });
    return response.json();
};

// this call is meant to add a media to the toWatch list through either the matched or discovery pages
export const addMediaToWatchList = async (userID: number, mediaID: number) => {
    const response = await fetch(`/api/watchlist/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Auth.getToken()}`
        },
        body: JSON.stringify({ userID, mediaID }),
    });
    return response.json();
};

// this call is meant to remove a media from the toWatch list and added to the seenList
export const watchedMedia = async (userID: number, mediaID: number) => {
    const response = await fetch(`/api/watchlist/remove`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Auth.getToken()}`
        },
        body: JSON.stringify({ userID, mediaID }),
    });
    return response.json();
};

export default {mediaInfo, keywordSearch, discoverMedia,discoverByTypeAndGenre,discoverMediaByType ,discoverMediaByGenre, addMediaToWatchList, watchedMedia};