import mongoose from "mongoose";


const schema = new mongoose.Schema({

    name:{
        type: String,
    
    
    },
    cost:{
        type:Number
    },

    
},{timestamps:true})
export const Shipment_City_Fee = mongoose.model("Shipment_City_Fee",schema)