import { iUserSchema } from '../models/users'

export interface iUserListQuery {
  page: number
}

export interface iUserGetOneParams {
  id: number
}

export interface iUserUpdateParams {
  id: number
}

export interface iUserDeleteParams {
  id: number
}

export interface iValidateErrors {
  errors: string[]
}

export interface iUserUpdateResponse {
  updated: boolean
  data: iUserUpdateParams
}

export interface iUserDeletedResponse {
  deleted: boolean
}

export interface iCreatedUserResponse {
  created: boolean
  id: number
}
