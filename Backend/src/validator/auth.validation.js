import {body, validationresult} from "express-validator";




export const registerValidationUser = [
    body ("email")
                   .notEmpty().withMessage("Email is required")  
                  .isEmail().withMessage("Invalid Email Please Check"),

    body("contact")  
                    .notEmpty().withMessage("Contact is required")
                    .matches(/^\d{10}$/).withMessage("contact must be 10 digit Number"),
    
    body("password") 
                     .notEmpty().withMessage("Password is required")
                     .isLength({min:6}).withMessage("Password Must be at least 6 Charactor Long "),
                     
    body("fullname")
                    .notEmpty().withMessage("Full name is required")   
                    .isLength({min:3}).withMessage("Full name Must be 3 Charactor Long"),               

            

]


