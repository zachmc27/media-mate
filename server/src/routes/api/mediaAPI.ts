import dotenv from 'dotenv';
dotenv.config();


// hi
interface Media {
    id: number;
    title: string;
    overview: string;
    description: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    vote_average: number;
    trailerKey: string;
}

// This function is used to get the popular movies via API based on a keyword search.
// expected return :an array of Media objects that contain the keyword
export async function keyWordSearch(keyword: string): Promise<Media[]> {
    // grabs the TMDB Token from the .env file
    const BearerTkn = process.env.TMDB_Token;
    // const api_key = process.env.TMDB_API_KEY;
    // grabs the base URL from the .env file
    const baseUrl = process.env.TMDB_BASE_URL;
    // creates the URL for the search
    const url = `${baseUrl}/search/multi?api_key=8b9dce6c0b0d9a05e530a8cef23bb51&query=${keyword}`;
    // `${baseUrl}/search/multi?api_key=${api_key}&query=${keyword}&include_adult=false&language=en-US&page=1`;
    
  
    const options = {
        method: 'GET',
        // sets the headers for the request
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${BearerTkn}`
        }
    };

    try {
        const response = await fetch(url, options);
        const searchResults = await response.json();
        console.log(searchResults);
        return searchResults; // Adjust this return statement based on the expected Media[] structure
    } catch (err) {
        console.error(err);
        throw err;
    }
}

// This function is used to get the details for a specific movie via API and also appends the getTrailerKey function to the mediaDetails object
export async function getMediaDetails(id: number, type: string): Promise<Media[]> {
    const BearerTkn = process.env.TMDB_TOKEN;
    const baseUrl = process.env.TMDB_BASE_URL;
    const movieUrl = `${baseUrl}/movie/${id}`;
    const tvUrl = `${baseUrl}/tv/${id}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${BearerTkn}`
        }
    };

    try {

        if(type === 'movie'){
        const response = await fetch(movieUrl, options);
        const mediaDetails = await response.json();
        // append the getTrailerKey function to the mediaDetails object
        mediaDetails.trailerKey = await getTrailerKey(id,type);
        console.log(mediaDetails);
        return mediaDetails; // Adjust this return statement based on the expected Media structure
        } else if(type === 'tv'){
            const response = await fetch(tvUrl, options);
            const mediaDetails = await response.json();
            // append the getTrailerKey function to the mediaDetails object
            mediaDetails.trailerKey = await getTrailerKey(id,type);
            console.log(mediaDetails);
            return mediaDetails; // Adjust this return statement based on the expected Media structure
        }
    } catch (err) {
        console.error(err);
        throw err;
    }

    return []; // Default return statement to handle all cases
}


// This function is used to get the trailer key for a specific movie via API
async function getTrailerKey(id: number, type: string): Promise<string> {
    const BearerTkn = process.env.TMDB_TOKEN;
    const baseUrl = process.env.TMDB_BASE_URL;
    const movieUrl = `${baseUrl}/movie/${id}/videos`;
    const tvUrl = `${baseUrl}/tv/${id}/videos`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${BearerTkn}`
        }
    };

    try {
        if (type === 'movie') {
            const response = await fetch(movieUrl, options);
            const trailerData = await response.json();
            return trailerData; // Return the key for the first trailer or an empty string
        } else if (type === 'tv') {
            const response = await fetch(tvUrl, options);
            const trailerData = await response.json();
            return trailerData; // Return the key for the first trailer or an empty string
        }
    } catch (err) {
        console.error(err);
        throw err;
    }

    return ''; // Default return statement to handle all cases
}