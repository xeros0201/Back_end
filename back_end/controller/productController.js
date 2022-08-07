import { CartModel } from "../model/cartModel.js"
import { ProductModel } from "../model/productModel.js"
import { UserModel } from "../model/userModel.js"

export const getProduct= async (req,res)=>{
    try {
      
        const products = await ProductModel.find().populate('genres')
        if(products.length===0){
            let newProdcuct =[{
                
                    _id: "none",
                    name: "Coming soon !",
                    productCode: "Coming soon !",
                    genres: [
                        "6280ec226dcc06a7f92f2c7d"
                    ],
                    pics: [
                        "https://live.staticflickr.com/65535/52253644340_216a5fe89a_o.png",
                        "https://live.staticflickr.com/65535/52253644340_216a5fe89a_o.png",
                        "https://live.staticflickr.com/65535/52253644340_216a5fe89a_o.png",
                        "https://live.staticflickr.com/65535/52253644340_216a5fe89a_o.png"
                    ],
                    discription: "Coming soon !",
                    moreInfo: [
                        "Coming soon !",
                        "Coming soon !",
                        "CComing soon !"
                    ],
                    option: [
                        {
                            style: "coming soon",
                            cost: 0,
                            "thumnailPics": "https://live.staticflickr.com/65535/52253644340_216a5fe89a_o.png",
                            number: 100,
                   
                        }
                    ],
                    isNewest: false,
                    isBestSeller: false,

       
                
            }]
            return  res.status(200).json(newProdcuct)
        }
        return  res.status(200).json(products)
    } catch (error) {
      return  res.status(500).json({error:error})
    }
}
export const createProduct= async (req,res)=>{
    
    try {
        const newProduct = req.body
        
        const product = new ProductModel(newProduct)
        await product.save()

        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({error:error})
    }
}

export const updateProduct = async (req,res)=>{
    try {
        const updateProduct = req.body

        const product = await ProductModel.findOneAndUpdate({
            _id:updateProduct._id
        },updateProduct,{new:true})
        

        return  res.status(200).json(product)
    } catch (error) {
        return   res.status(500).json({error:error})
    }
}
export const deleteProduct = async(req,res)=>{
    try {
        const deleteProduct = req.body
        const Product = await ProductModel.findByIdAndDelete(deleteProduct._id)
        return res.status(200).json("Delete successfully !")
    } catch (error) {
        return res.status(500).json({error:error})
    }
}
export const getOneProdcut = async(req,res)=>{
    try {
        const producID = req.params.id
        const Product = await ProductModel.findById(producID).populate("genres",{name:1})
        return res.status(200).json(Product)
    } catch (error) {
        return res.status(500).json({error:error})
    }
}
export const getProductLimitation = async(req,res)=>{
 
    try {
        const producID = req.body.id
        const style = req.body.style
        const Product = await ProductModel.findOne({"_id":producID},{"option":1})
        const limit = Product.option.find(item=>item.style==style)

        return res.status(200).json(limit)
    } catch (error) {
        return res.status(500).json({error:error})
    }
}

export const searchProduct =async (req,res)=>{
   
    try {
       
        const searchText= req.query.search
        const cateID = req.query.cateID
     
        const finfItem = await ProductModel.aggregate([
            {
                "$search":{
                    "index": 'productSearch',
                    // "embeddedDocument": {
                    //     "path": "genres",
                    //     "operator": {
                    //       "compound": {
                    //         "should": [{
                    //           "text": {
                    //             "path": "genres.name",
                    //             "query": searchText
                    //           }
                    //         }],
                        
                    //       }
                    //     }},
                        // "equals": {
                        //     "path": "genres",
                        //     "value": new ObjectId(`${searchText}`)
                        //   },
                   
                    "compound":{
                
                        "should":[
                            {
                                "autocomplete":{
                                "query": `${searchText}`,
                                "path":"name",
                                "fuzzy":{
                                    "maxEdits":1
                                }
                            }
                            },
                   
                        ]

                    }
                }
            },
         
        ])
  
        if(!cateID){
            const newList = finfItem
            return res.status(200).json(newList)
        }
        if(cateID=="new-releases"){
            const newList = finfItem.filter(item=>item.isNewest==true)
            return res.status(200).json(newList)
        }
        if(cateID=="best-seller"){
            const newList = finfItem.filter(item=>item.isBestSeller==true)
            return res.status(200).json(newList)
        }
        
  
        const newList = finfItem.filter(item=>item.genres.toString().includes(cateID))

        return res.status(200).json(newList)
      
    } catch (error) {
        return res.status(500).json({error:error})
    }
}