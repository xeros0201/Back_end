import jwt from 'jsonwebtoken'
import mongoose from "mongoose";
import { EventModel } from '../model/eventModel.js'
import { ProductModel } from '../model/productModel.js'
import { SeatModel } from '../model/seatModel.js'
import { TicketModel } from '../model/ticketModel.js'
import { UserModel } from '../model/userModel.js'

export const verifyToken= async (req,res,next)=>{
    const token = req.headers.token
    
    if(token){
        const accessToken= token.split(" ")[1]
        jwt.verify(accessToken,process.env.JWT_ACCESS_KEY,(err,user)=>{
            if(err){
              return  res.status(403).json("Token is not valid")
            }
            req.user = user;
            next()
        })
    }else{
        return res.status(401).json("You're not authenticated")
    }
}
export const verifyTokenAndUser= async (req,res,next)=>{
    verifyToken(req,res,()=>{
        console.log( req.body)
        if(req.body[0]==="1"){
         
            next();
        }else{
            return  res.status(403).json("You are not allowed to do this")
        }
    })
}
export const verifyTicket= async (req,res,next)=>{

    
    const newTicket = req.body
    const limit = newTicket.eventInfo
    const curUser = newTicket.buyerInfo
    const amount = newTicket.amount
    const dateId = newTicket.dateID
    const seat  = newTicket.seatInfo
    const option =newTicket.option
    const Event = await EventModel.findById(limit)
    console.log(typeof option)
    const Seat  = await SeatModel.findOne({"option._id":option},{_id:0,option:{$elemMatch:{_id:option}}})

    
    // return res.status(200).json(Seat)
    const totalAvailable = Seat.option[0].maxSeat
    if(Event.eventStatus===2){
        return res.status(403).json(`This event is closed !`)
    }
    if(totalAvailable===0){
    
        return res.status(403).json(`Sory no available ! This is Event is full please try another one`)
    }
    if(Event.ticketLimitationAtOnce===0){
        const user = await TicketModel.find({buyerInfo:curUser})
        if(user){
            return res.status(403).json(`${user} already have this ticket`)
        }
        const ticket = await new TicketModel(newTicket)
        await ticket.save()
        // await EventModel.findByIdAndUpdate(limit, {totalAvailable:(totalAvailable-1) },{new:true})
        return res.status(200).json(`succeffully create a ticket for ${curUser}, please a few minutes the ticket will be active soon !`)
    }
    if(amount> Event.ticketLimitationAtOnce){
        return res.status(403).json(`${user} you only allow to buy ${limitation} tickets at once `)
    }
    if(!amount){
        return res.status(403).json(`please enter the amount of ticket`)
    }
    //se tru total ticket sau khi active
    for (let i = 0; i < amount; i++) {
        const ticket = await new TicketModel(newTicket)
        await ticket.save()
      }
      return res.status(200).json(`${curUser} created ${amount} of tickets successfully for ${Event.name}, the ticket will be stored at this  `)

 
}