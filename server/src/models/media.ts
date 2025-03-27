import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface MediaAttributes {
    id: number;
    title: string;
    year: number;
    genre: number[];
    rating: number;
    cover: string;
    embedKey: string;
}

interface MediaCreationAttributes extends Optional<MediaAttributes, 'id'> {}

export class Media extends Model<MediaAttributes, MediaCreationAttributes> implements MediaAttributes {
    public id!: number;
    public title!: string;
    public year!: number;
    public genre!: number[];
    public rating!: number;
    public cover!: string;
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
            type: DataTypes.ARRAY(DataTypes.INTEGER),
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cover: {
            type: DataTypes.STRING,
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

export interface MediaItem {
    id: number;
    title?: string;
    name?: string;
    release_date?: string;
    first_air_date?: string;
    genre_ids: number[];
    vote_average: number;
    popularity: number;
    poster_path?: string;
  }
  
  export interface TMDBResponse {
    results: MediaItem[];
  }

  export interface KeywordMediaItem {
    id: number;
    title: string;
    year: string;
    genre: number[];
    rating: number;
    cover: string;
    embedKey: string;
  }

  export interface TMDBKeywordResponse {
    results: KeywordMediaItem[];
  }

