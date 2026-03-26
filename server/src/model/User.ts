import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class User extends Model {
    declare id: number;
    declare name: string;
    declare email: string;
    declare password: string;
    declare plan: string;
    declare createdAt: Date;
}

User.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name: { type: DataTypes.STRING, allowNull: false},
    email: { type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    // plan: future monetization
    plan: { type: DataTypes.ENUM('free', 'pro'), defaultValue: 'free'},
}, {
    sequelize,
    tableName: 'users',
});

export default User;
