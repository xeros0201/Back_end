import { DiscountModel } from "../model/discountModel.js"
import jwt from 'jsonwebtoken'
import dotenv  from "dotenv"
dotenv.config()



export const createDiscount= async (req,res)=>{
   
    try {
        const newDiscount = req.body
        const check = await DiscountModel.find({"name":newDiscount.name}) 
   
        if(check.length===0){

            const discount = await new DiscountModel(newDiscount)
            await discount.save()
            return res.status(200).json(discount)
        }else{
            return res.status(409).json("Tên giftcode này đã tồn tại")
        }
    } catch (error) {
       return res.status(500).json({error:error})
    }
}
export const getDiscount = async(req,res)=>{
    try {
        
        const discounts = await DiscountModel.find()
        return res.status(200).json(discounts)
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const getOne = async(req,res)=>{
    try {
        console.log(req.params)
        const discounts = await DiscountModel.findById({"_id":req.params.id})
        return res.status(200).json(discounts)
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const updateDiscount = async (req,res)=>{
    try {
        
        const updateDiscount = req.body 
     
        const Discount = await DiscountModel.findByIdAndUpdate(updateDiscount._id)
        return res.status(200).json(Discount)
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const updateDiscount1 = async (req,res)=>{
    try {
        
        const updateDiscount = req.body 
      
        const Discount = await DiscountModel.find({"name":updateDiscount.name,"endDate":{ $gte : new Date()},"startDate":{$lt:new Date()},"number":{$gt:0}})
        
        if(Discount.length===0){
            return res.status(410).json("Code bạn nhập không đúng hoặc đã hết hạn xin vui lòng thử lại !")
        }
       
        return res.status(200).json(Discount)
    } catch (error) {
        return res.status(500).json(error)
    }
}

