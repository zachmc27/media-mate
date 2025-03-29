import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface SeenItListAttributes {
    id?: number;
    mediaId: number;
    mediaTitle: string;
    userId: number;
    userRating?: number;
    officialRating?: number;
}

interface SeenItListCreationAttributes extends Optional<SeenItListAttributes, 'id'> {}

export class SeenItList extends Model<SeenItListCreationAttributes, SeenItListAttributes> implements SeenItListAttributes {
    public id!: number;
    public mediaId!: number;
    public mediaTitle!: string;
    public userId!: number;
    public userRating?: number;
    public officialRating?: number;

    // Method to add a new seen item
    public static async addSeenItItem(data: Omit<SeenItListAttributes, "id">) {
        try {
            return await SeenItList.create(data);
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
            mediaTitle: {
                type: DataTypes.STRING,
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
            officialRating: {
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
