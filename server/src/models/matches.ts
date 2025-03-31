import { DataTypes, Sequelize, Model, Optional} from 'sequelize';

interface MatchesAttributes {
    id: number;
    userIdOne: number;
    userIdTwo: number;
    listId: number;
    responseUserOne: string[];
    responseUserTwo: string[];
}

interface MatchesCreationAttributes extends Optional<MatchesAttributes, 'id'> {}

export class Matches extends Model<MatchesAttributes, MatchesCreationAttributes> implements MatchesAttributes {
    public id!: number;
    public userIdOne!: number;
    public userIdTwo!: number;
    public listId!: number;
    public responseUserOne!: string[];
    public responseUserTwo!: string[];
}

export function MatchesFactory(sequelize: Sequelize): typeof Matches {
    Matches.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userIdOne: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            userIdTwo: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            listId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            responseUserOne: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: false,
            },
            responseUserTwo: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: false,
            },
        },
        {
            tableName: 'Matches',
            modelName: 'Matches',
            timestamps: false,
            sequelize,
        }
    );
    return Matches;
}