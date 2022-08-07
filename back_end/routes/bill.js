import express from "express";
import {  getAllBill, getBill } from "../controller/billController.js";

const router = express.Router()


router.get('/',getAllBill)
router.get('/get/:id',getBill)
export default router
