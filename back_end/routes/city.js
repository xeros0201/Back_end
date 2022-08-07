import express from "express";
import { createShipment, getAllShipment, updateShipment } from "../controller/shipmentController.js";

const router = express.Router()
router.post('/shipment', createShipment)
router.get('/getShipments',getAllShipment)
router.post('/shipment_update', updateShipment) 
export default router
