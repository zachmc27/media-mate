import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';  // Import the User model
import jwt from 'jsonwebtoken';  // Import the JSON Web Token library
// import bcrypt from 'bcrypt';  // Import the bcrypt library for password hashing


// Login function to authenticate a user
export const login = async (req: Request, res: Response) => {
  try {
  const { username, password } = req.body;  // Extract username and password from request body

  // Find the user in the database by username
  const user = await User.findOne({
    where: { username },
  });

  // If user is not found, send an authentication failed response
  if (!user) {
    return res.status(401).json({ message: 'Authentication failed on user' });
  }

  console.log("Username provided:", username);
  console.log("Password provided:", password);
  console.log("Stored hashed password:", user.password);

  // // Compare the provided password with the stored hashed password
  // const passwordIsValid = await bcrypt.compare(password, user.password);
  // console.log("password valid result:", passwordIsValid)
  // // If password is invalid, send an authentication failed response
  // if (!passwordIsValid) {
  //   return res.status(401).json({ message: 'Authentication failed on password' });
  // }

  // Get the secret key from environment variables
  const secretKey = process.env.JWT_SECRET_KEY || '';

  // Generate a JWT token for the authenticated user
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  return res.json({ token, userId: user.id });  // Send the token as a JSON response
  } catch (error) {
  return res.status(401).json({ message: 'Authentication failed on key' });
  }
}

// Create a new router instance
const router = Router();

// POST /login - Login a user
router.post('/login', login);  // Define the login route

// POST /users - Create a new user
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, email, password, name } = req.body;

    // Check if all required fields are provided
    if (!username || !email || !password || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Check if the email already exists
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Validate password strength (example: minimum 6 characters)
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // // Hash the password before saving
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await User.create({
      username,
      email,
      password,
      name,
    });

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id + 1,
        username: newUser.username,
        email: newUser.email,
        icon: newUser.icon, // Include the icon in the response
      },
    });
  } catch (error: any) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "An error occurred while creating the user" });
  }
});

export default router;  // Export the router instance
