import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
  details?: unknown;
}

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  if (env.NODE_ENV !== 'test') {
    console.error(`[Error] ${statusCode} - ${message}`, err.stack);
  }

  res.status(statusCode).json({
    success: false,
    message: env.NODE_ENV === 'production' && statusCode === 500 ? 'An unexpected error occurred' : message,
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      ...(env.NODE_ENV !== 'production' && { details: err.details, stack: err.stack }),
    },
  });
};
