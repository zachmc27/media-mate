import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { FlickListSelections } from '../../models/flickpicksListSelections.js';
import { Media, TMDBResponse } from '../../models/media.js'; 
// import { response } from 'express';
dotenv.config();


const BEARER_KEY = process.env.BEARER_KEY || '';
if (!BEARER_KEY) {
    throw new Error("Bearer token is missing. Please check your .env file.");
}
//creates the list of media items for each flickPickList
// Need to create the following flickPickLists:
// · Top Rated – Featuring the highest-rated movies based on critic or audience reviews.
// · Upcoming – Showcasing movies that are set to be released in the near future.
// · Popular Now – Showcasing trending movies that are currently being watched or talked about.
// · Action – Fast-paced, intense films with lots of physical stunts and adventure.
// · Comedy – Films designed to entertain and make the audience laugh.
// · Drama – Focuses on emotional stories, character development, and serious themes.
// · Horror – Designed to scare and thrill the audience with supernatural or psychological elements.
// · Romance – Centered around romantic relationships and love stories.
// · Sci-Fi – Based on speculative concepts like futuristic technology, space, and aliens.
// · Fantasy – Often set in magical or supernatural worlds, with mythical creatures or abilities.
// · Thriller – Suspenseful films that keep the audience on the edge of their seat. (edited) 
// 

    const baseUrl = process.env.TMDB_BASE_URL || '';
    if (!baseUrl) {
        throw new Error("TMDB base URL is missing. Please check your .env file.");
    }

    // 

export async function getFlickPickListItems(genreId: number) {
    const baseUrl = process.env.TMDB_BASE_URL;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${BEARER_KEY}`
        }
    };

    try {
        const response = await fetch(`${baseUrl}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`, options);

        if (!response) throw new Error("Failed to fetch data from TMDB for Discovery List.");

        const data = (await response.json()) as TMDBResponse;

        if (!data || !data.results || !Array.isArray(data.results)) {
            console.error("Invalid data received from TMDB:", data);
            throw new Error("Invalid data format: 'results' is missing or not an array.");
        }

        return data.results.map((item: any) => {
            return new Media({
                id: item.id,
                title: item.title || item.name,
                year: parseInt(item.release_date?.split("-")[0] || item.first_air_date?.split("-")[0] || "0"),
                genre: item.genre_ids,
                rating: item.vote_average,
                cover: item.poster_path,
                embedKey: item.id.toString(),
            });
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function createFlickPickList() {
    const genres = [
        { id: 28, name: '' },
        { id: 35, name: '' },
        { id: 18, name: '' },
        { id: 27, name: '' },
        { id: 10749, name: '' },
        { id: 878, name: '' },
        { id: 14, name: '' },
        { id: 53, name: '' },
    ];

    for (const genre of genres) {
        const items = await getFlickPickListItems(genre.id);
        await FlickListSelections.create({
            id: (await FlickListSelections.findAll()).length + 1, // Increment ID
            name: `${genre.name} Movies`,
            listOfChoices: items.slice(0, 15).map(item => item.id), // First 15 object IDs
            description: `Top 15 ${genre.name} movies based on popularity.`,
        });
    }
        
    }


    export async function setFlickPickIcons() {
       
        const genreIcons = [
            { name: 'Action', icon: '' },
            { name: 'Comedy', icon: '' },
            { name: 'Drama', icon: `` },
            { name: 'Horror', icon: '' },
            { name: 'Romance', icon: '' },
            { name: 'Sci-Fi',  icon: '' },
            { name: 'Fantasy', icon: '' },
            { name: 'Thriller', icon: '' },]


        for (const icons of genreIcons) {

            await FlickListSelections.update({
                // INSERTS THE ICON FOR EACH NAME IN THE FLICKPICKLIST
                icon: icons.icon,
            }, {
                where: {
                    name: icons.name + ' Movies',
                },
            });
        }
        }
    

