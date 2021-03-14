import { Database } from './database'
import { ValidationError, ValidationErrorItem } from 'sequelize'
import {
  iUserTypeSchema,
  iUserSchema,
  iUserTypeAddSchema,
  iUserAddSchema,
} from './interfaces'

export class CRUD {
  targetTable: string

  constructor(targetTable: string) {
    this.targetTable = targetTable
  }

  listWithPagination<T>(page: number): Promise<unknown> {
    const perPage = 10

    return Database.tables[this.targetTable].findAll({
      where: {
        deleted: null,
      },
      limit: perPage,
      offset: page * perPage - perPage,
    })
  }

  async getById<T>(id: number): Promise<iUserTypeSchema | iUserSchema | null> {
    return Database.tables[this.targetTable].findOne({
      where: {
        deleted: null,
        id: id,
      },
    })
  }

  validate<T>(
    data: iUserAddSchema | iUserTypeAddSchema | undefined,
    isUpdateValidation = false
  ): Promise<unknown> {
    return new Promise((resolve) => {
      Database.tables[this.targetTable]
        .build(data)
        .validate()
        .then(() => {
          resolve(false)
        })
        .catch((errors: ValidationError) => {
          if (isUpdateValidation) {
            // when updating we need to allow undefined fields to no be identified as an error
            // this fix the issue https://github.com/sequelize/sequelize/issues/270
            const errorMessages: Array<string> = []

            errors.errors.forEach((error: ValidationErrorItem) => {
              if (data && data[error.path] !== undefined) {
                errorMessages.push(error.message)
              }
            })

            if (errorMessages.length === 0) {
              resolve(false)
            } else {
              resolve(errorMessages)
            }
          } else {
            resolve(
              errors.errors.map((error: ValidationErrorItem) => error.message)
            )
          }
        })
    })
  }

  udpateById<T>(
    id: number,
    data: T
  ): Promise<[number, (iUserTypeSchema | iUserSchema)[]]> {
    return Database.tables[this.targetTable].update(data, {
      where: {
        deleted: null,
        id: id,
      },
    })
  }
}
