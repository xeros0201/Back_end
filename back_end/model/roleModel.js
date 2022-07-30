import mongoose from "mongoose";


const schema = new mongoose.Schema({

    name:{
        type: String,
        required:true,  
        maxlength:20,
        unique:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isMasterPage:{
        type:Boolean,
        default:false
    },
    isStaff:{
        type:Boolean,
        default:false
    },
    

},{timestamps:true})
export const RoleModel = mongoose.model("Role",schema)