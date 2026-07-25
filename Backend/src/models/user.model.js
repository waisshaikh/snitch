import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{type:String, require:true, unique:true},
    contact:{type:String, require:true},
    password:{type:String, require:true},
    fullname:{type:String, require:true},
    role:{
        type:String,
        enum:["buyer", "seller"],
        default: "buyer"
    }
})

const Usermodel = mongoose.model('user ', userSchema);

export default Usermodel;