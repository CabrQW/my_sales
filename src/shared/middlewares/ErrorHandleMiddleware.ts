/* eslint-disable @typescript-eslint/no-unused-vars */
import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';

export default class ErrorHandleMiddleware {
  public static handleError(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        type: 'error',
        message: error.message,
      });
    }

    console.error('❌ Internal Server Error:', error);

    return res.status(500).json({
      type: 'error',
      message: 'Internal server error',
    });
  }
}
