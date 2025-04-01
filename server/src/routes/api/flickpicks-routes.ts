import express from 'express';
import { Request, Response } from 'express';
import { FlickListSelections } from '../../models/flickpicksListSelections.js';
import { FlickPickSessionList } from '../../models/flickPickResponseList.js';
import { Matches } from '../../models/matches.js';
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
            status: 'Inprogress'
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

        //SETS STATUS TO COMPLETED
        await flickPickSession.setStausToCompleted();
        await flickPickSession.save();
        res.json(flickPickSession);
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

// create a new match between two flickPickListSessions
router.post('/matches/compare', async (req: Request, res: Response) => {

    const { userOneId, userTwoId, flickPickListId } = req.body;

   //check to see if all required fields are provided
    if (!userOneId || !userTwoId || !flickPickListId) {
        res.status(400).json({ error: 'Please provide all required fields' });
        return;
    }
    //check to see if the userOneId and userTwoId are the same  
    if (userOneId === userTwoId) {
        res.status(400).json({ error: 'Please provide different user Ids' });
        return;
    }
    //check to if both user have a completed flickPickListSession for the flickPickListId
    try {
        const userOneSession = await FlickPickSessionList.findOne({
            where: { userId: userOneId, flickPickListId, status: 'Completed' }

        });

        const userTwoSession = await FlickPickSessionList.findOne({
            where: { userId: userTwoId, flickPickListId, status: 'Completed' }
        });

        if (!userOneSession || !userTwoSession) {
            res.status(400).json({ error: 'You friend has not completed this FlickPick' });
            return;
        }

        const userOneResponse = userOneSession.response;
        const userTwoResponse = userTwoSession.response;

        // checks to make sure both are number[]
        if (!Array.isArray(userOneResponse) || !Array.isArray(userTwoResponse)) {
            res.status(400).json({ error: 'Invalid response' });
            return;
        }

        //calls the findMatches function to compare the two responses
        const match = await matches.findMatches(userOneResponse, userTwoResponse);
    
        //inserts the matches into the matches database model
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


//gets all flickPickResponseList items by userId
router.get('/matches/:userId', async (req: Request, res: Response) => {
    const { userId } = req.params;

    if (!userId) {
        res.status(400).json({ error: 'Please provide a userId' });
        return;
    }

    try {
        const flickPickListSessions = await FlickPickSessionList.findAll({
            where: { userId: parseInt(userId) }
        });

        res.json(flickPickListSessions);
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