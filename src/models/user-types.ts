import { DataTypes } from 'sequelize';

export const UserTypesModel = {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    deleted: DataTypes.TINYINT,
    created: DataTypes.DATE,
    updated: DataTypes.DATE
}