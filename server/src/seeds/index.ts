import { seedUsers } from './user-seeds.js';
import { seedGenres } from './genre-seeds.js';
import sequelize from '../config/connection.js';
import { createFlickPickList, setFlickPickIcons } from '../routes/api/flickPickListAPI.js';
import { seedMedia } from './media-seeds.js';


const seedAll = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    
    await createFlickPickList();
    await seedGenres();
    await seedUsers();
    await setFlickPickIcons();
    console.log('\n----- USERS SEEDED -----\n');
    
    await seedMedia();
    console.log('\n----- MEDIA SEEDED -----\n');


    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();
