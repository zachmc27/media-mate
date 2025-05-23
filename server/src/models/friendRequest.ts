import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { User } from './user';

interface FriendsListAttributes {

    id?: number;
    requesterId: number;
    recieverId: number;
    status: 'Pending' | 'Accepted' | 'Rejected';
    requester?: User;

}

interface FriendsListCreationAttributes extends Optional<FriendsListAttributes, 'id'> {}

export class FriendsList extends Model<FriendsListCreationAttributes, FriendsListAttributes> implements FriendsListAttributes {
    public id!: number;
    public requesterId!: number;
    public recieverId!: number;
    public status!: 'Pending' | 'Accepted' | 'Rejected';
    public requester?: User;

}

export function FriendsListFactory(sequelize: Sequelize): typeof FriendsList {
    FriendsList.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            requesterId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            recieverId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'Pending',
            },
        },
        {
            tableName: 'FriendsList',
            sequelize,
        }
    );

    return FriendsList;
}