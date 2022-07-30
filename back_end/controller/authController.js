import { UserModel } from "../model/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv  from "dotenv"

dotenv.config()
let refreshTokens= []
export const createUser= async (req,res)=>{
    try {


        const newU = req.body
        const check = await UserModel.find({"username":newU.username })
        if(check.length===0){
            const check2 = await UserModel.find({"email":newU.email })
           
            if(check2.length===0){
                const salt = await bcrypt.genSalt(10)
                const hashed = await bcrypt.hash(req.body.password,salt)
                const user = await new UserModel({
                    username: req.body.username,
                    name:req.body.name,
                    email:req.body.email,
                    password:hashed, })
                await user.save()
                return   res.status(200).json(user)
            }
            return res.status(200).json({"message":"*Email được sử dụng. Vui lòng chọn một tên người dùng khác."})
        }
     
        
        return res.status(200).json({"message":"*Tên người dùng đã được sử dụng. Vui lòng chọn một tên người dùng khác."})

      
    } catch (error) {
        res.status(500).json({error:error})
    }
}
export const loginUser= async (req,res)=>{
    try { 
        
        const  user = await UserModel.findOne({username:req.body.username})
        if(!user){
            return res.status(404).json("Wrong user or password ")
        }
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if(!validPassword){
            return res.status(404).json("Wrong user or password")
            
        }
        if(user&&validPassword){
            
           const accessToken= generateAccessToken(user)
            const refreshToken= generateRefreshToken(user)
            
            res.cookie('refreshToken',refreshToken,{
                httpOnly:true,
                path:"/",
                // secure:false,
                sameSite:"strict",
                       
            })
            
          
            /*Lưu refresh Token vào đb
             const rfToken = await new jwtModel:{
                 code: refreshToken,
                 status:
             }
             await rfToken.save()
             */
             refreshTokens.push(refreshToken);
             
            const {password,...others}= user._doc;
          
            return res.status(200).json({...others,accessToken})
        }
        



    } catch (error) {
        return res.status(500).json({error:error})
    }
}
export const generateAccessToken=  (user)=>{

   return jwt.sign({
    id: user.id,
    admin: user.role
},
process.env.JWT_ACCESS_KEY,
{expiresIn:"2h"}
)
}
export const generateRefreshToken=  (user)=>{

    return jwt.sign({
     id: user.id,
     admin: user.role
 },
 process.env.JWT_REFRESH_KEY,
 {expiresIn:"365d"}
 )
 }
 export const refreshToken= async (req,res)=>{
     
    const refreshToken =req.cookies.refreshToken
    if(!refreshToken){
        return res.status(401).json("You are not autheticated")    
    }
    if(!refreshTokens.includes(refreshToken)){
        return res.status(403).json("Refresh is not valid"); 
    }
    jwt.verify(refreshToken,process.env.JWT_REFRESH_KEY,(err,user)=>{
        if(err){
           return console.log(err)
        }else{
            refreshTokens= refreshTokens.filter((token)=>token !==refreshToken)

            const newAccessToken = generateAccessToken(user)
            const newRefreshToken = generateRefreshToken(user)
            refreshTokens.push(newRefreshToken)
            res.cookie('refreshToken',newRefreshToken,{
                httpOnly:true,
                path:"/",
                secure:false,
                sameSite:"strict"
            });
            res.status(200).json({accessToken: newAccessToken})
        }
    })
    
 }
 export const userLogout= async (req,res)=>{
     try {
        console.log("123")
        res.clearCookie("refreshToken")
        refreshTokens =refreshTokens.filter(token => token !==req.cookies.refreshToken)
        return res.status(200).json("Logged out!")
     } catch (error) {
         return res.status(500).json("loii")
     }
    
    
 }
