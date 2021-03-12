import { DataTypes, Model, Sequelize } from 'sequelize';

export interface iUserTypeAddSchema {
    name: string
    description: string
}

export interface iUserTypeSchema extends Model<iUserTypeSchema, iUserTypeAddSchema> {
    id: number
    name: string
    description: string
    createdAt: string
    updatedAt: string
    deleted: boolean
}

export interface iUserTypeViewSchema {
    id: number
    name: string
    createdAt: string
    updatedAt: string
}

export const UserTypeModelSchema = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    createdAt: {
        type: DataTypes.STRING
    },
    updatedAt: {
        type: DataTypes.STRING
    },
    deleted: DataTypes.BOOLEAN

}