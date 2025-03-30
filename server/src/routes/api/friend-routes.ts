import express from 'express';
import { User } from '../../models/user.js';
import { Op } from 'sequelize';
import { FriendsList } from '../../models/index.js';

const router = express.Router();

// Get all friends
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'An error occurred accessing this user id.'});
    }

    const friends = await User.findAll({
      where: {
        id: {
          [Op.in]: user.friends,
        },
      },
    });

    return res.status(200).json(friends);
  } catch (error) {
    return res.status(400).json({ error: 'An error occurred accessing this user id.'})
  }
})

// Send a friend request
router.post('/send', async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    const sender = await User.findByPk(senderId);
    if (!sender) return res.status(404).json({ error: 'Sender not found' });

    await sender.sendFriendRequest(receiverId);
    return res.status(200).json({ message: 'Friend request sent' });
  } catch (error) {
    return res.status(400).json({ error: 'An error occurred sending a friend request' });
  }
});

// Show all pending friend requests
router.get('/pending/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all friend requests where the user is the receiver and the status is 'Pending'
    const pendingRequests = await FriendsList.findAll({
      where: {
        recieverId: userId,
        status: 'Pending',
      },
      include: [
        {
          model: User,
          as: 'requester',  // Get the user who sent the friend request
          attributes: ['id', 'username', 'name', 'email'],
        },
      ],
    });

    if (!pendingRequests) {
      return res.status(404).json({ message: 'No pending friend requests found' });
    }

    // Map through the results to simplify the response format
    const requests = pendingRequests.map(request => ({
      id: request.id,
      requesterId: request.requesterId,
      requester: request.requester,
      status: request.status,
    }));

    return res.status(200).json(requests);
  } catch (error) {
    return res.status(400).json({ error: "An error occurred retrieving pending friend requests." });
  }
});

// Accept a friend request
router.post('/accept', async (req, res) => {
  try {
    const { userId, requesterId } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    await user.acceptFriendRequest(requesterId);
    return res.status(200).json({ message: 'Friend request accepted' });
  } catch (error) {
    return res.status(400).json({ error: 'An error occurred accepting a friend request' });
  }
});

// Reject a friend request
router.post('/reject', async (req, res) => {
  try {
    const { userId, requesterId } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    await user.rejectFriendRequest(requesterId);
    return res.status(200).json({ message: 'Friend request rejected' });
  } catch (error) {
    return res.status(400).json({ error: 'An error occurred rejecting a friend request' });
  }
});

export default router;