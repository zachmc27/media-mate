import { DataTypes, Sequelize, Model, Optional} from 'sequelize';


interface FlickListSelectionsAttributes {
    id: number;
    name: string;
    listOfChoices:number[];
    description: string;
    icon?: string;
}

interface FlickListSelectionsCreationAttributes extends Optional<FlickListSelectionsAttributes, 'id'> {}


export class FlickListSelections extends Model<FlickListSelectionsCreationAttributes, FlickListSelectionsAttributes> implements FlickListSelectionsAttributes {
    public id!: number;
    public name!: string;
    public listOfChoices!: number[];
    public description!: string;
    public icon?: string;


}

export function FlicklistSelectionsFactory(sequelize: Sequelize): typeof FlickListSelections {
    FlickListSelections.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true, // Ensures the name is not empty
                },
            },
            listOfChoices: {
                type: DataTypes.ARRAY(DataTypes.INTEGER),
                allowNull: false,
                validate: {
                    notEmpty: false, // Ensures the array is not empty
                },
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true, // Ensures the description is not empty
                },
            },
            icon: {
                type: DataTypes.STRING,
                allowNull: true,
                
            },
        },
        {
            tableName: 'flickpickslist', // Ensure this matches your database table name
            sequelize,
            timestamps: false, // Prevents createdAt and updatedAt timestamps
        }
    );
    return FlickListSelections;
}
