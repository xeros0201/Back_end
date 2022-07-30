import mongoose from "mongoose";


const schema = new mongoose.Schema({

    name:{
        type: String,
        required:true,
        minlength:6,
        maxlength:20,
 
    },
  
    shipment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    tolal_cost:{
        type:Number,
        
    },
    payment:{
        type:Boolean,
        
        default:false
    },
    shipment_method:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Shipment_method",
        required:true
    },
    shipcode:{
        type:String,
        unique:true,
    },
    status:{
        type:String,
        required:true
    },
    discount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Discount",
          
    }

},{timestamps:true})
export const BillModel = mongoose.model("Bill",schema)