import mongoose from "mongoose";



const schema = new mongoose.Schema({


  //tao mot seat tai ngay 21/6 trong time range 17h-19h

 
  name:{
        type:String,
        required:true,
        unique:true
    },

    discription:{
        type:String
    },
    SeatStatus:{
        
            type:Number,
            default:0
            //isComing
            //1-Open
            //2-close
    },
    cost:{
      type:Number,
      required:true
    },
  


 
 
   

},{timestamps:true})
export const SeatModel = mongoose.model("Seat",schema)