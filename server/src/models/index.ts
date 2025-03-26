import sequelize from '../config/connection.js'
import { UserFactory } from './user.js';
import { MediaFactory } from './media.js';
import { WatchedListFactory } from './watchedList.js';
import { MatchedListFactory } from './matchedList.js';

const User = UserFactory(sequelize);
const Media = MediaFactory(sequelize);
const WatchedList = WatchedListFactory(sequelize);
const MatchedList = MatchedListFactory(sequelize);


export { User, Media, WatchedList, MatchedList };
