
import mongoose from "mongoose";


const schema = new mongoose.Schema({

    username:{
        type: String,
        required:true,
        minlength:6,
        maxlength:20,
        unique:true
    },
    name:{
        type: String,
        required:true,
        minlength:6,
        maxlength:20,
  
    },
    email:{
        type: String,
        required:true,
        minlength:5,
        maxlength:50,
        unique:true
    },
    password:{
        type: String,
        required:true,
        minlength:8,
        
        
    },
    role:{
        type:String,
        enum:["1","admin","client"],
        default:"client"
    },
    //shiping adress
    address:{
        type: String,
        minlength:3,
        maxlength:80,
        default:null
    },
    phone:{
        type: String,
        minlength:9,
        maxlength:80,
        default:null
    },

    bills:[{
        infor:{type:mongoose.Schema.Types.ObjectId,
        ref:"Bill"},  
    }],
  
    
  



},{timestamps:true})
export const UserModel = mongoose.model("User",schema)