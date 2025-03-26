import express from 'express';
import type { Request, Response } from 'express';
// to do : import mediaApi from '../api/mediaApi.js';


const router = express.Router();



// to do : build route to getDetails
router.get('/api/media/details', async (req: Request, res: Response) => {});

// to do : build route for discovery list
router.get('/api/media/discover', async (_req: Request, res: Response) => {});

// to do : build routes to create a session and add sessions
router.post('/api/media/sessions', async (req: Request, res: Response) => {});

// to do: build a route to allow a new toWatchItem to be added
router.post('/api/media/toWatch', async (req: Request, res: Response) => {});


// to do: build a route to allow a user to mark a toWatch item as watched and remove it from the toWatch list
router.post('/api/media/watched', async (req: Request, res: Response) => {});

// to do: build a get for friends
router.get('/api/user/friends', async (req: Request, res: Response) => {});

// to do: build the get request 
router.get('/api/user/friends/request', async (req: Request, res: Response) => {});


export { router as mediaRouter };