import { EventModel } from "../model/eventModel.js"
import { ProjectModel } from "../model/project.js"
import { SeatModel } from "../model/seatModel.js"
import { TicketModel } from "../model/ticketModel.js"

export const createSeat= async (req,res)=>{
  try {
      const newSeat = req.body

      const seat = new SeatModel(newSeat)
      await seat.save()

      return res.status(200).json(seat)
  } catch (error) {
      return res.status(500).json({error:error})
  }
}

  export const getAllEvent= async (req,res)=>{
    try {

        const events = await EventModel.find({"endDate" : { $gte : new Date() },"isHidden":false},{
            "dateRange.tickets.session.onlinePayment":0,
            "dateRange.tickets.session.offlinePayment":0
        })

        return res.status(200).json(events)
    } catch (error) {
        return res.status(500).json({error:error})
    }
  }
  export const getAllEventAdmin= async (req,res)=>{
    try {

        const events = await EventModel.find().populate("dateRange.tickets.session.onlinePayment")

        return res.status(200).json(events)
    } catch (error) {
        return res.status(500).json({error:error})
    }
  }

  export const getEvent= async (req,res)=>{
    try {
        //eventId
        //eventDateRange
        //ticketName
        //ticketTime

        const events = await EventModel.findByIdAndUpdate({
        "_id":"62bd86141b00038c3cbd3eae"
        },{
            "$inc":{
                "dateRange.$[elemtX].tickets.$[elemtY].session.$[elemtZ].maxTicket":-1
            },
            // "$push":""
            
        },
      
        {
            "arrayFilters":[
                {
                    "elemtX.date":"2022-06-30T17:00:00.000+00:00"
                },
                {
                        "elemtY.name":"newName"
                },
                {
                    "elemtZ.time":9
                }
            ]
            
        },
      
        )

        return res.status(200).json(events)
    } catch (error) {
        return res.status(500).json({error:error})
    }
  }

export const createEvent= async (req,res)=>{
    try {
        const newEvent = req.body
        const event = new EventModel(newEvent)
        await event.save()

        return res.status(200).json({"message":"success",event})
    } catch (error) {
        return res.status(500).json({error:error})
    }
}

 

export const createTicket = async (req,res)=>{
  try {
        const newTicket = req.body
      
        const ticket  =  new TicketModel(newTicket)
        await ticket.save()
        if(newTicket.isOnlinePayment){
         await EventModel.findByIdAndUpdate({
            "_id":newTicket.eventInfo
            },{
                // "$inc":{
                //     "dateRange.$[elemtX].tickets.$[elemtY].session.$[elemtZ].maxTicket":-1
                // },
                  "$push":{"dateRange.$[elemtX].tickets.$[elemtY].session.$[elemtZ].onlinePayment":ticket._id}
                
            },
          
            {
                "arrayFilters":[
                    {
                        "elemtX.date":newTicket.date
                    },
                    {
                            "elemtY.name":newTicket.name
                    },
                    {
                        "elemtZ.time":newTicket.time,
                        "elemtZ.min":newTicket.min
                    },
                
                ]
                
            },
          
            )}else{
                await EventModel.findByIdAndUpdate({
                    "_id":newTicket.eventInfo
                    },{
                        // "$inc":{
                        //     "dateRange.$[elemtX].tickets.$[elemtY].session.$[elemtZ].maxTicket":-1
                        // },
                          "$push":{"dateRange.$[elemtX].tickets.$[elemtY].session.$[elemtZ].offlinePayment":ticket._id}
                        
                    },
                  
                    {
                        "arrayFilters":[
                            {
                                "elemtX.date":newTicket.date
                            },
                            {
                                    "elemtY.name":newTicket.name
                            },
                            {
                                "elemtZ.time":newTicket.time,
                                "elemtZ.min":newTicket.min
                            },
                        
                        ]
                        
                    },
                  
                    )}
      return  res.status(200).json(ticket)
  } catch (error) {
      return   res.status(500).json({error:error})
  }
} 
export const activeTicket = async (req,res)=>{
    try {
          const newTicket = req.body
       
         if(!newTicket.isPaid){

             await TicketModel.findByIdAndUpdate(newTicket._id,{isPaid:true})
            
             if(newTicket.isOnlinePayment){
              await EventModel.findByIdAndUpdate({
                 "_id":newTicket.eventInfo
                 },{
                     "$inc":{
                         "dateRange.$[elemtX].tickets.$[elemtY].session.$[elemtZ].maxTicket":-1*newTicket.slot
                     },
                       // "$push":{"dateRange.$[elemtX].tickets.$[elemtY].session.$[elemtZ].onlinePayment":ticket._id}
                     
                 },
               
                 {
                     "arrayFilters":[
                         {
                             "elemtX.date":newTicket.date
                         },
                         {
                                 "elemtY.name":newTicket.name
                         },
                         {
                             "elemtZ.time":newTicket.time,
                             "elemtZ.min":newTicket.min
                         },
                     
                     ]
                     
                 },
               
                 )}else{
                     await EventModel.findByIdAndUpdate({
                         "_id":newTicket.eventInfo
                         },{
                             "$inc":{
                                 "dateRange.$[elemtX].tickets.$[elemtY].session.$[elemtZ].maxTicket":-1*newTicket.slot
                             },
                               // "$push":{"dateRange.$[elemtX].tickets.$[elemtY].session.$[elemtZ].offlinePayment":ticket._id}
                             
                         },
                       
                         {
                             "arrayFilters":[
                                 {
                                     "elemtX.date":newTicket.date
                                 },
                                 {
                                         "elemtY.name":newTicket.name
                                 },
                                 {
                                     "elemtZ.time":newTicket.time,
                                     "elemtZ.min":newTicket.min
                                 },
                             
                             ]
                             
                         },
                       
                         )}
                         return  res.status(200).json("Active success !")
         }
        return  res.status(200).json("Already active !")
    } catch (error) {
        return   res.status(500).json({error:error})
    }
  } 
export const getOneEvent = async (req,res)=>{
    try {
        const eventID = req.params.id   
        
        const event = await EventModel.findOne({"_id":eventID},{
            "dateRange.tickets.session.onlinePayment":0,
            "dateRange.tickets.session.offlinePayment":0
        })
        return res.status(200).json(event)
    } catch (error) {
        return   res.status(500).json({error:error})
    }
}
export const getAllOpen = async (req,res)=>{
    try {
       
         
        const event = await EventModel.find({"eventStatus":1,},{
            "dateRange.tickets.session.onlinePayment":0,
            "dateRange.tickets.session.offlinePayment":0
        }).sort({ 'timestamp': 1 })
        if(event.length==0){
            let newEvent = [{
                name:"Không có sự kiện",
                heroPic:"https://live.staticflickr.com/65535/52248989095_1f7832b306_o.png"
            }]
            return res.status(200).json(newEvent)
        }
        return res.status(200).json(event)
    } catch (error) {
        return   res.status(500).json({error:error})
    }
}
export const getOneEventAdmin = async (req,res)=>{
    try {
        const eventID = req.params.id   
        
        const event = await EventModel.findOne({"_id":eventID},{"dateRange":1}
        ).populate({
            path:"dateRange.tickets.session.onlinePayment dateRange.tickets.session.offlinePayment",
            model:"Ticket",
            populate:{
                path:"buyerInfo",
                model:"User",
                select:"username address phone email"
            }
        })
        return res.status(200).json(event)
    } catch (error) {
        return   res.status(500).json({error:error})
    }
}
export const getAllComing = async (req,res)=>{
    try {
       
         
        const event = await EventModel.find({"eventStatus":0},{
            "dateRange.tickets.session.onlinePayment":0,
            "dateRange.tickets.session.offlinePayment":0
        }).sort({ 'timestamp': 1 })
        if(event.length==0){
            let newEvent = [{
                name:"Chưa có sự kiện ",
                heroPic:"https://live.staticflickr.com/65535/52248989095_1f7832b306_o.png"
            }]
            return res.status(200).json(newEvent)
        }
        return res.status(200).json(event)
    } catch (error) {
        return   res.status(500).json({error:error})
    }
}

export const updateEvent = async (req,res)=>{
    try {
        const eventID = req.params.id 
        const eventUpdate = req.body  
        
        const event = await EventModel.findByIdAndUpdate(eventID,
            eventUpdate
        ,{new:true})
        return res.status(200).json(event)
    } catch (error) {
        return   res.status(500).json({error:error})
    }
}