import mongoose, { mongo } from "mongoose";

const ProductSchema = new mongoose.Schema({
    tittle: {
        type: String,
        require: true,
    },

    description: {
        type: String,
        require: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    price: {
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            required: true,
            enum: ["USD", "PKR", "EUR", "INR", "GBP", "JPY"]
        }
    },
    images: [
        {
            type: String,
            required: true,
        },
        

    ]


})

const productModel = mongoose.model("product", ProductSchema)

export default productModel
    