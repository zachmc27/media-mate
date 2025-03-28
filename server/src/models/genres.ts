import { DataTypes, Sequelize, Optional, Model } from 'sequelize';

interface GenreAttributes {
  id: number;
  name: string;
}

interface GenreCreationAttributes extends Optional<GenreAttributes, 'id'> {}

export class Genre extends Model<GenreAttributes, GenreCreationAttributes> implements GenreAttributes {
    public id!: number;
    public name!: string;
}

export function GenreFactory(sequelize: Sequelize): typeof Genre {
    Genre.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
      tableName: 'genres',
      sequelize,
    }
  );

  return Genre;
}