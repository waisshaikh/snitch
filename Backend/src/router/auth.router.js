import {Router}  from "express";
import { registerValidationUser } from "../validator/auth.validation.js";
import { validationResult } from "express-validator";

const app = Router();

app.post('/register',validationResult, (req,res)=>{

})





export default app;