import { DataTypes, Sequelize, Model, Optional } from 'sequelize';

interface FlickPickSessionListAttributes {
    id?: number;
    userOneId: number;
    userTwoId: number;
    flickPickListId: number;
    flickPickList: number[];
    userOneResponse: boolean[];
    userTwoResponse: boolean[];
    matches?: number[];
    status?: 'Incomplete' | 'Completed';
}

interface FlickPickSessionListCreationAttributes extends Optional<FlickPickSessionListAttributes, 'id'> {}

export class FlickPickSessionList
    extends Model<FlickPickSessionListCreationAttributes, FlickPickSessionListAttributes>
    implements FlickPickSessionListAttributes
{
    public id?: number;
    public userOneId!: number;
    public userTwoId!: number;
    public flickPickListId!: number;
    public flickPickList: number[] = [];
    public userOneResponse!: boolean[];
    public userTwoResponse!: boolean[];
    public matches?: number[];
    public status?: 'Incomplete' | 'Completed';

    public async findMatchingValues(userOneResponse: boolean[], userTwoResponse: boolean[]): Promise<number[]> {
        const matchingIndices: number[] = [];
        const minLength = Math.min(userOneResponse.length, userTwoResponse.length);
        for (let i = 0; i < minLength; i++) {
            if (userOneResponse[i] === userTwoResponse[i]) {
                matchingIndices.push(i);
            }
        }
        const responsesIndeces = matchingIndices.map((index) => this.flickPickList[index]);
        this.matches = responsesIndeces;
        return responsesIndeces;
    }

    
        
}

export function FlickPickSessionListFactory(sequelize: Sequelize): typeof FlickPickSessionList {
    FlickPickSessionList.init(
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
            userOneResponse: {
                type: DataTypes.ARRAY(DataTypes.BOOLEAN),
                allowNull: true,
            },
            userTwoResponse: {
                type: DataTypes.ARRAY(DataTypes.BOOLEAN),
                allowNull: true,
            },
            matches: {
                type: DataTypes.ARRAY(DataTypes.INTEGER),
                allowNull: true,
            },
            flickPickList: {
                type: DataTypes.ARRAY(DataTypes.INTEGER),
                allowNull: true,
            },
            status: {
                type: DataTypes.ENUM('Incomplete', 'Completed'),
                allowNull: true,
                defaultValue: 'Incomplete',
            },
        },
        {
            tableName: 'flickpicksessionlist',
            sequelize,
        }
    );

    FlickPickSessionList.addHook('afterUpdate', async (instance: FlickPickSessionList) => {
        if (instance.userOneResponse && instance.userTwoResponse) {
            const matchingValues = await instance.findMatchingValues(
                instance.userOneResponse,
                instance.userTwoResponse
            );
                console.log('Matching values:', matchingValues);
                // set status to completed
                instance.status = 'Completed';
            }
        });
    
        return FlickPickSessionList;
    }
     
