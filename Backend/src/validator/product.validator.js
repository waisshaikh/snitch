import { body, validationResult } from "express-validator";



function validateProduct(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    next()

}

export const productValidator = [
    body("tittle")
        .notEmpty().withMessage("Tittle is required"),
        

    body("description")
        .notEmpty().withMessage("Description is required"),
        

    body("priceAmount")
    .isNumeric().withMessage("Invalid price"),
        

    body("priceCurrency")
        .notEmpty().withMessage("price currency is required"),

    validateProduct


];








