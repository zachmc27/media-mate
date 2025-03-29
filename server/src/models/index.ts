import sequelize from '../config/connection.js'
import { UserFactory } from './user.js';
import { MediaFactory } from './media.js';
import { SeenItListFactory } from './seenItList.js';
import { MatchedListFactory } from './matchedList.js';
import { GenreFactory } from './genres.js';
import { FriendsListFactory } from './friendRequest.js';

const User = UserFactory(sequelize);
const Media = MediaFactory(sequelize);
const SeenItList = SeenItListFactory(sequelize);
const MatchedList = MatchedListFactory(sequelize);
const Genre = GenreFactory(sequelize);
const FriendsList = FriendsListFactory(sequelize);

// Build many to one relationships between the user table and the friendlist table
User.hasMany(FriendsList, { foreignKey: 'requesterId', as: 'sentRequests' });
User.hasMany(FriendsList, { foreignKey: 'recieverId', as: 'receivedRequests' });

FriendsList.belongsTo(User, { foreignKey: 'requesterId', as: 'requester' });
FriendsList.belongsTo(User, { foreignKey: 'recieverId', as: 'receiver' });

export { User, Media, SeenItList, MatchedList, FriendsList, Genre };
