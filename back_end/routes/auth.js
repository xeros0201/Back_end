import express from "express";
import {createUser,loginUser,refreshToken,userLogout} from '../controller/authController'
import{verifyToken,verifyTokenAndUser} from '../controller/middlewareController'
const routerAuth = express.Router()

routerAuth.post("/register",createUser)
routerAuth.post("/login",loginUser)
routerAuth.post("/refresh",refreshToken)
routerAuth.post("/logout",verifyToken,userLogout)
export default routerAuth
