import express from "express";
import { createDiscount, getDiscount, updateDiscount } from "../controller/discountController";

const router = express.Router()

router.get('/',getDiscount)
router.post('/create',createDiscount)
router.post('/update',updateDiscount )

export default router