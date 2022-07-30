import express from "express";
import { activeTicket, createEvent, createSeat, createTicket, getAllEvent, getAllEventAdmin, getEvent, getOneEvent, getOneEventAdmin, getAllOpen, updateEvent, getAllComing} from "../controller/eventController.js";
import { verifyTicket } from "../controller/middlewareController.js";


const router = express.Router()


// router.post('/update',updateProject)
// // router.post('/create',createProject)
router.post('/',createEvent)
router.post('/create-ticket',createTicket)
router.post('/active-ticket',activeTicket)
router.post('/crete-seat',createSeat)
router.post('/create-ticket',verifyTicket)

router.get('/get-all-event',getAllEvent)
router.get('/findEvent',getEvent)
router.get('/getAllOpen',getAllOpen)
router.get('/getAllComing',getAllComing)
router.get('/get-one/:id',getOneEvent)
router.get('/get-one-admin/:id',getOneEventAdmin)
router.get('/get-all-admin',getAllEventAdmin)
router.post('/update/:id',updateEvent)
export default router
