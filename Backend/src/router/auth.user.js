import {Router}  from "express";
import { registerValidationUser } from "../validator/auth.validation";
import { validationResult } from "express-validator";

const app = Router();

Router.post('/register',validationResult, (req,res)=>{
    
})





export default app;