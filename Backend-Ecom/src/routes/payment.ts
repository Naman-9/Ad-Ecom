import express from "express";
import { applyDiscount, createPaymentIntent, newCoupon } from "../controllers/payment.js";

const app = express.Router();

// route - /api/v1/payment/create
app.post("/create", createPaymentIntent);

// route - /api/v1/payment/discount
app.get("/discount", applyDiscount);

// route - /api/v1/payment/coupoun/new
app.post("/coupon/new", newCoupon);

//  route - /api/v1/payment/coupon/all
app.get("/coupon/all", allCoupons);

// route - /api/v1/payment/coupon/:id
app.delete("/coupon/:id", deleteCoupon);



export default app;