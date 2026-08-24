import { Router } from "express";
import { registerValidationUser, loginValidation } from "../validator/auth.validation.js";
import { regiterController, loginController } from "../controllers/auth.controller.js";

const router = Router();

router.post('/register', registerValidationUser, regiterController);
router.get('/login', loginValidation, loginController);






export default router;