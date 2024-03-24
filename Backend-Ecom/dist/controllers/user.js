import { User } from '../models/User.js';
export const newUser = async (req, res, next) => {
    try {
        const { _id, name, email, gender, photo, dob } = req.body;
        const user = await User.create({
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
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error,
        });
    }
};
