import express from 'express';
import { User } from '../../models/user.js';
import { Op } from 'sequelize';
import { FriendsList } from '../../models/index.js';

const router = express.Router();

// Get all friends of a user by userId
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user by their primary key (userId)
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'An error occurred accessing this user id.' });
    }

    // Find all friends of the user by checking their IDs in the user's friends list
    const friends = await User.findAll({
      where: {
        id: {
          [Op.in]: user.friends, // Use Sequelize's Op.in to match IDs in the friends array
        },
      },
    });

    return res.status(200).json(friends);
  } catch (error) {
    return res.status(400).json({ error: 'An error occurred accessing this user id.' });
  }
});

// Send a friend request from one user to another
router.post('/send', async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    // Find the sender by their primary key
    const sender = await User.findByPk(senderId);
    if (!sender) return res.status(404).json({ error: 'Sender not found' });

    // Call the sendFriendRequest method to send a friend request
    await sender.sendFriendRequest(receiverId);
    return res.status(200).json({ message: 'Friend request sent' });
  } catch (error) {
    return res.status(400).json({ error: 'An error occurred sending a friend request' });
  }
});

// Show all pending friend requests for a user
router.get('/pending/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all friend requests where the user is the receiver and the status is 'Pending'
    const pendingRequests = await FriendsList.findAll({
      where: {
        recieverId: userId, // Match the receiver ID
        status: 'Pending', // Only include requests with a 'Pending' status
      },
      include: [
        {
          model: User,
          as: 'requester', // Include the user who sent the friend request
          attributes: ['id', 'username', 'name', 'email'], // Select specific attributes
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
      requester: request.requester, // Include requester details
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

    // Find the user who is accepting the friend request
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Find the user who sent the friend request
    const requester = await User.findByPk(requesterId);
    if (!requester) return res.status(404).json({ error: 'Requester not found' });

    // Add the requester to the user's friends list
    user.friends = [...user.friends, requesterId];

    // Save the updated user data
    await user.save();

    // Call the acceptFriendRequest method to update the request status
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

    // Find the user who is rejecting the friend request
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Call the rejectFriendRequest method to update the request status
    await user.rejectFriendRequest(requesterId);
    return res.status(200).json({ message: 'Friend request rejected' });
  } catch (error) {
    return res.status(400).json({ error: 'An error occurred rejecting a friend request' });
  }
});

// Delete a friend from a user's friends list
router.delete('/:userId/:friendId', async (req, res) => {
  const { userId, friendId } = req.params;

  try {
    // Find the user who wants to delete a friend
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove the friendId from the user's friends list
    user.friends = user.friends.filter((id) => id.toString() !== friendId);

    // Save the updated user data
    await user.save();

    return res.status(200).json({ message: 'Friend deleted successfully' });
  } catch (err) {
    return res.status(400).json({ message: 'Error deleting friend', err });
    console.error('Error deleting friend: ', err);
  }
});

export default router;