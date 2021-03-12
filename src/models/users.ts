import { DataTypes } from 'sequelize';

export const UsersModel = {
    name: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    password_salt: DataTypes.STRING,
    deleted: DataTypes.TINYINT,
    user_type_id: DataTypes.INTEGER,
    created: DataTypes.DATE,
    updated: DataTypes.DATE
}