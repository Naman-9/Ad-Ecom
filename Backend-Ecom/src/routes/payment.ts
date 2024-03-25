import express from "express";
import { applyDiscount, newCoupon } from "../controllers/payment.js";

const app = express.Router();


// route - /api/v1/payment/coupoun/new
app.post("/coupoun/new", newCoupon);

// route - /api/v1/payment/discount
app.get("/discount", applyDiscount);


export default app;