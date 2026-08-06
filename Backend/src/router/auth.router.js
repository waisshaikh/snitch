import {Router}  from "express";
import { registerValidationUser } from "../validator/auth.validation.js";
import { regiterController } from "../controllers/auth.controller.js";
import { validationResult } from "express-validator";

const router = Router();

router.get('/register',validationResult,regiterController)





export default router;