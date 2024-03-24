import express from 'express';
import { errorMiddleware } from './middlewares/error.js';
import userRoute from './routes/user.js';
import productRoute from './routes/product.js';
import orderRoute from './routes/order.js';
import { connectDB } from './utils/features.js';
import NodeCache from 'node-cache';
import { config } from 'dotenv';
import morgan from 'morgan';

config({
  path: './.env',
});

const PORT = process.env.PORT || 4000;
const app = express();

connectDB(process.env.MONOG_URI || "");

// cache data in RAM
export const nodeCache = new NodeCache();

// middleware - to access data
app.use(express.json());
// registers requests
app.use(morgan("dev"));
// when using form (not multiple)
// app.use(express.urlencoded);

// Routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/product', productRoute);
app.use('/api/v1/order', orderRoute);

app.use('/uploads', express.static('uploads'));
// middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running at PORT: ${PORT}`);
});
