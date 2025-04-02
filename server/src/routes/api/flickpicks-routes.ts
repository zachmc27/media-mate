import express from 'express';
import { Request, Response } from 'express';
import { FlickListSelections } from '../../models/flickpicksListSelections.js';
import { FlickPickSessionList } from '../../models/flickPickResponseList.js';
import { Matches } from '../../models/matches.js';
import * as matches from "./findMatches.js";
// import * as flickPicksList from './flickPickListAPI.js';

const router = express.Router();

// Route to get all FlickPickLists
router.get('/', async (_req: Request, _res: Response) => {
    try {
        // Fetch all FlickPickLists from the database
        const flickPickLists = await FlickListSelections.findAll();
        _res.json(flickPickLists);
    } catch (err) {
        _res.status(500).json({ error: 'Failed to fetch FlickPickLists' });
    }
});

// Route to create a new FlickPickList session
router.post('/matches', async (req: Request, res: Response) => {
    const { userId, flickPickListId } = req.body;

    // Validate required fields
    if (!userId || !flickPickListId) {
        res.status(400).json({ error: 'Please provide all required fields' });
        return;
    }

    try {
        // Find the FlickPickList by ID
        const flickPickList = await FlickListSelections.findOne({
            where: { id: flickPickListId }
        });

        if (!flickPickList) {
            res.status(404).json({ error: 'FlickPickList not found' });
            return;
        }

        // Create a new FlickPick session
        const newFlickPickSession = await FlickPickSessionList.create({
            userId,
            flickPickListId,
            response: [], // Default value for user responses
            status: 'Inprogress' // Initial status
        });

        // Set the list of choices for the session
        await newFlickPickSession.addListOfChoices();
        res.json(newFlickPickSession);
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

// Route to get all FlickPickList responses
router.get('/matches', async (_req: Request, res: Response) => {
    try {
        // Fetch all FlickPickList sessions
        const flickPickListSessions = await FlickPickSessionList.findAll();
        res.json(flickPickListSessions);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch FlickPick submissions' });
    }
});

// Route to update a FlickPick session with user answers
router.put('/matches/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { answer, userId } = req.body;

    // Validate required fields
    if (!answer || !userId || !id) {
        res.status(400).json({ error: 'Please provide all required fields' });
        return;
    }

    try {
        // Find the FlickPick session by ID
        const flickPickSession = await FlickPickSessionList.findOne({
            where: { id: parseInt(id) }
        });

        if (!flickPickSession) {
            res.status(404).json({ error: 'FlickPickSession not found' });
            return;
        }

        // Check if the user is authorized to update the session
        if (flickPickSession.userId !== Number(userId)) {
            res.status(403).json({ error: 'Unauthorized' });
            return;
        }

        // Update the session response and status
        flickPickSession.response = answer;
        await flickPickSession.setStausToCompleted(); // Mark session as completed
        await flickPickSession.save();
        res.json(flickPickSession);
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

// Route to compare two FlickPick sessions and create a match
router.post('/matches/compare', async (req: Request, res: Response) => {
    const { userOneId, userTwoId, flickPickListId } = req.body;

    // Validate required fields
    if (!userOneId || !userTwoId || !flickPickListId) {
        res.status(400).json({ error: 'Please provide all required fields' });
        return;
    }

    // Ensure the two user IDs are different
    if (userOneId === userTwoId) {
        res.status(400).json({ error: 'Please provide different user IDs' });
        return;
    }

    try {
        // Check if both users have completed the FlickPick session
        const userOneSession = await FlickPickSessionList.findOne({
            where: { userId: userOneId, flickPickListId, status: 'Completed' }
        });

        const userTwoSession = await FlickPickSessionList.findOne({
            where: { userId: userTwoId, flickPickListId, status: 'Completed' }
        });

        if (!userOneSession || !userTwoSession) {
            res.status(400).json({ error: 'Your friend has not completed this FlickPick' });
            return;
        }

        const userOneResponse = userOneSession.response;
        const userTwoResponse = userTwoSession.response;

        // Validate that both responses are arrays
        if (!Array.isArray(userOneResponse) || !Array.isArray(userTwoResponse)) {
            res.status(400).json({ error: 'Invalid response' });
            return;
        }

        // Compare the responses to find matches
        const match = await matches.findMatches(userOneResponse, userTwoResponse);

        // Save the match to the database
        await Matches.create({
            userOneId,
            userTwoId,
            flickPickListId,
            matches: match
        });

        res.json({ match });
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

// Route to get all completed FlickPick sessions for a user
router.get('/matches/:userId', async (req: Request, res: Response) => {
    const { userId } = req.params;

    // Validate userId
    if (!userId) {
        res.status(400).json({ error: 'Please provide a userId' });
        return;
    }

    try {
        // Fetch completed sessions for the user
        const flickPickListSessions = await FlickPickSessionList.findAll({
            where: { userId: parseInt(userId), status: 'Completed' }
        });

        // Add FlickPickList name to the result
        const result = await Promise.all(flickPickListSessions.map(async item => {
            const flickPickList = await FlickListSelections.findOne({
                where: { id: item.flickPickListId }
            });

            return {
                flickPickListId: item.flickPickListId,
                flickPickListName: flickPickList ? flickPickList.name : null,
                status: item.status,
            };
        }));

        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

// Route to get collaboration lists for a user
router.get('/collabs/:userId', async (req: Request, res: Response) => {
    const { userId } = req.params;

    // Validate userId
    if (!userId) {
        res.status(400).json({ error: 'Please provide a userId' });
        return;
    }

    try {
        // Fetch collaboration lists for the user
        const collabList = await matches.getCollabLists(parseInt(userId));
        res.json(collabList);
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

export default router;