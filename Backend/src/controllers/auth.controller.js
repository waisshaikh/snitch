import Usermodel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js"
import cookie from "cookie-parser"


async  function sendTokenResponse(user,res, message){
    const token = jwt.sign(
        {id: user._id, 

        }, config.JWT_SECRET ,{
            expiresIn:"7d"
        });

        res.cookie("token",token)

       res.status({
        message,                                                
        success:true,
        
        user:{
            id:user._id,
            email:user.email,
            contact:user.contact,
            fullname:user.fullname,
            role:user.role 

        }
       }) 
}




export const regiterController = async (req , res)=>{
    const {email, contact,password,fullname,isSeller}= req.body
    try{
        const isUserExiste = Usermodel.findOne({
            $or:[
                {contact},
                {email},
            ]
        });

        if(isUserExiste){
            return res.status(400).json({message:"User Alredy Exist With this Email or Contact"})
        }

        const user = await Usermodel.create({
            email,
            contact,
            password,
            fullname,
           role: isSeller ? "seller":"buyer"
        }) 
    
        
        await sendTokenResponse(user,res, "user Registerd successfully")

    }catch(error){
    console.log(error)
    return res.status(400).json({message:"Server Error "})
    }
    

}

