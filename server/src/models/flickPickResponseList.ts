import { DataTypes, Sequelize, Model, Optional} from 'sequelize';
import { FlickListSelections } from './flickpicksListSelections.js';

interface FlickPickSessionListAttributes {
    id?: number;
    userId: number;
    flickPickListId: number;
    listOfChoices?: number[];
    response: string[];
    status: "Inprogress" | "Completed";
}

interface FlickPickSessionListCreationAttributes extends Optional<FlickPickSessionListAttributes, 'id'> {}

export class FlickPickSessionList
    extends Model<FlickPickSessionListCreationAttributes, FlickPickSessionListAttributes>
    implements FlickPickSessionListAttributes
{
    public id?: number;
    public userId!: number;
    public flickPickListId!: number;
    public response!: string[];
    public listOfChoices?: number[];
    public status!: "Inprogress" | "Completed";

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
    public async setStausToCompleted(): Promise<void> {
        // sets the status of the current session to 'Completed'
        // this is called when the user has finished making their selections
        this.status = 'Completed';
        await this.save();
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
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            flickPickListId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            response: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: true,
            },
            listOfChoices: {
                type: DataTypes.ARRAY(DataTypes.INTEGER),
                allowNull: true,
            },
            status: {
                type: DataTypes.ENUM('Inprogress', 'Completed'),
                allowNull: false,
                defaultValue: 'Inprogress',
            },
        },
        {
            tableName: 'flickpicksessionlist',
            sequelize,
        }
    );
        return FlickPickSessionList;
    }
    
