import { Database } from './database'
import { ValidationError, ValidationErrorItem } from 'sequelize'
import { iUserUpdateBodySchema } from '../interfaces'

export class CRUD {
  targetTable

  constructor(targetTable: string) {
    this.targetTable = Database.tables[targetTable]
  }

  /**
   * Validate a body for an update operation fixing the issue of all optional fields
   * this is a fix for https://github.com/sequelize/sequelize/issues/270
   */
  private updateValidate = (errors: ValidationError, isUpdateValidation: boolean, data: iUserUpdateBodySchema | iUserUpdateBodySchema | undefined) => {
    if (isUpdateValidation) {
      const errorMessages: Array<string> = []

      errors.errors.forEach((error: ValidationErrorItem) => {
        if (data && data[error.path] !== undefined) errorMessages.push(error.message)
      })

      if (errorMessages.length === 0) return false
      return errorMessages
    } else {
      return errors.errors.map((error: ValidationErrorItem) => error.message)
    }
  }

  /**
   * Validates a body with Sequelize model settings for a target table
   */
  validate<T>(data: iUserUpdateBodySchema | iUserUpdateBodySchema | undefined, isUpdateValidation = false): Promise<string[] | false> {
    return new Promise((resolve) => {
      if (data)
        this.targetTable
          .build(data)
          .validate()
          .then(() => {
            resolve(false)
          })
          .catch((errors: ValidationError) => {
            resolve(this.updateValidate(errors, isUpdateValidation, data))
          })
    })
  }
}
