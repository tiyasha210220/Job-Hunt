import { catchAsyncErrors } from './catchAsyncError.js';
import ErrorHandler from './error.js';
import jwt from 'jsonwebtoken';
import {User} from '../Models/userSchema.js';

export const isAuthorized = catchAsyncErrors(async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token) {
        return next(new ErrorHandler("User not Authorized", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);

    next();
});