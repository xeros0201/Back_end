import { Shipment_City_Fee } from "../model/shipmentCityFee.js"




export const createShipment= async (req,res)=>{
    try {
        const newShipmet = req.body
        const shipment = await new Shipment_City_Fee(newShipmet)
        await shipment.save()
        return   res.status(200).json(shipment)
    } catch (error) {
       return res.status(500).json({error:error})
    }
}
// export const addMoreCost = async(req,res)=>{
//     try {
//         const shipMent = req.body
    
//         const updateShipment = await Shipment_methodModel.findByIdAndUpdate({_id:shipMent._id},{
//              $push: { ship_cost: { $each:shipMent.ship_cost } } 
//         },{new:true})
//         return   res.status(200).json(updateShipment)
//     } catch (error) {
//         return res.status(500).json({error:error})
//     }
// }
export const getAllShipment = async(req,res)=>{
    try {
        const shipments = await Shipment_City_Fee.find()
        return res.status(200).json(shipments)
    } catch (error) {
        return res.status(500).json({error:error})
    }
}
export const updateShipment = async(req,res)=>{
    try {

        const shipMent = req.body

        const updateShipment = await Shipment_City_Fee.findByIdAndUpdate({_id:shipMent._id},shipMent,{new:true})
        return   res.status(200).json(updateShipment)
    } catch (error) {
        return res.status(500).json({error:error})
    }
}


