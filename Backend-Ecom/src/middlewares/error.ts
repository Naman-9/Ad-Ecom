import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../utils/utility-class.js';
import { controllerType } from '../types/types.js';
import { error } from 'console';

export const errorMiddleware = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  err.message ||= 'Internal error';
  err.statusCode ||= 500;

  return res.status(err.statusCode).json({
    success: true,
    message: err.message,
  });
};

//  a function returns arrow function
export const TryCatch =
  (func: controllerType) =>
  //   received from newUser,...any
  (req: Request, res: Response, next: NextFunction) => {
    return Promise
        .resolve(func(req, res, next))
        .catch(next);
  };
  