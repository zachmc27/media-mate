import { ToWatchList, Media } from '../../models/index.js';
import express from 'express';
import type { Request, Response } from 'express';

const router = express.Router();

// Get To Watch list
router.get('/:userId', async (req: Request, res: Response) => {

  try {
    const { userId } = req.params;
    console.log("GetToWatchTriggered:  " + userId);
    const list = await ToWatchList.findAll({
      where: { userId },
      include: [
        {
          model: Media,
          as: 'media',
          attributes: ['id', 'title', 'year', 'cover'],
        },
      ],
  });
  console.log("To Watch List Generated:  " + list);
    if (!list || list.length === 0) {
      return res.status(404).json({ error: 'No movies or tv shows in to watch list.'});
    }

    return res.status(200).json(list);
  } catch (error) {
    console.error("Sequelize error: ", error);
    return res.status(500).json({ error: 'An error occurred accessing the to watch list.'})
  }    
})

// Add an item to the to watch list
router.post('/add', async (req: Request, res: Response) => {
  try {
    const { userId, mediaId, Title } = req.body;

    if(!userId || !mediaId || !Title) {
      return res.status(400).json({ error: "Missing userId/mediaId/Title."})
    }
    // console.log("Request body:", req.body);
    const newToWatchItem = await ToWatchList.addToWatchItem({
      userId,
      mediaId,
      Title,
    });

    return res.status(201).json(newToWatchItem);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred adding the to watch item' });
  }
});

// Remove an item from the to watch list
router.delete('/remove', async (req: Request, res: Response) => {
  try{
    const { userId, mediaId } = req.body;

    if(!userId || !mediaId ) {
      return res.status(400).json({ error: "Missing userId/mediaId."})
    }

    await ToWatchList.removeToWatchItem(userId, mediaId);

    return res.status(201).json(`Removed ${mediaId} from ${userId}.`);
    
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred deleting the to watch item' });    
  }
});

router.post('/seen', async (req: Request, res: Response) => {
  try{
    const { userId, mediaId } = req.body;

    if(!userId || !mediaId ) {
      return res.status(400).json({ error: "Missing userId/mediaId."})
    }

    const movedToSeenIt = await ToWatchList.addToWatchToSeenIt(userId, mediaId);
    console.log("Moved to Seen It:", movedToSeenIt);

    return res.status(201).json(movedToSeenIt);

  } catch (error) {
    console.error("Error in /seen route:", error);
    return res.status(500).json({ error: 'An error occurred marking the item as seen' });
  }
})
  
  export { router as toWatchListRouter };