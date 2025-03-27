import express from 'express';
import type { Request, Response } from 'express';
import { User } from '../../models/index.js';
// import { FriendsList } from '../../models/index.js';

const router = express.Router();

// GET /users - Get all users
router.get('/', async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// GET /users/:id - Get a user by id
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// POST /users - Create a new user
router.post('/', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const name = null;
  const friends = ([]) as number[];
  try {
    const newUser = await User.create({ username, email, password, name, friends });
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /users/:id - Update a user by id
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, password } = req.body;
  try {
    const user = await User.findByPk(id);
    if (user) {
      user.username = username;
      user.password = password;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /users/:id - Delete a user by id
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});


// get all firends of a user
// router.get('/friends/:id', async (req: Request, res: Response) => {
//   const {id}= req.params;
//   try {
//     const user = await User.findByPk(id);
//     if (user) {
//       res.json(user.friends);
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
  
// router.post('/friends-request', async (req: Request, res: Response) => {

//   const {requesterId, recieverId} = req.body;
//   try {
//     const requester = await User.findByPk(requesterId);
//     const requestee = await User.findByPk(recieverId);
//     if (requester && requestee) {
//       // sends a insert via SQL into the freindsRequest table
//       //sequilize insert into friendsRequest table
//       await FriendsList.create({ requesterId, recieverId });
//       res.json({message: 'Friend request sent'});
//     } else {
//       res.status(404).json({ message: 'User not found' });
//     }
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }

// });

// // to do: build the get request 
// router.get('/api/user/friends/request', async (req: Request, res: Response) => {});


export { router as userRouter };
