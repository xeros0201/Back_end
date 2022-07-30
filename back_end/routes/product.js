import express from "express";
import{getProduct,createProduct,updateProduct, searchProduct, getOneProdcut,  getProductLimitation} from "../controller/productController.js"
import {  createShipment, getAllShipment, updateShipment } from "../controller/shipmentController.js";
const router = express.Router()

router.get('/',getProduct)
router.post('/create',createProduct)
router.post('/update',updateProduct )
router.delete('/delete_pr')
router.post('/shipment', createShipment)
router.post('/getShipments',getAllShipment)
router.post('/shipment_update', updateShipment) 
router.get('/search',searchProduct)
router.get('/:id',getOneProdcut)
router.post('/limit',getProductLimitation)
export default router
