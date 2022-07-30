import express from "express";
import {getAllUser,deleteUser} from '../controller/userController'
import{verifyToken,verifyTokenAndUser} from '../controller/middlewareController'
import { createBill, getAllBill } from "../controller/billController";
const router = express.Router()

router.get("/",verifyToken,getAllUser)


router.post("/delete/:id",verifyTokenAndUser,deleteUser)
router.post('/bill',createBill)
router.get('/getAllBill',getAllBill)
export default router
