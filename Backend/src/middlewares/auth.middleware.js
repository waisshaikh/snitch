import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import UserModel from "../models/user.model.js";



export const authenticateSeller = async (req, res, next) => {
    const token = req.cookie.token
    if (!token) {
        res.status(401).json({ message: "unathurized" })

    }

    try {

        const decode = jwt.verify(token, config.JWT_SECRET)
        const user = UserModel.findById(decode.id)

        if (!user) {
            res.status(401).json({ message: "unauthurized" })  

        }

        if(user.role!==seller){
            res.status(403).json({message:"forbiden"})
        }

          req.user = user
            next()

    }
     catch {
    res.status(404).json({
        message: "User Not Found"
    });
  

}



}

