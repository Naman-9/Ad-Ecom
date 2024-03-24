import { NextFunction, Request, Response } from 'express';

export interface newUserRequesstBody {
  name: string;
  email: string;
  photo: string;
  gender: 'male' | 'female';
  _id: string;
  dob: Date;
}

export type controllerType = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void | Response<any, Record<string, any>>>;
