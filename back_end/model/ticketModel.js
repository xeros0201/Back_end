import mongoose from "mongoose";



const schema = new mongoose.Schema({
      name:{
        type:String,
        required:true
      },
    eventInfo:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Event",
      required:true
      //EventName
      //EventAdress
     /*/ //EventOption:{
        OptionName
    // }
        EndDate
    */
    },
    eventCode:{
      type:String,
      required:true
    } ,
    buyerInfo:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true,
      //-UserName
      //-UserPhone
      //-UserEmail
      //UserRole
    },
    date:{
      type:Date,
      required:true
    },
    time:{
        type:Number,
      required:true
       },
       min:{
        type:Number,
        required:true
       },
      
    
  
    slot:{
      type:Number,
      required:true
    },
    isOnlinePayment:{
      type:Boolean,
      required:true
    }
    ,
    costPerTicket:{
      type:Number,
      required:true
    },

    isPaid:{
      type:Boolean,
      default:false
    },
    isCheckIn:{
      type:Boolean,
      default:false,    
    },
    isExpired:{
      type:Boolean,
      default:false
    },
    note:{
      type:String,

    }
    
},{timestamps:true})
export const TicketModel = mongoose.model("Ticket",schema)