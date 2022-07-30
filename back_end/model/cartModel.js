import mongoose from "mongoose";


const schema = new mongoose.Schema({

    name:{
        type: String,
        required:true,
    },
    quantity:{
      type:Number,
      default:1
    },
    cost:{
      type:Number,
      required:true
    },
    thumnailPics:{
      type:String,
      required:true
    },
    version:{
      type:String,
      required:true
    },
    info:{
      product:{
      type:mongoose.Schema.Types.ObjectId,
        required:true
      },
      option:{
        type:mongoose.Schema.Types.ObjectId,
          required:true
        },
        user:{
          type:mongoose.Schema.Types.ObjectId,
          required:true
        }

    }


},{timestamps:true})
export const CartModel = mongoose.model("Cart",schema)