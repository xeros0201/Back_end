import { ProjectModel } from "../model/project.js"





export const createProject= async (req,res)=>{
    try {
        const newProject = req.body

        const project = new ProjectModel(newProject)
        await project.save()

        return res.status(200).json(project)
    } catch (error) {
        return res.status(500).json({error:error})
    }
}

export const updateProject = async (req,res)=>{
    try {
        const updateProduct = req.body

        const product = await ProjectModel.findOneAndReplace({
            _id:updateProduct._id
        },updateProduct,{new:true})
        

        return  res.status(200).json(product)
    } catch (error) {
        return   res.status(500).json({error:error})
    }
}
export const getAllProject= async (req,res)=>{
  try {
      
      const limit = req.query.limit
      
      const user = await ProjectModel.find().limit(limit)
      
      res.status(200).json(user)
  } catch (error) {
     return res.status(500).json({error:error})
  }
}
