import mongoose from 'mongoose';
import { nodeCache } from '../app.js';
import { Product } from '../models/Product.js';
import { Order } from '../models/Order.js';
export const connectDB = async (uri) => {
    console.log('connectiog to Db...');
    await mongoose
        .connect(uri, {
        dbName: 'Ecom24',
    })
        .then((c) => console.log(`DB connected to ${c.connection.host}`));
};
export const inValidateCache = ({ product, admin, order, userId, orderId, productId, }) => {
    if (product) {
        const productKeys = [
            'latest-products',
            'categories',
            'all-products',
            `product-detail-${productId}`,
        ];
        // if string push
        if (typeof productId === 'string')
            productKeys.push(`product-${productId}`);
        // if array then loop and push
        if (typeof productId === 'object')
            productId.forEach((i) => `product-${i}`);
        nodeCache.del(productKeys);
    }
    if (order) {
        const orderKeys = ['all-orders', `my-orders-${userId}`, `order-${orderId}`];
        const orders = Order.find({}).select('_id');
        nodeCache.del(orderKeys);
    }
    if (admin) {
        const adminKeys = [
            'admin-stats',
            'admin-pie-charts',
            'admin- bars-charts',
            'admin-line-charts',
        ];
        nodeCache.del(adminKeys);
    }
};
export const reduceStock = async (orderItems) => {
    for (let i = 0; i < orderItems.length; i++) {
        const order = orderItems[i];
        const product = await Product.findById(order.productId);
        if (!product)
            throw new Error('Product Not Found');
        product.stock -= order.quantity;
        await product.save();
    }
};
export const calculatePercentage = (thisMonth, lastMonth) => {
    if (lastMonth === 0)
        return thisMonth * 100;
    const percent = (thisMonth / lastMonth) * 100;
    return Number(percent.toFixed(0));
};
export const getInventory = async ({ categories, productsCounts, }) => {
    // count no of prod
    const categoriesCountPromise = categories.map((category) => Product.countDocuments({ category }));
    const categoriesCount = await Promise.all(categoriesCountPromise);
    const categoryCount = [];
    categories.forEach((category, i) => {
        categoryCount.push({
            [category]: Math.round((categoriesCount[i] / productsCounts) * 100),
        });
    });
    return categoryCount;
};
export const getChartData = ({ length, docArr, today, property }) => {
    const data = new Array(length).fill(0);
    docArr.forEach((i) => {
        const creationDate = i.createdAt;
        const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;
        if (monthDiff < length) {
            data[length - monthDiff - 1] += property ? i[property] : 1;
        }
    });
    return data;
};
