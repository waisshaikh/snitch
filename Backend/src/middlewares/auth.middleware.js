import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import UserModel from "../models/user.model.js";
import Usermodel from "../models/user.model.js";



export const authenticateSeller = async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try {
        const decode = jwt.verify(token, config.JWT_SECRET);
        const user = await UserModel.findById(decode.id);

        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        if (user.role !== "seller") {
            return res.status(403).json({ message: "Forbidden: Seller account required" });
        }

        req.user = user;
        return next();
    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized: Invalid or expired token",
            error: err.message
        });
    }
};



export const authenticateUser = async (req,res,next) => {
     const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    
    }

    try{
        const decode = jwt.verify(token, config.JWT_SECRET);
        const user = await UserModel.findById(decode.id)

         if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

         req.user = user;
        return next();

        
    }
    catch(err){
        return res.status(401).json({
            message: "Unauthorized: Invalid or expired token",
            error: err.message
        });

    }
}
