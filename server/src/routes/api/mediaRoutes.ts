import express from 'express';
import fetch from "node-fetch";
import type { Request, Response } from 'express';
// to do : import mediaApi from '../api/mediaApi.js';
import dotenv from 'dotenv';
import { Media, TMDBResponse } from '../../models/media.js'; 

dotenv.config();
const router = express.Router();
//const API_KEY = process.env.TMDB_API;
const BEARER_KEY = process.env.TMDB_BEARER;

// to do : build route to getDetails
// router.get('/api/media/details', async (req: Request, res: Response) => {});

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

// Route for mixed genre discovery list

// to do : build routes to create a session and add sessions
// router.post('/api/media/sessions', async (req: Request, res: Response) => {});

// to do: build a route to allow a new toWatchItem to be added
// router.post('/api/media/toWatch', async (req: Request, res: Response) => {});


// to do: build a route to allow a user to mark a toWatch item as watched and remove it from the toWatch list
// router.post('/api/media/watched', async (req: Request, res: Response) => {});

// to do: build a get for friends
// router.get('/api/user/friends', async (req: Request, res: Response) => {});

// to do: build the get request 
// router.get('/api/user/friends/request', async (req: Request, res: Response) => {});


export { router as mediaRouter };