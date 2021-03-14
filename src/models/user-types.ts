import { DataTypes } from 'sequelize'

export const UserTypeModelSchema = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.STRING,
  },
  updatedAt: {
    field: 'updated_at',
    type: DataTypes.STRING,
  },
  deleted: DataTypes.BOOLEAN,
}
