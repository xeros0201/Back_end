import mongoose from "mongoose";


const schema = new mongoose.Schema({

    name:{
        type: String,
        required:true,
        minlength:3,
        maxlength:20,
        
    },

    value:{
        type:Number,
        default:null
    },
    percent:{
        type:Number,
        default:null
    },

    number:{
        type:Number,
        required:true
    },
    status:{
        type:Boolean,
        default:true
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
    userUsed:{
        type:[String],    
    },
    forWhat:{
        type:String,
        enum:["product","event"]
    }



  
},{timestamps:true})
export const DiscountModel = mongoose.model("Discount",schema)