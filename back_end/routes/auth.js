import express from "express";
import {createUser,loginUser,refreshToken,userLogout} from '../controller/authController.js'
import{verifyToken,verifyTokenAndUser} from '../controller/middlewareController.js'
const routerAuth = express.Router()

routerAuth.post("/register",createUser)
routerAuth.post("/login",loginUser)
routerAuth.post("/refresh",refreshToken)
routerAuth.post("/logout",verifyToken,userLogout)
export default routerAuth
