import Usermodel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js"


async  function sendTokenResponse(user,res){
    const token = jwt.sign({id: user._id, }, process.env.JWT_SECRET)
}

const regiterController = async (req , res)=>{
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
            fullname
        }) 
    
        
    }catch(error){
    console.log(error)
    return res.status(400).json({message:"Server Error "})
    }
    

}

