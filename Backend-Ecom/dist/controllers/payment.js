import { TryCatch } from "../middlewares/error.js";
import { Coupon } from "../models/coupon.js";
import { ErrorHandler } from "../utils/utility-class.js";
export const newCoupon = TryCatch(async (req, res, next) => {
    const { code, amount } = req.body;
    if (!code || !amount)
        return next(new ErrorHandler("Please Enter both coupon and amount", 400));
    await Coupon.create({ code, amount });
    return res.status(201).json({
        success: true,
        message: `Coupoun ${code} created Successfully.`
    });
});
export const applyDiscount = TryCatch(async (req, res, next) => {
    const { coupon } = req.query;
    const discount = await Coupon.findOne({ code: coupon });
    if (!discount)
        return next(new ErrorHandler("Invalid Coupon Code.", 400));
    return res.status(200).json({
        success: true,
        discount: discount.amount,
    });
});
