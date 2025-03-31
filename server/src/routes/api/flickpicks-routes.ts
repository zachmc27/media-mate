import express from 'express';
import { Request, Response } from 'express';
import { FlickListSelections } from '../../models/flickpicksListSelections.js';
import { FlickPickSessionList } from '../../models/flickPickResponseList.js';
import * as matches from "./findMatches.js";
// import * as flickPicksList from './flickPickListAPI.js';

const router = express.Router();
// gets all flickPickLists

router.get('/', async (_req: Request, _res: Response) => {

    // gets all flickPickLists

const flickPickLists = await FlickListSelections.findAll();
_res.json(flickPickLists);

});

// gets all associated MatchSessions by a user Id
// checks and returns all unqiue flickPickListSessions by a user Id located in either userOneId or userTwoId

// router.get('/matches/:userId', async (req: Request, res: Response) => {});

// new flickPickListSession

router.post('/matches', async (req: Request, res: Response) => {
    const { userId, flickPickListId } = req.body;

    if (!userId || !flickPickListId) {
        res.status(400).json({ error: 'Please provide all required fields' });
        return;
    }

    try {
        const flickPickList = await FlickListSelections.findOne({
            where: { id: flickPickListId }
        });

        if (!flickPickList) {
            res.status(404).json({ error: 'FlickPickList not found' });
            return;
        }

        const newFlickPickSession = await FlickPickSessionList.create({
            userId,
            flickPickListId,
            response: [], // Default value for userOneResponse
        });

// calls the addListOfChoices function to set the listOfChoices of the current session to the listOfChoices of the FlickListSelections
        await newFlickPickSession.addListOfChoices();
        res.json(newFlickPickSession);
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

// get all flickPickListResponses
router.get('/matches', async (_req: Request, res: Response) => {
    try {
        const flickPickListSessions = await FlickPickSessionList.findAll();
        res.json(flickPickListSessions);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch flickpicksubmissions' });
    }
});


// Update a Matchlist session with answers
router.put('/matches/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { answer, userId } = req.body;

    if (!answer || !userId  || !id) {
        res.status(400).json({ error: 'Please provide all required fields' });
        return;
    }
    try{
        
        const flickPickSession = await FlickPickSessionList.findOne({
            where: { id: parseInt(id) }
        });

        if (!flickPickSession) {
            res.status(404).json({ error: 'FlickPickSession not found' });
            return;
        }

        if (flickPickSession.userId !== Number(userId)) {
            res.status(403).json({ error: 'Unauthorized' });
            return;
        }

        flickPickSession.response = answer;
        await flickPickSession.save();
        res.json(flickPickSession);
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

// create a new match between two flickPickListSessions
router.post('/matches-create', async (req: Request, res: Response) => {

    const { userOneId, userTwoId, flickPickListId } = req.body;

    if (!userOneId || !userTwoId || !flickPickListId) {
        res.status(400).json({ error: 'Please provide all required fields' });
        return;
    }

    try {
        const userOneSession = await FlickPickSessionList.findOne({
            where: { userId: userOneId, flickPickListId: flickPickListId }
        });

        const userTwoSession = await FlickPickSessionList.findOne({
            where: { userId: userTwoId, flickPickListId: flickPickListId }
        });
        if (!userOneSession) {
            res.status(404).json({ error: 'UserOneSession not found' });
            return;
        }

        const matchingResponseSession = await FlickPickSessionList.findOne({
            where: {
            userId: userTwoId,
            flickPickListId: userOneSession.flickPickListId
            }
        });

        if (!matchingResponseSession) {
            res.status(404).json({ error: 'Matching FlickPickSession not found' });
            return;
        }

        if (!userOneSession || !userTwoSession) {
            res.status(404).json({ error: 'FlickPickSession not found' });
            return;
        }

        const userOneResponse = userOneSession.response;
        const userTwoResponse = userTwoSession.response;



        if (!userOneSession.listOfChoices) {
            res.status(400).json({ error: 'List of choices is undefined' });
            return;
        }
     
        const match = matches.findMatches(userOneResponse, userTwoResponse);

        res.json({ match });
    } catch (err) {
        res.status(400).json({ error: err });
    }

});

// delete a flickPickListSession
// router.delete('/matches/:id', async (req: Request, res: Response) => {
//     const { id } = req.params;

//     if (!id) {
//         res.status(400).json({ error: 'Please provide a sessionId' });
//         return;
//     }

//     try {
//         const flickPickSession = await FlickPickSessionList.findOne({
//             where: { id: parseInt(id) }
//         });

//         if (!flickPickSession) {
//             res.status(404).json({ error: 'FlickPickSession not found' });
//             return;
//         }

//         await flickPickSession.destroy();
//         res.json({ message: 'FlickPickSession deleted' });
//     } catch (err) {
//         res.status(400).json({ error: err });
//     }
// });


export default router;