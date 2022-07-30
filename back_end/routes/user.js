import express from "express";
import {getAllUser,deleteUser} from '../controller/userController.js'
import{verifyToken,verifyTokenAndUser} from '../controller/middlewareController.js'
import { createBill, getAllBill } from "../controller/billController.js";
const router = express.Router()

router.get("/",verifyToken,getAllUser)


router.post("/delete/:id",verifyTokenAndUser,deleteUser)
router.post('/bill',createBill)
router.get('/getAllBill',getAllBill)
export default router
