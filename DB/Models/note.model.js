import { sql_config } from "../connection.js";
import { DataTypes } from "sequelize";
import User from './user.model.js'

const Note = sql_config.define(
    'tbl_note',{
        id:{
            type:DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        title:{
            type:DataTypes.STRING(255),
            unique: true,
            required: true
        },
        content:{
            type:DataTypes.STRING(255),
            required: true
        },
        userID:{
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    },{
        timestamps: true
    }
)
User.hasMany(Note, { foreignKey: 'userID' })
Note.belongsTo(User, {foreignKey: 'userID'})

export default Note