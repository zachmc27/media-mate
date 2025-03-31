import { SeenItList, Media } from '../../models/index.js';
import express from 'express';
import type { Request, Response } from 'express';

const router = express.Router();

// Get Seen it list
router.get('/:userId', async (req: Request, res: Response) => {
  try {
      const { userId } = req.params;

    const list = await SeenItList.findAll({
      where: { userId },
      include: [
        {
          model: Media,
          as: 'media',
          attributes: ['id', 'title', 'year', 'cover', 'genre'],
        },
      ],
  });
    if (!list || list.length === 0) {
      return res.status(404).json({ error: 'No movies or tv shows seen.'});
    }

    return res.status(200).json(list);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred accessing the seen list.'})
  }    
})

// Add an item to the Seen it list
router.post('/add', async (req: Request, res: Response) => {
  try {
    const { userId, mediaId } = req.body;

    if(!userId || !mediaId ) {
      return res.status(400).json({ error: "Missing userId/mediaId/mediaTitle."})
    }
    // console.log("Request body:", req.body);
    const newSeenItItem = await SeenItList.addSeenItItem({
      userId,
      mediaId,
    });

    return res.status(201).json(newSeenItItem);
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred adding the seen item' });
  }
});

// Remove an item from the Seen it list
router.delete('/remove', async (req: Request, res: Response) => {
  try{
    const { userId, mediaId } = req.body;

    if(!userId || !mediaId ) {
      return res.status(400).json({ error: "Missing userId/mediaId."})
    }

    await SeenItList.removeSeenItItem(userId, mediaId);

    return res.status(201).json(`Removed ${mediaId} from ${userId}.`);
    
  } catch (error) {
    return res.status(500).json({ error: 'An error occurred deleting the seen item' });    
  }
});
  
  export { router as seenItListRouter };