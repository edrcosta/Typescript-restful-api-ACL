import { Handler } from 'express'

export interface iEndpoint {
    url: string
    method: string
    handdler: Handler
}