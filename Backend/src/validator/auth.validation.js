import { body, validationResult } from "express-validator";



function validateRegiter(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()

}

export const registerValidationUser = [
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid Email Please Check"),

    body("contact")
        .notEmpty().withMessage("Contact is required")
        .matches(/^\d{10}$/).withMessage("contact must be 10 digit Number"),

    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password Must be at least 6 Charactor Long "),

    body("fullname")
        .notEmpty().withMessage("Full name is required")
        .isLength({ min: 3 }).withMessage("Full name Must be 3 Charactor Long"),

    body("isSeller")
        .isBoolean().withMessage("Selller Must be A boolean Value"),

    validateRegiter

];


export const loginValidation = [
    body("email")
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid Email Please Check"),
    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password Must be at least 6 Charactor Long "),
    validateRegiter
]






