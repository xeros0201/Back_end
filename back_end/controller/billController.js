import { BillModel } from "../model/billModel"
import { ProductModel } from "../model/productModel"
import { UserModel } from "../model/userModel"



export const createBill= async (req,res)=>{

    try {
      
   
        const newBill = req.body
        const bill = await new BillModel(newBill)
        await bill.save()
        await UserModel.findByIdAndUpdate({_id:newBill.shipment},{
           $push:{bills:bill._id} 
        })
        return   res.status(200).json(bill)
    } catch (error) {
       return res.status(500).json({error:error})
    }
}
export const getAllBill = async(req,res)=>{
    try {
        const bills = await BillModel.find()
        .populate({
            path:"shipment",
            model:'User',
            select:"username address phone",
            populate:{
                path:"cart",
                model:'Product',
                populate:{
                    path:"item",
                    model:"Product",
                    select:"name cost",
                    populate:{
                        path:"genres",
                        model:"Genres",
                        select:"name"
                    }
                }
              
            }
        })
        .populate("shipment_method")
        .populate("discount")
        return res.status(200).json(bills)
    } catch (error) {
        return res.status(500).json({error:error})
    }
}
export const getAllBillByUser = async(req,res)=>{
    try {
        const user = req.params
        const bills = await BillModel.findById(user._id)
        return res.status(200).json(bills)
    } catch (error) {
        return res.status(500).json({error:error})
    }
}

