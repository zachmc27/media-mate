import sequelize from '../config/connection.js'
import { UserFactory } from './user.js';
import { MediaFactory } from './media.js';
import { SeenItListFactory } from './seenItList.js';
import { FlickPickSessionListFactory } from './flickPickResponseList.js';
import { GenreFactory } from './genres.js';
import { FriendsListFactory } from './friendRequest.js';
import { ToWatchListFactory } from './toWatch.js';
import { FlicklistSelectionsFactory } from './flickpicksListSelections.js';
import { MatchesFactory } from './matches.js';

const User = UserFactory(sequelize);
const Media = MediaFactory(sequelize);
const SeenItList = SeenItListFactory(sequelize);
const FlickPickSessionList = FlickPickSessionListFactory(sequelize);
const Genre = GenreFactory(sequelize);
const FriendsList = FriendsListFactory(sequelize);
const ToWatchList = ToWatchListFactory(sequelize);
const FlicklistSelections = FlicklistSelectionsFactory(sequelize);
const Matches = MatchesFactory(sequelize);

// Build many to one relationships between the user table and the friendlist table
User.hasMany(FriendsList, { foreignKey: 'requesterId', as: 'sentRequests' });
User.hasMany(FriendsList, { foreignKey: 'recieverId', as: 'receivedRequests' });

FriendsList.belongsTo(User, { foreignKey: 'requesterId', as: 'requester' });
FriendsList.belongsTo(User, { foreignKey: 'recieverId', as: 'receiver' });

// Establish relationships between ToWatchList and Media
ToWatchList.belongsTo(Media, { foreignKey: 'mediaId', as: 'media' });
Media.hasMany(ToWatchList, { foreignKey: 'mediaId' });

// Establish relationships between SeenItList and Media
SeenItList.belongsTo(Media, { foreignKey: 'mediaId', as: 'media' });
Media.hasMany(SeenItList, { foreignKey: 'mediaId' });

// Establish relationships between FlickPickSessionList and FlilckPickList
//need for the listOfChoices to populate in the FlickPickSessionsList based on the matching FlickPickSessionsList .flickPickListId=FlickPickList.id

export { User, Media, SeenItList, FlickPickSessionList, FriendsList, Genre, ToWatchList, FlicklistSelections, Matches };
