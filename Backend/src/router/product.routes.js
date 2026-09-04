import express from "express";
import {authenticateSeller} from "../middlewares/auth.middleware.js"
import multer from "multer"
import {createProduct, getSellerProduct, getAllProduct } from "../controllers/product.controller.js"
import { productValidator } from "../validator/product.validator.js";

const upload = multer({
    storage:multer.memoryStorage(),
    limits:{
        fileSize: 5 * 1024 * 1024  //5 MB
    }
})

const router = express.Router();

router.post("/", authenticateSeller, upload.array('images', 7),  productValidator, createProduct)

router.get("/seller", authenticateSeller,getSellerProduct)


// display All product  for user 

router.get("/", getAllProduct)


export default router

