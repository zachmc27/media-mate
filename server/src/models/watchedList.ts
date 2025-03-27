import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface WatchedListAttributes {
    id: number;
    movieId: number;
    movieTitle: string;
    userId: number;
    userRating: number;
    officialRating: number;
}

interface WatchedListCreationAttributes extends Optional<WatchedListAttributes, 'id'> {}

export class WatchedList extends Model<WatchedListCreationAttributes, WatchedListAttributes> implements WatchedListAttributes {
    public id!: number;
    public movieId!: number;
    public movieTitle!: string;
    public userId!: number;
    public userRating!: number;
    public officialRating!: number;
}

export function WatchedListFactory(sequelize: Sequelize): typeof WatchedList {
    WatchedList.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            movieId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            movieTitle: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            userRating: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            officialRating: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: 'watchedList',
            sequelize,
        }
    );
    return WatchedList;
}
