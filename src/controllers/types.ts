import { Request, Response } from 'express'

export class TypesController
{
    get(req: Request, res: Response){
        res.json({
            status: 'success',
            method: 'get'
        })
    }

    list(req: Request, res: Response){
        res.json({
            status: 'success',
            method: 'get'
        })
    }

    update(req: Request, res: Response){
        res.json({
            status: 'success',
            method: 'get'
        })
    }

    delete(req: Request, res: Response){
        res.json({
            status: 'success',
            method: 'get'
        })
    }

    create(req: Request, res: Response){
        res.json({
            status: 'success',
            method: 'get'
        })
    }
}