import { UserModel } from "../model/userModel.js"


export const getAllUser= async (req,res)=>{
    try {
        
        const user = await UserModel.find()
        
        res.status(200).json(user)
    } catch (error) {
       return res.status(500).json({error:error})
    }
}
export const deleteUser= async (req,res)=>{
    try {
        
        const user = await UserModel.findByIdAndDelete(req.params.id)
        
        res.status(200).json("Delete successfully")
    } catch (error) {
       return res.status(500).json({error:error})
    }
}

