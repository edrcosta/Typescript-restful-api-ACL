import { Sequelize } from "sequelize";
import { UsersModel, UsersTypesModel } from "./models";

export class Database {
  static tables: Object;

  static initialize(connectionString: string) {
    const connection = new Sequelize(connectionString);

    Database.tables = {
      userTypes: UsersTypesModel.init(UsersTypesModel.dataSchema, {
        sequelize: connection,
        tableName: "Users",
      }),
      users: UsersModel.init(UsersModel.dataSchema, {
        sequelize: connection,
        tableName: "Users",
      }),
    };
  }
}
