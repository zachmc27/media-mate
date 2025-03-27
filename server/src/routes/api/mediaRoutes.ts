import express from 'express';
import type { Request, Response } from 'express';
import * as mediaApi from '../api/mediaAPI.js';


const router = express.Router();



// to do : build route to getDetails
router.get('/:id', async (req: Request, res: Response) => {
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
router.get('/keyword/:keyword', async (req: Request, res: Response) => {
    try {
        const keyword = req.params.keyword;
        const searchResults = await mediaApi.keyWordSearch(keyword);
        res.json(searchResults);
    } catch (error) {
        console.error('Error occurred while searching for media:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

// // to do : build route for discovery list
// router.get('/api/media/discover', async (_req: Request, res: Response) => {});

// // to do : build routes to create a session and add sessions
// router.post('/api/media/sessions', async (req: Request, res: Response) => {});

// // to do: build a route to allow a new toWatchItem to be added
// router.post('/api/media/toWatch', async (req: Request, res: Response) => {});


// // to do: build a route to allow a user to mark a toWatch item as watched and remove it from the toWatch list
// router.post('/api/media/watched', async (req: Request, res: Response) => {});

// // to do: build a get for friends
// router.get('/api/user/friends', async (req: Request, res: Response) => {});

// // to do: build the get request 
// router.get('/api/user/friends/request', async (req: Request, res: Response) => {});


export { router as mediaRouter };