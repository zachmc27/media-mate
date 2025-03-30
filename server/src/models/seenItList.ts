import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { Media } from './media.js';
import { getMediaDetails } from '../routes/api/mediaAPI.js';

interface SeenItListAttributes {
    id?: number;
    mediaId: number;
    userId: number;
    userRating?: number;
}

interface SeenItListCreationAttributes extends Optional<SeenItListAttributes, 'id'> {}

export class SeenItList extends Model<SeenItListCreationAttributes, SeenItListAttributes> implements SeenItListAttributes {
    public id!: number;
    public mediaId!: number;
    public userId!: number;
    public userRating?: number;

    // Method to add a new seen item
    public static async addSeenItItem(data: Omit<SeenItListAttributes, "id">) {
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

            const existingSeenItItem = await SeenItList.findOne({ 
                where: { userId: data.userId, mediaId: data.mediaId 
                }})

            if (existingSeenItItem) {
                 console.log('This item is already in your seen it list');
                 return null;
            }
            
            return await SeenItList.create({
                mediaId: mediaItem.id,
                userId: data.userId,
            });

        } catch (error) {
            console.error("Error creating SeenIt item:", error);
            throw error;
        }
    }
    
    // Method to remove a seen item by userId and movieId
    public static async removeSeenItItem(userId: number, mediaId: number): Promise<boolean> {
        const deletedRows = await SeenItList.destroy({
            where: { userId, mediaId }
        });
        return deletedRows > 0;
    }
}

export function SeenItListFactory(sequelize: Sequelize): typeof SeenItList {
    SeenItList.init(
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
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            userRating: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {
            tableName: 'seenit',
            sequelize,
        }
    );
    return SeenItList;
}
