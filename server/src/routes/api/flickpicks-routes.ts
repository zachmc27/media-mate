import express from 'express';
import { Request, Response } from 'express';
import { FlickListSelections } from '../../models/flickpicksListSelections.js';
import { FlickPickSessionList } from '../../models/matchedList.js';
import { Op } from 'sequelize';
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

router.get('/matches/:userId', async (req: Request, res: Response) => {
    const { userId } = req.params;

    if (!userId) {
        res.status(400).json({ error: 'Please provide a userId' });
        return;
    }

    try {
        const flickPickListSessions = await FlickPickSessionList.findAll({
            where: {
                [Op.or]: [{ userOneId: userId }, { userTwoId: userId }]
            }
        });

        const uniqueFlickPickListSessions = flickPickListSessions.filter(session => {
            return session.userOneId === Number(userId) || session.userTwoId === Number(userId);
        });

        res.json(uniqueFlickPickListSessions);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch flickPickListSessions' });
    }
});





// //   public async addListOfChoices(): Promise<void> {

//         // gets the listOfChoices from FlickListSelections where the FlickListSelections is equal to the flickPickListId of the current session
//         // then sets the listOfChoices of the current session to the listOfChoices of the FlickListSelections
//         // then saves the current session
//         // this is called when the session is created
    
//         const listOfChoices = await FlickListSelections.findOne({
//             where: { id: this.flickPickListId },
//         });
//         this.listOfChoices = listOfChoices?.listOfChoices ?? [];
//         await this.save();
//         //prints the listOfChoices in the terminal
//         console.log(this.listOfChoices);

//     }



// new flickPickListSession

router.post('/matches', async (req: Request, res: Response) => {
    const { userOneId, userTwoId, flickPickListId } = req.body;

    if (!userOneId || !userTwoId || !flickPickListId) {
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
            userOneId,
            userTwoId,
            flickPickListId,
            userOneResponse: [], // Default value for userOneResponse
            userTwoResponse: []  // Default value for userTwoResponse
        });
// calls the addListOfChoices function to set the listOfChoices of the current session to the listOfChoices of the FlickListSelections
        await newFlickPickSession.addListOfChoices();
        res.json(newFlickPickSession);
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

// get all flickPickListSessions
router.get('/matches', async (_req: Request, res: Response) => {
    try {
        const flickPickListSessions = await FlickPickSessionList.findAll();
        res.json(flickPickListSessions);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch flickPickListSessions' });
    }
});


// get a flickPickListSession
router.put('/matches/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userResponse, userId } = req.body;

    if (!userResponse || !userId) {
        res.status(400).json({ error: 'Please provide all required fields' });
        return;
    }

    try {
        const flickPickSession = await FlickPickSessionList.findOne({
            where: { id: parseInt(id) }
        });

        if (!flickPickSession) {
            res.status(404).json({ error: 'FlickPickSession not found' });
            return;
        }

        if (flickPickSession.userOneId !== userId && flickPickSession.userTwoId !== userId) {
            res.status(403).json({ error: 'User is not part of this FlickPickSession' });
            return;
        }

        if (flickPickSession.userOneId === userId) {
            flickPickSession.userOneResponse = userResponse;
        } else {
            flickPickSession.userTwoResponse = userResponse;
        }

        await flickPickSession.save();
        res.json(flickPickSession);

        
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

// put answers into flickpick session
// router.put('/answers/:userId', async (req: Request, res: Response) => {
//     const { userId } = req.params;
//     const { quizId, userAnswers } = req.body;

//     if (!userId || !quizId || !userAnswers) {
//         res.status(400).json({ error: 'Please provide all required fields' });
//         return;
//     }

//     try {
//         const flickPickSession = await FlickPickSessionList.findOne({
//             where: { id: parseInt(userId) }
//         });

//         if (!flickPickSession) {
//             res.status(404).json({ error: 'FlickPickSession not found' });
//             return;
//         }

//         await flickPickSession.save();
//         res.json(flickPickSession);

        
//     } catch (err) {
//         res.status(400).json({ error: err });
//     }
// });


// delete a flickPickListSession
router.delete('/matches/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ error: 'Please provide a sessionId' });
        return;
    }

    try {
        const flickPickSession = await FlickPickSessionList.findOne({
            where: { id: parseInt(id) }
        });

        if (!flickPickSession) {
            res.status(404).json({ error: 'FlickPickSession not found' });
            return;
        }

        await flickPickSession.destroy();
        res.json({ message: 'FlickPickSession deleted' });
    } catch (err) {
        res.status(400).json({ error: err });
    }
});


export default router;