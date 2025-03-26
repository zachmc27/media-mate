import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface toWatchAttributes {

    id: number;
    movieId: number;
    movieTitle: string;
    userId: number;

}


interface toWatchCreationAttributes extends Optional<toWatchAttributes, 'id'> {}

export class toWatch extends Model<toWatchCreationAttributes, toWatchAttributes> implements toWatchAttributes {
    public id!: number;
    public movieId!: number;
    public movieTitle!: string;
    public userId!: number;

}


export function toWatchFactory(sequelize: Sequelize): typeof toWatch {
    toWatch.init(
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
        },
        {
            tableName: 'toWatch',
            sequelize,
        }
    );
    return toWatch;
}