import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface MediaAttributes {
    id: number;
    title: string;
    year: number;
    genre: string;
    rating: number;
    embedKey: string;
}

interface MediaCreationAttributes extends Optional<MediaAttributes, 'id'> {}

export class Media extends Model<MediaAttributes, MediaCreationAttributes> implements MediaAttributes {
    public id!: number;
    public title!: string;
    public year!: number;
    public genre!: string;
    public rating!: number;
    public embedKey!: string;
}

export function MediaFactory(sequelize: Sequelize): typeof Media {
    Media.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        embedKey: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        tableName: 'Media',
        sequelize,
    }
    );
    return Media;
}