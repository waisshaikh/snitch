import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import userModel from "../models/user.model.js"
import Usermodel from "../models/user.model.js";


export const authenticateSeller = async(req, res, next) =>{
    const jwt = req.token.config.JWT_SECRET
    
    if(!jwt){
        res.status(401).json({message:"Anuthurized"})
    }

    try{
        const user = jwt.verify(jwt.id)

        if(!user){
            res.status(401).json({message:"Forbiden"})
        }

        const seller = await Usermodel.findById(user)

        if(!seller==user.role){
            res.status(401).json({message:"Anutherized"})
        }

        req.seller= user
        next()



    }
    catch{

    }

}