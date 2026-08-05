import Usermodel from "../models/user.model.js";

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
        

        
    }catch(error){
    console.log(error)
    return res.status(400).json({message:"Server Error "})
    }
    

}