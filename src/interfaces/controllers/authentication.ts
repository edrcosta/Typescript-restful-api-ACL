export interface IAuthRequest {
  body: {
    username: string
    password: string
  }
}

export interface iAuthResponse {
  statusCode: number
  accessToken: string
}

export interface iAccessTokenDecoded {
  id: number
  user: string
  userType: string
  userTypeId: number
  iat?: number
  exp?: number
}

export interface iAuthRequest {
  path: string
  headers: {
    authorization: string | iAccessTokenDecoded
  }
}
