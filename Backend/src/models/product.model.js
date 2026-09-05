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
    ],

    variants:[{
        images:[
            {
                url:{
                    type: String,
                    required: true
                }
            }
        ],

        stock: {
            type: Number,
            default: 0
        },
        attributes:{
            type:Map,
            of:String
        },
        price:{
            amount:{
                type:Number,
                required:true
            },
            currency:{
                type:String,
                enum:["USD","EUR", "GBP","JPY","INR"],
                default: "INR"
            }
        }
    }],




},{timestamps:true })

const productModel = mongoose.model("product", ProductSchema)

export default productModel
    