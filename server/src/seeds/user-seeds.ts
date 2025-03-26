import { User } from '../models/index.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { username: 'JollyGuru', email: 'jolly@guru.com', password: 'password' , name: 'Jolly Guru' , friends: [2,3]},
    { username: 'SunnyScribe', email: 'sunny@scribe.com', password: 'password', name: 'Sunny Scribe', friends: [1,3]},
    { username: 'RadiantComet', email: 'radiant@comet.com', password: 'password', name: 'Radiant Comet', friends: [1,2]},
  ], { individualHooks: true });
};
