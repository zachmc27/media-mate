import dotenv from 'dotenv';
import { Media, MediaItem, TMDBKeywordResponse } from '../../models/media.js'; 
dotenv.config();

const BEARER_KEY = process.env.BEARER_KEY;

// This function is used to get the details for a specific movie via API and also appends the getTrailerKey function to the mediaDetails object
export async function getMediaDetails(id: number, type: string): Promise<MediaItem | null> {
    const baseUrl = process.env.TMDB_BASE_URL;
    const movieUrl = `${baseUrl}/movie/${id}`;
    const tvUrl = `${baseUrl}/tv/${id}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${BEARER_KEY}`
        }
    };

    try {
        let mediaDetails: MediaItem | null = null;
        if(type === 'movie'){
            const response = await fetch(movieUrl, options);
            mediaDetails = await response.json();
            // append the getTrailerKey function to the mediaDetails object
            if (mediaDetails) {
                mediaDetails.trailerKey = await getTrailerKey(id,type);
            }
            // console.log(mediaDetails);
        } else if(type === 'tv'){
            const response = await fetch(tvUrl, options);
            mediaDetails = await response.json();
            // append the getTrailerKey function to the mediaDetails object
            if (mediaDetails) {
                mediaDetails.trailerKey = await getTrailerKey(id,type);
            }
            //console.log(mediaDetails);
        }
        if (mediaDetails) {
            // Return the single media item directly
            return {
                id: mediaDetails.id,
                title: mediaDetails.title || mediaDetails.name, // 'title' for movies, 'name' for TV shows
                year: mediaDetails.release_date ? new Date(mediaDetails.release_date).getFullYear() : 0,
                genre_ids: mediaDetails.genre_ids || [],
                vote_average: mediaDetails.vote_average || 0,
                poster_path: mediaDetails.poster_path ? `https://image.tmdb.org/t/p/w500${mediaDetails.poster_path}` : '',
                trailerKey: mediaDetails.trailerKey || '', // The trailer key
                popularity: mediaDetails.popularity,
            };
        }
        throw new Error('Media details not found');
    } catch (err) {
        console.error(err);
        throw err;
    }
}

// This function is used to get the popular movies via API based on a keyword search.
// expected return :an array of Media objects that contain the keyword
export async function keyWordSearch(keyword: string): Promise<Media[]> {
    const baseUrl = process.env.TMDB_BASE_URL;
    const url = `${baseUrl}/search/multi?query=${keyword}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${BEARER_KEY}`
        }
    };
    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error("TMDB API error.");

        const searchResults = await response.json() as TMDBKeywordResponse;
        
        return searchResults.results.map((item: any) => 
            Media.build({
            id: item.id,
            title: item.title || item.name,
            year: item.release_date || item.first_air_date,
            genre: item.genre_ids,
            rating: item.vote_average,
            cover: item.poster_path,
            embedKey: item.id.toString(),
        })); // Adjust this return statement based on the expected Media[] structure
    } catch (err) {
        console.error(err);
        throw err;
    }
}

// This function is used to get the trailer key for a specific movie via API
export async function getTrailerKey(id: number, type: string): Promise<string> {
    const baseUrl = process.env.TMDB_BASE_URL;
    const movieUrl = `${baseUrl}/movie/${id}/videos`;
    const tvUrl = `${baseUrl}/tv/${id}/videos`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${BEARER_KEY}`
        }
    };

    try {
        const url = type === 'movie' ? movieUrl : tvUrl;
        console.log('Fetching URL:', url); // Log the URL for debugging
        const response = await fetch(url, options);

        if (!response.ok) {
            console.error(`Failed to fetch trailer data for ${type} with ID ${id}: ${response.status} - ${response.statusText}`);
            console.error('Response Headers:', response.headers);
            return ''; // Return an empty string if the API call fails
        }

        const trailerData = await response.json();

        if (!trailerData.results || !Array.isArray(trailerData.results)) {
            console.error(`Invalid trailer data format for ${type} with ID ${id}:`, trailerData);
            return ''; // Return an empty string if results are missing or not an array
        }

        const trailer = trailerData.results.find(
            (trailer: any) => trailer.type === 'Teaser' && trailer.site === 'YouTube' && trailer.official === true
        );

        return trailer?.key || ''; // Return the trailer key or an empty string if not found
    } catch (err) {
        console.error(`Error occurred while fetching trailer key for ${type} with ID ${id}:`, err);
        throw err; // Re-throw the error for higher-level handling
    }
}

