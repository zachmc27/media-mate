import sequelize from '../config/connection.js'
import { UserFactory } from './user.js';
import { MediaFactory } from './media.js';
import { WatchedListFactory } from './watchedList.js';
import { MatchedListFactory } from './matchedList.js';
import { GenreFactory } from './genres.js';
import { FriendsListFactory } from './friendRequest.js';

const User = UserFactory(sequelize);
const Media = MediaFactory(sequelize);
const WatchedList = WatchedListFactory(sequelize);
const MatchedList = MatchedListFactory(sequelize);
const Genre = GenreFactory(sequelize);
const FriendsList = FriendsListFactory(sequelize);


export { User, Media, WatchedList, MatchedList, FriendsList, Genre };
