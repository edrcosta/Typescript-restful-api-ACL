import { DataTypes, Model, Sequelize } from 'sequelize';

export interface iUserAddSchema {
    email: string
    passwordSalt: string
    passwordHash: string
}

export interface iUserSchema extends Model<iUserSchema, iUserAddSchema> {
    id: number
    email: string
    passwordSalt: string
    passwordHash: string
    createdAt: string
    updatedAt: string
    deleted: boolean
}

export interface iUserViewSchema {
    id: number
    email: string
    createdAt: string
    updatedAt: string
}

export const UserModelSchema = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING
    },
    passwordSalt: {
        type: DataTypes.STRING
    },
    passwordHash: {
        type: DataTypes.STRING
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    },
    deleted: DataTypes.BOOLEAN

}