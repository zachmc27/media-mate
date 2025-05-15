import { seedUsers } from './user-seeds.js';
import { seedGenres } from './genre-seeds.js';
import sequelize from '../config/connection.js';
import { createFlickPickList} from '../routes/api/flickPickListAPI.js';
import { seedMedia } from './media-seeds.js';
import { User } from '../models/index.js';
import { Genre } from '../models/genres.js';
import { Media } from '../models/media.js';


const cleanDatabase = async (): Promise<void> => {
  try {
    console.log('\n----- CLEANING DATABASE -----\n');
    await User.truncate({ cascade: true });
    await Genre.truncate({ cascade: true });
    await Media.truncate({ cascade: true });
    console.log('\n----- DATABASE CLEANED -----\n');
  } catch (error) {
    console.error('Error cleaning database:', error);
    throw error;
  }
};


const seedAll = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    
    await cleanDatabase();
    console.log('\n----- DATABASE CLEANED -----\n');
    await createFlickPickList();
    await seedGenres();
    await seedUsers();
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
