import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class Event extends Model {
    declare id: number;
    declare siteId: string;
    declare type: string;
    declare url: string;
    declare referrer: string | null;
    declare userAgent: string | null;
    declare ip: string | null;
    declare country: string | null;
    declare device: string | null;
    declare browser: string | null;
    declare os: string | null;
    declare sessionId: string | null;
    declare visitorId: string | null;
    declare props: object | null;
    declare createdAt: Date;
}

Event.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    siteId: { type: DataTypes.STRING, allowNull: false},
    type: { type: DataTypes.STRING, defaultValue: 'pageview'},
    url: { type: DataTypes.TEXT, allowNull: false},
    referrer: { type: DataTypes.TEXT},
    userAgent: { type: DataTypes.TEXT},
    ip: { type: DataTypes.STRING },     
    country: { type: DataTypes.STRING(2) },
    device: { type: DataTypes.STRING},
    browser: { type: DataTypes.STRING},
    os: { type: DataTypes.STRING},
    sessionId: { type: DataTypes.UUID},
    visitorId: { type: DataTypes.STRING},
    props: { type: DataTypes.JSONB},
}, {
    sequelize,
    tableName: 'events',
    indexes: [
        { fields: ['siteId']},
        { fields: ['created_at']},
        { fields: ['siteId', 'created_at']}, 
    ],
});

export default Event;