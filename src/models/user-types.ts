import { DataTypes, Model } from 'sequelize'

export class UsersTypesModel extends Model {
  static dataSchema = {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    deleted: DataTypes.TINYINT,
    created: DataTypes.DATE,
    updated: DataTypes.DATE,
  }
}
