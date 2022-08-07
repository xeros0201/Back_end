import express from "express";
import {  createDiscount, getDiscount, getOne, updateDiscount, updateDiscount1 } from "../controller/discountController.js";

const router = express.Router()

router.get('/',getDiscount)
router.get('/:id',getOne)
router.post('/create',createDiscount)
router.post('/update',updateDiscount )
router.post('/check',updateDiscount1)
export default router