import { sql_config } from "../connection.js";
import { DataTypes } from "sequelize";

const User = sql_config.define(
    'tbl_user',{
        id:{
            type:DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type:DataTypes.STRING(255)
        },
        email:{
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        password:{
            type:DataTypes.STRING(255),
            allowNull: false
        },
        age:{
            type:DataTypes.INTEGER(11),
            allowNull: false
        }
    },{
        timestamps: true
    }
)

export default User