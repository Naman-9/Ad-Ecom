import { User } from '../models/User.js';
import { ErrorHandler } from '../utils/utility-class.js';
import { TryCatch } from '../middlewares/error.js';
export const newUser = TryCatch(async (req, res, next) => {
    const { _id, name, email, gender, photo, dob } = req.body;
    let user = await User.findById(_id);
    if (user)
        return res.status(200).json({
            success: true,
            message: `Welcome, ${user.name}`
        });
    if (!_id || !name || email || gender || photo || dob) {
        return next(new ErrorHandler("Please add all Feilds.", 400));
    }
    user = await User.create({
        _id,
        name,
        email,
        gender,
        photo,
        dob: new Date(dob),
    });
    return res.status(200).json({
        success: true,
        message: `Welcome, ${user.name}`,
    });
});
export const getAllUsers = TryCatch();
