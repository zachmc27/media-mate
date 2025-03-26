import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface MatchedListAttributes {
    id: number;
    userOneId: number;
    userTwoId: number;
    mediaId: number;
    userOneResponse: boolean;
    userTwoResponse: boolean;
}

interface MatchedListCreationAttributes extends Optional<MatchedListAttributes, 'id'> {}

export class MatchedList
    extends Model<MatchedListCreationAttributes, MatchedListAttributes>
    implements MatchedListAttributes
{
    public id!: number;
    public userOneId!: number;
    public userTwoId!: number;
    public mediaId!: number;
    public userOneResponse!: boolean;
    public userTwoResponse!: boolean;
}

export function MatchedListFactory(sequelize: Sequelize): typeof MatchedList {
    MatchedList.init(
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
            mediaId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            userOneResponse: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            userTwoResponse: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
        },
        {
            tableName: 'matchedList',
            sequelize,
        }
    );

    return MatchedList;
}
