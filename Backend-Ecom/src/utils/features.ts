import mongoose from 'mongoose';
import { InvalidateCacheTypeProps, OrderItemType } from '../types/types.js';
import { nodeCache } from '../app.js';
import { Product } from '../models/Product.js';

export const connectDB = async (uri: string) => {
  console.log('connectiog to Db...');
  await mongoose
    .connect(
      uri,
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
    const orderKeys: string[]= ["all-orders", ]
    const orders = await Order.find({}).select("_id");

    orders.forEach(i => {
      orderKeys.push(`order-${i._id}`);
    });

    nodeCache.del(orderKeys);

  }
  if (admin) {
  }
};


export const reduceStock = async (orderItems: OrderItemType[]) => {

  for(let i = 0; i < orderItems.length; i++) {
    const order = orderItems[i];
    const product = await Product.findById(order.productId);

    if(!product) throw new Error("Product Not Found");

    product.stock -= order.quantity;

    
    await product.save();
  }
}