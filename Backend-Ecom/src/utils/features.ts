import mongoose from 'mongoose';
import { InvalidateCacheTypeProps } from '../types/types.js';
import { nodeCache } from '../app.js';
import { Product } from '../models/Product.js';

export const connectDB = async () => {
  console.log('connectiog to Db...');
  await mongoose
    .connect(
      'mongodb+srv://namanpr7:AhFyGiiJhYLEMgmj@6pack-ecom.hme6sne.mongodb.net/?retryWrites=true&w=majority&appName=6Pack-Ecom',
      {
        dbName: 'Ecom24',
      },
    )
    .then((c) => console.log(`DB connected to ${c.connection.host}`));
};

export const inValidateCache = async ({ product, admin, order }: InvalidateCacheTypeProps) => {
  if (product) {
    const productKeys: string[] = [
      'latest-products',
      'categories',
      'all-products',
    ];
    const products = await Product.find({}).select("_id");

    products.forEach(i => {
      productKeys.push(`product-detail-${i._id}`);
    });
    
    nodeCache.del(productKeys);
  }
  if (order) {
  }
  if (admin) {
  }
};
