import mongoose from "mongoose";


const schema = new mongoose.Schema({

    name:{
        type: String,
        required:true,
      
 
    },
    buyer:{
  
            type:mongoose.Schema.Types.ObjectId,
       


        
    },
    shipmentDetail:{
        fullAdress:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        
        district:{
            type:String,
            required:true
        },
        wards:{
            type:String,
            required:true  
        }

    },
    products:{
        type:[Object],
        required:true
    },
    tolal_cost:{
        type:Number,
        
    },
    isOnlinePayment:{
        type:Boolean,
        
        default:false
    },
    isUseShipmentService:{
        type:Boolean,
        required:true
    },
    isCOD:{
        // thanh toan khi nhan hang, bao gom ca nhan truc tiep
        type:Boolean,
        required:true
    },
    shipcode:{
        type:String,
  
    },
    status:{

        type:String,
        enum:['pending','repare','shipping','done']
    },
    discount:{
        type:String,
    
          
    },
    message:{
        type:String
    }

},{timestamps:true})
export const BillModel = mongoose.model("Bill",schema)