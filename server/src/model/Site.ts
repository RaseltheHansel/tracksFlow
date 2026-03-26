import { DataTypes, Model } from "sequelize";   
import { sequelize } from "../config/db";

class Site extends Model {
    declare id: number;
    declare name: string;
    declare domain: string;
    declare siteId: string;
    declare userId: number;
    declare timezone: string;
}

Site.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name: { type: DataTypes.STRING, allowNull: false},
    domain: { type: DataTypes.STRING, allowNull: false },
    siteId: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, unique: true},
    userId: { type: DataTypes.INTEGER, allowNull: false},
    timezone: { type: DataTypes.STRING, defaultValue: 'UTC'},
}, {
    sequelize,
    tableName: 'sites',
})

export default Site;