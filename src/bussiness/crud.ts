import { ModelCtor, ValidationError, ValidationErrorItem } from 'sequelize'
import { iUserSchema, iUserTypeSchema, iUserUpdateBodySchema } from '../interfaces'

export class CRUD {
  /**
   * Validate a body for an update operation fixing the issue of all optional fields
   * this is a fix for https://github.com/sequelize/sequelize/issues/270
   */
  static updateValidate = (errors: ValidationError, isUpdateValidation: boolean, data: iUserUpdateBodySchema | iUserUpdateBodySchema | undefined): Array<string> | false => {
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
  static validate<T>(Table: ModelCtor<iUserSchema | iUserTypeSchema>, data: iUserUpdateBodySchema | iUserUpdateBodySchema | undefined, isUpdateValidation = false): Promise<string[] | false> {
    return new Promise((resolve) => {
      if (data)
        Table.build(data)
          .validate()
          .then(() => {
            resolve(false)
          })
          .catch((errors: ValidationError) => {
            resolve(CRUD.updateValidate(errors, isUpdateValidation, data))
          })
    })
  }
}
