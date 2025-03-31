import express from 'express';
import fetch from "node-fetch";
import type { Request, Response } from 'express';
// to do : import mediaApi from '../api/mediaApi.js';
import dotenv from 'dotenv';
import { Media, TMDBResponse } from '../../models/media.js'; 
import * as mediaApi from './mediaAPI.js';

dotenv.config();
const router = express.Router();
const BEARER_KEY = process.env.BearerTkn;

// to do : build route to getDetails
router.get('/details/:id', async (req: Request, res: Response) => {
    try {
        const movieId = parseInt(req.params.id, 10);
        const type = req.query.type as string | undefined; // Extract 'type' from query parameters
        if (type !== 'movie' && type !== 'tv') {
            return res.status(400).json({ error: "Invalid type. Type must be 'movie' or 'tv'." });
        }
        const movieDetails = await mediaApi.getMediaDetails(movieId, type); // Pass 'type' to getMediaDetails
        return res.json(movieDetails);
    } catch (error) {
        console.error('Error occurred while fetching media details:', error);
        return res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

// route gets the search results for a keyword utilizing the mediaApi keyWordSearch function
router.get('/keyword/', async (req: Request, res: Response) => {

    const keyword = req.query.keyword;
    try {
        if (typeof keyword === 'string') {
            const searchResults = await mediaApi.keyWordSearch(keyword);
            res.json(searchResults);
        }
    } catch (error) {
        console.error('Error occurred while searching for media:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

// Discover route headers
const url = 'https://api.themoviedb.org/3/discover/';
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${BEARER_KEY}`
    }
};
// Generic route for discovery list
router.get("/discover", async (req: Request, res: Response) => {
    const genreId = req.query.genre ? Number(req.query.genre) : undefined; // Optionally allows genre to be passed after :type using ?genre=#
    let discoverURL = url;
    const genreParam = genreId ? `&with_genres=${genreId}` : '';

    try {
        const [moviesResponse, tvResponse] = await Promise.all([
            fetch( `${discoverURL}movie?${genreParam}`, options ),
            fetch( `${discoverURL}tv?${genreParam}`, options )
        ]);

        if (!moviesResponse.ok || !tvResponse.ok) {
            throw new Error("Failed to fetch data from TMDB for Discovery List");
        }

        const moviesData = (await moviesResponse.json()) as TMDBResponse;
        const tvData = (await tvResponse.json()) as TMDBResponse;

        const mergedResults = [...moviesData.results, ...tvData.results].sort(
            (a, b) => b.popularity - a.popularity
        );
        
        const mediaResults = mergedResults.map((item: any) => {
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

        //Returns mix of 60 movies and tv shows, 30 of each
        res.json(mediaResults);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

// Route for filtering discovery list
router.get('/discover/:type', async (req: Request, res: Response) => {
    const { type } = req.params; // The :type in the route must be either 'movie' or 'tv'.
    const genreId = req.query.genre ? Number(req.query.genre) : undefined; // Optionally allows genre to be passed after :type using ?genre=#
    const genreParam = genreId ? `&with_genres=${genreId}` : '';

    if (type !== "movie" && type !== "tv") {
        return res.status(400).json({ error: "Invalid type, use either 'movie' or 'tv'."});
    }

    try {
        const response = await fetch(`${url}${type}?${genreParam}`, options);

        if (!response) throw new Error("Failed to fetch data from TMDB for Discovery List.");

        const data = (await response.json()) as TMDBResponse;

        const mediaResults = data.results.map((item: any) => {
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

        // Returns 30 titles
        return res.json(mediaResults);

        //return res.json(mediaResults);

    } catch (error) {
        return res.status(500).json({ error: "An error occurred retrieving media for the Discovery" });        
    }
});

// // to do : build routes to create a session and add sessions
// router.post('/api/media/sessions', async (req: Request, res: Response) => {});

export { router as mediaRouter };