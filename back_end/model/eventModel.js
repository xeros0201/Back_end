import mongoose from "mongoose";



const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    
    eventCode:{
        type:String,
 
        unique:true
    },
    heroPic:{
        type:String,
        required:true
    }
    ,
        //tại ngày này- có N khung giờ - có N số ghế

    artist: {
             type:[String]
            }
         ,

    // pics:{
    //     type:[String]
    // },
    discription:{
        type:[String]
    },
    eventStatus:{
        
            type:Number,
            default:0
            //isComing
            //1-Open
            //2-close
    },

    isShowArtist:{
        type:Boolean,
        default:false
       },

    address:{
        type:String,
        required:true,
    },
    ticketLimitationAtOnce:{
        type:Number,
        default:10,
        min:1 
    },
    duration:{
        type:Number,
        required:true
    },
    startHour:{
        type:Number,
        required:true,
        max:23
    },
    startMin:{
        type:Number,
        required:true,
        max:59
    }
    ,
    dateRange:[{
        date:{
            type:Date,
            required:true
        },
        tickets:[{
            name:{
                type:String,
                required:true,
            },
            cost:{
                type:Number,
                required:true,
            },
            session:[
            {

               time: {type:Number,
                required:true,
                max:23,
                min:0,
                 },
                 min:{
                    type:Number,
                    required:true,
                    max:59,
                    min:0
                 },
                maxTicket:{
                    type:Number,
                    required:true
                },
                onlinePayment:[{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Ticket"
                }],
                offlinePayment:[{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Ticket"
                }]
            }]
         }],
    }],
    startDate:{
        type:Date,
        required:true
     },
     endDate:{
        type:Date,
        required:true
     }
     //   tìm trong khoảng  startDate < now < endDate
     ,
   
     typeOfTicket:{
        type:Number,
        //0 vào cổng tự do
        //1 free nhưng đăng ký
        //2 Vé vào cổng
     },
     isHidden:{
        type:Boolean,
        default:true
     },
     online:{
        isShow:{

            type:Boolean,
            default:true
        },
       stk: {
            type:String
        },
        bank:{
            type:String
        },
        stkName:{
            type:String
        },
        ckContent:{
            type:String
        }
     },
     offline:{
        isShow:{

            type:Boolean,
            default:true
        },
    
     }

   
   

},{timestamps:true})
export const EventModel = mongoose.model("Event",schema)