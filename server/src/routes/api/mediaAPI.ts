import dotenv from 'dotenv';
import { Media, TMDBKeywordResponse } from '../../models/media.js'; 
dotenv.config();

const BEARER_KEY = process.env.BearerTkn;

// hi
// interface Media {
//     id: number;
//     title: string;
//     overview: string;
//     description: string;
//     poster_path: string;
//     backdrop_path: string;
//     release_date: string;
//     vote_average: number;
//     trailerKey: string;
// }

// This function is used to get the details for a specific movie via API and also appends the getTrailerKey function to the mediaDetails object
export async function getMediaDetails(id: number, type: string): Promise<Media[]> {
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
async function getTrailerKey(id: number, type: string): Promise<string> {
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
        if (type === 'movie') {
            const response = await fetch(movieUrl, options);
            const trailerData = await response.json();
            return trailerData.results.find((trailer: any) => trailer.type === 'Trailer' && trailer.site === 'YouTube' && trailer.official === true)?.key || ''; 
        } else if (type === 'tv') {
            const response = await fetch(tvUrl, options);
            const trailerData = await response.json();
            return trailerData.results.find((trailer: any) => trailer.type === 'Trailer' && trailer.site === 'YouTube' && trailer.official === true)?.key || ''; 
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
    // Adjust this return statement based on the expected string structure
    return ''; // Default return statement to handle all cases
}