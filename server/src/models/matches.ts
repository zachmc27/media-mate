import { DataTypes, Sequelize, Model, Optional} from 'sequelize';

interface MatchesAttributes {
    id: number;
    userOneId: number;
    userTwoId: number;
    flickPickListId: number;
    matches: number[];
}

interface MatchesCreationAttributes extends Optional<MatchesAttributes, 'id'> {}

export class Matches extends Model<MatchesAttributes, MatchesCreationAttributes> implements MatchesAttributes {
    public id!: number;
    public userOneId!: number;
    public userTwoId!: number;
    public flickPickListId!: number;
    public matches!: number[];



}

export function MatchesFactory(sequelize: Sequelize): typeof Matches {
    Matches.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userOneId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            userTwoId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            flickPickListId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            matches: {
                type: DataTypes.ARRAY(DataTypes.INTEGER),
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