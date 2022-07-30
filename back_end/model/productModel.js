import mongoose from "mongoose";



const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
 
    productCode:{
        type:String,
        required:true,
        unique:true
    },
    genres:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Genres",
        default:"None"
    }],

    pics:{
        type:[String],
    
    },
    discription:{
        type:String
    },
    moreInfo:{
        type:[String],
        default:"none"
    },
    option:[
        {
        style:{
        type:String,
        required:true,
        maxlength:30,
        minlength:3
        },
        cost:{
            type:Number,
            required:true,
        }, 
        thumnailPics:{
            type:String,
            required:true,
        },
        number:{
            type:Number,
            default:1000,
        },

        },     
    ],
    isNewest:{
        type:Boolean,
        default:true
    },
    isBestSeller:{
        type:Boolean,
        default:false
    },
    isPreOrder:{
        type:Boolean,
        default:false
    }


    
},{timestamps:true})


export const ProductModel = mongoose.model("Product",schema)