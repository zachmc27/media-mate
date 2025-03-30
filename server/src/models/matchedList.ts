import { DataTypes, Sequelize, Model, Optional} from 'sequelize';
import { FlickListSelections } from './flickpicksListSelections.js';

interface FlickPickSessionListAttributes {
    id?: number;
    userOneId: number;
    userTwoId: number;
    flickPickListId: number;
    listOfChoices?: number[];
    userOneResponse: string[];
    userTwoResponse: string[];
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
    public userOneResponse!: string[];
    public userTwoResponse!: string[];
    public matches?: number[];
    public status?: 'Incomplete' | 'Completed';
    public listOfChoices?: number[];

    public async addListOfChoices(): Promise<number[]> {

        // gets the listOfChoices from FlickListSelections where the FlickListSelections is equal to the flickPickListId of the current session
        // then sets the listOfChoices of the current session to the listOfChoices of the FlickListSelections
        // then saves the current session
        // this is called when the session is created
    
        const listOfChoices = await FlickListSelections.findOne({
            where: { id: this.flickPickListId },
        });
        this.listOfChoices = listOfChoices?.listOfChoices ?? [];
        await this.save();
        //prints the listOfChoices in the terminal
        console.log(this.listOfChoices);
        return this.listOfChoices;

    }

    public async findMatchingValues(userOneResponse: string[], userTwoResponse: string[]): Promise<number[]> {

        const responsMatches: number[] = [];
        const minLength = Math.min(userOneResponse.length, userTwoResponse.length);
        //compares each index value of the two arrays and returns the indeces that match
        for (let i = 0; i < minLength; i++) {
            if (userOneResponse[i] === userTwoResponse[i]) {
                responsMatches.push(i);
            }
        }
        // pulls back the listOfChoices where the index is equal to the index of the matches
        const matches = responsMatches.map((index) => this.listOfChoices![index]);
        return matches;


    }


    public async updateStatus(): Promise<void> {    
        if (
            this.userOneResponse &&
            this.userTwoResponse &&
            this.userOneResponse.length === 15 &&
            this.userTwoResponse.length === 15
        ) {
            this.status = 'Completed';
            await this.save();
        }
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
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: true,
            },
            userTwoResponse: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: true,
            },
            matches: {
                type: DataTypes.ARRAY(DataTypes.INTEGER),
                allowNull: true,
            },
            status: {
                type: DataTypes.ENUM('Incomplete', 'Completed'),
                allowNull: true,
                defaultValue: 'Incomplete',
            },
            listOfChoices: {
                type: DataTypes.ARRAY(DataTypes.INTEGER),
                allowNull: true,
            },
        },
        {
            tableName: 'flickpicksessionlist',
            sequelize,
        }
    );
        return FlickPickSessionList;
    }
     
