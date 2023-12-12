import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../helpers/apiError'

export const errorMiddleware = async (err: Error & Partial<ApiError>, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode ?? 500
    if (err instanceof ApiError) {
        return res.status(statusCode).json({ message: err.message })
    } else {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}