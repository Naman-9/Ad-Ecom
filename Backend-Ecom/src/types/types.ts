import { NextFunction, Request, Response } from 'express';

export interface newUserRequesstBody {
  name: string;
  email: string;
  photo: string;
  gender: 'male' | 'female';
  _id: string;
  dob: Date;
}

export interface newProductRequesstBody {
  name: string;
  category: string;
  price: number;
  stock: number;
}

export type controllerType = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void | Response<any, Record<string, any>>>;

export type SearchRequestQuery = {
  search?: string;
  price?: string;
  category?: string;
  sort?: string;
  page?: string;
};

export interface BaseQuery {
  name?: {
    $regex: string;
    $options: string;
  };
  price?: {
    $lte: number;
  };
  category?: string;
}

export type InvalidateCacheTypeProps = {
  product?: boolean;
  order?: boolean;
  admin?: boolean;
}