import mongoose from "mongoose";


const schema = new mongoose.Schema({

    name:{
        type: String,
        required:true,
        minlength:2,
        maxlength:20,
        unique:true
    },
    ship_cost:{
        type:Number
    },
    discription:{
        type:String,
        maxlength:30
    },
    logo:{
        type:String
    }
    
},{timestamps:true})
export const Shipment_methodModel = mongoose.model("Shipment_method",schema)