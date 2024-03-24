import { Request, Response } from 'express';
import { TryCatch } from '../middlewares/error.js';
import { NewOrderRequestBody } from '../types/types.js';
import { Order } from '../models/Order.js';
import { inValidateCache, reduceStock } from '../utils/features.js';
import { ErrorHandler } from '../utils/utility-class.js';
import { nodeCache } from '../app.js';

export const newOrder = TryCatch(
  async (req: Request<{}, {}, NewOrderRequestBody>, res: Response, next) => {
    const { shippingInfo, orderItems, user, subTotal, tax, shippingCharges, discount, total } =
      req.body;

    if (!shippingInfo || !orderItems || !user || !subTotal || !tax || !total)
      return next(new ErrorHandler('Please Enter all Feilds.', 400));

    await Order.create({
      shippingInfo,
      orderItems,
      user,
      subTotal,
      tax,
      shippingCharges,
      discount,
      total,
    });

    await reduceStock(orderItems);

    await inValidateCache({ product: true, order: true, admin: true });

    return res.status(201).json({
      success: true,
      message: 'Order created.',
    });
  },
);

// route - api/v1/order/myorder
export const myOrders = TryCatch(async (req, res, next) => {
  const { id: user } = req.query;
  const key = `my-orders-${user}`;

  let orders = [];

  if (nodeCache.has(key)) orders = JSON.parse(nodeCache.get(key) as string);
  else {
    orders = await Order.find({ user });
    nodeCache.set(key, JSON.stringify(orders));
  }

  return res.status(201).json({
    success: true,
    orders,
  });
});

// route - api/v1/order/myorder
export const singleOrderDetails = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const key = `order-${id}`;

  let order;

  if (nodeCache.has(key)) order = JSON.parse(nodeCache.get(key) as string);
  else {
    order = await Order.findById(id).populate('user', 'name');
    if (!order) return next(new ErrorHandler('Order not found.', 400));
    nodeCache.set(key, JSON.stringify(order));
  }

  return res.status(201).json({
    success: true,
    order,
  });
});

// route - api/v1/order/allorder
export const allOrders = TryCatch(async (req, res, next) => {
  const key = `all-orders`;

  let orders = [];

  if (nodeCache.has(key)) orders = JSON.parse(nodeCache.get(key) as string);
  else {
    orders = await Order.find().populate('user', 'name');
    nodeCache.set(key, JSON.stringify(orders));
  }

  return res.status(201).json({
    success: true,
    orders,
  });
});

export const processOrder = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findById(id);

  if (!order) return next(new ErrorHandler('Order not found.', 400));

  switch (order.status) {
    case 'Processing':
      order.status = 'Shipped';
      break;

    case 'Shipped':
      order.status = 'Delivered';
      break;

    default:
      order.status = 'Delivered';
      break;
  }

  await order.save();

  await inValidateCache({order: true, admin: true})
  return res.status(201).json({
    success: true,
    message: "Order Processed Successfully."
  });
});

export const deleteOrder = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  const order = await Order.findById(id);

  if (!order) return next(new ErrorHandler('Order not found.', 400));

  
  await order.deleteOne();

  await inValidateCache({order: true, admin: true})
  return res.status(201).json({
    success: true,
    message: "Order Deleted Successfully."
  });
});
