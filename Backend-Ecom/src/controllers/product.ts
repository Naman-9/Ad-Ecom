import { Request } from 'express';
import { TryCatch } from '../middlewares/error.js';
import { BaseQuery, SearchRequestQuery, newProductRequesstBody } from '../types/types.js';
import { Product } from '../models/Product.js';
import { ErrorHandler } from '../utils/utility-class.js';
import { rm } from 'fs';

export const newProduct = TryCatch(
  async (req: Request<{}, {}, newProductRequesstBody>, res, next) => {
    const { name, price, stock, category } = req.body;
    const photo = req.file;

    if (!photo) return next(new ErrorHandler('All Feilds are Required.', 400));

    if (!name || !price || !stock || !category) {
      rm(photo.path, () => {
        console.log('Deleted');
      });

      return next(new ErrorHandler('Please Add Photo.', 400));
    }

    await Product.create({
      name,
      price,
      stock,
      category: category.toLowerCase(),
      photo: photo?.path,
    });

    return res.status(201).json({
      success: true,
      message: 'Product Created Successfully.',
    });
  },
);

export const updateProduct = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { name, price, stock, category } = req.body;
  const photo = req.file;
  const product = await Product.findById(id);

  if (!product) return next(new ErrorHandler('Invalid Product Id.', 404));

  if (photo) {
    rm(product.photo!, () => {
      console.log('Old photo Deleted');
    });
    product.photo = photo.path;

    return next(new ErrorHandler('Please Add Photo.', 400));
  }

  if (name) {
    product.name = name;
  }
  if (price) {
    product.price = price;
  }
  if (stock) {
    product.stock = stock;
  }
  if (category) {
    product.category = category;
  }

  await product.save();

  return res.status(201).json({
    success: true,
    message: 'Product Updated Successfully.',
  });
});

export const getLatestProduct = TryCatch(async (req, res, next) => {
  const products = await Product.find({}).sort({ createdAt: -1 }).limit(5);

  return res.status(201).json({
    success: true,
    products,
  });
});

export const getCategories = TryCatch(async (req, res, next) => {
  const categories = await Product.distinct('category');

  return res.status(201).json({
    success: true,
    categories,
  });
});

export const getAllProducts = TryCatch(async (req, res, next) => {
  const products = await Product.find({});

  return res.status(201).json({
    success: true,
    products,
  });
});

export const getProductDetails = TryCatch(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler('Invalid Product Id.', 404));

  return res.status(201).json({
    success: true,
    product,
  });
});

export const deleteProduct = TryCatch(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) return next(new ErrorHandler('Product Not Found.', 404));

  rm(product.photo!, () => {
    console.log('Product Photo Deleted.');
  });

  await product.deleteOne();

  return res.status(201).json({
    success: true,
    message: 'Product Deleted Successfully.',
  });
});


export const getAllProductsWithFilter = TryCatch(
  async (req: Request<{}, {}, {}, SearchRequestQuery>, res, next) => {
    const { search, sort, category, price } = req.query;
    const page = Number(req.query.page) || 1;

    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    const skip = limit * (page - 1);

    const baseQuery: BaseQuery = {};

    if (search) {
      baseQuery.name = {
        $regex: search,
        $options: 'i',
      };
    }
    if (price) {
      baseQuery.price = {
        $lte: Number(price),
      };
    }

    if (category) baseQuery.category = category;

    const [products, filteredOnlyProducts] = await Promise.all([
      Product.find(baseQuery)
        .sort(sort ? { price: sort === 'asc' ? 1 : -1 } : undefined)
        .limit(limit)
        .skip(skip),
        
      Product.find(baseQuery),
    ]);

    const totalPage = Math.ceil(filteredOnlyProducts.length / limit);

    return res.status(201).json({
      success: true,
      products,
      totalPage,
    });
  },
);
