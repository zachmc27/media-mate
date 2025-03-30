import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { SeenItList } from './seenItList.js';
import { Media } from './media.js';
import { getMediaDetails } from '../routes/api/mediaAPI.js';

interface ToWatchAttributes {

    id?: number;
    mediaId: number;
    Title: string;
    userId: number;

}

interface ToWatchCreationAttributes extends Optional<ToWatchAttributes, 'id'> {}

export class ToWatch extends Model<ToWatchCreationAttributes, ToWatchAttributes> implements ToWatchAttributes {
    public id!: number;
    public mediaId!: number;
    public Title!: string;
    public userId!: number;

    // Method to create a to watch item
    public static async addToWatchItem(data: Omit<ToWatchCreationAttributes, "id">) {
        try {
            let mediaItem = await Media.findOne({ where: { id: data.mediaId } });
            if (!mediaItem) {
                const mediaDetails = await getMediaDetails(data.mediaId, 'movie');
                if (!mediaDetails || !mediaDetails.id || !mediaDetails.title) {
                    throw new Error('Unable to fetch media details from TMDB');
                }

                mediaItem = await Media.create({
                    id: data.mediaId,
                    title: mediaDetails.title || mediaDetails.name || '',
                    year: mediaDetails.year,
                    genre: mediaDetails.genre_ids || [],
                    rating: mediaDetails.vote_average || 0,
                    cover: mediaDetails.poster_path || '',
                    embedKey: mediaDetails.trailerKey || '', 
                });
            }

            const existingToWatchItem = await ToWatch.findOne({ 
                where: { userId: data.userId, mediaId: data.mediaId 
                }})

            if (existingToWatchItem) {
                 console.log('This item is already in your to watch list');
                 return null;
            }

            return await ToWatch.create({
                mediaId: mediaItem.id,
                Title: data.Title,
                userId: data.userId,
            });
        } catch (error) {
            console.error("Error creating To Watch item:", error);
            throw error;
        }
    }
        
    // Method to remove a seen item by userId and movieId
    public static async removeToWatchItem(userId: number, mediaId: number): Promise<boolean> {
        const deletedRows = await ToWatch.destroy({
            where: { userId, mediaId }
        });
        return deletedRows > 0;
    }

    // Method to add a to watch item to the SeenIt table
    public static async addToWatchToSeenIt(userId: number, mediaId: number)  {
        try {
            const toWatchItem = await ToWatch.findOne({ where: { userId, mediaId } });

            if (!toWatchItem) {
                throw new Error (`To watch item not found`);
            }

            await SeenItList.addSeenItItem({
                mediaId: toWatchItem.mediaId,
                userId: toWatchItem.userId,
            });

            await this.removeToWatchItem(userId, mediaId);
            console.log(`Media item ${mediaId} added to Seen it list`);
            return { success: true, userId, mediaId };
        } catch (error) {
            console.error("Error creating To Watch item:", error);
            throw error;
        }
    }
}

export function ToWatchListFactory(sequelize: Sequelize): typeof ToWatch {
    ToWatch.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            mediaId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            Title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: 'ToWatch',
            sequelize,
        }
    );
    return ToWatch;
}