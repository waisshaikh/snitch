import { Router } from "express";
import { registerValidationUser } from "../validator/auth.validation.js";
import { regiterController } from "../controllers/auth.controller.js";
import { validationResult } from "express-validator";

const router = Router();

router.post('/register', registerValidationUser, regiterController);






export default router;