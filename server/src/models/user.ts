import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { FriendsList } from './friendRequest.js';
import bcrypt from 'bcrypt';

const imageIconArray = ["https://i.postimg.cc/FsPn99hG/profile-Icon-02.png", "https://i.postimg.cc/X7NzSZ6p/profile-Icon-01.png"];

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Define the attributes for the User model
interface UserAttributes {
  id: number;
  username: string;
  name: string | null;
  email: string;
  password: string;
  friends: number[];
  icon: string | null;
}

// Define the optional attributes for creating a new User
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define the User class extending Sequelize's Model
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public friends!: number[];
  public name!: string | null;
  public icon!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Method to hash and set the password for the user
  public async setPassword(password: string) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(password, saltRounds);
  }

  public async setRandomIcon(){
    const icon = imageIconArray[getRandomNumber(0,1)];
    this.icon = icon;
    return this.icon;
  }

//_________________________Friend Request Methods Start_________________________//
  // Method to send a friend request
  public async sendFriendRequest(receiverId: number): Promise<void> {
    // check to make sure they aren't requesting themselves as a friend
    if (this.id === receiverId) throw new Error("You can't send a friend request to yourself.");
    // check to make sure they haven't already send a friend request to this person
    const existingRequest = await FriendsList.findOne({
      where: { requesterId: this.id, recieverId: receiverId },
    });
  
    if (existingRequest) {
      throw new Error('Friend request already sent.');
    }
  
    await FriendsList.create({
      requesterId: this.id,
      recieverId: receiverId,
      status: 'Pending',
      });
    }
  
    // Method to accept a friend request
    public async acceptFriendRequest(requesterId: number): Promise<void> {
      const friendRequest = await FriendsList.findOne({
        where: { requesterId, recieverId: this.id, status: 'Pending' },
      });
  
      if (!friendRequest) {
        throw new Error('Friend request not found.');
      }
  
      // Update the status to accepted
      friendRequest.status = 'Accepted';
      await friendRequest.save();
  
      // Add each other as friends
      const requester = await User.findByPk(requesterId);
      if (requester) {
        requester.friends.push(this.id);
        await requester.save();
      }
  
      this.friends.push(requesterId);
      await this.save();
    }
  
    // Method to reject a friend request
    public async rejectFriendRequest(requesterId: number): Promise<void> {
      const friendRequest = await FriendsList.findOne({
        where: { requesterId, recieverId: this.id, status: 'Pending' },
      });
  
      if (!friendRequest) {
        throw new Error('Friend request not found.');
      }
  
      // Update status to rejected
      friendRequest.status = 'Rejected';
      await friendRequest.save();
    }
//_________________________Friend Request Methods End_________________________//
}

// Define the UserFactory function to initialize the User model
export function UserFactory(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      friends: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
        defaultValue: [],
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
    },
    {
      tableName: 'users',  // Name of the table in PostgreSQL
      sequelize,            // The Sequelize instance that connects to PostgreSQL
      hooks: {
        // Before creating a new user, hash and set the password
        beforeCreate: async (user: User) => {
          await user.setPassword(user.password);
          await user.setRandomIcon();
        },
        // Before updating a user, hash and set the new password if it has changed
        beforeUpdate: async (user: User) => {
          if (user.changed('password')) {
            await user.setPassword(user.password);
          }
        },
      }
    }
  );

  return User;  // Return the initialized User model
}