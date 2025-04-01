import { User } from '../models/index.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { id: 1, username: 'Misha', email: 'misha@email.com', password: 'password' , name: 'Misha' , friends: [2,3], icon: "https://i.postimg.cc/FsPn99hG/profile-Icon-02.png"},
    { id: 2, username: 'Ken', email: 'ken@scribe.com', password: 'password', name: 'Ken', friends: [1,3], icon: "https://i.postimg.cc/FsPn99hG/profile-Icon-02.png"},
    { id: 3, username: 'Brett', email: 'brett@comet.com', password: 'password', name: 'Brett', friends: [1,2,4,5], icon: "https://i.postimg.cc/FsPn99hG/profile-Icon-02.png"},
    { id: 4, username: 'Sammi', email: 'sammi@comet.com', password: 'password', name: 'Sammi', friends: [5,3], icon: "https://i.postimg.cc/FsPn99hG/profile-Icon-02.png"},
    { id: 5, username: 'Zach', email: 'zach@comet.com', password: 'password', name: 'Zach', friends: [4,3], icon: "https://i.postimg.cc/FsPn99hG/profile-Icon-02.png"},
  ], { individualHooks: true });
};
