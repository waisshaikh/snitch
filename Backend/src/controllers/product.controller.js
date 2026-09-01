import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export async function createProduct(req,res) {
    try {

    const {tittle,description,priceAmount,priceCurrency} = req.body
    const seller = req.user

    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "At least one product image is required" })
    }

    const images = await Promise.all(req.files.map(async(file)=>{
        return await uploadFile({
            buffer:file.buffer,
            fileName:file.originalname,
            mimeType:file.mimetype
        })
    }))


    const product = await productModel.create({
        tittle,
        description,
        price:{
            amount: priceAmount,
            currency:   priceCurrency ||"INR"
        },
        images,
        seller: seller._id
    })

    res.status(201).json({
        message:"Product created Succsessfully",
        success:true,
        product
    })
    } catch (error) {
        console.error("Create product error:", error)
        const statusCode = error.status || 500

        res.status(statusCode >= 500 ? 502 : statusCode).json({
            message: "Product creation failed",
            error: error.message || "Image upload failed",
            imageKitStatus: error.status,
            imageKitRequestId: error.imageKitRequestId
        })
    }

    
}


export async function getSellerProduct(req,res){
    const seller = req.user

    const products = await productModel.find({seller: seller._id}).sort({ _id: -1 })

    res.status(200).json({message:"All Product Fetched Successfully",
        success:true,
        products
    })
    
}
