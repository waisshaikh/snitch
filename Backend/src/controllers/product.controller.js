import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export async function createProduct(req,res) {
    const {tittle,description,price} = req.body
    const seller = req.user

    const images = await Promise.all(req.files.map(async(file)=>{
        return await uploadFile({
            buffer:file.buffer,
            fileName:file.orignalname
        })
    }))

    const product = await productModel.create({
        tittle,
        description,
        price:{
            amount,
            currency
        },
        images,
        seller: seller._id
    })

    res.status(201).json({
        message:"Product created Succsessfully",
        success:true,
        product
    })

    
}