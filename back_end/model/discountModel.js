import mongoose from "mongoose";


const schema = new mongoose.Schema({

    name:{
        type: String,
        required:true,
        minlength:3,
        maxlength:20,

    },
    code:{
        type:String,
        unique:true,
        required:true
    },
    value:{
        type:Number,
        default:null
    },
    percent:{
        type:Number,
        default:null
    },
    expired_token:{
        type:String,
    },
    number:{
        type:Number,
        required:true
    },
    status:{
        type:Boolean,
        default:true
    }
  
},{timestamps:true})
export const DiscountModel = mongoose.model("Discount",schema)