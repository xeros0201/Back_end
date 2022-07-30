import { DiscountModel } from "../model/discountModel"
import jwt from 'jsonwebtoken'
import dotenv  from "dotenv"
dotenv.config()



export const createDiscount= async (req,res)=>{
    console.log("here")
    try {
       
        const newDiscount = req.body
        console.log(newDiscount)
        if(newDiscount.percent&&newDiscount.value){
            return res.status(400).json("Only value or percent not both !")
        }
        if(newDiscount.percent===null&&newDiscount.value===null){
            return res.status(400).json("Must have index for value or percent !")
        }
        const newToken =generateAccessToken(newDiscount)
        const discount = await new DiscountModel({
            name: newDiscount.name,
            code: newDiscount.code,
            value: newDiscount.value,
            percent: newDiscount.percent,
            expired_token:newToken,
            number: newDiscount.number,
            status: newDiscount.status
        })
        await discount.save()
        return res.status(200).json(discount)
    } catch (error) {
       return res.status(500).json({error:error})
    }
}
export const getDiscount = async(req,res)=>{
    try {
        
        const discounts = await DiscountModel().find()
        return res.status(200).json(discounts)
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const updateDiscount = async (req,res)=>{
    try {
        
        const updateDiscount = req.body 
        const updateToken =generateAccessToken(updateDiscount)
        const Discount = await DiscountModel.findOneAndUpdate({
            _id:updateDiscount._id
        },{
            name: updateDiscount.name,
            code: updateDiscount.code,
            value: updateDiscount.value,
            percent: updateDiscount.percent,
            expired_token:updateToken,
            number: updateDiscount.number,
            status: updateDiscount.status
        },{new:true})
        return res.status(200).json(Discount)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const generateAccessToken=  (discount)=>{

    return jwt.sign({
     
     name: discount.name
    },
 process.env.JWT_ACCESS_KEY,
 {expiresIn:discount.expired_token}
 )
 }