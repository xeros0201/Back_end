import mongoose from "mongoose";


const schema = new mongoose.Schema({

    name:{
        type: String,
        required:true,
        minlength:3,
        maxlength:20,
    },
    address:{
      type: String,
      required:true,
      minlength:1,
      maxlength:30,
    },
    position:{
      type: String,
      required:true,
      minlength:3,
      maxlength:20,
    },
    company:{
      type: String,
      required:true,
      minlength:3,
      maxlength:20,
    },
    message:{
      type: String,
      required:true,
      minlength:3,
     
    },
    isHandle:{
      type:Boolean,
      default:false
    },
    handleMessage:{
      type: String,
 
      minlength:3,
    }
  
   

},{timestamps:true})
export const ContactModel = mongoose.model("Contact",schema)