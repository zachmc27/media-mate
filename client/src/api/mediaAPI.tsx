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
    const response = await fetch(`/api/media/discover/movie`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Auth.getToken()}`
        }
    });
    return response.json();
};

// gets a list of media based on a specific genre
export const discoverMediaByGenre = async (genre: number) => {
    const response = await fetch(`/api/media/discover/movie?genre=${genre}`, {
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

// gets the list of the recently released movies
export const discoverRecentlyReleased = async() => {
    const response = await fetch(`/api/media/movie/recent`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Auth.getToken()}`
        }
    });
    
    return response.json();
}

export default {mediaInfo, keywordSearch, discoverMedia,discoverByTypeAndGenre,discoverMediaByType ,discoverMediaByGenre, discoverRecentlyReleased };
